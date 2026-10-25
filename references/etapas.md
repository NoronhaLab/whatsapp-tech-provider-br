# Etapas detalhadas

Atualizado em outubro de 2026. Confira a documentação oficial da Meta antes de seguir regras com data ou número.

## Etapa 1: site e páginas legais

Por quê: a Meta confere as URLs legais na App Review e exige essas URLs para publicar o app.

1. Crie três páginas públicas no domínio da empresa:
    * `/privacidade`: controlador e operador, dados recebidos da Meta, uso de IA (se houver), prazos de retenção, prazo de resposta a pedidos, contato do encarregado (LGPD).
    * `/termos`: o que o serviço faz, responsabilidades, relação com a Meta sem sugerir parceria oficial, proibição de revenda do acesso.
    * `/exclusao-de-dados`: como pedir a exclusão e em quanto tempo ela acontece.
2. No rodapé: razão social, CNPJ, e-mail de contato e links para as três páginas.

Pronto quando: as três URLs abrem em janela anônima, sem login.

## Etapa 2: verificação da empresa e do domínio

1. Configurações do negócio > Central de segurança: iniciar a verificação da empresa com CNPJ, endereço e telefone iguais aos da Receita e do site.
2. Segurança da marca > Domínios: adicionar o domínio e verificar por meta tag `facebook-domain-verification` no `<head>` do site.
3. Conferir o e-mail do **perfil do usuário no portfolio** (Usuários > Pessoas). Códigos e confirmações vão para ele.
4. Ativar a autenticação de dois fatores para os administradores.

Pronto quando: empresa e domínio aparecem como "Verificado".

## Etapa 3: app e onboarding de Tech Provider

1. Em developers.facebook.com, criar um app **novo**, ligado ao portfolio verificado, com o caso de uso "Conectar no WhatsApp". Não reaproveite apps de outros produtos.
2. Configurações do app > Básico: nome, ícone 1024 × 1024 px, categoria, URLs legais, domínio do app e **e-mail de contato que o usuário lê** (as respostas da App Review chegam nele).
3. No caso de uso, abrir "Torne-se um Provedor de Tecnologia" e aceitar os Termos de Tech Provider (decisão do usuário; os termos preveem responsabilidade conjunta).
4. Para cadastrar clientes, usar o Embedded Signup v4. Segundo a Meta, v2 e v3 foram descontinuadas em 15/10/2026.

Pronto quando: a barra mostra "Verificação da empresa" concluída e "Análise do app" pendente.

## Etapa 4: número, conta do WhatsApp e token

1. Pôr o chip num celular e abrir o WhatsApp comum. Se aparecer conta de dono anterior, verificar o número e apagar a conta.
2. Etapa 2 (Configuração de produção) do caso de uso: criar uma conta do WhatsApp Business nova e adicionar o número, verificado por SMS.
3. Cadastrar pagamento e dados fiscais (CNPJ) na conta do WhatsApp.
4. Criar um usuário do sistema com acesso apenas a este app e a esta conta.
5. Gerar um token permanente com `whatsapp_business_messaging` e `whatsapp_business_management`. Guardar num gerenciador de senhas.
6. Testar no Graph API Explorer: `GET /<ID_DA_CONTA_WHATSAPP>/phone_numbers`.

Pronto quando: o número aparece na listagem e uma mensagem de teste chega no celular. Em conta nova não existe `hello_world`: mande "oi" do celular para o número e responda com texto livre dentro de 24 horas.

## Etapa 5: painel próprio e webhook

O revisor precisa entrar num app do usuário e ver as permissões em uso. Um painel mínimo basta.

| Função do painel | Permissão demonstrada |
|---|---|
| Login com e-mail e senha do revisor | Nenhuma |
| Enviar texto e enviar modelo | `whatsapp_business_messaging` |
| Status do número, listar números, listar modelos, criar modelo | `whatsapp_business_management` |
| Endpoint de webhook | Ambas |

1. Segredos em variáveis de ambiente: token, app secret, verify token, segredo da sessão, credenciais do revisor, IDs do número e da conta.
2. Webhook: o GET devolve `hub.challenge` quando `hub.verify_token` bate. O POST valida `X-Hub-Signature-256` (HMAC SHA-256 do corpo bruto com o app secret) e responde 200. Ver `exemplos/webhook.js`.
3. Publicar num subdomínio próprio (CNAME no DNS). Domínio próprio evita a tela de login da proteção de deploy da Vercel.
4. Configurar webhooks: URL + o **valor** do verify token. Assinar o campo `messages`.
5. "Registre seu número": ligar "Assinar webhooks" só na conta demonstrada.
6. Clicar em "Teste" na linha `messages` e conferir nos logs que o evento chegou com assinatura válida.

Pronto quando: o login funciona em janela anônima e o teste de `messages` aparece nos logs sem erro. Com o app não publicado, só chegam webhooks de teste.

## Etapa 6: chamadas de teste e vídeos

1. Pelo painel: enviar uma mensagem, listar números, listar modelos e criar um modelo. A Meta pode levar até 24 horas para marcar as chamadas como concluídas.
2. Vídeo 1 (`whatsapp_business_messaging`, 1 a 2 min): painel com URL visível, digitar e enviar uma mensagem, a mensagem chegando no WhatsApp.
3. Vídeo 2 (`whatsapp_business_management`, 1 a 2 min): lista de modelos no WhatsApp Manager, criação de modelo de utilidade pelo painel com a resposta da API (PENDING), o modelo aparecendo "Em análise" no WhatsApp Manager.
4. Nenhum token, senha ou dado de cliente na tela.

Pronto quando: os dois vídeos estão gravados e as chamadas foram feitas há mais de 24 horas.

## Etapa 7: App Review

Caminho: Analisar > Análise do app. Reserve de 30 a 45 minutos.

1. Solicitações: só `whatsapp_business_messaging`, `whatsapp_business_management` e `public_profile`. Permissão pedida e não demonstrada é motivo comum de recusa.
2. Para cada permissão: descrição do negócio (1 frase), texto de uso em inglês, o vídeo correspondente e o aceite de uso permitido (do usuário).
3. Não usar a "AI Content Suggestion" da Meta: texto genérico e exige aceitar termos de IA.
4. Tratamento de dados: declarar só operadores já em uso (ex.: Vercel e os países onde processa), o controlador e o país, pedidos de autoridades e as políticas que a empresa realmente segue.
5. Se a seção de instruções estiver bloqueada: Configurações > Básico > Adicionar plataforma > Site, com a URL do painel.
6. Instruções do analista em inglês, com as credenciais do revisor. "Facebook Login integrado?": Não, se o login é próprio.
7. Testar o login do revisor em janela anônima. O usuário marca o aceite final e clica em Enviar.

Pronto quando: chega o e-mail "O app foi enviado e está com a análise pendente". Publicar o app não é exigido para enviar.
