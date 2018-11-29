### Document/Files

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
    var uriLink = new Uri("https://gradcollege.okstate.edu/sites/default/files/PDF_linking.pdf");
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

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.media-link+json",
      to: "128271320123982@messenger.gw.msging.net",
      content: {
        title: "pdf_open_parameters.pdf",
        uri: "https://gradcollege.okstate.edu/sites/default/files/PDF_linking.pdf",
        type: "application/pdf",
        size: 5540
      }
    });
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "title": "pdf_open_parameters.pdf",
        "uri": "https://gradcollege.okstate.edu/sites/default/files/PDF_linking.pdf",
        "type": "application/pdf",
        "size": 5540
    }
}
```

You can send documents like PDF's by uploading them or sharing a URL using the [Media Link](/#media-link) content type.

| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](images/pdf_mssngr.png)  | ![imagem](images/pdfBlipChat.png)          |