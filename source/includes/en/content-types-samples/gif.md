## Gif

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
    var imageUri = new Uri("http://i.giphy.com/14aUO0Mf7dWDXW.gif");

    Document document = new MediaLink
    {
        Type = "image/gif",
        Uri = imageUri
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

You can send gifs by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](images/gif_mssngr.png) | ![imagem](images/gifBlipChat.png)           |