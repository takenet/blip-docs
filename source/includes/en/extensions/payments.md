
## Payments (Stripe)

The **Stripe** extension allows chatbots to perform payments through a webpage or a direct payment using CardOnFile method.

To use any feature of stripe extension, send a command with the following properties:

| Name     | Description                                                     |
|----------|-----------------------------------------------------------------|
| id       | Unique identifier of the command.                               |
| method   | The command verb.                                               |
| to       | **postmaster@stripe.msging.net**                                |

**API Resources**

| URI                                                 | Method   | Description                                    |
|-----------------------------------------------------|----------|------------------------------------------------|
| `/payment/{contactIdentity}/session`                | `set`    | Create a session                               |
| `/payment/{contactIdentity}/payment-intent`         | `set`    | Create payment intent.(Card On file)           |
| `/payment/{contactIdentity}/confirm-payment-intent` | `set`    | Confirm current payment intent.                |
| `/payment-methods`                                  | `set`    | Get all payment methods from Stripe custumerId.|
| `/payment/{contactIdentity}/payment-intent-history` | `get`    | Get all payment intents for this contact.      |
| `/payment/{contactIdentity}/session-history`        | `get`    | Get all sessions for this contact.             |
| `/payment-intents/{stripePaymentIntentId}/events`   | `set`    | Get events for this payment intent.            |
| `/sessions/{sessionId}/events`                      | `get`    | Get events for this session.                   |

The resource types are:

| Name                           | MIME Type                                                           | Description                                                             |
|--------------------------------|---------------------------------------------------------------------|-------------------------------------------------------------------------|
| Event                          | `application/vnd.iris.stripe.event+json`                            | Events from stripe.                                                     |
| PaymentIntent                  | `application/vnd.iris.stripe.payment-intent+json`                   | Payment intent.                                                         |
| Session                        | `application/vnd.iris.stripe.session+json`                          | Webpage session.                                                        |
| PaymentMethod                  | `application/vnd.iris.stripe.payment-method+json`                   | Payment methods from customer.                                          |
| PaymentIntentConfirm           | `application/vnd.iris.stripe.payment-intent-confirm+json`           | Payment intention confirmation.                                         |
| PaymentIntentConfirmOptions    | `application/vnd.iris.stripe.payment-intent-confirm-options+json`   | Payment intention confirm options.                                      |


### Create a session

