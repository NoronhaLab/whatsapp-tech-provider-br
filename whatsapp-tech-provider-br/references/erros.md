# Erros reais e soluções

Casos encontrados num processo real em outubro de 2026.

| Erro ou sintoma | Causa | Solução |
|---|---|---|
| Erro 130497 ao enviar para número brasileiro | O número de teste +1 555 da Meta não envia mensagens para o Brasil | Usar um número brasileiro real na conta do WhatsApp |
| Erro #10 "Viewer cannot access the provided Paid Message Account" | Tentativa de usar um número ou conta de WhatsApp de outro app ou portfolio | Criar uma conta do WhatsApp nova dentro do app de Tech Provider |
| Chip novo mostra perfil ou contatos de outra pessoa | Número reciclado pela operadora | Ativar no WhatsApp comum, verificar e apagar a conta antes de cadastrar na API |
| Erro 132001 ao enviar `hello_world` | Modelo inexistente em conta nova | Mandar "oi" do celular para o número e responder com texto livre dentro de 24 h |
| Gerar token permanente pede "Email verification is required" | E-mail do perfil no portfolio não recebe mensagens da Meta | Trocar o e-mail do perfil para um que recebe e confirmar o código |
| Webhook não verifica | Nome da variável colado no campo, em vez do valor | Colar o valor do verify token |
| Webhook registra "assinatura inválida" | App secret errado na hospedagem ou validação feita sobre o JSON já convertido | Conferir o app secret e calcular o HMAC sobre o corpo bruto da requisição |
| Mensagem real não chega no webhook | App não publicado ou "Assinar webhooks" desligado no número | Usar o botão "Teste" até publicar; ligar a assinatura no número |
| Painel retorna 404 na Vercel | Pasta errada publicada (projeto dentro de outro repositório) | Ajustar o Root Directory e fazer redeploy |
| Revisor vê tela de login da Vercel | Proteção de deploy ativa no endereço .vercel.app | Usar domínio próprio, que fica público na proteção padrão |
| Seção "Instruções para o analista" bloqueada | App sem plataforma cadastrada | Configurações > Básico > Adicionar plataforma > Site com a URL do painel |
| "Chamadas de teste de API" pendente | Chamadas feitas há menos de 24 h, ou nenhuma chamada com a permissão | Fazer as chamadas pelo painel e esperar 24 h |
| Respostas da Meta não chegam | E-mail de contato do app sem monitoramento ou com filtro | Usar um e-mail que comprovadamente recebe mensagens da Meta |
| `npx` bloqueado no PowerShell | Política de execução do Windows | Usar `npx.cmd`, sem alterar a política |
