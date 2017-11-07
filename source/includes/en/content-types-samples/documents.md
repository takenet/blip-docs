## Document/Files

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
    var uriLink = new Uri("https://drive.google.com/file/d/0B7_PWxDmTZcNWFhQWXZnT2s2U1E/view?usp=sharing");
    var mediaTypeLink = new MediaType(MediaType.DiscreteTypes.Application, "pdf");
    var title = "pdf_open_parameters.pdf";

    Document document = new MediaLink
    {
        Title = title,
        Uri = uriLink,
        Type = mediaTypeLink,
        Size = 5540,
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

You can send documents like PDF's by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](images/pdf_mssngr.png)  | ![imagem](images/pdfBlipChat.png)          |