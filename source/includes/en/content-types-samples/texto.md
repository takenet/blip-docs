## Text

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

namespace MessageTypes
{
    public class OptionPlainTextMessageReceiver : IMessageReceiver
    {
        private readonly ISender _sender;

        public OptionPlainTextMessageReceiver(ISender sender)
        {
            _sender = sender;
        }



        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            Document document = new PlainText
            {
                Text = "Welcome to our service! How can I help you?"
            };
            await _sender.SendMessageAsync(document, message.From, cancellationToken);
        }

    }
}
```
```javascript
 client.sendMessage({
        id: Lime.Guid(),
        type: "text/plain",
        to: "128271320123982@messenger.gw.msging.net",
        content: "Welcome to our service! How can I help you?"
        })
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "128271320123982@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Welcome to our service! How can I help you?"
}
```

You can send text by using the [Plain Text](#plain-text) content type

| Messenger                         | BLiPChat                              |
|-----------------------------------|---------------------------------------|
| ![imagem](images/text_mssngr.png) | ![imagem](images/textBlipChat.png)    |