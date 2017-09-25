## Chat history
| Address               | Base URI     |
|-----------------------|--------------|
| postmaster@msging.net (default address - not required) | /threads |

The **chat history** extension allows the chatbot to retrieve the last threads and messages exchanged with the customers.

```http
//Examples
//1 - Retrieving the most recent threads:

{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "get",
  "uri": "/threads"
}

//Response on success:

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
          "content": "Welcome to our service!",
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
          "content": "Hi",
          "date": "2016-11-24T20:41:38.940Z"
        },
        "unreadMessages": 1
      }
    ]
  }
}

//2 - Retrieving the last messages of a thread:

{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "get",
  "uri": "/threads/1180740631991418@messenger.gw.msging.net"
}

//Response on success:

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
        "content": "Welcome!",
        "date": "2016-12-06T12:32:44.799Z",
        "status": "consumed"
      },
      {
        "id": "15073ef5-9bab-493c-b630-8636eacba33e",
        "direction": "sent",
        "type": "text/plain",
        "content": "This is a test chatbot.",
        "date": "2016-12-06T12:32:40.640Z",
        "status": "consumed"
      },
      {
        "id": "9b49a7d6-d025-4bb6-a370-1d48fb457deb",
        "direction": "received",
        "type": "text/plain",
        "content": "Good morning",
        "date": "2016-12-06T12:32:35.398Z",
        "status": "accepted"
      }
    ]
  }
}
```

