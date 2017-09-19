### Notificações

Uma **notificação** provê informações sobre uma mensagem enviada.

Cada notificação possui:
- **id**: Identificador da mensagem relacionada.
- **from**: Endereço do originador da notificação. Uma notificação pode ser gerada pelo servidor (`postmaster@msging.net`) ou pelo cliente final, dependendo do **evento**.
- **to**: Endereço do destinatário da mensagem.
- **event**: Evento relacionado a mensagem. Os eventos do destinatário dependem do canal, podendo não estar disponíveis. Os valores válidos são:
  * **accepted**: A mensagem foi aceita pelo servidor.
  * **dispatched**: A mensagem saiu do servidor e foi despachada ao destinatário.
  * **received**: O destinatário recebeu a mensagem.
  * **consumed**: O destinatário leu a mensagem.
  * **failed**: A mensagem falhou. Neste caso, a propriedade **reason** deve estar presente.
- **reason**: Motivo da falha da mensagem.

Veja a representação JSON de uma notificação de recebimento no destinatário:

```json

{
  "id": "65603604-fe19-479c-c885-3195b196fe8e",
  "from": "551199991111@0mn.io/182310923192",
  "to": "mycontact@msging.net",
  "event": "received"
}

```
E uma falha no servidor:

```json

{
  "id": "65603604-fe19-479c-c885-3195b196fe8e",
  "from": "postmaster@msging.net/server1",
  "to": "mycontact@msging.net",
  "event": "failed",
  "reason": {
    "code": 42,
    "description": "Destination not found"
  },
  "metadata": {
    "#message.to": "551199991111@0mn.io/182310923192"
  }
}

```

Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/index.html#notification).
