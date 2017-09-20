### Multimedia menu
| MIME type                                 | C#                                        |
|-------------------------------------------|-------------------------------------------|
| application/vnd.lime.document-select+json | [Lime.Messaging.Contents.DocumentSelect](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/DocumentSelect.cs) |

Allows sending an options menu to customers where the header and options can be of any content type such as **media link** or **web link** and not only **text** - like in the *Select* type. For each option, it is possible to define a document that is delivered to the contact when the customer performs a choice (depending on the channel support).

#### Examples

1 - Menu with image in the header and a link and text as options:
```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.document-select+json",
    "content": {
        "header": {
            "type": "application/vnd.lime.media-link+json",
            "value": {
                "title": "Welcome to mad hatter",
                "text": "Here we have the best hats for your head.",
                "type": "image/jpeg",
                "uri": "http://petersapparel.parseapp.com/img/item100-thumb.png",
                "aspectRatio": "1:1"
            }
        },
        "options": [
            {
                "label": {
                    "type": "application/vnd.lime.web-link+json",
                    "value": {
                        "text": "Go to our site",
                        "uri": "https://petersapparel.parseapp.com/view_item?item_id=100"
                    }
                }
            },
            {
                "label": {
                    "type": "text/plain",
                    "value": "Show stock"
                },
                "value": {
                    "type": "application/json",
                    "value": {
                        "action": "show-items"
                    }
                }
            }
        ]
    }
}
```

2 - Getting the location of a Messenger user:
```json
{
    "id": "2",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.document-select+json",
    "content": {
        "scope": "immediate",
        "header": {
            "type": "text/plain",
            "value": "Please, share your location"
        },
        "options": [
            {
                "label": {
                    "type": "application/vnd.lime.input+json",
                    "value": {                      
                        "validation": {
                          "rule": "type",
                          "type": "application/vnd.lime.location+json"
                        } 
                    }
                }
            }
        ]
    }
}
```

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#document-select) specification.

#### Channel mapping

| Channel            | Type                    | 
|--------------------|-------------------------|
| BLiP Chat          | Document select         |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template)|
| SMS                | Text                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
