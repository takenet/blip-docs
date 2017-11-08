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

```javascript
client.sendMessage({
      id: Lime.Guid(),
      to: "128271320123982@messenger.gw.msging.net",
      type: "application/vnd.lime.media-link+json",
      content: {
        type: "image/gif",
        uri: "http://i.giphy.com/14aUO0Mf7dWDXW.gif"
      }
    });
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "uri": "http://i.giphy.com/14aUO0Mf7dWDXW.gif",
        "type": "image/gif"
    }
}
```



You can send gifs by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](images/gif_mssngr.png) | ![imagem](images/gifBlipChat.png)           |