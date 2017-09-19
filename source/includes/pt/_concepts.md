# Conceitos

O **BLiP Messaging Hub** permite que aplicações de mensagem (chamadas aqui de **contatos inteligentes** ou apenas **chatbots**) sejam construídas uma única vez e disponibilizadas em diversos **canais de mensagem**, como *Messenger*, *Skype* ou o próprio [*BLiP App*](https://play.google.com/store/apps/details?id=net.take.omni).

Para permitir que o proprietário do chatbot realize a cobrança dos seus serviços, existem integrações com **canais de pagamento**, como o *Pagseguro*.

Não é necessário ser um desenvolvedor para utilizar estas funcionalidades, já que os **modelos** oferecem uma forma prática e amigável do proprietário oferecer serviços que utilizam todas as funções da plataforma, precisando apenas de uma rápida customização.

Para desenvolvedores, é possível escolher entre utilizar **webhooks**, a maneira mais rápida e simples para recebimento e envio de mensagens e notificações ou os **SDKs**, que permitem a construção de chatbots de maneira flexível e escalável.

Os desenvolvedores também podem contar com **extensões** que encapsulam funcionalidades comuns utilizadas por aplicações de mensagem, como o *envio em massa* e *agendamento*.

O **BLiP Messaging Hub** utiliza o [protocolo LIME](http://limeprotocol.org) para comunicação entre os chatbots e os clientes, e a maior parte dos conceitos vêm deste protocolo. Os **envelopes** são os *containers* de informação definidas pelo protocolo e podem ser **mensagem**, **notificação** e **comando**, sendo transmitidos no formato **JSON**.
