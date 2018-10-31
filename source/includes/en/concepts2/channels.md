## Channels

**Channels** are message nets connected to **BLiP** in which the chatbots are able to send and receive messages to these nets' customers. Each channel has an identifier used for addressing which is normally a [FQDN](https://pt.wikipedia.org/wiki/FQDN). This identifier appears after the `@` in the nodes address.

In order to send or receive messages to a channel, the chatbot must be published on it. The publishing is done through the portal, which may request specific information that helps to identify the chatbot in this channel, such as **API tokens** for example. Usually, previous registration is necessary in each channel, through a specific tool, before publishing.

Each channel has different capabilities, such as supported message formats or notification events.

The following channels are available in **BLiP** platform:

| Name               | FQDN                    |
|--------------------|-------------------------|
| BLiP Chat          | 0mn.io                  |
| Tangram (SMS)      | tangram.com.br  (**deprecated**) |
| Take.IO (SMS)      | take.io                 |
| Facebook Messenger | messenger.gw.msging.net |
| WhatsApp           | wa.gw.msging.net        |
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
All BLiP's chatbots are running inside of a specific channel with <code>msging.net</code> identifier.
</aside>

For more information about any channel, check the [Integrations](#Integrations) section.