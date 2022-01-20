## Payment Intent Confirm Options

Represents Stripe payment intent confirm options.

| MIME type                                                      |
|----------------------------------------------------------------|
| application/vnd.iris.stripe.payment-method-options+json        |

| Name                       | Description                                                                                                            | Type                         |
|----------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------|
| clientSecret               | The client secret of this PaymentIntent                                                                                | guid                         |
| offSession                 | Set to true to indicate that the customer is not in your checkout flow during this payment attempt                     | bool                         |
| paymentMethod              | ID of the payment method (a PaymentMethod, Card, or compatible Source object) to attach to this PaymentIntent          | string                       |
| paymentMethodTypes         | The list of payment method types (e.g. card) that this PaymentIntent is allowed to use                                 | List<string>                 |
| receiptEmail               | Email address that the receipt for the resulting payment will be sent to.                                              | string                       |
| returnUrl                  | The URL to redirect your customer back to after they authenticate or cancel their  payment on the payment              | string                       |
| setupFutureUsage           | Indicates that you intend to make future payments with this PaymentIntent's payment method                             | string                       |
