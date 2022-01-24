## Payment Intent Confirm

Represents Stripe payment intent confirm.

| MIME type                                               |
|---------------------------------------------------------|
| application/vnd.iris.stripe.payment-intent-confirm+json |

| Name                       | Description                                              | Type                         |
|----------------------------|----------------------------------------------------------|------------------------------|
| paymentIntentId            | Stripe PaymentIntent id                                  | string                       |
| customerId                 | Stripe customer’s id.                                    | string                       |
| status                     | Payment status                                           | string                       |
| options                    | Payment intent confirmation options.                     | PaymentIntentConfirmOptions  |
