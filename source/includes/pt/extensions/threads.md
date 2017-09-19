### Histórico de conversas
| Endereço              | URI base     | Permissões requeridas   | C#                 |
|-----------------------|--------------|-------------------------|--------------------|
| postmaster@msging.net (endereço padrão, não é necessário informar) | /threads | Nenhuma | [IThreadExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Threads/IThreadExtension.cs) |

A extensão **Histórico de conversas** permite o chatbot recuperar as mensagens mais recentes trocadas com um determinado usuário de um canal. O retorno estará sempre em ordem decrescente da data das mensagens, ou seja, as mensagens mais recentes estarão listadas primeiro. 

#### Exemplos
1 - Recuperando a mensagem mais recente de cada conversa:

```json
{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "get",
  "uri": "/threads"
}
```

Resposta em caso de sucesso:

```json
{
  "method": "get",
  "status": "success",
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 2,
    "itemType": "application/vnd.iris.thread+json",
    "items": [
      {
        "ownerIdentity": "contact@msging.net",
        "identity": "1180740631991418@messenger.gw.msging.net",
        "lastMessage": {
          "id": "39ed84b9-f89e-4090-a27e-6bd1e69bdfef",
          "direction": "sent",
          "type": "text/plain",
          "content": "Bem vindo!",
          "date": "2016-12-06T12:32:44.799Z"
        },
        "unreadMessages": 0
      },
      {
        "ownerIdentity": "contact@msging.net",
        "identity": "29%3A1SaTsDWumQFx72srIXI8uhTlpRzPwuJ4TRVhRpSBB7mQ@skype.gw.msging.net",
        "lastMessage": {
          "id": "cc2b70ce-921b-4856-ae41-f00d897f1423",
          "direction": "received",
          "type": "text/plain",
          "content": "Olá",
          "date": "2016-11-24T20:41:38.940Z"
        },
        "unreadMessages": 1
      }
    ]
  }
}
```

2 - Recuperando as últimas mensagens de uma determinada conversa:

```json
{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "get",
  "uri": "/threads/1180740631991418@messenger.gw.msging.net"
}
```

Resposta em caso de sucesso:

```json
{
  "method": "get",
  "status": "success",
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 3,
    "itemType": "application/vnd.iris.thread-message+json",
    "items": [
      {
        "id": "39ed84b9-f89e-4090-a27e-6bd1e69bdfef",
        "direction": "sent",
        "type": "text/plain",
        "content": "Bem vindo!",
        "date": "2016-12-06T12:32:44.799Z",
        "status": "consumed"
      },
      {
        "id": "15073ef5-9bab-493c-b630-8636eacba33e",
        "direction": "sent",
        "type": "text/plain",
        "content": "Este é um chatbot de testes.",
        "date": "2016-12-06T12:32:40.640Z",
        "status": "consumed"
      },
      {
        "id": "9b49a7d6-d025-4bb6-a370-1d48fb457deb",
        "direction": "received",
        "type": "text/plain",
        "content": "Bom dia.",
        "date": "2016-12-06T12:32:35.398Z",
        "status": "accepted"
      }
    ]
  }
}
```

