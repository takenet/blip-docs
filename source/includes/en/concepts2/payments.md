## Payments

The Stripe integration allows you to connect Smart Contact to the Stripe payment provider, making it easy to generate payment links (credit card and boleto) or Card On File payment directly in the chatbot flow.

To use it properly is necessary to understand some important concepts:

- **Stripe**:
  - **Session**: Payment through a webpage where the customer can pay by credit card, boleto.
  - **CardOnFile**: A transaction where the customer has authorized Stripe to store the customer’s payment details, in this scenario it's a credit card. The customer then authorizes that same merchant to charge the customer's stored card.
  - **Payment Intent**: As the name implies, it is the payment intention, there are all the information regarding the current transaction, such as amounts, payment method etc.
  - **Customer**:  It is the Stripe identity to store all information of the current buyer, it contains his information like name, email, payment methods. It can be found on [Stripe Dashboard](https://dashboard.stripe.com/customers).
  - **Events**: Both Session and PaymentIntent has attached events, each event represents what happened to payment it can be creation, failure , success and etc, more information about [Stripe events](https://stripe.com/docs/api/events).
- **General**:
  - **Event Notification**: It is a message notification that informs the customer of each payment event(success, fail) on his connected channel. If the channel is Whatsapp it will happen through [message templates](https://developers.facebook.com/docs/whatsapp/api/messages/message-templates) which are automatically created in WABA (WhatsApp Business Account) when activating Stripe integration, following WhatsApp rules.

<aside class="notice">
Note: This extension is still in beta, which means it's not available for everyone yet.
</aside>
