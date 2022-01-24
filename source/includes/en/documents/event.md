## Event

Represents Stripe event.

| MIME type                                    |
|----------------------------------------------|
| application/vnd.iris.stripe.event+json       |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| stripeSessionId          | Stripe session Id                              | string                       |
| stripePaymentIntentId    | Stripe PaymentIntent id                        | string                       |
| stripeEventCode          | Stripe event code                              | string                       |
| reasonCode               | Reason Code                                    | string                       |
| reasonDescription        | Reason description                             | string                       |
| messageId                | Internal message Id                            | bool                         |
| json                     | Event Json                                     | object                       |
