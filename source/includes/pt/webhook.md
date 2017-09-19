### Webhook

Um *chatbot* do tipo **Webhook** permite ao desenvolvedor realizar a integração através **endpoints HTTP** para troca de mensagens, notificações e comandos.

#### Envio de mensagens

Para enviar mensagens, a aplicação deverá fazer um `HTTP POST` na URL exibida nas configurações do chatbot. A requisição deve conter um cabeçalho de autorização (`Authorization`) com o tipo `Key`, conforme exibido nas configurações do chatbot.

Os dados da mensagem devem ser enviados no corpo da requisição. A mensagem deve ser um *JSON* no formato determinado pelo protocolo LIME. Para mais detalhes, consulte [a documentação do protocolo](http://limeprotocol.org/#message).

Suponha que exista um chatbot com o identificador **blipmessaginghubapp**, veja como seria o envio completo, incluindo os cabeçalhos e a mensagem:
```
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Length: 131

{
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "to": "551100001111@0mn.io",
  "type": "text/plain",
  "content": "Olá, como podemos te ajudar?"
}
```
Para mais informações sobre mensagens consulte a [documentação de **Mensagens**](.#/docs/concepts/messages) ou a [documentação do tipos de conteúdo suportados](.#/docs/content-types).

##### Recebimento notificações
Caso seja configurada a URL de notificações do chatbot, serão entregues nessa URL as notificações contendo os _status_ das mensagens. Observe que as notificações são enviadas pelo *clientes*, informando se receberam ou não uma mensagem enviada pelo chatbot.

Nesse caso também será realizado um `HTTP POST` com a informação no formato JSON, conforme formato definido pelo [protocolo LIME](http://limeprotocol.org/#notification). Veja um exemplo de uma notificação da mensagem anterior:
```
{
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net/7a8fr233x",
  "event": "received"
}
```
Para mais informações e exemplos de notificações consulte a [documentação de **Notificações**](.#/docs/concepts/notifications)

---

#### Recebimento de mensagens

A URL de mensagens configurada receberá um `HTTP POST` com a mensagem enviada por um cliente no formato JSON, também no formato definido pelo [protocolo LIME](http://limeprotocol.org/#message), conforme o exemplo abaixo:
```
{
  "id": "99cf454e-f25d-4ebd-831f-e48a1c612cd4",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net",
  "type": "text/plain",
  "content": "Ajuda"
}
```

##### Envio de notificações

Para que o histórico de mensagens seja exibido de forma correta, é importante que os chatbots enviem notificações de processamento das mensagens recebidas, para os clientes que as originaram. 

Para isso, é necessário enviar uma notificação com o evento `consumed`. E em caso de erros inesperados de processamento, deve ser enviada notificação com evento `failed`. A requisição também deve conter um cabeçalho de autorização (`Authorization`) com o tipo `Key`, conforme exibido nas configurações do chatbot.

Por exemplo, supondo que a mensagem recebida no exemplo anterior foi processada, o envio completo da notificação, incluindo os cabeçalhos e o corpo da requisição para a mensagem (cujo id é **99cf454e-f25d-4ebd-831f-e48a1c612cd4**) será:
```
POST https://msging.net/notifications HTTP/1.1
Content-Type: application/json
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Length: 131

{
  "id": "99cf454e-f25d-4ebd-831f-e48a1c612cd4",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "event": "consumed"
}
```

---

#### Envio de comandos

O envio de comandos é útil para o uso das extensões da plataforma, como **agendamento** ou **armazenamento**. Estes devem ser enviados na URL `/commands`, se forma similar a mensagens e notificações:

Por exemplo, enviando um comando para agendamento de uma mensagem:

```
POST https://msging.net/commands HTTP/1.1
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Type: application/json
Content-Length: 393

{  
  "id":"2",
  "to":"postmaster@scheduler.msging.net",
  "method":"set",
  "uri":"/schedules",
  "type":"application/vnd.iris.schedule+json",
  "resource":{  
    "message":{  
      "id":"ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
      "to":"553100001111@0mn.io",
      "type":"text/plain",
      "content":"Mensagem agendada"
    },
    "when":"2016-07-25T17:50:00.000Z"
  }
}
```

A resposta do comando é entregue imediatamente na resposta HTTP, como abaixo:

```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Date: Mon, 12 Sep 2016 17:35:02 GMT
Content-Length: 131

{  
  "id":"2",
  "from":"postmaster@scheduler.msging.net/#irismsging1",
  "to":"blipmessaginghubapp@msging.net",
  "method":"set",
  "status":"success"
}

```
#### Códigos de retorno para envio

| Código              | Descrição                                                                               |
|---------------------|-----------------------------------------------------------------------------------------|
| 202 (Accepted)      | Envelope aceito pelo servidor                                                           |
| 400 (Bad Request)   | Indica algum problema com o formato ou campos do envelope enviado                       |
| 401 (Unauthorized)  | Indica algum problema ou falta do cabeçalho Authorization                               |

---

#### Configuração

| Nome                          | Descrição                                                                     |
|-------------------------------|-------------------------------------------------------------------------------|
| Url para receber mensagens    | Endereço onde o BLiP irá postar as mensagens                                  |
| Url para receber notificações | Endereço onde o BLiP irá postar as notificações                               |
