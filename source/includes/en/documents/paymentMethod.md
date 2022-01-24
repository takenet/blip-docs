## Payment Method

Represents Stripe payment method.

| MIME type                                              |
|--------------------------------------------------------|
| application/vnd.iris.stripe.payment-method+json        |

| Name                       | Description                                              | Type                           |
|----------------------------|----------------------------------------------------------|--------------------------------|
| id                         | Application internal id                                  | guid(string unique identifier) |
| brand                      | Card’s brand(Visa, mastercard ,etc).                     | string                         |
| country                    | Card’s country                                           | string                         |
| expirationMonth            | Card’s month expiration                                  | string                         |
| expirationYear             | Card’s year expiration                                   | string                         |
| funding                    | Card type(debit, credit)                                 | string                         |
| last4Digits                | Last card’s 4 digits                                     | string                         |
