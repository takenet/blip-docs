# Concepts

**BLiP** allows messaging apps (here also called **chatbots**, bots, intelligent contacts, or just, contacts) to be built only once and be made available through different **messaging channels**, such as *Messenger*, *Skype*, *Workplace*, *BLiP Chat* (a BLiP's channel) and others.

In order to allow the contact owner to charge for his services, there are integrations with **payment channels**, such as *Pagseguro* (a brazilian payment gateway). It is not necessary for the owner to be a developer if he wants to use these features, since the **templates** allow him to offer services that can make use of all of them; only some quick customizations would be needed to enable them.

For developers, it is possible to choose between using **webhooks** - the simplest and fastest way to send and receive messages and notifications, or the **SDKs** that enable them to build contacts in a flexible and scalable way.

Developers can also use **extensions** that encapsulate common functionalities used in message applications, such as message *broadcasting* and *scheduling*.

**BLiP** uses [LIME protocol](http://limeprotocol.org) for communication between chatbots and clients and many of the concepts come from the protocol. The **envelopes** are *information containers* defined by the protocol and can be **messages**, **notifications** and **commands**, sent in **JSON** format.
