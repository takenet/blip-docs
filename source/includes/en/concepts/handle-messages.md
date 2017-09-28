### Sending messages

<blockquote class="lang-specific csharp">
<p>In order to send messages and notifications use an instance of `ISender` (on C#), wich is automaticaly injected on constructors of registered `receivers` defined on project and on `Startup` class.</p>
</blockquote>

```csharp
//reply a received message sample
public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;
    private readonly Settings _settings;

    public PlainTextMessageReceiver(ISender sender, Settings settings)
    {
        _sender = sender;
        _settings = settings;
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
<blockquote class="lang-specific javascript">
<p>It's possible send notifications and messages only after sessions has been stablished.</p>
</blockquote>

```javascript
//send a message after connection has been stablished sample
client.connect()
    .then(function(session) {
        // After connection is possible send messages
        var msg = { type: 'text/plain', content: 'Hello, world', to: '553199990000@0mn.io' };
        client.sendMessage(msg);
    });
```

<blockquote class="lang-specific http">
<p>For this sample bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ is a valid Key for blipmessaginghubapp chatbot.</p>
</blockquote>

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

The process of sending message is asynchronous and the status of sent messages is delivered to application by **notifications**.

For more information about messages, check the Messages documentation page or the supported content types specification.

REQUEST

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the message   |
| from   | Originator’s address   |
| to     | Recipient’s address  |
| type   | Statement with content type, in the MIME format |
| content  | Message content   |

### Receiving messages

<blockquote class="lang-specific csharp">
<p>The receipt of messages is done using the interface IMessageReceiver.</p>
</blockquote>

```csharp
//A `IMessageReceiver` can be defined as follow
public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;
    private readonly Settings _settings;

    public PlainTextMessageReceiver(ISender sender, Settings settings)
    {
        _sender = sender;
        _settings = settings;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        // Write the received message to the console
        Console.WriteLine(message.Content.ToString());
    }

}
```
<blockquote class="lang-specific javascript">
<p>All messages sent to the chatbot are redirected to registered receivers of messages. You also can define filters to each receiver.</p>
</blockquote>

```javascript
//add simple message receiver example
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
<blockquote class="lang-specific http">
<p>All messages will be delivered as a HTTP POST request on configured chatbot messages URL. A sample of received message is presented bellow.</p>
</blockquote>

```http
POST https://your.endpoint/messages HTTP/1.1
Content-Type: application/json

{
  "id": "99cf454e-f25d-4ebd-831f-e48a1c612cd4",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net",
  "type": "text/plain",
  "content": "Help"
}
```

The process of receiving messages is asynchronous. The received messages will be on the format defined on [LIME Protocol](http://limeprotocol.org/index.html#message).


