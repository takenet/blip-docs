# Concepts

**Blip Messaging Hub** allows that messaging apps (here also called **chatbots**, bots, intelligent contacts, or just, contacts) be built only once and made available in different **messaging channels**, such as *Messenger*, *Skype* or [*BLiP App*](https://play.google.com/store/apps/details?id=net.take.omni) (a Blip's channel).

In order to allow the contact owner to perform his services’ charge, there are integrations with **payment channels**, such as *Pagseguro* (a brazilian payment gateway). It is not necessary to be a developer if he wants to use these functionalities, once the **templates** have an easy and friendly way for the owner to offer services that use all the platform functions, when he only needs a quick customization.

For developers, it is possible to choose between using **webhooks** - the simplest and fastest way to receive and send messages and notifications, or the **SDKs** that enable to build contacts in a flexible and scalable way.

Developers also can use on **extensions** that encapsulate common functionalities used in message applications, such as message *broadcast* and *scheduling*.

**Blip Messaging Hub** uses [LIME protocol](http://limeprotocol.org) for communication between chatbots and clients and the most part of the concepts comes from the protocol. The **envelopes** are *information containers* defined by the protocol and can be **message**, **notifications** and **command**, sent in **JSON** format.