Create a payment webpage, it returns a stripe session document with payment webpage and informations of the current payment, the request below is a simple request, all parameters that can be passed to customize the payment can be found here: [Stripe Session](https://stripe.com/docs/api/checkout/sessions/create). Once payment is completed, the stripeCustomerId will be saved on contact extras.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@stripe.msging.net",
    "method": "set",
    "uri": "/payment/{contactIdentity}/session",
    "type": "application/json",
    "resource": {
    "paymentMethodTypes": [
        "card",
        "boleto"
    ],
    "lineItems": [
    {
        "amount": 50000,
        "currency": "brl",
        "description": "Curso do Blip - Fornecido pela Take Blip",
        "images": [           
            "https://www.take.net/files/themes/blank_theme/assets/img/take-og-image.png"
        ],
        "name": "Curso do Blip - Módulo de Pagamentos",
        "quantity": 1
    }],
        "successUrl": "https://www.take.net",
        "cancelUrl": "https://www.take.net"
    }
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{    
    "type": "application/json",
    "resource": {
      "stripeSessionId": "cs_test_a1M9Har8jWkzEvmcvlT9ljgne3mro5x4iP7ULn646U4sQ3WEfJ4CkZImdw",
      "method": "card,boleto",
      "url": "https://checkout.stripe.com/pay/cs_test_a1M9Har8jWkzEvmcvlT9ljgne3mro5x4iP7ULn646U4sQ3WEfJ4CkZImdw#fidkdWxOYHwnPyd1blpxYHZxWjA0TFNsVGNEVVwwb39uQzA0R1VObDFhcG19RENAN3Q9d3x8dkJXfG1HNnNjc2doR0FLX3NRTjJTVUlpNEI1SmA0MWJhMEdIX21NNU1JRHFidm5KfEtJYT1sNTVBZGZzNGNDTicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
      "status": "unpaid",
      "expirationDate": "2022-01-12T14:15:09.000Z",
      "paymentIntent": {
        "stripePaymentIntentId": "pi_3KGl7xAPY5jzkF512ROLuN6o",
        "stripeCustomerId": null,
        "status": "created",
        "stripeCardId": null,
        "id": 123
      },
      "id": 45
    },
    "method": "set",
    "status": "success",
    "id": "a58fcb0d-cfed-4bcb-8a06-fcc44919f394",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-961",
    "metadata": {
      "#command.uri": "lime://botdemo@msging.net/payment/1656325099@telegram.gw.msging.net/session"
    }
}

```

### Create a Payment Intent

Create a payment intent with a previously registered card, it returns a Stripe PaymentIntent document with current payment informations, all parameters that can be used on resource on its creation can be found here: [Stripe payment intent](https://stripe.com/docs/api/payment_intents/create)

Prerequisite:

It is only possible to use this endpoint if the contact has already made a payment using the Stripe integration, choosing to save the card data, and has the Stripe customer ID (stripeCustomerID) in the Extras.

- **Parameters and where find them:**

  * **{stripeCustomerId}** can be obtained on [Stripe dashboard](https://dashboard.stripe.com/customers) or on contact extras.
  * **{stripePaymentMethod}** can be obtained by using [Payment Methods endpoint](#/payment-methods).

- **There are two scenarios in this endpoint:**

  * **{confirm} as true**, it means that payment intent will attempt to confirm the payment and do the necessary actions to complete the payment.
  * **{confirm} as false**, it means that the payment process require more steps to be completed, indicated by response parameter **status** with value requires_confirmation and it is necessary to confirm the payment intent manually by yourself. When confirm it is false, the {stripePaymentMethod} is an optional parameter. 


```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@stripe.msging.net",
    "method": "set",
    "uri": "/payment/{contactIdentity}/payment-intent",
    "type": "application/json",
    "resource": {
        "customer": "{stripeCustomerId}",
        "paymentMethodTypes": ["card"],
        "amount":1000,
        "currency":"brl",
        "confirm":"true",
        "paymentMethod":"{stripePaymentMethod}"
    }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/json",
    "resource": {
      "stripePaymentIntentId": "pi_3KGlMWAPY5jzkF511qb44Tmx",
      "stripeCustomerId": "pi_3KGlMWAPY5jzkF511qb44Tmx",
      "status": "succeeded",
      "stripeCardId": "card_1JAJVLAPY5jzkF510JNLqwGL",
      "id": 543
    },
    "method": "set",
    "status": "success",
    "id": "a58fcb0d-cfed-4bcb-8a06-fcc44919f394",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-965",
    "metadata": {
      "#command.uri": "lime://botdemo@msging.net/payment/1656325099@telegram.gw.msging.net/payment-intent"
    }
}
```

### Confirm Payment Intent

Confirm a payment intent previously created, this action is necessary when you do not confirm the payment intent on its creation, which means that payment needs more steps to be completed. The step may change depending on payment method, more information about these [steps](https://stripe.com/docs/api/payment_intents/object), and when those steps are done you can confirm the payment intent, the basics parameters presented on the request below can be founded by:

  * **{stripePaymentIntentId}**: That information is in the [Stripe dashboard](https://dashboard.stripe.com/test/payments), or by using Payment Intent History endpoint(/payment/{contactIdentity}/payment-intent-history).
  * **{stripePaymentMethod}**: You can get it by using [Payment Methods endpoint](#/payment-methods).


```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
   "to": "postmaster@stripe.msging.net",
   "method": "set",
   "uri": "/payment/{contactIdentity}/confirm-payment-intent",
   "type": "application/json",
   "resource": {
    "paymentIntentId":"{stripePaymentIntentId}",
    "options":{
       "paymentMethod": "{stripePaymentMethod}",
    }
   }
 }
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/json",
    "resource": {
      "stripePaymentIntentId": "pi_3KGlhyAPY5jzkF510DSnBlnb",
      "stripeCustomerId": "cus_Jnv5r6M9lU1ptU",
      "status": "succeeded",
      "stripeCardId": null,
      "id": 432
    },
    "method": "set",
    "status": "success",
    "id": "{{$guid}}",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-965",
    "metadata": {
      "#command.uri": "lime://botdemo@msging.net/payment/1656325099@telegram.gw.msging.net/confirm-payment-intent"
    }
}

