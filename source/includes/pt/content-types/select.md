### Menu
| MIME type                                 | C#                                        |
|-------------------------------------------|-------------------------------------------|
| application/vnd.lime.select+json | [Lime.Messaging.Contents.Select](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/Select.cs) |

Permite o envio de um menu de opções aos clientes para a realização de uma escolha. O cabeçalho e as opções são do tipo texto, sendo possível definir um documento que deve ser entregue ao chatbot quando o cliente realiza uma escolha (depende de suporte do canal). As opções podem opcionalmente serem numeradas.

Alguns canais suportam a limitação do escopo das opções, que determina por quanto tempo as mesmas são válidas para seleção por parte do usuário. Por exemplo, em alguns casos as opções enviadas só podem ser selecionadas pelo cliente naquele momento e devem desaparecer após a escolha. Neste caso, o escopo é **imediato**. Em outros, as opções são válidas para seleção em qualquer momento, sendo o escopo **persistente**.

Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/content-types.html#select).

#### Exemplo
Menu com opções numeradas
```json
{
    "id":"311F87C0-F938-4FF3-991A-7C5AEF7771A5",
    "to":"1042221589186385@messenger.gw.msging.net",
    "type":"application/vnd.lime.select+json",
    "content":{
        "text":"Escolha uma opção",
        "options":[
            {
                "text":"Primeira opção"
            },
            {
                "order":2,
                "text":"Segunda opção"
            },
            {
                "order":3,
                "text":"Terceira opção",
                "type":"application/json",
                "value":{
                    "key1":"value1",
                    "key2":2
                }
            }
        ]
    }
}
```
Quando o usuário seleciona uma opção, uma mensagem é retornada conforme a regra:

- Se a opção contém o campo 'value' ele será retornado.
- Caso contrário, será retornado o valor do campo 'order' se ele estiver preenchido.
- Caso nenhum dos valores acima esteja preenchido será retornado o campo 'text'.

Exemplo de retorno do menu acima:

Ao selecionar a primeira opção:
```json
{
    "id": "f8cf7a7a-be4f-473a-8516-60d55534b5a6",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "text/plain",
    "content": "Primeira opção"
}
```
Ao selecionar a segunda opção:
```json
{
    "id": "76CB408D-39E6-4212-8AA1-7435B42A6993",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "text/plain",
    "content": "2"
}
```
E por último ao selecionar a terceira opção:
```json
{
    "id": "035E675C-D25B-437D-80BD-057AD6F70671",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "application/json",
    "content": {
        "key1":"value1",
        "key2":2
    }
}
```

O tipo('type') da mensagem de retorno será sempre o mesmo da opção escolhida. Quando não for definido um valor para o campo 'value' o tipo será 'text/plain'.

### Mapeamento nos canais

| Canal              | Tipo                    | 
|--------------------|-------------------------|
| BLiP Chat           | Select                 |
| Messenger          | [Button template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template) (no escopo padrão) e [Quick replies](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies) (no escopo *immediate*)|
| SMS                | Texto                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
