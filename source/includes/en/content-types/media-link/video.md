### Video

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
        Type = MediaType.Parse("video/mp4"),
        Uri = new Uri("http://techslides.com/demos/sample-videos/small.mp4"),
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
        type: "video/mp4",
        uri: "http://techslides.com/demos/sample-videos/small.mp4"
      }
    });
```

```python
client.send_message(
    Message.from_json(
        {
            'id': '1',
            'to': '553199991111@0mn.io',
            'type': 'application/vnd.lime.media-link+json',
            'content': {
                'uri': 'http://techslides.com/demos/sample-videos/small.mp4',
                'type': 'video/mp4'
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
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "uri": "http://techslides.com/demos/sample-videos/small.mp4",
        "type": "video/mp4"
    }
}
```


You can send videos by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

| Messenger                        | BLiPChat                            |
|----------------------------------|-------------------------------------|
| ![imagem](images/mp4_mssngr.png) | ![imagem](images/isComingVideo.png) |