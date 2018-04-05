## Quick Replies

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

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
    jsonDocuments = new JsonDocument();
    jsonDocuments.Add("Key1", "value1");
    jsonDocuments.Add("Key2", "2");

    Document document = new Select
    {
        Scope = SelectScope.Immediate,// (create a quickreply instead menu)
        Text = "Choose an option:",
        Options = new SelectOption[]
        {
            new SelectOption
            {
                Order = 1,
                Text = "First option!",
                Value = new PlainText { Text = "1" }
            },
            new SelectOption
            {
                Order = 2,
                Text = "Second option",
                Value = new PlainText { Text = "2" }
            },
            new SelectOption
            {
                Order = 3,
                Text = "Third option",
                Value = jsonDocuments
            }
        }
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.select+json",
      to: "1042221589186385@messenger.gw.msging.net",
      content: {
        scope:"immediate", // (create a quickreply instead menu)
        text: "Choose an option",
        options: [
            {
                text: "First option"
            },
            {
                order: 2,
                text: "Second option"
            },
            {
                order: 3,
                text: "Third option",
                type: "application/json",
                value: {
                    key1: "value1",
                    key2: 2
                }
            }
        ]
      }
    });
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id":"311F87C0-F938-4FF3-991A-7C5AEF7771A5",
    "to":"1042221589186385@messenger.gw.msging.net",
    "type":"application/vnd.lime.select+json",
    "content":{
        "scope":"immediate",
        "text":"Choose an option",
        "options":[
            {
                "text":"First option"
            },
            {
                "order":2,
                "text":"Second option"
            },
            {
                "order":3,
                "text":"Third option",
                "type":"application/json",
                "value":{
                    "key1":"value1",
                    "key2":2
                }
            }
        ]
    }
}
```



Quick replies provide a way to present a set of up to 11 buttons in-conversation that contain a title and an optional image, and appear prominently above the composer. You can also use quick replies to request a person's location.

You can send quick replies by using [Select](/#select). To switch between menu and quick reply you only need to change the **scope** attribute. Quick replies riquires scope to be **'immediate'**.


| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](images/quickreply_mssgnr.png) | ![imagem](quickReplyBlipChat.png)    |