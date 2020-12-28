## WhatsApp
| FQDN                     | Identifier type                  | 
|--------------------------|----------------------------------------|
| @wa.gw.msging.net  | WhatsApp identifier (it's not necessarily the MSISDN)   |

**WhatsApp** is the world’s most popular business messaging channel, with more than 1.5 billion global users and end-to-end encryption. The **WhatsApp Business API** is a fast, simple, secure, and reliable way for businesses to reach their customers all over the world. This guide will help businesses onboard and build their first official WhatsApp messaging experience using Blip and WhatsApp Business API. 

Throught Blip you are able to create groups, invite users to previously created groups and send and receive messages (peer to peer and inside a group). In order to get more information about WhatsApp Business API [access the Official WhatsApp docs](https://developers.facebook.com/docs/whatsapp/).

Before start using WhatsApp channel you should understand some basic concepts.

* Messages - If your chatbot receives some message from a customer you get the possibility to send normal messages to this user (for free) during a 24h window. Every message sent by the user reset this window.
* Notifications (or Active Messages) - messages sent by bot to a user who doesn't sent message in the last 24 hours (outside the 24h window) must be a Notification. **This kind of message must be approved by WhatsApp before be sent and will be charged**.

You can use Blip's API to send messages and notifications for your customers. (Remember, for the first interaction or after de 24h window you should send only notifications).

### Sending a notification

#### Prerequisites

##### 1. Opt-in

A user must first consent to receive messages in WhatsApp by opting into them via a third-party channel. This can be any channel your business uses to communicate with people today — your website, app, email, SMS, retail location, etc.

* The opt-in must be an active opt-in. This means it must be triggered by a user action, such as entering a phone number or checking a box to indicate consent.
* Clear opt-in messaging so that a user knows what type(s) of messaging the person is signing up for.

[Click here to see more about how to get opt-in for WhatsApp](https://developers.facebook.com/docs/whatsapp/guides/opt-in).

##### 2. Verify the customer identifier

Before send a notification to a WhatsApp's customer you should get their identifier. Using the customer MSISDN, make a request to Blip's API as demostrated aside. For instance, a Brazillian customer should be verified using a MSISDN like `+5531998765432`.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "a456-42665544000-0123e4567-e89b-12d3",
  "to": "postmaster@wa.gw.msging.net",
  "method": "get",
  "uri": "lime://wa.gw.msging.net/accounts/+5531998765432"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.account+json",
    "resource": {
        "fullName": "John Doe",
        "alternativeAccount": "5531998765432@wa.gw.msging.net",
        "identity": "5531998765432@wa.gw.msging.net",
        "phoneNumber": "+5531998765432",
        "source": "WhatsApp"
    },
    "method": "get",
    "status": "success",
    "id": "a456-42665544000-0123e4567-e89b-12d3",
    "from": "postmaster@wa.gw.msging.net",
    "to": "bot@msging.net",
    "metadata": {
        "#command.uri": "lime://wa.gw.msging.net/accounts/+5531998765432"
    }
}
```

After get the customer identifier you are able to send notifications. Use the `alternativeAccount` property received as response of the last request to send notifications (or messages) to your customer. For this sample `5531998765432@wa.gw.msging.net`.

##### 3. Creating a message template

The only way to send a notification is throught **Message Templates**. Message Templates are message formats for common reusable messages a business may want to send. **Businesses must use Message Templates for sending notifications to customers.** [Click here to see more about Message Templates](https://developers.facebook.com/docs/whatsapp/message-templates).

The meessage template is a message content (text, image, document, quick reply, call to action) individually approved by the WhatsApp team to ensure they do not violate the WhatsApp policies. Businesses must use templated messages when first reaching out to users or when sending a message 24h after the last message from the user.

<aside class="notice">
Note: This type of message is paid.
</aside>

Nowadays, **Message Templates** are created directly on the Blip portal, manually. Therefore, if you need to add a new message template to your bot, just access the `Content > Message Template` menu, containing the following information:

* The ontent of your message
* All translations desired
* Optionally your message may has variables identified by the pattern {{X}}, where X is the index of the variable.

Here’s some example:

* en-us

`"Welcome {{1}}. We look forward to serving you on WhatsApp."`

* pt-br

`"Olá {{1}}, é um prazer atender você aqui no WhatsApp."`

As soon as your Message Template has been created you will receive two labels that identifie this message. These labels are called as `element_name` and `namespace`, you will need these informations to send the notification.

#### Sending a welcome notification (Text)

In order to send a notification for your customer you will need:

* Customer's identifier (get it in step 2), for instance `{{customerIdentity}}`
* Element name of message template (get it in step 3), for instance `{{MESSAGE_TEMPLATE_NAME}}`
* Namespace of message template (get it in step 3), for instance `{{MESSAGE_TEMPLATE_NAME}}`

Make a request to Blip's API as demostrated aside.

<aside class="notice">If you want to know how to send types other than text, please follow this <a href="https://help.blip.ai/docs/en/channels/whatsapp/enviar-notificacao-whatsapp-blip-api/">article in our Help Center</a></aside>


 ```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendMessage({
    "id": "123e4567-e89b-12d3-a456-426655440002",
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
                       "Type":"text",
                       "text":"value2"
                    }
                ]
            }
          ]
        }
    }
    }});
});
```

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
   "id":"{{RANDOM_ID}}",
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
                       "Type":"text",
                       "text":"value2"
                    }
                ]
            }
          ]
        }
    }
}

```

### Creating a group

<aside class="notice">According to the <a href="https://developers.facebook.com/docs/whatsapp/api/groups/">updates made by the Facebook team in July 2020</a>, it is no longer possible to use this feature</aside>

Besides sending messages between customer and bot you are also able to send and receive messages in a group. 
When your bot creates a group you are able to invite people, listen, and reply group messages.

Before to start sending/receiving messages in a group, you must create the group. 

Make a request to Blip's API as demostrated aside. Please, replace the `{{groupName}}` variable by your group name.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "21387123987128937123713",
  "to":"postmaster@wa.gw.msging.net",
  "method": "set",
  "type": "application/vnd.lime.group+json",
  "uri":  "/groups",
  "resource": {
    "name": "{{groupName}}"
  }
}
```

### Creating a invite link to the group

<aside class="notice">According to the <a href="https://developers.facebook.com/docs/whatsapp/api/groups/">updates made by the Facebook team in July 2020</a>, it is no longer possible to use this feature</aside>

After to create a group you should invite people to join. The invitation is made by a link.
In order to create a group invite link, make a request to Blip's API as demostrated aside. Please, replace the `{{createdGroupIdentity}}` variable by your group name.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "ABSLFYWLAASYSIOSSA",
  "to":"postmaster@wa.gw.msging.net",
  "method": "get",
  "uri":  "/groups/{{createdGroupIdentity}}/invite-link"
}
```

Send this link to any customer you want invite to join the group.

### Receiving messages in a group

<aside class="notice">According to the <a href="https://developers.facebook.com/docs/whatsapp/api/groups/">updates made by the Facebook team in July 2020</a>, it is no longer possible to use this feature</aside>

Every message received by bot in a WhatsApp's group has the `from` node equals to `groups@wa.gw.msging.net`. Take a look at a sample:

```
{
  "id": "65603604-fe19-479c-c885-3195b196fe8e",
  "from": "groups@wa.gw.msging.net",
  "to": "bot@msging.net",
  "type": "text/plain",
  "content": "Hello Group!!"
}
```