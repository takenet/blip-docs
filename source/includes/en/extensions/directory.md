### Directory
| Address                      | Base URI      |  C#                     |
|------------------------------|---------------|-------------------------|
| `postmaster@<FQDN do canal>` | `lime://<FQDN of the channel>/accounts/<Client identifier>` | [DirectoryExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Directory/DirectoryExtension.cs) |

The **directory** extension allows quering information about the customers, like name, photo and other personal information. The query command should be sent directly to the client's channel `postmaster`, using an special **URI**.

If the information is available, an [Account](http://limeprotocol.org/resources.html#account) document is returned. The availability and the detail level of the informations depents of the channel and the application should handle the differences appropriately.

The result of directory queries are automatically stored in the **chatbot's roster**, except when there's already an entry with the same identifier in the contacts. For more information about the roster, please refer to the [extension documentation](https://portal.blip.ai/#/docs/extensions/contacts).

#### Examples

1 - Getting information about the client `1042221589186385@messenger.gw.msging.net` on **Messenger**:
```json
{  
  "id": "1",
  "to": "postmaster@messenger.gw.msging.net",
  "method": "get",
  "uri": "lime://messenger.gw.msging.net/accounts/1042221589186385"
}
```
Response on success:
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

2 - Getting information about the client `255600202@telegram.gw.msging.net` on **Telegram**:
```json
{  
  "id": "2",
  "to": "postmaster@telegram.gw.msging.net",
  "method": "get",
  "uri": "lime://telegram.gw.msging.net/accounts/255600202"
}
```
Response on success:
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

