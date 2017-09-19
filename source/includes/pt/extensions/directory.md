### Diretório
| Endereço                        | URI base     | Permissões requeridas   | C#                     |
|---------------------------------|--------------|-------------------------|------------------------|
| `postmaster@<FQDN do canal>` | `lime://<FQDN do canal>/accounts/<Identificador do cliente>`       | Nenhuma      | [DirectoryExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Directory/DirectoryExtension.cs) |

A extensão **diretório** permite consultar informações dos clientes conectados aos canais, como nome e outras informações pessoais. O comando deve ser enviado diretamente ao `postmaster` do canal, utilizando uma **URI** especial. 

Caso a informação esteja disponível, é retornado um documento do tipo [Account](http://limeprotocol.org/resources.html#account), sendo que as informações disponíveis podem variar por canal e cliente. Por este motivo, a aplicação deve tratar de maneira adequada estas exceções.

O resultado das consultas no diretório que foram realizadas com sucesso são armazenadas automaticamente na **agenda de contatos** do chatbot, exceto quando já existe um contato com o mesmo identificador do cliente. Para maiores informações sobre a agenda de contatos, consulte a [documentação desta extensão](https://portal.blip.ai/#/docs/extensions/contacts).

#### Exemplos

1 - Obtendo informações do cliente `1042221589186385@messenger.gw.msging.net` no **Messenger**
```json
{  
  "id": "1",
  "to": "postmaster@messenger.gw.msging.net",
  "method": "get",
  "uri": "lime://messenger.gw.msging.net/accounts/1042221589186385"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "1",
  "from": "postmaster@messenger.gw.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "type": "application/vnd.lime.account+json",
  "method": "get",
  "status": "success",
  "resource": {
    "fullName": "Astraugésilo de Athayde",
    "photoUri": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtf1/v/t1.0-1/p200x200/14429_1013121325123122924983_n.jpg",
    "gender": "male",
    "culture": "pt-BR",
    "timezone": -3
  }
}
```

2 - Obtendo informações do cliente `255600202@telegram.gw.msging.net` no **Telegram**
```json
{  
  "id": "2",
  "to": "postmaster@telegram.gw.msging.net",
  "method": "get",
  "uri": "lime://telegram.gw.msging.net/accounts/255600202"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "2",
  "from": "postmaster@telegram.gw.msging.net/#irismsging2",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.account+json",
  "resource": {
    "fullName": "João da Silva Sauro"
  }
}
```

3 - Obtendo informações do cliente `553199991111@0mn.io` no **Blip App**
```json
{  
  "id": "3",
  "to": "postmaster@0mn.io",
  "method": "get",
  "uri": "lime://0mn.io/accounts/553199991111"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "3",
  "from": "postmaster@0mn.io/#irisomni2",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.account+json",
  "resource": {
    "fullName": "Jeremias José do Nascimento",
    "photoUri": "http://images.uncyc.org/pt/1/10/Jeremiasbar.jpg"
  }
}
```
