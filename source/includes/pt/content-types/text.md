### Texto
| MIME type                | C#                                  |
|--------------------------|-------------------------------------|
| text/plain               | [Lime.Messaging.Contents.PlainText](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/PlainText.cs) |

Permite o envio e recebimento de mensagens de texto simples.

#### Exemplo

Enviando uma mensagem para um destinatário do Messenger:

```json
{
    "id": "1",
    "to": "128271320123982@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Seja bem-vindo ao nosso serviço! Como podemos te ajudar?"
}
```

Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/content-types.html#text).

#### Mapeamento nos canais

| Canal              | Tipo                    | 
|--------------------|-------------------------|
| BLiP Chat          | Texto                   |
| Messenger          | [Text message](https://developers.facebook.com/docs/messenger-platform/send-api-reference/text-message)|
| SMS                | Texto                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|

