## Delegation

```json
// Examples
//1 - Giving permissions to send messages to the identity **postmaster@broadcast.msging.net**:

{  
  "id": "1",
  "method": "set",
  "type": "application/vnd.lime.delegation+json",
  "uri": "/delegations",
  "resource": {  
    "target": "postmaster@broadcast.msging.net",
    "envelopeTypes": [  
      "message"
    ]
  }
}
//Response on success:

{
  "method": "set",
  "status": "success",
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}

//2 - Revoking the same permissions:

{  
  "id": "2",
  "method": "delete",
  "uri": "/delegations/postmaster@broadcast.msging.net?envelopeTypes=message"
}
//Response on success:

{
  "method": "delete",
  "status": "success",
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```


| Endereço              | URI base     | Permissões requeridas   | C#                 |
|-----------------------|--------------|-------------------------|--------------------|
| postmaster@msging.net (default address - not required) | /delegations | None | [DelegationExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Delegation/DelegationExtension.cs) |


The **delegation** extension allows the chatbot to give permissions to other **BLiP** identities - like another chatbots - to execute action *on its behalf* like sending messages. The delegation can be required by some extensions. It is required to be execute only once for each delegated identity.

For more details, check the **delegation** resource on [LIME protocol](http://limeprotocol.org/resources.html#delegation) specification.
