## Audio

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

You can send sounds by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

<!-- ![imagem](images/audio_mssngr.png) -->

| Messenger                         | BLiPChat                              |
|-----------------------------------|---------------------------------------|
| ![imagem](images/audio_mssngr.png)|![imagem](images/audio_ms2sngr.png)    |