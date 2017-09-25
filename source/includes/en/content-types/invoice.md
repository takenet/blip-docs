### Payment Invoice
| MIME type                            |
|--------------------------------------|
| application/vnd.lime.invoice+json |

Allows sending a payment request to a payment channel.

#### Example

Sending a payment request to a Facebook Messenger user using [PagSeguro](./#/docs/payments/pagseguro):

```json
{
    "id": "1",
    "to": "1042221589186385%40messenger.gw.msging.net@pagseguro.gw.msging.net",
    "type": "application/vnd.lime.invoice+json",
    "content": {
        "created":"2016-08-26T19:03:37.024Z",
        "dueTo":"2016-08-27T19:03:37.024Z",
        "currency":"BRL",
        "total":10.85,
        "items":[
            {
                "quantity":1.0,
                "unit":10.85,
                "currency":"BRL",
                "total":10.85,
                "description":"Subscription for product: Hit"
            }
        ]
    }
}
```
**Note:** Payment invoices are not mapped to channel's cards. The propose of this messages is only to control payment life cycle.