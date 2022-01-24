## Payment Method

Represents Stripe payment method.

| MIME type                                              |
|--------------------------------------------------------|
| application/vnd.iris.stripe.payment-method+json        |

| Name                       | Description                        | Type                           |
|----------------------------|------------------------------------|--------------------------------|
| id                         | Application internal id            | guid(string unique identifier) |
| brand                      | Card brand(Visa, mastercard ,etc). | string                         |
| country                    | Card country                       | string                         |
| expirationMonth            | Card month expiration              | string                         |
| expirationYear             | Card year expiration               | string                         |
| funding                    | Card type(debit, credit)           | string                         |
| last4Digits                | Last card 4 digits                 | string                         |
