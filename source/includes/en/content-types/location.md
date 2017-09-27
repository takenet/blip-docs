## Location
| MIME type                            |
|--------------------------------------|
| application/vnd.lime.location+json | 

Allows sending and receiving geographic information.

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
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
#### Example

Sending a location with latitude, longitude and altitude:

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#location) specification.

#### Channel mapping

| Channel              | Type                    |  
|--------------------|-------------------------|
| BLiP Chat          | Location             |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template)|
| SMS                | Text with link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Location](https://core.telegram.org/bots/api#location)|

###Request location

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
    "id": "2",
    "to": "1334448323284655@messenger.gw.msging.net",
    "type": "application/vnd.lime.input+json",
    "content": {
        "label": {
          "type": "text/plain",
          "value": "Send your location please!"
        },
        "validation": {
          "rule": "type",
          "type": "application/vnd.lime.location+json"
        }
    }
}
```

Asks the user for location

