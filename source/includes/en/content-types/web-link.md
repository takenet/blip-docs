## Web link

```http
POST /commands HTTP/1.1
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

Allows sending a link for a webpage to the client including metadata such link's title, description and a miniature image. 

#### Sending a message to a Messenger recipient:



In some channels is possible to define how the webpage will be diplayed (on the same window, openning a new window or occuping part of device window) through the `target` property. For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#web-link) specification.

#### Channel mapping

| Channel            | Type                    | 
|--------------------|-------------------------|
| BLiP Chat          | Web Link                |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template) or [Button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/buttons) (if used with the [Multimedia Menu](https://blip.ai/portal/#/docs/content-types/document-select)). |
| SMS                | Text with link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|


It is also possible in some channels to use special [URI schemes](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) to create links with specific behaviors as bellow:

| Channel     | URI Scheme | Description                                                           | Example              |
|-----------|------------|---------------------------------------------------------------------|----------------------|
| Messenger | `tel`      | Defines a link for the telephone call to the specific number. Mapped to a [Call button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/call-button). | `tel:+5531999990000` |
| Messenger | `share`    | Defines a link to share current message. Mapped to a [Share button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/share-button).  | `share:`             |

- On Messenger, these **URI schemes** are valid only if used within a [Multimedia Menu](https://blip.ai/portal/#/docs/content-types/document-select).
- To enable the use of [Messenger extensions](https://developers.facebook.com/docs/messenger-platform/messenger-extension) on link webpage, you must add to the URL *query string* a `messengerExtensions` parameter with value `true`. For the example above, the `uri` value would be: `http://limeprotocol.org/content-types.html#web-link?messengerExtensions=true`


