### Location
| MIME type                            | C#                                   |
|--------------------------------------|--------------------------------------|
| application/vnd.lime.location+json | [Lime.Messaging.Contents.Location](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/Location.cs) |

Allows sending and receiving geographic information.

#### Example

Sending a location with latitude, longitude and altitude:
```http
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.location+json",
    "content": {
        "latitude": -19.918899,
        "longitude": -43.959275,
        "altitude": 853,
        "text": "Take's place"
    }
}
```

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#location) specification.

#### Channel mapping

| Channel              | Type                    |  
|--------------------|-------------------------|
| BLiP Chat          | Location             |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template)|
| SMS                | Text with link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Location](https://core.telegram.org/bots/api#location)|

