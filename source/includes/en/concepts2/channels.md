## Channels

**Channels** are message nets connected to **Blip** in which the chatbots are able to send and receive messages to these nets' customers. Each channel has an identifier used for addressing which is normally a [FQDN](https://pt.wikipedia.org/wiki/FQDN). This identifier appears after the `@` in the nodes address.

Each channel (or messaging application) has a unique set of features. Besides unify all of these channels into a single API, Blip also adapt automatically any content to these unique feature sets.

This means that you can respond to a user with message like a menu without consideration for the features of that channel. If the user is on Facebook or any other channel that supports this content type, the message will appear to the user as a menu, but on a channel like Whatsapp the menu will fall back to a text messages. **It's also possible to customize this behaviour as you desire**.

In order to send or receive messages to a channel, the chatbot must be published on it. The publishing is done through the portal, which may request specific information that helps to identify the chatbot in this channel, such as **API tokens** for example. Usually, previous registration is necessary in each channel, through a specific tool, before publishing.

The following channels are available in **Blip** platform:

| Name               | FQDN                    |
|--------------------|-------------------------|
| Blip Chat          | 0mn.io                  |
| Tangram (SMS)      | tangram.com.br  (**deprecated**) |
| Take.IO (SMS)      | take.io                 |
| Messenger | messenger.gw.msging.net |
| Instagram          | instagram.gw.msging.net |
| WhatsApp           | wa.gw.msging.net        |
| AzureBotService (Microsoft Teams)           | abs.gw.msging.net        |
| Google Business Messages | businessmessages.gw.msging.net |
| Skype              | skype.gw.msging.net     |
| Telegram           | telegram.gw.msging.net  |
| Workplace          | workplace.gw.msging.net |
| Email              | mailgun.gw.msging.net   |
| PagSeguro          | pagseguro.gw.msging.net |

<!---| Google Assistant   | assistant.gw.msging.net (**soon**)|
| Skype for Business | abs.gw.msging.net  (**soon**)     |
| Business Chat | businesschat.gw.msging.net  (**soon**)     |
| Infobip (SMS) | infobip.gw.msging.net  (**soon**)     |
| Zendesk Chat Conversations | chatconversations.gw.msging.net  (**soon**)     |-->

<aside class="notice">
All Blip's chatbots are running inside of a specific channel with <code>msging.net</code> identifier.
</aside>

For more information about any channel, check the [Integrations](#Integrations) section.
