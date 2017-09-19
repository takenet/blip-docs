### Status do Pagamento
| MIME type                            | C#                                   |
|--------------------------------------|--------------------------------------|
| application/vnd.lime.invoice-status+json | [Lime.Messaging.Contents.InvoiceStatus](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/InvoiceStatus.cs) |

Mensagem recebida quando houver alterações no status do pagamento. 

| Status                            | Descrição |
|--------------------------------------|--------------------------------------|
|Cancelled|O pagamento foi cancelado por qualquer uma das partes|
|Completed|O pagamento foi realizado|
|Refunded|Um pagamento realizado foi estornado para o pagador|

#### Exemplo
Recebendo uma alteração no status do pagamento de uma [solicitação](./#/docs/content-types/invoice) no [PagSeguro](./#/docs/payments/pagseguro):

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