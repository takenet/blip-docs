## WhatsApp
| FQDN                     | Identifier type                  | 
|--------------------------|----------------------------------------|
| @wa.gw.msging.net  | WhatsApp identifier (it's not necessary the MSISDN)   |

**WhatsApp** is the world’s most popular business messaging channel, with more than 1.5 billion global users and end-to-end encryption. The **WhatsApp Business API** is a fast, simple, secure, and reliable way for businesses to reach their customers all over the world. This guide will help businesses onboard and build their first official WhatsApp messaging experience using BLiP and WhatsApp Business API. 

Through BLiP you are able to create groups, invite users to previously created groups and send and receive messages (peer to peer and inside a group). In order to get more information about WhatsApp Business API [access the Official WhatsApp docs](https://developers.facebook.com/docs/whatsapp/).

Before start using WhatsApp channel you should understand some basic concepts.

* Messages - If your chatbot receives some message from a customer you get the possibility to send messages to this user (for free) during a 24h window. Every message sent by the user reset this window.
* Notifications (or Active Messages) - messages sent by bot to a user that doesn't sent message in the last 24 hours (outside the 24h window) must be a Notification. **This kind of message must be approved by WhatsApp before be sent and will be charged**.

You can use BLiP's API to send messages and notifications for your customers. (Remember, for the first interaction or after de 24h window you should send only notifications).

### Sending a notifications

#### Prerequisites

1. Opt-in

A user must first consent to receive messages in WhatsApp by opting into them via a third-party channel. This can be any channel your business uses to communicate with people today — your website, app, email, SMS, retail location, etc.

* The opt-in must be an active opt-in. This means it must be triggered by a user action, such as entering a phone number or checking a box to indicate consent.
* Clear opt-in messaging so that a user knows what type(s) of messaging the person is signing up for.

[Click here to see more about how to get opt-in for WhatsApp](https://developers.facebook.com/docs/whatsapp/guides/opt-in).

2. Verify the customer identifier

Before send a message to a WhatsApp's customer you should get their identifier. Using the customer MSISDN make a request to BLiP's API as demostrated aside. For instance, a Brazillian customer should be verified using a MSISDN like `5531998765432`.

//verifing

After get the customer identifier you are able to send messages and notifications.

3. Sending a welcome notification

### Creating a group

Every message received by bot bot in a WhatsApp's group has the `from` node equals to `groups@wa.gw.msging.net`

|    | Received messages by bot in a WhatsApp group   |

