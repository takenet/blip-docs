### Link da web
| MIME type                | C#                                  |
|--------------------------|-------------------------------------|
| application/vnd.lime.web-link+json               | [Lime.Messaging.Contents.WebLink](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/WebLink.cs) |

Permite o envio de um link para uma página da web, podendo incluir metadados como título e um texto descritivo do link, além de uma imagem miniatura.

#### Exemplo

Enviando uma mensagem para um destinatário do BLiP App:

```json
{
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.web-link+json",
    "content": { 
        "uri": "http://limeprotocol.org/content-types.html#web-link",
        "target": "self",
        "text": "Segue documentação do web-link"        
    }
}
```

Em alguns canais, é possível definir como a página deve ser exibida - por exemplo, na mesma janela, uma nova ou ocupando parte da tela do dispositivo - através da propriedade `target`. Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/content-types.html#web-link).

#### Mapeamento nos canais

| Canal              | Tipo                    | 
|--------------------|-------------------------|
| BLiP App           | Link web                |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template) ou [Button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/buttons) (se utilizado junto a um [menu multimídia](https://blip.ai/portal/#/docs/content-types/document-select)). |
| SMS                | Texto com link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|

É também possível em alguns canais utilizar [URI schemes](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) especiais para a criação de links com comportamentos específicos, como abaixo:

| Canal     | URI Scheme | Descrição                                                           | Exemplo              |
|-----------|------------|---------------------------------------------------------------------|----------------------|
| Messenger | `tel`      | Define um link para a ligação telefonica para o número especificado. Mapeado em um [Call button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/call-button). | `tel:+5531999990000` |
| Messenger | `share`    | Define um link para compartilhamento da mensagem atual. Mapeado em um [Share button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/share-button).  | `share:`             |

- No Messenger, estas **URI schemes** são válidas somente se utilizadas junto a um [menu multimídia](https://blip.ai/portal/#/docs/content-types/document-select).
- Para habilitar o uso de [extensões do Messenger](https://developers.facebook.com/docs/messenger-platform/messenger-extension) na página do link, basta incluir na *query string* da URL o parâmetro `messengerExtensions` com valor `true`. No exemplo acima, o valor de `uri` ficaria da seguinte forma: `http://limeprotocol.org/content-types.html#web-link?messengerExtensions=true`


