### Master

The **Master** template allows **multiple chatbots to be encapsulated in a single bot**, where only one of them is active for each client in a given time. Each sub-bot is registered as a **service** - for example, *navigation* or *attendance* - and the currently active chatbot is able to perform the handover to another service. In this case, **only the master chatbot needs to be published on the external channels**, and the service bots (or *children's bots*) only talk to the master. Despite this, there are no restrictions on separate publications of service bots.

This template makes easier to build **hybrid** chatbots, which is something very useful to provide a quality service to the clients of a chatbot. For example, an SDK-type chatbot that uses structured navigation may decide at any given moment that the current customer should talk with a human operator.

The owner should always define a chatbot as **default**, so that the first message of each user should be delivered to it. The most common scenario is that the default bot is of the **SDK / Webhook** type , since the tendency is that the attendances begin in a automated way and, if necessary, are transferred to a manual attendant or FAQ. The **handover rules are the responsibility of the active chatbot**, but the most common case is if chatbot is not understanding the client's input, or even the client has requested to talk to an attendant. At this point, the active chatbot should send a message with the [**redirect**](https://portal.blip.ai/#/docs/content-types/redirect) content type, informing in address the name of the service that should take control of the conversation from this moment on. In the case of chatbots of the **manual service** template, the transition is performed through the [**BLiP Web**] (https://web.blip.ai) with the **end service** button. To redirect the user to the main chatbot, the active chatbot just need to send a redirect message **withou the `addresss` property**.

The communication between the master and the service bots is done using the [tunnel extension](https://portal.blip.ai/#/docs/extensions/tunnel). For this reason, the service bots do not respond directly to the client address, but to a tunnel address (`<tunnel-id> @ tunnel.msging.net`), but they are granted permission to query **resources** of the master bot, such as *contacts* and *threads*.

#### Creating a master chatbot

To create a new master chatbot, in the [portal BLiP](https://portal.blip.ai), go to **Chatbots** -> **Create chatbot** and choose the **master** pre-defined model:

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/master/docs/en/templates/master1.png" />

After that, you need to configure the service sub-bots. To do this, under **Settings** -> **Master** click the button **Add service**:

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/master/docs/en/templates/master2.png" />

In this way, the chatbots that the user has access to choose are listed. Enter the name of the service that each bot offers (ex: attendance, automated) and choose one as main, by checking the option **It's my default chatbot**.

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/master/docs/en/templates/master3.png" />
