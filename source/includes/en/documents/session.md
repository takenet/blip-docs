## Session

Represents Stripe session.

| MIME type                                              |
|--------------------------------------------------------|
| application/vnd.iris.stripe.session+json               |

| Name                       | Description                                              | Type                         |
|----------------------------|----------------------------------------------------------|------------------------------|
| id                         | Application internal id                                  | guid                         |
| stripeSessionId            | Stripe session id                                        | string                       |
| method                     | Payment method selected by customer.                     | string                       |
| url                        | Webpage url                                              | string                       |
| status                     | Payment status                                           | string                       |
| expirationDate             | Webpage expiration date                                  | dateTimeOffSet               |
| paymentIntentId            | Application payment intent internal id                   | guid                         |
| stripePaymentIntentId      | Stripe PaymentIntent id                                  | string                       |
