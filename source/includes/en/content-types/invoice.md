## Payment Invoice



| MIME type                            |
|--------------------------------------|
| application/vnd.lime.invoice+json |

Allows sending a payment request to a payment channel.

#### Example

Sending a payment request to a Facebook Messenger user using [PagSeguro](./#/docs/payments/pagseguro):


**Note:** Payment invoices are not mapped to channel's cards. The propose of this messages is only to control payment life cycle.