## Web link

> Sending a message to a Messenger recipient:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;
//To send a web page link use the WebLink type:
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
    var url = new Uri("http://limeprotocol.org/content-types.html#web-link");
    var previewUri =
        new Uri("techbeacon.scdn7.secure.raxcdn.com/sites/default/files/styles/article_hero_image/public/documents-stack-documentation-agile-devops.jpg?itok=cFDq9Y95");

    var document = new WebLink
    {
        Text = "Here is a documentation weblink",
+       Target = WebLinkTarget.Self,
        PreviewUri = previewUri,
        Uri = url
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}

}
```

```javascript
client.sendMessage({s
      id: Lime.Guid(),
      type: "application/vnd.lime.web-link+json",
      to: "1042225583186385@messenger.gw.msging.net",
      content: {
        uri: "http://limeprotocol.org/content-types.html#web-link",
        target: "self",
        text: "Here is a documentation weblink"
      }
    });
```

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042225583186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.web-link+json",
    "content": {
        "uri": "http://limeprotocol.org/content-types.html#web-link",
        "target": "self",
        "text": "Here is a documentation weblink"
    }
}
```


| MIME type                |
|--------------------------|
| application/vnd.lime.web-link+json|

Allows sending of a link for a webpage to the client including metadata, such as link's title, description and a miniature image.



#### Sending a message to a Messenger recipient:

In some channels, it is possible to define how the webpage will be displayed (on the same window, openning a new window or occupying part of the device window) through the `target` property. For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#web-link) specification.

#### Channel mapping

| Channel            | Type                    |
|--------------------|-------------------------|
| Blip Chat          | Web Link                |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template) or [Button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/buttons) (if used with the [Multimedia Menu](https://blip.ai/portal/#/docs/content-types/document-select)). |
| Whatsapp           | Media Link          |
| SMS                | Text with link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|


It is also possible in some channels to use special [URI schemes](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) to create links with specific behaviors as below:

| Channel     | URI Scheme | Description                                                           | Example              |
|-----------|------------|---------------------------------------------------------------------|----------------------|
| Messenger | `tel`      | Defines a link for the telephone call to the specific number. Mapped to a [Call button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/call-button). | `tel:+5531999990000` |
| Messenger | `share`    | Defines a link to share current message. Mapped to a [Share button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/share-button).  | `share:`             |

- On Messenger, these **URI schemes** are valid only if used within a [Multimedia Menu](https://blip.ai/portal/#/docs/content-types/document-select).
- To enable the use of [Messenger extensions](https://developers.facebook.com/docs/messenger-platform/messenger-extension) on link's webpage, you must add to the URL *query string* a `messengerExtensions` parameter with value `true`. For the example above, the `uri` value would be: `http://limeprotocol.org/content-types.html#web-link?messengerExtensions=true`


