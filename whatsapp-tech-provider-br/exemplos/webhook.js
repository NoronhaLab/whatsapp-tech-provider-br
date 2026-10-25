// Webhook mínimo da WhatsApp Cloud API para Vercel (Node, sem framework).
// Caminho sugerido: api/webhook.js
// Variáveis de ambiente: WA_VERIFY_TOKEN e WA_APP_SECRET. Nunca coloque segredos no código.

import crypto from 'node:crypto';

const lerCorpoBruto = async (req) => {
  const partes = [];
  for await (const parte of req) partes.push(parte);
  return Buffer.concat(partes);
};

const assinaturaValida = (corpo, cabecalho, segredo) => {
  if (!cabecalho || !cabecalho.startsWith('sha256=')) return false;
  const esperado = 'sha256=' + crypto.createHmac('sha256', segredo).update(corpo).digest('hex');
  const a = Buffer.from(esperado);
  const b = Buffer.from(cabecalho);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

export default async function handler(req, res) {
  // 1. Verificação inicial feita pela Meta ao salvar a URL do webhook
  if (req.method === 'GET') {
    const url = new URL(req.url, 'http://localhost');
    const modo = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const desafio = url.searchParams.get('hub.challenge');
    if (modo === 'subscribe' && token === process.env.WA_VERIFY_TOKEN) {
      res.statusCode = 200;
      return res.end(desafio);
    }
    res.statusCode = 403;
    return res.end();
  }

  // 2. Eventos (mensagens, status, modelos)
  if (req.method === 'POST') {
    const corpo = await lerCorpoBruto(req);
    if (!assinaturaValida(corpo, req.headers['x-hub-signature-256'], process.env.WA_APP_SECRET)) {
      console.warn('[webhook] assinatura inválida');
      res.statusCode = 401;
      return res.end();
    }

    const evento = JSON.parse(corpo.toString('utf8'));
    for (const entrada of evento.entry ?? []) {
      for (const mudanca of entrada.changes ?? []) {
        const valor = mudanca.value ?? {};
        // Registre só o necessário. Não grave conteúdo de mensagens em log de produção.
        console.log('[webhook]', JSON.stringify({
          campo: mudanca.field,
          mensagens: (valor.messages ?? []).map((m) => ({ id: m.id, tipo: m.type })),
          status: (valor.statuses ?? []).map((s) => ({ id: s.id, status: s.status })),
        }));
      }
    }

    // Responda rápido; processamento pesado deve ir para uma fila.
    res.statusCode = 200;
    return res.end('EVENT_RECEIVED');
  }

  res.statusCode = 405;
  res.end();
}
