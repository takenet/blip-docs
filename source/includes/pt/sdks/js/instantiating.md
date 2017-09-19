### Instanciando o cliente

Você precisará de um identificador e uma chave de acesso para sua aplicação, para realizar a conexão com o servidor do BLiP. Para obtê-los:
- Acesse o [Painel BLiP](https://portal.blip.ai) e faça seu login
- Na aba `Chatbots` clique em `Criar chatbot`
- Escolha a opção `SDK` e na próxima etapa preencha as informações solicitadas
- Pronto, seu chatbot foi criado e o identificador e chave de acesso serão exibidos.

Para instanciar o cliente, utilize a classe `ClientBuilder`, informando o `identificador` e `chave de acesso` obtidos:

```javascript
// Importa as dependências
let MessagingHub = require('messaginghub-client');
let WebSocketTransport = require('lime-transport-websocket');

// Cria uma instância do cliente, informando o identifier e accessKey do seu chatbot 
let client = new MessagingHub.ClientBuilder()
    .withIdentifier({Identifier})
    .withAccessKey({AccessKey})
    .withTransportFactory(() => new WebSocketTransport())
    .build();

// Registra um receiver para mensagens do tipo 'text/plain'
client.addMessageReceiver(true, function (message) {
    // TODO: Processe a mensagem recebida
    console.log(message);
});

// Registra um receiver para qualquer notificação
client.addNotificationReceiver(true, function(notification) {
  // TODO: Processe a notificação recebida
});

// Conecta com o servidor de forma assíncrona. 
// A conexão ocorre via websocket, na porta 443.
client.connect()  // O retorno deste método é uma 'promise'.
    .then(function (session) {
        // Conexão bem sucedida. A partir deste momento, é possível enviar e receber envelopes do servidor. */ 
        console.log('Connectado');
    })
    .catch(function (err) {
        // Falha na conexão
        console.log(err);
    });

```

Cada instância de `client` representa uma conexão com o servidor, por isso deve ser reutilizada. Para fechar a conexão:

```javascript

client.close()
    .then(function() { /* Desconectado com sucesso */ })  
    .catch(function(err) { /* Falha ao fechar a conexão */ }); 

```
