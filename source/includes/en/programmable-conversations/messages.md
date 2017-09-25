## Conversation messages

### Sending messages

> The following sample show how to send a message after connection has been stablished

```javascript
client.connect()
    .then(function(session) {
        // After connection is possible send messages
        var msg = { type: 'text/plain', content: 'Hello, world', to: '553199990000@0mn.io' };
        client.sendMessage(msg);
    });
```

```csharp
public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;

    public PlainTextMessageReceiver(IMessagingHubSender sender)
    {
        _sender = sender;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        // Write the received message to the console
        Console.WriteLine(message.Content.ToString());
        // Responds to the received message
        _sender.SendMessageAsync("Hi. I just received your message!", message.From, cancellationToken);
    }
}
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Length: 131

{
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "to": "551100001111@0mn.io",
    "type": "text/plain",
    "content": "Hello, how can I help you?"
}
```

O envio de mensagens é específico da **linguagem** que você pretende trabalhar. 

Com o `SDK C#` o envio de mensagens é usado utilizando uma instância do **ISender**, que é injetada automaticamente
nos construtores dos receivers registrados no projeto, alem da classe Startup.

Com o `SDK Javascript` O envio de mensagens e notificações só é possível após o estabelecimento da sessão. o cliente é conectado com uma chave de acesso e após a realização da conexão é realizado o envio de uma mensagem através do método **sendMessage**

No `Webhook` para enviar mensagens, a aplicação deverá fazer um HTTP **POST** na URL exibida nas configurações do chatbot. A requisição deve conter um cabeçalho de autorização 
(Authorization) com o tipo Key, conforme exibido nas configurações do chatbot. 

**Veja ao lado exemplos**





### Receiving messages

```csharp
//A `IMessageReceiver` can be defined as follow
public class PlainTextMessageReceiver : IMessageReceiver
{
    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        // Write the received message to the console
        Console.WriteLine(message.Content.ToString());
    }
}
```

--

```javascript
client.addMessageReceiver(true, (message) => {
  // Process received message

});

//Example of message receiver with filter of originator
client.addMessageReceiver((message) => { message.from === "553199990000@0mn.io" },
(message) => {
  // Process received message
});

//Each registration of receivers return a `handler` that can be used to cancell the registration:
var removeJsonReceiver = client.addMessageReceiver("application/json", handleJson);
// ...
removeJsonReceiver();
```

O recebimento de mensagens e notificações com o `SDK C#` é feito através das interfaces do **IMessageReceiver** e INotificationReceiver respectivamente. Ao lado
veja as definições de ambos.

Com o `SDK Javascript` o recebimento pelo cliente se dá através do registro de **receivers** para mensagens e notificações. É possível definir filtros para cada receiver no momento do registro.

No `Webhook`, a URL de mensagens configurada receberá um HTTP **POST** com a mensagem enviada por um cliente no formato JSON, também no formato definido pelo protocolo LIME, conforme o exemplo ao lado

Confira alguns pontos adicionais no github.
