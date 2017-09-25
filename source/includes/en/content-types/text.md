### Text
| MIME type                |
|--------------------------|
| text/plain               |

Allows sending and receiving simple text messages.

#### Example

Sending a message to a Messenger recipient:

```http
{
    "id": "1",
    "to": "128271320123982@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Welcome to our service! How can I help you?"
}
```

For more details, check the especification of [LIME protocol](http://limeprotocol.org/content-types.html#text).

#### Channel mapping

| Channel              | Type                    | 
|----------------------|-------------------------|
| BLiP Chat            | Text                   |
| Messenger            | [Text message](https://developers.facebook.com/docs/messenger-platform/send-api-reference/text-message)|
| SMS                  | Text                   |
| Skype                | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram             | [Message](https://core.telegram.org/bots/api#message)|

