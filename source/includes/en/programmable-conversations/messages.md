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

In order to send messages and notifications use an instance of `ISender` (on C#), wich is automaticaly injected on constructors of registered `receivers` defined on project and on `Startup` class.

With C#, the process of send message is asynchronous and the status of sent messages is delivered to application by **notifications**.

`ISender` interface also enable send **commands** to the server, as the follow sample:

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

The receipt of messages and notifications is done using the interfaces `IMessageReceiver` and `INotificationReceiver` respectively.

Some important notes:

- Before the `ReceiveAsync` method be executed, a notification of `Event.Received` type is automatically sent to originator of message.
- After `ReceiveAsync` method be executed, if no one exception occur, a notification of type `Event.Consumed` is automatically sent to originator of message.
- If some exception occur on `ReceiveAsync` method, a notificação of type `Event.Failed` is automatically sent to originator of message.

The notifcations are *fire-and-forget* and if occur some exception on `ReceiveAsync`, this fail will be ignored.

Note: Remember to register all implementations of `INotificationReceiver` and `IMessageReceiver` on `application.json` file. For more informations check the **Configuring** section.
