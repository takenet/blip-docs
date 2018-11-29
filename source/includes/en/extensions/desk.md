## Desk

The **desk** extension allows routing and exchange of messages and notifications between bot users and human agents. The human agents can reply the messages using any BLiP supported help desk application ([BLiP Desk](https://desk.blip.ai) for instance). Hence, a bot can forward received messages from users to a **human agent** on the chosen help desk application and vice versa, in a transparent way.

This feature is useful for **enabling humans to reply some complex or unhandled messages as the bot**. For example, imagine that you want a chatbot that knows a lot about soccer teams, but for some reason it doesn't know exactly the tickets prices for some matchs. In this scenario, you can use a human to help the bot answer only when users ask about ticket prices.

*Note: BLiP offers [BLiP Desk](https://desk.blip.ai), a free and powerful desk application to enable humans to reply messages sent by a bot.*

Before using this extension, check if you have already properly set a customer service tool (help desk application) on the Portal and if you already have at least one available human agent to receive and reply to messages.

### Create a ticket for an attendance

Before start to attendance some user is necessary first open a ticket. 
To open a ticket send a command with `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{customerIdentity}`, where `customerIdentity` is the customer identity to be attended. Use the `resource` property to delivery a context for the ticket.

```
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "89e18743",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1%400mn.io",
  "type": "text/plain",
  "resource": "I need a human!"
}
```

Server responds with ticked created

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.ticket+json",
    "resource": {
        "id": "89e18743-ee13-498e-a8a8-de5e8a7da846",
        "sequentialId": 1,
        "ownerIdentity": "testehome1@msging.net",
        "customerIdentity": "ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1@0mn.io",
        "customerDomain": "0mn.io",
        "provider": "Lime",
        "status": "Waiting",
        "storageDate": "2018-07-05T18:55:59.660Z",
        "externalId": "89e18743-ee13-498e-a8a8-de5e8a7da846",
        "rating": 0,
        "team": "Default",
        "unreadMessages": 0,
        "closed": false
    },
    "method": "set",
    "status": "success",
    "id": "89e18743",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "testehome1@msging.net"
}
```

### Forwarding received messages to a human agent

>Imagine a scenario where a user on Messenger channel asks for human help service. Therefore, while the ticket is still open, any message received by the bot should be sent to a **human agent**.

At first, the bot receives a message and decides if it must route the user to a human agent. Imagine for instance that the message **"Hello, I would like to talk to an attendant."** is enough to send the user to an agent.

```
{
    "id": "1",
    "from": "1654804277843415@messenger.gw.msging.net",
    "to": "bot@msging.net/instance",
    "type": "text/plain",
    "content": "Hello, I would like to talk to an attendant."
}
```

To foward a received message to an agent, send the message to **{encoded-user-node}@desk.msging.net**, where

**{encoded-user-node}** is the ASCII-encoded messages' emmiter node.

```
{
    "id": "1",
    "from": "bot@msging.net/instance",
    "to": "1654804277843415%40messenger.gw.msging.net@desk.msging.net",
    "type": "text/plain",
    "content": "Hello, I would like to talk to an attendant."
}
```

### Forwarding received messages from a human agent to a final user

>Imagine a scenario where a human agent is replying to some message to a user on Messenger channel. The message received by the bot from the human agent must be fowarded to the final user.

First, the bot receives a message as below:

```
{
    "id": "2",
    "from": "1654804277843415%40messenger.gw.msging.net@desk.msging.net",
    "to": "bot@msging.net/instance",
    "type": "text/plain",
    "content": "Hello, here is a human being ;)"
}
```

To forward a received message to the specific final user, the bot must decode the received message node so it knows where to respond **{encoded-user-node}@desk.msging.net**:

```
{
    "id": "2",
    "from": "bot@msging.net/instance",
    "to": "1654804277843415@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Hello, here is a human being ;)"
}
```

### Handling the end of an attendance

>When the human agent closes some attendance the bot receives a message with a *Redirect* content type. The Redirect's context property has a *Ticket* with information about the attendance. In order to get a closed attendance information, add a receiver to **application/vnd.lime.redirect+json** content type.

```
{
    "id": "1",
    "to": "54f1dd2e-42d2-43f2-9100-68fbbabb9c83@tunnel.msging.net",
    "type": "application/vnd.lime.redirect+json",
    "content": {
        "context": {
            "type": ""type": "application/vnd.iris.ticket+json",
            "value": {
                "id": "1654804277843415",
                "sequentialId": 0,
                "ownerIdentity": "bot@msging.net",
                "customerIdentity": "1654804277843415@messenger.gw.msging.net",
                "agentIdentity": "ravpacheco%40gmail.com@blip.ai",
                "status": "ClosedAttendant",
                "storageDate":"2018-03-20T20:41:54.330Z",
                "externalId":"3cf18133-7b0f-47d2-8719-bbaec6ee14e4",
                "rating":0,
                "team":"Default",
                "unreadMessages":0
            }
        }
    }
}
```

After receiving the Redirect message, the bot can change the user state and start to handle next messages automatically.

### Closing an ticket as the user

Sometimes may be interesting allow the users close the ticket when they want. To make this possible send a command with `SET` method to `postmaster@desk.msging.net` URI `/tickets/change-status` and resource with ticket `id` and `status` with **ClosedClient**.

```
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "fbfd62ac",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets/change-status",
  "type": "application/vnd.iris.ticket+json",
  "resource": {
  	"id": "fbfd62ac-1dcc-404b-b174-a8f60ccf8659",
  	"status": "ClosedClient"
  }
}
```

```
HTTP/1.1 200 OK
Content-Type: application/json

Server responds with success.

{
    "method": "set",
    "status": "success",
    "id": "fbfd62ac",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "testehome1@msging.net"
}
```

### Finishing a tickets previously closed by customer

The proccess of close a ticket is the last thing to do during an attendance. If a ticket is closed by the customer is possible close permanently to unable any data update. In order to finalize permanently a ticket send a command with `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{ticketId}/close` .

```
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "123219310318",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets/{ticketId}/close",
  "resource": {
	"customerIdentity": "{customerIdentity}",
	"id": "dfd6a0e4-b109-41f1-8513-01673b93a669",
	"ownerIdentity": "{botIdentifier}@msging.net",
	"status": "ClosedClient",
	"tags": ["AtendimentoTeste"]
  }
}
```

<aside class="notice">
Note: The `tags` property can be hide if you didn't set the Tags configurations in Portal.
</aside>

Server responds with all tickets found.

```
HTTP/1.1 200 OK
Content-Type: application/json
```

### Getting all tickets of a bot

In order to get any ticket of some bot send a command with `GET` method to `postmaster@desk.msging.net` and URI `/tickets` .
To filter specific tickets you can use **$filter** parameter on query string with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the ticket   |
| sequentialId    | The ticket sequential id (by bot) |
| ownerIdentity | The identity of the bot ticket owner |
| customerIdentity | The identity of the customer |
| customerDomain    | The domain of the customer  |
| agentIdentity     | The identity of the agent |
| provider | The name of the agent provider for ticket |
| status | The ticket status* |
| storageDate | The ticket creation date |
| externalId | The provider's ticked id |
| rating | Ticket rating for the agent identity |
| team | Ticket team |
| unreadMessages | Gets or sets the number of unread messages of a ticket. Unread messages are messages without consumed notification. |
| closed | The ticket is closed or not |

*Ticket status can assume one of the following values*

| Ticket Status | Description |
|---------------|-------------|
| None | Not defined |
| Waiting | The ticket is waiting for an agent |
| Open | The ticket was claimed by an agent |
| ClosedAttendant | The ticket was closed by the agent |
| ClosedClient | The ticket was closed by the client |
| Transferred | The ticket was transferred |
| Assigned | The ticket is assigned to an agent and is waiting for the consumed notification from them |

```
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "123219310318",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets?$take=10"
}
```

Server responds with all tickets found.

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.ticket+json",
        "items": [
            {
                "id": "f1e95e10-2e21-4438-a076-71183b253981",
                "sequentialId": 0,
                "ownerIdentity": "testehome1@msging.net",
                "customerIdentity": "ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1@0mn.io",
                "customerDomain": "0mn.io",
                "agentIdentity": "rafaelpa%40take.net@blip.ai",
                "provider": "Lime",
                "status": "Open",
                "storageDate": "2018-07-05T16:34:23.610Z",
                "externalId": "f1e95e10-2e21-4438-a076-71183b253981",
                "rating": 0,
                "team": "Default",
                "unreadMessages": 0,
                "closed": false
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "123219310318",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "testehome1@msging.net"
}
```

### Getting all bot's attendants

In order to get all attendants of some bot send a command with `GET` method to `postmaster@desk.msging.net` and URI `/attendants` . This feature is usefull to know if there are any available attendant to answer customers questions.

```
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "123219310318",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/attendants"
}
```

Server responds with a list of attendants and status.

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.attendant+json",
        "items": [
            {
                "identity": "rafaelpa%40take.net@blip.ai",
                "teams": [
                    "Default"
                ],
                "status": "Online",
                "lastServiceDate": "2018-07-05T19:39:07.640Z"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "123219310318",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "testehome1@msging.net"
}

```