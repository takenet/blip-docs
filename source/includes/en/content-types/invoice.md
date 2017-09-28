## Payment Invoice

> Example - Sending a payment request to a Facebook Messenger user using [PagSeguro](./#/docs/payments/pagseguro):

```csharp

public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;
    private readonly Settings _settings;

    public PlainTextMessageReceiver(ISender sender, Settings settings)
    {
        _sender = sender;
        _settings = settings;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        var document = new Invoice
        {
            Currency = "BLR",
            DueTo = DateTime.Now.AddDays(1),
            Items =
                new[]
                {
                    new InvoiceItem
                    {
                        Currency = "BRL",
                        Unit = 1,
                        Description = "Some product",
                        Quantity = 1,
                        Total = 1
                    }
                },
            Total = 1
        };

        var toPagseguro = $"{Uri.EscapeDataString(message.From.ToIdentity().ToString())}@pagseguro.gw.msging.net";

        await _sender.SendMessageAsync(document, toPagseguro, cancellationToken);
    }
}
```
```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
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


| MIME type                            |
|--------------------------------------|
| application/vnd.lime.invoice+json |

Allows sending a payment request to a payment channel.


**Note:** Payment invoices are not mapped to channel's cards. The propose of this messages is only to control payment life cycle.