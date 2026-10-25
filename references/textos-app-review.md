# Modelos de texto para a App Review

Os campos do formulário são lidos por revisores em inglês. Troque tudo entre `[colchetes]` e corte o que o seu painel não faz de verdade. Um texto que descreve recursos que não aparecem no vídeo é motivo comum de recusa.

## Descrição do negócio (uma frase)

```
We are a [Brazilian] software company that helps [small and medium businesses] answer and automate customer conversations on WhatsApp.
```

## whatsapp_business_messaging

```
[COMPANY] is a messaging platform for [small and medium businesses in Brazil]. We use whatsapp_business_messaging to send and receive WhatsApp messages on behalf of business customers who connect their own WhatsApp Business Account to our platform. Business users reply to their customers from our dashboard within the 24-hour customer service window and send approved message templates, such as [appointment confirmations and reminders], only to users who have opted in. Incoming messages and delivery statuses are received through our webhook ([WEBHOOK_URL]), which validates the X-Hub-Signature-256 header. The attached screencast shows a message composed and sent from our dashboard at [PANEL_URL] and the same message being received in WhatsApp.
```

Vídeo: o de envio de mensagem.

## whatsapp_business_management

```
We use whatsapp_business_management to manage the WhatsApp Business Accounts connected to our platform: reading phone number status, display name and quality rating, listing the phone numbers of the account, and creating and listing message templates that our business customers use for [appointment confirmations, reminders and service updates]. The attached screencast shows the template list in WhatsApp Manager, a new utility template being created from our dashboard (API response with the template id and PENDING status), and the same template appearing as "In review" in WhatsApp Manager.
```

Vídeo: o de criação de modelo.

## Instruções para o analista

```
[COMPANY] - Messaging dashboard (WhatsApp Cloud API)

1. Go to [PANEL_URL] and sign in with the test credentials at the end of these instructions.
2. Click "[STATUS BUTTON]" to see the connected WhatsApp business number ([PHONE], "[DISPLAY NAME]").
3. whatsapp_business_messaging: in "[SEND SECTION]", enter a WhatsApp number in international format (digits only) and click "[SEND BUTTON]". Free-form text is delivered only inside the 24-hour customer service window; to open it, first send any message to [PHONE] from the recipient's WhatsApp. Approved templates can be sent with "[TEMPLATE BUTTON]".
4. whatsapp_business_management: in "[MANAGE SECTION]", click "[LIST NUMBERS]", "[LIST TEMPLATES]" and "[CREATE TEMPLATE]". The API response is shown on screen.
5. Webhooks are received at [WEBHOOK_URL] with X-Hub-Signature-256 validation.

Business customers will connect their own WhatsApp Business Accounts through Embedded Signup after this review. [LEGAL NAME] - [TAX ID] - Privacy: [URL] - Terms: [URL] - Data deletion: [URL]

Test credentials:
Email: [REVIEWER_EMAIL]
Password: [o usuário digita direto no formulário]
```

Se os botões do painel estiverem em português, coloque a tradução em inglês entre parênteses na primeira menção.

## Tratamento de dados (orientação)

| Pergunta | Como responder |
|---|---|
| Operadores com acesso aos dados da plataforma? | Sim, se usa hospedagem, banco ou IA de terceiros. Liste só os que já estão em uso, com a categoria e os países onde processam |
| Responsável pelos dados | A razão social da empresa e o país |
| Dados entregues a autoridades nos últimos 12 meses | A resposta verdadeira (empresas novas normalmente: Não) |
| Políticas para pedidos de autoridades | Marque só as práticas que a empresa realmente adota |
