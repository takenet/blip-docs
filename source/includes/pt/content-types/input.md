### Entrada do usuário
| MIME type                            | C#                                   |
|--------------------------------------|--------------------------------------|
| application/vnd.lime.input+json      | [Lime.Messaging.Contents.Input](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/Input.cs) |

Permite o envio de solicitação de informações ao usuário de maneira estruturada, sendo possível definir regras de validação. É útil para construção de questionários ou obtenção de informações específicas, como localização ou uma imagem do usuário.

A execução da regra de validação depende de suporte do canal.

#### Exemplos
1 - Solicitando o nome de um usuário:
```json
{
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.input+json",
    "content": {
        "label": {
          "type": "text/plain",
          "value": "Qual o seu nome?"
        },
        "validation": {
          "rule": "text"          
        }
    }
}
```

2 - Solicitando a localização de um usuário:
```json
{
    "id": "2",
    "to": "1334448323284655@messenger.gw.msging.net",
    "type": "application/vnd.lime.input+json",
    "content": {
        "label": {
          "type": "text/plain",
          "value": "Envie sua localização para podermos te atender melhor"
        },
        "validation": {
          "rule": "type",
          "type": "application/vnd.lime.location+json"
        }
    }
}
```

Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/content-types.html#input).

### Mapeamento nos canais

| Canal              | Tipo                    | 
|--------------------|-------------------------|
| BLiP App           | Texto                   |
| Messenger          | [Location](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies) |
| SMS                | Texto                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|

