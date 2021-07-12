### Request Location

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

namespace MessageTypes
{
    public class OptionUserInputMessageReceiver : IMessageReceiver
    {
        private readonly ISender _sender;

        public OptionUserInputMessageReceiver(ISender sender)
        {
            _sender = sender;
        }
        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            Document document = new Input
            {
                Label = new DocumentContainer
                {
                    Value = "Send your location please!"
                },
                Validation = new InputValidation
                {
                    Rule = InputValidationRule.Type,
                    Type = "application/vnd.lime.location+json"
                }
            };

            await _sender.SendMessageAsync(document, message.From, cancellationToken);
        }
    }
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.input+json",
      to: "128271320123982@messenger.gw.msging.net",
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

```python
client.send_message(
  Message.from_json(
    {
      'id': '1',
      'type': 'application/vnd.lime.input+json',
      'to': '128271320123982@messenger.gw.msging.net',
      'content': {
        'label': {
          'type': 'text/plain',
          'value': 'Send your location please!'
        },
        'validation': {
          'rule': 'type',
          'type': 'application/vnd.lime.location+json'
        }
      }
    }
  )
)
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


You can send a location request by using [input](/#user-input) content-type

Sending a location request:

| Messenger                                   | BLiPChat                             |
|---------------------------------------------|--------------------------------------|
| ![imagem](images/input_location_mssngr.png) | ![imagem](inputLocationBlipCHat.png) |


