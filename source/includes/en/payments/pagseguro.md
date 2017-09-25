### PagSeguro
| FQDN                     | Tipo de identificador                                         | 
|--------------------------|---------------------------------------------------------------|
| @pagseguro.gw.msging.net | Identidade ([nome e domínio do canal original](./#/docs/concepts/addressing)) no formato [URL encoded](http://www.w3schools.com/tags/ref_urlencode.asp) | 

**PagSeguro** channel is [UOL's](https://pagseguro.uol.com.br/) payment channel to receive and send payments with flexibility and security. 

The order recipient’s address shall be the recipient’s identifier.

#### Delegation

In order to provide permissions requested by extension, it is necessary to send a delegation command:

```http
{  
  "id": "1",
  "method": "set",
  "type": "application/vnd.lime.delegation+json",
  "uri": "/delegations",
  "resource": {  
    "target": "postmaster@pagseguro.gw.msging.net",
    "envelopeTypes": [  
      "message"
    ]
  }
}
```
Answer on success case:

```http
{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

#### Example

Sending a payment request to a Facebook Messenger user, with [PagSeguro](./#/docs/payments/pagseguro):

```http
{
    "id": "2",
    "to": "1042221589186385%40messenger.gw.msging.net@pagseguro.gw.msging.net",
    "type": "application/vnd.lime.invoice+json",
    "content": {
        "created": "2016-08-26T19:03:37.024Z",
        "dueTo": "2016-08-27T19:03:37.024Z",
        "currency": "BRL",
        "total": 10.85,
        "items": [{
                "quantity": 1.0,
                "unit": 10.85,
                "currency": "BRL",
                "total" :10.85,
                "description": "Item 1"
            }
        ]
    }
}
```

PagSeguro will generate a transaction which will be automatically sent to user `1042221589186385@messenger.gw.msging.net` as a [web link](./#/docs/content-types/web-link), the message identifier will be the same as the payment request’s. 

```http
{
    "id": "2",
    "to": "1042221589186385@messenger.gw.msging.net",
    "pp": "postmaster@pagseguro.gw.msging.net",
    "type": "application/vnd.lime.web-link+json",
    "content": { 
        "uri": "https://pagseguro.uol.com.br/pagamento",
        "text": "Your payment link"
    }
}
```

When there is payment status change (for example: user has payed), a [payment status](./#/docs/content-types/invoice-status) message will be sent to the chatbot, the message identifier will be the same as the original payment request’s.

```http
{
    "id": "2",
    "from": "1042221589186385%40messenger.gw.msging.net@pagseguro.gw.msging.net",
    "to": "contact@msging.net/default",
    "pp": "postmaster@pagseguro.gw.msging.net",
    "type": "application/vnd.lime.invoice-status+json",
    "content": {
        "status": "completed",
        "date": "2016-08-26T19:31:31.000Z",
        "code": "215BF6B5-01EF-4F9A-A944-0BC05FD0F228"
    }
}
```

After receiving the payment, the chatbot may optionally send a [payment receipt](./#/docs/content-types/payment-receipt) to customer. 

```http
{
    "id": "3",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.payment-receipt+json",
    "content": {
        "paidOn": "2016-08-26T19:03:37.024Z",
        "code": "215BF6B5-01EF-4F9A-A944-0BC05FD0F228",
        "currency": "BRL",
        "method": {
                "name": "PagSeguro"
        },
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
