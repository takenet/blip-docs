## Sensitive information

> Sending a password using text content for a Messenger user:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class OptionSensitiveMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;

    public OptionSensitiveMessageReceiver(ISender sender)
    {
        _sender = sender;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {

        var document = new SensitiveContainer
        {
            Value = "Your password is 123456"
        };

        await _sender.SendMessageAsync(document, message.From, cancellationToken);
    }
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.sensitive+json",
      to: "1042225583186385@messenger.gw.msging.net",
      content: {
        type: "text/plain",
        value: "Your password is 123456"
      }
    });
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "1",
  "to": "1334448251684655@messenger.gw.msging.net",
  "type": "application/vnd.lime.sensitive+json",
  "content": {
    "type": "text/plain",
    "value": "Your password is 123456"
  }
}

```

> Sending a weblink:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class SensitiveWeblinkMessage : IMessageReceiver
{
    private readonly ISender _sender;

    public SensitiveWeblinkMessage(ISender sender)
    {
        _sender = sender;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        var url = new Uri("https://mystore.com/checkout?ID=A8DJS1JFV98AJKS9");
        var document = new SensitiveContainer
        {
            Value = new WebLink
            {
                Text = "Please follow this link for the checkout",
                Uri = url
            }
        };

        await _sender.SendMessageAsync(document, message.From, cancellationToken);
    }
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.sensitive+json",
      to: "1042225583186385@messenger.gw.msging.net",
      content: {
        type: "application/vnd.lime.web-link+json",
        value: {
          text: "Please follow this link for the checkout",
          uri: "https://mystore.com/checkout?ID=A8DJS1JFV98AJKS9"
        }
      }
    });
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "2",
  "to": "1334448251684655@messenger.gw.msging.net",
  "type": "application/vnd.lime.sensitive+json",
  "content": {
    "type": "application/vnd.lime.web-link+json",
    "value": {
      "text": "Please follow this link for the checkout",
      "uri": "https://mystore.com/checkout?ID=A8DJS1JFV98AJKS9"
    }
  }
}

```


| MIME type                            |
|--------------------------------------|
| application/vnd.lime.sensitive+json  |

Wraps a message content in order to signal that the information is confidential or sensitive. In this case, the server will not store the message content in any moment. The wrapped content can be of any available BLiP type.

**Important note**: This is restricted to the BLiP servers and the external channels (Messenger, Telegram, etc.) still **can store your information** in some way. Pay attention on particular security polices of each channel.
