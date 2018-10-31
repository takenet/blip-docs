# Concepts

**BLiP** allows conversational applications (here also called **chatbots**, intelligent contacts, smart contacts or just, **bots**) to be built only once and be made available through different **messaging channels**, such as *Messenger*, *WhatsApp*, *SMS*, *Email*, *Skype*, *Workplace*, *BLiP Chat* (a BLiP's channel for web, android and iOS), and others ([click here to see all available channels](.#channels)).

There are basically 3 differents ways to create a chatbot using BLiP.

- Using Builder (without any code)

You can use the visual component **Builder** to build any type of bot. There is also a possibility to choice one of the available pre built bot **templates** and just make some quick customization. To know how to create a bot using Builder [click here](#getting-started-builder).

- Using a SDK (C\# or JavaScript)

For developers, it's possible to choose one of the available **SDKs** that enable them to build bots in a flexible and scalable way.

- Using HTTP Webhooks (for any language)

If you aren't available to create your bot using Builder or one of the SDKs you can use BLiP HTTP **Webhooks**, the simplest and fastest way to send and receive messages and notifications. In this case you will basically need to create an API to receive (and send) HTTP requests.

Besides send/receive messages your chatbot will probably need a lot of integrations and aditional tools to delivery the best experience to the clients. To help you BLiP has a lot of **extensions** and **integrations**. 

**Integrations** are external APIs connected to BLiP in order to reduce your work to use these applications, for instance: *Chatbase*, *RD Station*, *PagSeguro* and others ([click here to see all available integrations](.#integrations)

**Extensions** are internal APIs that encapsulate common functionalities used in message applications, such as message *broadcasting*, *scheduling*, *simple databases*, *chat history* and many others ([click here to see all available extensions](.#extensions)).

Every content sent or received by **BLiP's** APIs and any communication between chatbots and their clients uses [LIME protocol](http://limeprotocol.org) definitions. 
**LIME Protocol** (acronym for Lightweight Messaging Protocol) is a open source (maintained by BLiP team) JSON based protocol for messaging, inspired by the XMPP protocol. It aims to be simple but extensible, with little verbosity but yet providing good readability.
The **envelopes** are *information containers* defined by the protocol and can be **messages**, **notifications** or **commands**, sent in **JSON** format.