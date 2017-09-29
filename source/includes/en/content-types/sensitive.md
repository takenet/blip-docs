## Sensitive information

> Sending a password using text content for a Messenger user:

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
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

> Sending a weblink:

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
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


| MIME type                            |
|--------------------------------------|
| application/vnd.lime.sensitive+json  |

Wraps a message content in order to signal that the information is confidential or sensitive. In this case, the server will not store the message content in any moment. The wrapped content can be of any available BLiP type.

**Important note**: This is restricted to the BLiP servers and the external channels (Messenger, Telegram, etc.) still **can store your information** in some way. Pay attention on particular security polices of each channel.
