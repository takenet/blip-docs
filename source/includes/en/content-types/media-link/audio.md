### Audio

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
    Document document = new MediaLink
    {
        Type = MediaType.Parse("audio/mp3"),
        Uri = new Uri("http://blaamandagjazzband.dk/jazz/mp3/basin_street_blues.mp3"),
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.media-link+json",
      to: "128271320123982@messenger.gw.msging.net",
      content: {
        type: "audio/mp3",
        uri: "http://blaamandagjazzband.dk/jazz/mp3/basin_street_blues.mp3",
        size: 3124123
      }
    });
```

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "2",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "type": "audio/mp3",
        "uri": "http://blaamandagjazzband.dk/jazz/mp3/basin_street_blues.mp3",
        "size": "3124123"
    }
}
```

You can send sounds by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

<!-- ![imagem](images/audio_mssngr.png) -->

| Messenger                         | BLiPChat                              |
|-----------------------------------|---------------------------------------|
| ![imagem](images/audio_mssngr.png)|![imagem](images/isComing.png)    |
