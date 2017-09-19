### Estado da conversa
| MIME type                                 | C#                                        |
|-------------------------------------------|-------------------------------------------|
| application/vnd.lime.chatstate+json | [Lime.Messaging.Contents.ChatState](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/ChatState.cs) |

Permite o envio e recebimento de informação sobre o estado atual da conversa. Os estados possíveis são:

| Estado        | Descrição                          |
|---------------|------------------------------------|
| *starting*    | Iniciando nova conversa |
| *composing*   | Digitando/preparando uma mensagem  |
| *paused*      | Digitação de nova mensagem foi interrompida (e não enviada)  |
| *deleting*    | Apagando mensagem (que estava sendo preparada) |
| *gone*        | Saiu/terminou a conversa  |

De forma geral não há necessidade de receber notificações de entrega de mensagens com este conteúdo, portanto é recomendado omitir o  Id nestas mensagens.
Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/content-types.html#chatstate).

#### Exemplo
Enviando estado *digitando* para usuário do Telegram:
```json
{
    "to":"104222@telegram.gw.msging.net",
    "type":"application/vnd.lime.chatstate+json",
    "content": {
        "state": "composing"
    }
}
```

### Mapeamento nos canais

| Canal              | Tipo      | Estados suportados      | 
|--------------------|-----------|-------------------------|
| BLiP App           | Estado da Conversa | Todos |
| Messenger          | [Sender Actions](https://developers.facebook.com/docs/messenger-platform/send-api-reference/sender-actions) e [Referral](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral) | *composing* e *paused* (somente envio) e *starting* (referral de uma conversa existente) |
| SMS                | - | Nenhum |
| Skype              | - | Nenhum |
| Telegram           | [SendChatAction](https://core.telegram.org/bots/api#sendchataction) | *composing* (somente envio) |
