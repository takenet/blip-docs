## Input

> Requesting a user's name:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class OptionUserInputMessaReceiver : IMessageReceiver
{
    private readonly ISender _sender;

    public OptionUserInputMessaReceiver(ISender sender)
    {
        _sender = sender;
        _settings = settings;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        var document = new Input
        {
            Label = new DocumentContainer{
                Value = new PlainText {
                    Text = "What is your name?"
                }
            },
            Validation = new InputValidation{
                Rule = InputValidationRule.Text
            }
        };

        await _sender.SendMessageAsync(document, message.From, cancellationToken);
    }
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.input+json",
      to: "1042225583186385@messenger.gw.msging.net",
      content: {
          label: {
            type: "text/plain",
            value: "What is your name?"
          },
          validation: {
            rule: "text"
          }
      }
    });
```

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.input+json",
    "content": {
        "label": {
          "type": "text/plain",
          "value": "What is your name?"
        },
        "validation": {
          "rule": "text"
        }
    }
}
```

> Requesting a user's location:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class UserInputLocationReceiver : IMessageReceiver
{
private readonly ISender _sender;

public UserInputLocationReceiver(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new Input
    {
        Label = new DocumentContainer{
            Value = "Send your location please!"
        },
        Validation = new InputValidation{
            Rule = InputValidationRule.Type,
            Type = "application/vnd.lime.location+json"
        }
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.input+json",
      to: "1042225583186385@messenger.gw.msging.net",
      content: {
          label: {
            type: "text/plain",
            value: "Send your location please!"
          },
          validation: {
            rule: "type",
            type: "application/vnd.lime.location+json"
          }
      }
    });
```

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "2",
    "to": "1334448323284655@messenger.gw.msging.net",
    "type": "application/vnd.lime.input+json",
    "content": {
        "label": {
          "type": "text/plain",
          "value": "Send your location please!"
        },
        "validation": {
          "rule": "type",
          "type": "application/vnd.lime.location+json"
        }
    }
}
```

| MIME type                            |
|--------------------------------------|
| application/vnd.lime.input+json      |

Allows sending of structured information requests to the user, where it is possible to define validations rules. This is useful for building question forms and getting specific user information - like name or phone number - or typed information - like an image or location. The execution of validation rules depends of channel's support.

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#input) specification.

#### Channel mapping

| Channel              | Type                         |
|--------------------|--------------------------------|
| BLiP Chat          | User input (for Location type only) |
| Messenger          | [Location](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies) |
| Whatsapp           | Text                   |
| SMS                | Text                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|

