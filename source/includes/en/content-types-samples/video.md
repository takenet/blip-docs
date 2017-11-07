## Video

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

You can send videos by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

| Messenger                         | BLiPChat                              |
|-----------------------------------|---------------------------------------|
|![imagem](images/mp4_mssngr.png)   |![imagem](images/audio_ms2sngr.png)    |