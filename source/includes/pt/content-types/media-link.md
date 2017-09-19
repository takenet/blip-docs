### Link de mídia
| MIME type                            | C#                                   |
|--------------------------------------|--------------------------------------|
| application/vnd.lime.media-link+json | [Lime.Messaging.Contents.MediaLink](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/MediaLink.cs) |

Permite o envio e recebimento de links para conteúdos multimídia. O link pode ser qualquer **URI** válida, mas a maioria dos canais suportam apenas conteúdos servidos pelo protocolo **HTTP/HTTPS**. É possível incluir um título e um texto, além de *metadados* da imagem como MIME type, tamanho e *preview*.

> Nota: O suporte a metadados varia por canal podendo ser ignorados se não suportado

Alguns canais suportam a definição do *aspect ratio* para certos tipos de conteúdo. Por exemplo, no *Messenger*, utilize o valor `1:1` na propriedade `aspectRatio` para enviar imagens quadradas.

#### Exemplos
1 - Enviando o link de uma imagem incluindo título, texto descritivo e metadados:
```json
{
    "id": "1",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "title": "Gato",
        "text": "Segue uma imagem de um gato",
        "type": "image/jpeg",
        "uri": "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
        "aspectRatio": "1:1",
        "size": 227791,        
        "previewUri": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX",
        "previewType": "image/jpeg"
    }
}
```

2 - Enviando o link de um audio:
```json
{
    "id": "2",
    "to": "553199991111@0mn.io",
    "type": "application/vnd.lime.media-link+json",
    "content": {
        "type": "audio/mp3",
        "uri": "http://blaamandagjazzband.dk/jazz/mp3/basin_street_blues.mp3",
        "size": 3124123
    }
}
```

Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/content-types.html#media-link).

### Mapeamento nos canais

| Canal              | Tipo                    | 
|--------------------|-------------------------|
| BLiP App           | Link multimídia         |
| Messenger          | [Attachments](https://developers.facebook.com/docs/messenger-platform/send-api-reference/image-attachment) (image/audio/video/file, dependendo do MIME type)  |
| SMS                | Texto com link          |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|

