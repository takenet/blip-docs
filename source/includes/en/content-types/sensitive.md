### Sensitive information

| MIME type                            | C#                                 |
|--------------------------------------|------------------------------------|
| application/vnd.lime.sensitive+json  | [Lime.Messaging.Contents.SensitiveContainer](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/SensitiveContainer.cs) |

Wraps a message content in order to signal that the information is confidential or sensitive. In this case, the server will not store the message content in any moment. The wrapped content can be of any available BLiP type.

**Important note**: This is restricted to the BLiP servers and the external channels (Messenger, Telegram, etc.) still **can store your information** in some way. Pay attention on particular security polices of each channel.

#### Examples
1 - Sending a password using text content for a Messenger user:
```json
{
  "id": "1",
  "to": "1334448251684655@messenger.gw.msging.net",
  "type": "application/vnd.lime.sensitive+json",
  "content": {
    "type": "text/plain",
    "value": "Your password is 123456"
  }
}

```

2 - Sending a weblink:
```json
{
  "id": "2",
  "to": "1334448251684655@messenger.gw.msging.net",
  "type": "application/vnd.lime.sensitive+json",
  "content": {
    "type": "application/vnd.lime.web-link+json",
    "value": {
      "text": "Please follow this link for the checkout",
      "uri": "https://mystore.com/checkout?ID=A8DJS1JFV98AJKS9"
    }
  }
}

```
