# WhatsApp Tech Provider no Brasil

Roteiro e skill para o Claude que levam uma empresa brasileira do zero até a App Review enviada como **Tech Provider do WhatsApp** na Meta (WhatsApp Cloud API).

Baseado num processo real feito em outubro de 2026 pela [Noronha Lab](https://noronhalab.com.br), com os erros que travaram o caminho e como resolver cada um.

> **Aviso:** material independente, sem afiliação com a Meta ou o WhatsApp. As regras da plataforma mudam com frequência. Confira sempre a [documentação oficial para Tech Providers](https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/get-started-for-tech-providers). Nada aqui garante aprovação.

## O que tem aqui

| Arquivo | Para quê |
|---|---|
| `SKILL.md` | Instruções para o Claude conduzir o processo etapa por etapa |
| `references/etapas.md` | Passo a passo detalhado das 7 etapas, com critério de "pronto" |
| `references/erros.md` | 14 erros e sintomas reais, com causa e solução |
| `references/textos-app-review.md` | Modelos em inglês para o formulário da App Review |
| `exemplos/webhook.js` | Webhook mínimo em Node com validação de `X-Hub-Signature-256` |

## As 7 etapas

1. Site e páginas legais (privacidade, termos, exclusão de dados)
2. Verificação da empresa e do domínio
3. App de negócios com caso de uso WhatsApp e onboarding de Tech Provider
4. Número brasileiro, conta do WhatsApp, usuário do sistema e token
5. Painel próprio e webhook com assinatura validada
6. Chamadas de teste de API e 2 vídeos
7. Preenchimento e envio da App Review

Tempo estimado: 2 a 3 dias, a maior parte esperando verificações e as 24 horas após as chamadas de teste.

## Como usar a skill

**No Claude (app ou web):** baixe este repositório como .zip e envie a pasta da skill na área de Skills das configurações da sua conta. Depois, peça algo como "quero virar Tech Provider do WhatsApp".

**No Claude Code:** copie a pasta para `~/.claude/skills/whatsapp-tech-provider-br/`.

**Sem Claude:** leia `references/etapas.md` na ordem e use `references/erros.md` quando algo travar.

## Sobre o exemplo de webhook

O arquivo `exemplos/webhook.js` foi feito para funções da Vercel. Use `"type": "module"` no `package.json` e defina as variáveis `WA_VERIFY_TOKEN` e `WA_APP_SECRET`. A assinatura é calculada sobre o corpo bruto da requisição, antes de qualquer conversão para JSON.

## Segurança

* Nunca publique tokens, app secret, senhas ou IDs de clientes.
* Use um usuário do sistema com acesso só ao necessário.
* Não use token de produção de cliente em testes.

## Contribuições

Encontrou uma regra que mudou ou um erro novo? Abra uma issue com a data, a mensagem de erro (sem tokens) e a solução.

## Licença

MIT. Veja `LICENSE`.
