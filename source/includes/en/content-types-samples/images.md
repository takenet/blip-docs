## Images

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
    var imageUri = new Uri("http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg", UriKind.Absolute);
    var previewUri = new Uri("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX", UriKind.Absolute);

    Document document = new MediaLink
    {
        Title = "Cat",
        Text = "Here is a cat image for you!",
        Type = MediaType.Parse("image/jpeg"),
        AspectRatio = "1:1",
        Size = 227791,
        Uri = imageUri,
        PreviewUri = previewUri
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

You can send images by uploading them or sharing a URL using the [Media Link](/#media-link) content type. Supported formats are jpg, png and gif.

| Messenger                         | BLiPChat                                   |
|-----------------------------------|--------------------------------------------|
| ![imagem](img_mssngr.png) | ![imagem](imageBlipChat.png)                       |
