### Media link
| MIME type                            | C#                                   |
|--------------------------------------|--------------------------------------|
| application/vnd.lime.media-link+json | [Lime.Messaging.Contents.MediaLink](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/MediaLink.cs) |

Allows sending and receiving links for multimedia contents. The link can be any valid **URI**, but most part of the channels support only contents served by **HTTP/HTTPS** protocol. It is possible to include a title and a text, besides image *metadada* such as MIME type, size and *preview*.

> Note: The metadata support varies per channel, it may be ignored if not supported.

Some channel allows the definition of the display *aspect ratio* for some media types. For instance, in *Messenger*, you should set the `1:1` value for the `aspectRatio` property to send squared images.

#### Examples
1 - Sending the link of an image including title, descriptive text and metadata:

```json
{
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "title": "Cat",
        "text": "Here is a cat image for you!",
        "type": "image/jpeg",
        "uri": "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
        "aspectRatio": "1:1",
        "size": 227791,
        "previewUri": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX",
        "previewType": "image/jpeg"
    }
}
```

2 - Sending an audio link:
```json
{
    "id": "2",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "type": "audio/mp3",
        "uri": "http://blaamandagjazzband.dk/jazz/mp3/basin_street_blues.mp3",
        "size": 3124123
    }
}
```

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#media-link) specification.

#### Channel mapping

| Channel              | Type                    | 
|--------------------|-------------------------|
| BLiP Chat          | Media Link         |
| Messenger          | [Attachments](https://developers.facebook.com/docs/messenger-platform/send-api-reference/image-attachment) (image/audio/video/file, depending of MIME type)  |
| SMS                | Text with link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|

