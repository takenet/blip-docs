### Payment receipt
| MIME type                            |
|--------------------------------------|
| application/vnd.lime.payment-receipt+json |

Allows send a payment receipt to a customer

#### Example
Sending a payment receipt to a Messenger user:

```http
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.payment-receipt+json",
    "content": {
        "paidOn": "2016-08-26T19:03:37.024Z",
        "code": "215BF6B5-01EF-4F9A-A944-0BC05FD0F228",
        "method": {
                "name": "Credit Card"
        },
        "currency": "BRL",
        "total": 10.85,
        "items": [{
                "quantity": 1.0,
                "unit": 10.85,
                "currency": "BRL",
                "total": 10.85,
                "description": "Item 1"
            }
        ]
    }
}
```

#### Channel mapping

| Channel              | Type                    |  
|--------------------|-------------------------|
| BLiP Chat          | Not supported yet       |
| Messenger          | [Receipt template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/receipt-template)|
| SMS                | Text         |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
