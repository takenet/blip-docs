## Location

> Sending a location with latitude, longitude and altitude:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

//A chatbot can send and receive a location entity. For those cases, use Location type:
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
    var document = new Location
    {
        Latitude = -19.918899,
        Longitude = -43.959275,
        Altitude = 853,
        Text = "Take's place"
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```javascript
    client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.location+json",
      to: "128271320123982@messenger.gw.msging.net",
      content: {
        latitude: -19.918899,
        longitude: -43.959275,
        altitude: 853,
        text: "Take's place"
      }
    });
```

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.location+json",
    "content": {
        "latitude": -19.918899,
        "longitude": -43.959275,
        "altitude": 853,
        "text": "Take's place"
    }
}
```

> Request location

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

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class RequestLocation : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public RequestLocation(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var location = new Input
    {
        Label = new DocumentContainer{
            Value = new PlainText
            {
                Text = "Send your location please!"
            }
        },
        Validation = new InputValidation{
            Rule = InputValidationRule.Type,
            Type = Location.MediaType
        }
    };

await _sender.SendMessageAsync(location, message.From, cancellationToken);
}
}
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
| application/vnd.lime.location+json |

Allows sending and receiving of geographic information.


For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#location) specification.

#### Channel mapping

| Channel              | Type                    |
|--------------------|-------------------------|
| BLiP Chat          | Location             |
| <s>Messenger</s>          | Starting August 15, 2019, updated versions of the Messenger app will no longer render Location quick reply.|
| Whatsapp           | Text with link          |
| SMS                | Text with link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Location](https://core.telegram.org/bots/api#location)|



Asks the user for her location