```

### Payment Methods

Get available payment methods from the stripe customer(can be founded on [Stripe Dashboard](https://dashboard.stripe.com/customers)), it will return all current customer payment methods previously stored on Stripe

All these scenarios will return an empty list:

  * **Customer has not done any payment**
  * **Customer not allowed Stripe to store his payment method for future usage**
  * **The stripeCustomerId is invalid.**

| QueryString     | Description         | Example               |
|-----------------|---------------------|-----------------------|
| **customer**    | Stripe Customer Id. | cus_dsasd22s455sa     |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@stripe.msging.net",
    "method": "get",
    "uri": "/payment-methods?customer={stripeCustomerId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.stripe.payment-method+json",
        "items": [
        {
            "id": "pm_1Jk8xPAPY5jzkF51Sf7m1WFk",
            "brand": "visa",
            "country": "US",
            "expirationMonth": 10,
            "expirationYear": 2022,
            "funding": "credit",
            "last4Digits": "4242"
        }]
        },
    "method": "get",
    "status": "success",
    "id": "a58fcb0d-cfed-4bcb-8a06-fcc44919f394",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-965",
    "metadata": {
    "#command.uri": "lime://botdemo@msging.net/payment-methods?customer=cus_dsasd22s455sa"
    }
}
```

### Payment Intent History

