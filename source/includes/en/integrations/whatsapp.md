## WhatsApp

| FQDN              | Identifier type                                       |
|-------------------|-------------------------------------------------------|
| @wa.gw.msging.net | WhatsApp identifier (it's not necessarily the MSISDN) |

**WhatsApp** is the world’s most popular business messaging channel, with more than 2 billion global users and end-to-end encryption. The **WhatsApp Business API** is a fast, simple, secure, and reliable way for businesses to reach their customers all over the world. This guide will help businesses onboard and build their first official WhatsApp messaging experience using Blip and WhatsApp Business API.

Before start using WhatsApp channel you should understand some basic concepts.

* Messages - If your chatbot receives some message from a customer you get the possibility to send normal messages for this user (for free) during a 24h window. Every message sent by the user reset this window.
* Notifications (or Active Messages) - Messages sent by a chatbot or human agent to an user who doesn't sent any message in the last 24 hours (outside the 24h window). **This kind of message must be approved by WhatsApp before be sent and will be charged**.

You can use Take Blip's API to send messages and notifications for your customers. (Remember, for the first interaction or after de 24h window you must send only notifications).

### Sending a notification (active message)

##### Prerequisites

##### 1. Opt-in

An user must first consent to receive messages in WhatsApp by opting into them via a third-party channel. This can be any channel your business uses to communicate with people today — your website, app, email, SMS, retail location, etc.

* Businesses must clearly state that a person is opting in to receive messages from the business over WhatsApp
* Businesses must clearly state the business’ name that a person is opting in to receive messages from
* Businesses must comply with applicable law

[Click here to see more about how to get opt-in for WhatsApp](https://developers.facebook.com/docs/whatsapp/guides/opt-in).

##### 2. Verify the customer identifier

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@wa.gw.msging.net",
  "method": "get",
  "uri": "lime://wa.gw.msging.net/accounts/+5531988889999"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.account+json",
    "resource": {
        "fullName": "John Doe",
        "alternativeAccount": "5531988889999@wa.gw.msging.net",
        "identity": "5531988889999@wa.gw.msging.net",
        "phoneNumber": "+5531988889999",
        "source": "WhatsApp"
    },
    "method": "get",
    "status": "success",
    "id": "{{$guid}}",
    "from": "postmaster@wa.gw.msging.net",
    "to": "bot@msging.net",
    "metadata": {
        "#command.uri": "lime://wa.gw.msging.net/accounts/+5531988889999"
    }
}
```

```python
result = await client.process_comand_async(
    Command(
        CommandMethod.GET,
        'lime://wa.gw.msging.net/accounts/+5531988889999',
        to='postmaster@wa.gw.msging.net'
    )
)
```

Before sending a notification to a WhatsApp's customers you should get theirs identifier. Using the customer MSISDN (complete phone number), make a request to Take Blip's API as demostrated aside. For instance, a Brazillian customer should be verified using a MSISDN like `+5531988889999`. This request will verify if the MSISDN is registered on WhatsApp and will retrieve its identifier if yes.

<aside class="warning">
If you verify too many phone numbers without sending notifications to them, you will be banned from WhatsApp.
</aside>

**Attention**, WhatsApp only retrieves the identifier if the MSISDN is in **complete form**. If you don't put the `+` before phone number, all results will indicate success, even if the MSISDN is not registered on WhatsApp. **Do not forget to put the** `+` **before the phone number.**

After getting the customer identifier you are able to send notifications. Use the `alternativeAccount` property received as response of the last request to send notifications (or messages) to your customer. For this sample `5531988889999@wa.gw.msging.net`.

##### 3. Creating a message template

The only way to send a notification is throught **Message Templates**. Message Templates are message formats for common reusable messages a business may want to send. **Businesses must use Message Templates for sending notifications to customers.** [Click here to see more about Message Templates](https://developers.facebook.com/docs/whatsapp/message-templates).

The meessage template is a message content (text, image, document, quick reply, call to action) individually approved by the WhatsApp team to ensure they do not violate the WhatsApp policies. Businesses must use templated messages when first reaching out to users or when sending a message 24h after the last message from the user.

Currently, **Message Templates** are created directly on the Take Blip Portal. If you need to add a new message template to your chatbot, just access the `Content > Message Template` menu, containing the following information:

* The content of your message
* All translations desired
* Optionally your message may has variables identified by the pattern {{X}}, where X is the index of the variable.

Here’s some example:

* en-us:
`"Welcome {{1}}. We look forward to serving you on WhatsApp."`

* pt-br:
`"Olá {{1}}, é um prazer atender você aqui no WhatsApp."`

As soon as your Message Template has been created you will receive two labels that identify this message. These labels are called as `element_name` (the name you gave to your message template) and `namespace`. You will need these informations to send the notification.

#### Sending a welcome notification (Text)

```javascript
client.connect().then(function(session) {
    await client.sendMessage({
        "id": "{{$guid}}",
        "to": "{{customerIdentity}}",
        "type": "application/json",
        "content":{
            "type":"template",
            "template":{
                "namespace":"{{NAMESPACE}}",
                "name":"{{MESSAGE_TEMPLATE_NAME}}",
                "language":{
                    "code":"pt_BR",
                    "policy":"deterministic"
                },
                "components":[
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": "value1"
                            },
                            {
                                "type":"text",
                                "text":"value2"
                            }
                        ]
                    }
                ]
            }
        }
    });
});
```

```python
client.send_message(
    Message(
        'application/json',
        {
            'type': 'template',
            'template': {
                'namespace': '{{NAMESPACE}}',
                'name': '{{MESSAGE_TEMPLATE_NAME}}',
                'language': {
                    'code': 'pt_BR',
                    'policy': 'deterministic'
                },
                'components': [
                    {
                        'type': 'body',
                        'parameters': [
                            {
                                'type': 'text',
                                'text': 'value1'
                            },
                            {
                                'type': 'text',
                                'text': 'value2'
                            }
                        ]
                    }
                ]
            }
        },
        to='{{customerIdentity}}'
    )
)
```

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id":"{{$guid}}",
    "to":"{{customerIdentity}}",
    "type":"application/json",
    "content":{
        "type":"template",
        "template":{
            "namespace":"{{NAMESPACE}}",
            "name":"{{MESSAGE_TEMPLATE_NAME}}",
            "language":{
                "code":"pt_BR",
                "policy":"deterministic"
            },
            "components":[
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": "value1"
                        },
                        {
                            "type":"text",
                            "text":"value2"
                        }
                    ]
                }
            ]
        }
    }
}
```

In order to send a notification for your customer you will need:

* Customer's identifier (get it in step 2), for instance
`{{customerIdentity}}`

* Your message template be on the status **Approved**

* Element name of message template (get it in step 3), for instance
`{{MESSAGE_TEMPLATE_NAME}}`

* Namespace of message template (get it in step 3), for instance
`{{NAMESPACE}}`

Make a request to Blip's API as demostrated aside.

<aside class="notice">
Note: Sending notifications is a paid operation.
</aside>

<aside class="notice">
If you want to know how to send other message template types besides text, please follow this <a href="https://help.blip.ai/docs/en/channels/whatsapp/enviar-notificacao-whatsapp-blip-api/">article in our Help Center</a>
</aside>
