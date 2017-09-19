### Contatos
| Endereço              | URI base     | Permissões requeridas   | C#              |
|-----------------------|--------------|-------------------------|-----------------|
| postmaster@msging.net (endereço padrão, não é necessário informar) | /contacts | Nenhuma | [ContactExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Contacts/ContactExtension.cs) |

A extensão **contatos** permite o gerenciamento da agenda de contatos do chatbot, que pode ser utilizada para armazenamento dos dados dos clientes do bot. É possível salvar informações como nome, endereço, sexo além de informações genéricas, dentro da propriedade `extras`. Esta propriedade aceita somente valores do tipo `string`, não sendo permitidos objetos complexos. Você também pode definir a propriedade `group` para organização dos contatos. Eventos nos quais a propriedade `identity` é de um grupo especial chamado 'testers'  serão ignorados no painel de eventos do BLiP.

Também é possível utilizar os campos dos contatos como variáveis em mensagens de texto enviadas pelo chatbot.

Para informações sobre todos os campos suportados, consulte a documentação do [protocolo Lime](http://limeprotocol.org/resources.html#contact). 

#### Exemplos
1 - Adicionando um contato do Messenger:
```json
{  
  "id": "1",
  "method": "set",
  "uri": "/contacts",
  "type": "application/vnd.lime.contact+json",
  "resource": {
    "identity": "11121023102013021@messenger.gw.msging.net",
    "name": "João da Silva",
    "gender":"male",
    "group":"amigos",
    "extras": {
      "plan":"Gold",
      "code":"1111"      
    }
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

2 - Consultando um contato:
```json
{  
  "id": "2",
  "method": "get",
  "uri": "/contacts/11121023102013021@messenger.gw.msging.net"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.contact+json",
  "resource": {
    "identity": "11121023102013021@messenger.gw.msging.net",
    "name": "João da Silva",
    "gender":"male",
    "group":"amigos",
    "extras": {
      "plan":"Gold",
      "code":"1111"      
    }
  }  
}
```

3 - Buscando 3 contatos da agenda de maneira paginada:
```json
{  
  "id": "3",
  "method": "get",
  "uri": "/contacts?$skip=0&$take=3"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType":"application/vnd.lime.contact+json",
    "total":10,
    "items": [
      {"identity": "11121023102013021@messenger.gw.msging.net","name": "João da Silva","gender":"male", "group":"amigos","extras":{"plan":"Gold","code":"1111"}},
      {"identity": "213121@telegram.gw.msging.net","name": "Zezim do Telegram","email":"ze@gmail.com"},
      {"identity": "5511999990000@take.io","name": "Maria"}
    ]    
  }  
}
```

#### Substituição de variáveis das mensagens

Os campos da agenda de contatos podem ser utilizados para substituir variáveis de mensagens enviadas pelo chatbot. Para ativar a substituição em uma mensagem, é necessário informar no campo `metadata` da mensagem a chave `#message.replaceVariables` com valor `true` (observação: no caso do envio em massa, este valor **não deve ser informado**) e incluir no texto da mensagem as variáveis no formato `${contact.<propertyName>}`, onde `<propertyName>` é a propriedade do contato para substituição. É possível a substituição de todos os campos do contato, inclusive de chaves na propriedade `extras`. Neste caso, basta utilizar a convenção `${contact.extras.<extraPropertyName>}`, sendo `<extraPropertyName>` o valor para substituição. Caso o valor de uma variável não exista, a mesma é removida da mensagem.

#### Exemplos

1 - Enviando uma mensagem incluindo o nome do contato:
```json
{  
  "id": "1",
  "to": "11121023102013021@messenger.gw.msging.net",
  "type": "text/plain",
  "content": "Olá, ${contact.name}, seja bem vindo ao plano ${contact.extras.plan}!",
  "metadata": {
    "#message.replaceVariables": "true"
  }
}
```

Neste exemplo, a mensagem final que será entregue ao cliente será:
```json
{  
  "id": "1",
  "to": "11121023102013021@messenger.gw.msging.net",
  "type": "text/plain",
  "content": "Olá, João da Silva, seja bem vindo ao plano Gold!",
  "metadata": {
    "#message.replaceVariables": "true"
  }
}
```