Get all payment intents from current contact.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id":  "{{$guid}}",
    "to":  "postmaster@stripe.msging.net",
    "method":  "get",
    "uri":  "/payment/{contactIdentity}/payment-intent-history" 
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
      "total": 1,
      "itemType": "application/vnd.iris.stripe.payment-intent+json",
      "items": [
        {
          "id": 546,
          "stripePaymentIntentId": "pi_3K9AA4APY5jzkF512B8G0NoY",
          "stripeCustomerId": "cus_Jnv5r6M9lU1ptU",
          "status": "requires_confirmation"
        }]
    },
    "method": "get",
    "status": "success",
    "id": "a58fcb0d-cfed-4bcb-8a06-fcc44919f394",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-965",
    "metadata": {
        "#command.uri": "lime://botdemo@msging.net/payment/1656325099@telegram.gw.msging.net/payment-intent-history"
    }
}
```

### Session History

Get all sessions from current contact.


```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id":  "{{$guid}}",
    "to":  "postmaster@stripe.msging.net",
    "method":  "get",
    "uri":  "/payment/{contactIdentity}/session-history" 
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
      "total": 1,
      "itemType": "application/vnd.iris.stripe.session+json",
      "items": [
        {
          "id": 45,
          "stripeSessionId": "cs_test_b11F5BdMtxmf54seLfeJcRoLIR58ddumq8c2Lt1MWQBTuRlizciHXeGtca",
          "method": "card",
          "url": "https://checkout.stripe.com/pay/cs_test_b11F5BdMtxmf54seLfeJcRoLIR58ddumq8c2Lt1MWQBTuRlizciHXeGtca#fidkdWxOYHwnPyd1blpxYHZxWjA0TFNsVGNEVVwwb39uQzA0R1VObDFhcG19RENAN3Q9d3x8dkJXfG1HNnNjc2doR0FLX3NRTjJTVUlpNEI1SmA0MWJhMEdIX21NNU1JRHFidm5KfEtJYT1sNTVBZGZzNGNDTicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl",
          "status": "unpaid",
          "expirationDate": "2022-01-07T13:52:48.000Z",
          "paymentIntentId": 87,
          "stripePaymentIntentId": "pi_3KEwObAPY5jzkF511F2qEGQs"
        }]
    },
    "method": "get",
    "status": "success",
    "id": "a58fcb0d-cfed-4bcb-8a06-fcc44919f394",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-965",
    "metadata": {
      "#command.uri": "lime://botdemo@msging.net/payment/1656325099@telegram.gw.msging.net/session-history"
    }
}
```

### Payment Intent Events

Get events for this current payment intent, the payment intent id can be found on [Stripe dashboard](https://dashboard.stripe.com/payments) or by [Payment Intent History](/#payment-intent-history).

Each event has a [message](/#messages) that informs what happened to the payment (success, failure) in a conversation [thread](/#thread).

The response contains the messageId, and you can recover these messages on [/threads endpoint](#get-last-messages) and the message notifications can be recovered on [/notifications endpoint](#get-notifications-of-a-message).

| Parameter                | Description                  | Example                     |
|--------------------------|------------------------------|-----------------------------|
| `stripePaymentIntentId`  | Stripe PaymentIntent id      | pi_3K9A2QAPY5jzkF511dKvCQz6 |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@stripe.msging.net",
    "method": "get",
    "uri": "/payment-intents/{stripePaymentIntentId}/events"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
      "total": 1,
      "itemType": "application/vnd.iris.stripe.event+json",
      "items": [
        {
          "stripePaymentIntentId": "pi_3K9A2QAPY5jzkF511dKvCQz6",
          "stripeEventCode": "payment_intent.succeeded",
          "json": {
            "id": "evt_3K9A2QAPY5jzkF511q73JeZV",
            "object": "event",
            "api_version": "2020-08-27",
            "created": 1640099643,
            "data": {
              "object": {
                "id": "pi_3K9A2QAPY5jzkF511dKvCQz6",
                "object": "payment_intent",
                "amount": 1000,
                "amount_capturable": 0,
                "amount_received": 1000,
                "application": null,
                "application_fee_amount": null,
                "automatic_payment_methods": null,
                "canceled_at": null,
                "cancellation_reason": null,
                "capture_method": "automatic",
                "charges": {
                  "object": "list",
                  "data": [
                    {
                      "id": "ch_3K9A2QAPY5jzkF511QmwggMt",
                      "object": "charge",
                      "amount": 1000,
                      "amount_captured": 1000,
                      "amount_refunded": 0,
                      "application": null,
                      "application_fee": null,
                      "application_fee_amount": null,
                      "balance_transaction": "txn_3K9A2QAPY5jzkF511liS1JcO",
                      "billing_details": {
                        "address": {
                          "city": null,
                          "country": null,
                          "line1": null,
                          "line2": null,
                          "postal_code": null,
                          "state": null
                        },
                        "email": null,
                        "name": null,
                        "phone": null
                      },
                      "calculated_statement_descriptor": "TAKE BLIP",
                      "captured": true,
                      "created": 1640099643,
                      "currency": "usd",
                      "customer": "cus_Jnv5r6M9lU1ptU",
                      "description": null,
                      "destination": null,
                      "dispute": null,
                      "disputed": false,
                      "failure_code": null,
                      "failure_message": null,
                      "fraud_details": {
                        
                      },
                      "invoice": null,
                      "livemode": false,
                      "metadata": {
                        
                      },
                      "on_behalf_of": null,
                      "order": null,
                      "outcome": {
                        "network_status": "approved_by_network",
                        "reason": null,
                        "risk_level": "normal",
                        "risk_score": 54,
                        "seller_message": "Payment complete.",
                        "type": "authorized"
                      },
                      "paid": true,
                      "payment_intent": "pi_3K9A2QAPY5jzkF511dKvCQz6",
                      "payment_method": "card_1JAJVLAPY5jzkF510JNLqwGL",
                      "payment_method_details": {
                        "card": {
                          "brand": "mastercard",
                          "checks": {
                            "address_line1_check": null,
                            "address_postal_code_check": null,
                            "cvc_check": null
                          },
                          "country": "US",
                          "exp_month": 2,
                          "exp_year": 2070,
                          "fingerprint": "LYnbum1NRsdHFGdL",
                          "funding": "credit",
                          "installments": null,
                          "last4": "4444",
                          "network": "mastercard",
                          "three_d_secure": null,
                          "wallet": null
                        },
                        "type": "card"
                      },
                      "receipt_email": "email@email.com",
                      "receipt_number": null,
                      "receipt_url": "https://pay.stripe.com/receipts/acct_1IViQfAPY5jzkF51/ch_3K9A2QAPY5jzkF511QmwggMt/rcpt_KondECSltrBIZ2lUGLpE3xMztehh5SB",
                      "refunded": false,
                      "refunds": {
                        "object": "list",
                        "data": [
                          
                        ],
                        "has_more": false,
                        "total_count": 0,
                        "url": "/v1/charges/ch_3K9A2QAPY5jzkF511QmwggMt/refunds"
                      },
                      "review": null,
                      "shipping": null,
                      "source": null,
                      "source_transfer": null,
                      "statement_descriptor": null,
                      "statement_descriptor_suffix": null,
                      "status": "succeeded",
                      "transfer_data": null,
                      "transfer_group": null
                    }
                  ],
                  "has_more": false,
                  "total_count": 1,
                  "url": "/v1/charges?payment_intent=pi_3K9A2QAPY5jzkF511dKvCQz6"
                },
                "client_secret": "pi_3K9A2QAPY5jzkF511dKvCQz6_secret_iRH29AglHPmc6mlfpnI6J6W1T",
                "confirmation_method": "automatic",
                "created": 1640099642,
                "currency": "usd",
                "customer": "cus_Jnv5r6M9lU1ptU",
                "description": null,
                "invoice": null,
                "last_payment_error": null,
                "livemode": false,
                "metadata": {
                  
                },
                "next_action": null,
                "on_behalf_of": null,
                "payment_method": "card_1JAJVLAPY5jzkF510JNLqwGL",
                "payment_method_options": {
                  "card": {
                    "installments": null,
                    "network": null,
                    "request_three_d_secure": "automatic"
                  }
                },
                "payment_method_types": [
                  "card"
                ],
                "processing": null,
                "receipt_email": "email@email.com",
                "review": null,
                "setup_future_usage": "on_session",
                "shipping": null,
                "source": null,
                "statement_descriptor": null,
                "statement_descriptor_suffix": null,
                "status": "succeeded",
                "transfer_data": null,
                "transfer_group": null
              }
            },
            "livemode": false,
            "pending_webhooks": 6,
            "request": {
              "id": "req_ViPoylXrIiRjKR",
              "idempotency_key": "608821ff-7814-4a31-b4eb-9ad824fe004d"
            },
            "type": "payment_intent.succeeded"
          }
        }
      ]
    },
    "method": "get",
    "status": "success",
    "id": "a58fcb0d-cfed-4bcb-8a06-fcc44919f394",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-965",
    "metadata": {
      "#command.uri": "lime://botdemo@msging.net/payment-intents/pi_3K9A2QAPY5jzkF511dKvCQz6/events"
    }
}
```

