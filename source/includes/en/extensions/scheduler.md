## Schedule

| Address                         | Base URI     |
|---------------------------------|--------------|
| postmaster@scheduler.msging.net | /schedules   |

The **scheduler** extensions allows the chatbot to schedule messages to be sent in specific date and time on its behalf. Any type of message to any destination can be scheduled, including **broadcast** messages (to a distribution list). The scheduling time must be done in the GMT timezone. Any received notification from a scheduled message is forwarded to the chatbot.

The possible `status` values are `scheduled`, `executed` and `canceled`. 

### Get

Getting an existing scheduled message with id ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67

```http
POST /commands HTTP/1.1
Content-Type: application/json

{  
  "id": "75c1621e-350c-4e85-8854-3e2cf3abbc3a",
  "to": "postmaster@scheduler.msging.net",
  "method": "get",
  "uri": "/schedules/ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "from": "postmaster@scheduler.msging.net/#hmgirismsging2",
  "to": "rssreader@msging.net/default",
  "id": "75c1621e-350c-4e85-8854-3e2cf3abbc3a",
  "method": "get",
  "status": "success",
  "type": "application/vnd.iris.schedule+json",
  "resource": {
    "when": "2016-07-25T17:50:00.000Z",
    "message": {
      "id": "9abfd060-f05b-4ccb-944c-ec9f13525fe0",
      "type": "text/plain",
      "content": "Teste agendamento",
      "from": "contact@msging.net",
      "pp": "postmaster@scheduler.msging.net/contact%40msging.net",
      "to": "destination@msging.net",
    },
    "status": "scheduled"
  }
}
```
#### REQUEST

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination of the command.   |
| method    | The command verb   |
| uri    | The command uri   |

#### RESPONSE

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| from    | The node that is sending you the command.   |
| to    | The destination of the command.   |
| method    | The command verb   |
| status    | The current status of the command (success or failed).   |
| type | The type of the resource. |
| resource | The document schedule. |

### Set

Scheduling a message text/plain with the content 'Scheduling test' to be sent to the user **destination@msging.net** in **2016-07-25T17:50:00.000Z**

```http
POST /commands HTTP/1.1
Content-Type: application/json

{  
  "id": "1",
  "to": "postmaster@scheduler.msging.net",
  "method": "set",
  "uri": "/schedules",
  "type": "application/vnd.iris.schedule+json",
  "resource": {  
    "message": {  
      "id": "ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
      "to": "destination@msging.net",
      "type": "text/plain",
      "content": "Scheduling test"
    },
    "when": "2016-07-25T17:50:00.000Z"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{ 
  "id": "1",
  "from": "postmaster@scheduler.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```


#### REQUEST

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| to    | The destination of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
| type | The type of the resource. |
| resource | The schedule document. |

#### RESPONSE

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| from    | The node that is sending you the command.   |
| to    | The destination of the command.   |
| method    | The command verb   |
| status    | The current status of the command (success or failed). |



