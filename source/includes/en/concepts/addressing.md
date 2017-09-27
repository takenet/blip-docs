## Addressing

All the [envelopes](http://limeprotocol.org/#envelope) (messages, notifications and commands) exchanged between **chatbots** and **customers** in **BLiP** have *from* and *to* addresses.

The address is presented in the format `name@domain/instance`, where:

- **name**: Customer channel identifier. The name format changes according to the channel, it can be the telephone number in some channels (such as SMS) or internal identifiers of each platform (such as in Messenger). This value is mandatory.
- **domain**: Customer origin channel. The format is always a [FQDN](https://pt.wikipedia.org/wiki/FQDN), and each channel has a unique identifier. This value is mandatory.
- **instance**: *Optional* identifier of the connection between the customer and the channel. It is used in channels where the customer may have more than one active connection (for example, to mobile device and to the computer).

Usually, the interaction between a chatbot and a customer starts after the message, which has a from address, is received. In this case, it is only necessary to answer to this address - in an unchanged way, in order to guarantee the message's delivery.

The addresses may have different life cycles depending on the channels, they can be **scoped** – valid in some conditions (as in Messenger, where the address is only valid for a specific originator) or **persistent**, always valid (in *SMS* and *BLiP App*). The chatbots must take these characteristics in consideration to build the interactions. For more details, check the [LIME protocol](http://limeprotocol.org/#concepts) specification. 
