## Delegation


| Address              | Base URI     | Required Permissions   |
|-----------------------|--------------|-------------------------|
| postmaster@msging.net (default address - not required) | /delegations | None |


The **delegation** extension allows the chatbot to give permissions to other **BLiP** identities - like another chatbots - to execute action *on its behalf* like sending messages. The delegation can be required by some extensions. It is required to be execute only once for each delegated identity.

For more details, check the **delegation** resource on [LIME protocol](http://limeprotocol.org/resources.html#delegation) specification.


###Give permissions

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

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
```
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "method": "set",
  "status": "success",
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination address of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
| resource | Info about the target and the permission |

###Revoke permissions
```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "2",
  "method": "delete",
  "uri": "/delegations/postmaster@broadcast.msging.net?envelopeTypes=message"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "method": "delete",
  "status": "success",
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination address of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
