### Payment Invoice Status
| MIME type                            | C#                                   |
|--------------------------------------|--------------------------------------|
| application/vnd.lime.invoice-status+json | [Lime.Messaging.Contents.InvoiceStatus](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/InvoiceStatus.cs) |

Message received when there are changes in the payment status.

| Status                            | Descrição |
|--------------------------------------|--------------------------------------|
|Cancelled|Payment was cancelled for any of the two parties|
|Completed|Payment done with succes|
|Refunded|A payment was returned to the payer|

#### Example

Receiving a change in a payment status from an [invoice](./#/docs/content-types/invoice) in [PagSeguro](./#/docs/payments/pagseguro):
```json
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