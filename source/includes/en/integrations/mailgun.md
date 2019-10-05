## E-mail
| FQDN                     | Identifier type                                         | 
|--------------------------|---------------------------------------------------------------|
| @mailgun.gw.msging.net   | E-mail address on [URL encoded](http://www.w3schools.com/tags/ref_urlencode.asp) format  |

**E-mail** channel allows sending and receiving messages through e-mail messages. Each chatbot has an unique address automatically created by the platform. 

### Send e-mail

Sending an e-mail is a common task for anyone developing a bot. Alerts or confirmation of information are some of the common scenarios for this demand. BLiP abstracts the whole process of sending and receiving e-mails to your bot.

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| to     | **{{e-mail}}@mailgun.gw.msging.net**  |
| type   | **text/plain** |
| content | **{{message}}** |

<aside class="notice">
Note: Remember to replace the variable {{e-mail}} for the email you want to send a message (for instance: <b> xpto%40xpto.com</b>). Since every LIME node has the @ character, it is required to sign @ the email by its corresponding ASCII code (%40). You must also define message you want to send the user, replacing the {{message}} variable according to the LIME protocol (for instance: <b>Welcome to our service! How can I help you?</b>).
</aside>

```javascript
client.sendMessage({
    id: Lime.Guid(),
    type: "text/plain",
    to: "xpto%40xpto.com@mailgun.gw.msging.net",
    content: "Welcome to our service! How can I help you?"
});
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "1294447a-2581-4597-be6a-a5dff33af157",
  "to": "xpto%40xpto.com@mailgun.gw.msging.net",
  "type": "text/plain",
  "content": "Hello, how can I help you?"
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

//Replying a received message with a simple text message.
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
        var document = new PlainText {Text = "Welcome to our service! How can I help you?"};
        await _sender.SendMessageAsync(document, Node.Parse("xpto%40xpto.com@mailgun.gw.msging.net"), cancellationToken);
    }
}
```
