## Broadcast



| Address                         | Base URI     |
|---------------------------------|--------------|
| postmaster@broadcast.msging.net | /lists       |

The **broadcast** extension allows creation and management of distribution lists and their members for sending messages to multiple destinations simultaneously. 

Each distribution list has a unique address in the format `list-name@broadcast.msging.net` in addition to the members, who are the recipients of messages sent to this list. Only the chatbot that created a remote list has permissions to send messages to it.

Notifications are forwarded to the chatbot when received by the extension.

#### Default lists

BLiP automatically creates a distribution list with all clients that have already contacted your chatbot. Its address is `[identifier]+senders@broadcast.msging.net` where `identifier` is the identifier of your chatbot, which is used with the access key for authentication.

For example, for a chatbot with identifier `mychatbot`, this list address would be `mychatbot+senders@broadcast.msging.net`.

#### Replacement variables

It is possible to use contact replacement variables in the sent messages. For more information, please check the documentation of the [**Contacts** extension](https://portal.blip.ai/#/docs/extensions/contacts).




#### Availability

The Broadcast service is available in the following domains:

|Domain     |Available  |Observation                                            |
|---	      |---	      |---                                                    |
|Messenger  |x          |Needed initial user interaction with chatbot           |
|BLiP App   |x          |Not necessary initial user interaction with chatbot    |
|Skype      |x          |Needed initial user interaction with chatbot           |
|SMS        |x          |Not necessary initial user interaction with chatbot    |
|Telegram   |x          |Needed initial user interaction with chatbot           |


###Create a list
```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "1",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "type": "application/vnd.iris.distribution-list+json",
  "uri": "/lists",
  "resource": {  
    "identity": "news@broadcast.msging.net"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "1",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| type | The type of the resource. |
| uri    | The command uri   |
| resource | The broadcast document. |

###Add to list

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "2",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "uri": "/lists/news@broadcast.msging.net/recipients",
  "type": "application/vnd.lime.identity",
  "resource": "551100001111@0mn.io"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
  "id": "2",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```


| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| type | The type of the resource. |
| uri    | The command uri   |
| resource | The broadcast document. |

###Remove element from list


```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "3",
  "to": "postmaster@broadcast.msging.net",
  "method": "delete",
  "uri": "/lists/noticias@broadcast.msging.net/recipients/551100001111@0mn.io"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "3",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| type | The type of the resource. |
| uri    | The command uri   |
| resource | The broadcast document. |

###Send message


```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "4",
  "to": "news@broadcast.msging.net",
  "type": "text/plain",
  "content": "Hello participants of this list!"
}
```

```http
//Sent by extension
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
  "id": "4",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  event": "received"
```


```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "4",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "event": "consumed"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| type | The type of the resource. |
| uri    | The command uri   |
| content | Content of the message. |

###Send message with replacement variable

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "5",
  "to": "news@broadcast.msging.net",
  "type": "text/plain",
  "content": "Hello ${contact.name}, come to check out our prices!"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| type | The type of the resource. |
| uri    | The command uri   |
| content | Content of the message. |











