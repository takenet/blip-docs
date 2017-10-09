## Payment Invoice Status
| MIME type                            |
|--------------------------------------|
| application/vnd.lime.invoice-status+json |

Message received when there are changes in the payment status.

| Status                            | Descrição |
|--------------------------------------|--------------------------------------|
|Cancelled|Payment was cancelled for any of the two parties|
|Completed|Payment done with succes|
|Refunded|A payment was returned to the payer|

#### Example

Receiving a change in a payment status from an [invoice](./#/docs/content-types/invoice) in [PagSeguro](./#/docs/payments/pagseguro):
```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "from": "1042221589186385%40messenger.gw.msging.net@pagseguro.gw.msging.net",
    "pp": "postmaster@pagseguro.gw.msging.net",
    "type": "application/vnd.lime.invoice-status+json",
    "content": {
        "status": "completed",
        "date": "2016-08-26T19:31:31.000Z",
        "code": "215BF6B5-01EF-4F9A-A944-0BC05FD0F228"
    }
}
```

**Note:** Payment invoices status are not mapped to channel's cards. The propose of this messages is only to control payment life cycle.