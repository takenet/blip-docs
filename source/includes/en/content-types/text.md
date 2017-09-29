## Text
| MIME type                |
|--------------------------|
| text/plain               |

Allows sending and receiving simple text messages.

> Sending a message to a Messenger recipient:

```csharp
//The sample follow show how to reply a received message with a simple text message.
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
        var document = new PlainText {Text = "... Inspiration, and a cup of coffe! It's enough!"};
        await _sender.SendMessageAsync(document, message.From, cancellationToken);
    }
    //Limitations:Facebook Messenger: Max size of 320 characters. If your chatbot send messages 
    //with more than 320 characters, on this channel, your message will not be delivered.

}
```

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
    "id": "1",
    "to": "128271320123982@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Welcome to our service! How can I help you?"
}
```

For more details, check the especification of [LIME protocol](http://limeprotocol.org/content-types.html#text).

#### Channel mapping

| Channel              | Type                    | 
|----------------------|-------------------------|
| BLiP Chat            | Text                   |
| Messenger            | [Text message](https://developers.facebook.com/docs/messenger-platform/send-api-reference/text-message)|
| SMS                  | Text                   |
| Skype                | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram             | [Message](https://core.telegram.org/bots/api#message)|

