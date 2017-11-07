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
        Text = "Choice an option:",
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

The persistent menu can be set for your bot to help people discover and more easily access your functionality throughout the conversation.

You can send menu by using [Select](/#select)

| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](images/menu_mssngr.png) | ![imagem](images/selectBlipChat.png)       |