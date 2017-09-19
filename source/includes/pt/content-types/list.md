### Lista
| MIME type                            | C#                                 |
|--------------------------------------|------------------------------------|
| application/vnd.lime.list+json       | [Lime.Messaging.Contents.DocumentList](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/DocumentList.cs) |

Permite o envio de uma lista de documentos diferentes uma única mensagem. É possível definir um documento como cabeçalho da lista.

#### Exemplos
1 - Enviando uma lista com cabeçalho de **links da web** para um usuário do Messenger:
```json
 {
     "id": "1",
     "to": "123129898129832@msging.gw.msging.net",
     "type":"application/vnd.lime.list+json",
     "content":{
         "header":{
             "type":"application/vnd.lime.web-link+json",
             "value":{
                 "title":"Bots powered by BLiP",
                 "text":"See some bots powered by BLiP",
                 "previewUri":"https://blip.ai/wp-content/themes/blipai/assets/img-pack/brand_36dp.png",
                 "uri":"https://blip.ai",
                 "target":"selfTall"
             }
         },
         "items":[
             {
                 "type":"application/vnd.lime.web-link+json",
                 "value":{
                     "title":"Santander",
                     "text":"Bot oficial do Santander Brasil",
                     "previewUri":"http://www.rgconsultoriaempresarial.com.br/site/wp-content/uploads/2014/07/SANTANDER.png",
                     "uri":"https://santander.com.br",
                     "target":"selfTall"
                 }
             },
             {
                 "type":"application/vnd.lime.web-link+json",
                 "value":{
                     "title":"Localiza",
                     "text":"Bot oficial da Localiza",
                     "previewUri":"https://pbs.twimg.com/profile_images/491237647478571008/r12mcMNR.png",
                     "uri":"https://www.localiza.com/",
                     "target":"selfTall"
                 }
             }
         ]
     }
 };
```

### Mapeamento nos canais

| Canal              | Tipo                    | 
|--------------------|-------------------------|
| BLiP App           | Não suportado           |
| Messenger          | [List template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template)|
| SMS                | Texto                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
