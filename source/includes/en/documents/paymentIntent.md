## Payment Intent

Represents Stripe payment intent.

| MIME type                                              |
|--------------------------------------------------------|
| application/vnd.iris.stripe.payment-intent+json        |

| Name                       | Description                                              | Type                         |
|----------------------------|----------------------------------------------------------|------------------------------|
| id                         | Application internal id                                  | guid                         |
| stripePaymentIntentId      | Stripe PaymentIntent id                                  | string                       |
| stripeCustomerId           | Stripe customer’s id.                                    | string                       |
| status                     | Payment status                                           | string                       |
| stripeCardId               | Stripe Card id.                                          | string                       |