### Session Events

Get events for this current session, the session id can be found on [Stripe dashboard](https://dashboard.stripe.com/payments) or by [Session History](/#session-history) filtering by contact. 

Each event has a [message](/#messages), that informs what happened to the payment (success, failure) in a conversation [thread](/#thread). 

The response contains the messageId, and you can recover these messages on [/threads endpoint](/#get-last-messages) and the message notifications can be recovered on [/notifications endpoint](/#get-notifications-of-a-message). 

| Parameter          | Description                  | Example                                                            |
|--------------------|------------------------------|--------------------------------------------------------------------|
| `stripeSessionId`  | Stripe session id            | cs_test_b11F5BdMtxmf54seLfeJcRoLIR58ddumq8c2Lt1MWQBTuRlizciHXeGtca |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@stripe.msging.net",
    "method": "get",
    "uri": "/sessions/{stripeSessionId}/events"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
      "total": 1,
      "itemType": "application/vnd.iris.stripe.event+json",
      "items": [
        {
          "stripeSessionId": "cs_test_a13S3VWdjGPI4FSfI4kHjUbzGaotPPlTuFxRnSP1T1AnccJlNfqdneARPE",
          "stripeEventCode": "payment_intent.succeeded",
          "json": {
            "id": "evt_3KC7SAAPY5jzkF513hVfgxFp",
            "object": "event",
            "api_version": "2020-08-27",
            "created": 1640804726,
            "data": {
              "object": {
                "id": "pi_3KC7SAAPY5jzkF513H0WmZLe",
                "object": "payment_intent",
                "amount": 400100,
                "amount_capturable": 0,
                "amount_received": 400100,
                "application": null,
                "application_fee_amount": null,
                "automatic_payment_methods": null,
                "canceled_at": null,
                "cancellation_reason": null,
                "capture_method": "automatic",
                "charges": {
                  "object": "list",
                  "data": [
                    {
                      "id": "ch_3KC7SAAPY5jzkF513VgS1oUh",
                      "object": "charge",
                      "amount": 400100,
                      "amount_captured": 400100,
                      "amount_refunded": 0,
                      "application": null,
                      "application_fee": null,
                      "application_fee_amount": null,
                      "balance_transaction": "txn_3KC7SAAPY5jzkF513yIdhhv8",
                      "billing_details": {
                        "address": {
                          "city": null,
                          "country": "BR",
                          "line1": null,
                          "line2": null,
                          "postal_code": null,
                          "state": null
                        },
                        "email": "email@email.com",
                        "name": "aasdasd",
                        "phone": null
                      },
                      "calculated_statement_descriptor": "TAKE BLIP",
                      "captured": true,
                      "created": 1640804725,
                      "currency": "brl",
                      "customer": "cus_KPmi9hY5mtPd2x",
                      "description": null,
                      "destination": null,
                      "dispute": null,
                      "disputed": false,
                      "failure_code": null,
                      "failure_message": null,
                      "fraud_details": {
                        
                      },
                      "invoice": null,
                      "livemode": false,
                      "metadata": {
                        
                      },
                      "on_behalf_of": null,
                      "order": null,
                      "outcome": {
                        "network_status": "approved_by_network",
                        "reason": null,
                        "risk_level": "normal",
                        "risk_score": 61,
                        "seller_message": "Payment complete.",
                        "type": "authorized"
                      },
                      "paid": true,
                      "payment_intent": "pi_3KC7SAAPY5jzkF513H0WmZLe",
                      "payment_method": "pm_1KC7SiAPY5jzkF51JmJuD2zV",
                      "payment_method_details": {
                        "card": {
                          "brand": "visa",
                          "checks": {
                            "address_line1_check": null,
                            "address_postal_code_check": null,
                            "cvc_check": "pass"
                          },
                          "country": "US",
                          "exp_month": 1,
                          "exp_year": 2033,
                          "fingerprint": "xXLkPuubNbOL173d",
                          "funding": "credit",
                          "installments": null,
                          "last4": "4242",
                          "network": "visa",
                          "three_d_secure": null,
                          "wallet": null
                        },
                        "type": "card"
                      },
                      "receipt_email": "email@email.com",
                      "receipt_number": null,
                      "receipt_url": "https://pay.stripe.com/receipts/acct_1IViQfAPY5jzkF51/ch_3KC7SAAPY5jzkF513VgS1oUh/rcpt_KrrBh4xM6KPovETK40bc72MpKBs93PL",
                      "refunded": false,
                      "refunds": {
                        "object": "list",
                        "data": [
                          
                        ],
                        "has_more": false,
                        "total_count": 0,
                        "url": "/v1/charges/ch_3KC7SAAPY5jzkF513VgS1oUh/refunds"
                      },
                      "review": null,
                      "shipping": null,
                      "source": null,
                      "source_transfer": null,
                      "statement_descriptor": null,
                      "statement_descriptor_suffix": null,
                      "status": "succeeded",
                      "transfer_data": null,
                      "transfer_group": null
                    }
                  ],
                  "has_more": false,
                  "total_count": 1,
                  "url": "/v1/charges?payment_intent=pi_3KC7SAAPY5jzkF513H0WmZLe"
                },
                "client_secret": "pi_3KC7SAAPY5jzkF513H0WmZLe_secret_MgpjaasdsadsadasdUzxQMwJqInAza1yoK08vH",
                "confirmation_method": "automatic",
                "created": 1640804690,
                "currency": "brl",
                "customer": "cus_KPmi9hY5mtPd2x",
                "description": null,
                "invoice": null,
                "last_payment_error": null,
                "livemode": false,
                "metadata": {
                  
                },
                "next_action": null,
                "on_behalf_of": null,
                "payment_method": "pm_1KC7SiAPY5jzkF51JmJuD2zV",
                "payment_method_options": {
                  "card": {
                    "installments": null,
                    "network": null,
                    "request_three_d_secure": "automatic"
                  }
                },
                "payment_method_types": [
                  "card"
                ],
                "processing": null,
                "receipt_email": "email@email.com",
                "review": null,
                "setup_future_usage": null,
                "shipping": null,
                "source": null,
                "statement_descriptor": null,
                "statement_descriptor_suffix": null,
                "status": "succeeded",
                "transfer_data": null,
                "transfer_group": null
              }
            },
            "livemode": false,
            "pending_webhooks": 5,
            "request": {
              "id": "req_lxOFqaHO0jnFYx",
              "idempotency_key": "9dc604a3-b834-4e1c-a86d-2b62437bd1b0"
            },
            "type": "payment_intent.succeeded"
          }
        }
      ]
    },
    "method": "get",
    "status": "success",
    "id": "6bff894f-7331-4e47-abb4-154f2f6b5a15",
    "from": "postmaster@stripe.msging.net/#node",
    "to": "botdemo@msging.net/default-965",
    "metadata": {
      "#command.uri": "lime://botdemo@msging.net/sessions/cs_test_a13S3VWdjGPI4FSfI4kHjUbzGaotPPlTuFxRnSP1T1AnccJlNfqdneARPE/events"
    }
}
```
