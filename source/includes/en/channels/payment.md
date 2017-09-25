---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - ruby
  - python
  - javascript

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

## PagSeguro (Payments)

| FQDN                     | Identifier type                  | 
|--------------------------|----------------------------------------|
| @pagseguro.gw.msging.net | Identity ([name and original channel domain]|(./#/docs/concepts/addressing)) on [URL encoded] format
(http://www.w3schools.com/tags/ref_urlencode.asp) |                           |


**PagSeguro** is the [UOL's payments channel](https://pagseguro.uol.com.br/) to receive and send payments with flexibility and safety.

### Payment Request

```http
/*Payment Request Example*/
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

Example of how to send a payment request to Facebook Messenger user using [PagSeguro](./#/docs/payments/pagseguro).

###Payment Status

```http
/*Payment Status Example*/
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

When there is payment status change (for example: user has payed), a [payment status](./#/docs/content-types/invoice-status) message will be sent to the chatbot, the message identifier will be the same as the original payment request’s.

