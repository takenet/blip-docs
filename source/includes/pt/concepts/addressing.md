### Endereçamento

Todos [envelopes](http://limeprotocol.org/#envelope) (mensagens, notificações e comandos) trocados entre **chatbots** e **clientes** no **BLiP Messaging Hub** possuem **endereços** do *originador* e *destinatário*.

O endereço é apresentado no formato `nome@domínio/instância`, sendo:
- **nome**: Identificador do cliente no canal. O formato do nome muda de acordo com o canal, podendo ser o número de telefone em alguns canais (como SMS) ou identificadores internos de cada plataforma (como no Messenger). Este valor é obrigatório.
- **domínio**: Identificador do canal de origem do cliente. O formato é sempre um [FQDN](https://pt.wikipedia.org/wiki/FQDN), sendo que cada canal possuí um identificador único. Este valor é obrigatório.
- **instância**: Identificador *opcional* da conexão do cliente com o canal. É utilizado em canais onde o cliente pode ter mais de uma conexão ativa (exemplo, no celular e no computador).

Normalmente, a interação de um chatbot com o cliente começa após o recebimento de uma mensagem, que por sua vez possui um endereço de origem. Neste caso, basta o chatbot responder a este endereço - de maneira inalterada - para que seja garantida a entrega da mensagem.

Os endereços podem ter ciclo de vida diferentes dependendo dos canais, podendo ser **por escopo** - válidos em certas condições (como no *Messenger*, onde o endereço é válido apenas para um determinado originador) e **persistentes**, sempre válidos (no *SMS* e *BLiP*). Os chatbots devem levar estas características em consideração ao construir as interações.

Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/#concepts).
