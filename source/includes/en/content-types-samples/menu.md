## Menu

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

The persistent menu can be set for your bot to help people discover and more easily access your functionality throughout the conversation.

You can send menu by using [Select](/#select) as well as quick replies

| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](images/menu_mssngr.png) | ![imagem](images/selectBlipChat.png)       |