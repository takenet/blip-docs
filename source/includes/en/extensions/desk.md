## Desk

The **desk** extension allows routing and exchange of messages and notifications between bot users and human agents. The human agents can reply the messages using any Blip supported help desk application ([Blip Desk](https://desk.blip.ai) for instance). Hence, a bot can forward received messages from users to a **human agent** on the chosen help desk application and vice versa, in a transparent way.

This feature is useful for **enabling humans to reply some complex or unhandled messages as the bot**. For example, imagine that you want a chatbot that knows a lot about soccer teams, but for some reason it doesn't know exactly the tickets prices for some matchs. In this scenario, you can use a human to help the bot answer only when users ask about ticket prices.

*Note: Blip offers [Blip Desk](https://desk.blip.ai), a free and powerful desk application to enable humans to reply messages sent by a bot.*

Before using this extension, check if you have already properly set a customer service tool (help desk application) on the Portal and if you already have at least one available human agent to receive and reply to messages.

### Add new agents

Add new agents to your attendance team.

You must submit a [attendant](/#attendant) document, with at least an `identity` and a `team`.

You can also send a `application/vnd.lime.collection+json` if you want to add many agents at once.

For each attendant sent that already haven't an account on Blip, that endpoint will send an invitation e-mail for them. Furthermore, set all the permissions needed to the attendant starts an attendance.
<aside class="notice">
Note: The identity must be in the form <b>jhonny%40email.com@blip.ai</b>.
</aside>

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/attendants',
        'application/vnd.iris.desk.attendant+json',
        {
            'identity': '{identity}',
            'teams': [
                '{team1}'
            ]
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
    "id": "{{$guid}}",
    "to": "postmaster@desk.msging.net",
    "method": "set",
    "uri": "/attendants",
    "type": "application/vnd.iris.desk.attendant+json",
    "resource": {
        "identity": "{identity}",
        "teams": [
            "{team1}"
        ]
    }
}
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
    "id": "75481236",
    "to": "postmaster@desk.msging.net",
    "method": "set",
    "uri": "/attendants",
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.attendant+json",
        "items": [
            {
                "identity": "{identity}",
                "teams": [
                    "{team1}"
                ]
            }
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
    "id": "7b976881-ef37-4645-970c-ea96a0ea125f",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/attendants",
    type: "application/vnd.iris.desk.attendant+json",
    resource: {
        identity: "{identity}",
        teams: [
            "{team1}"
        ]
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/attendants"),
    Type: "application/vnd.iris.desk.attendant+json",
    Resource = new Attendant {
        Identity = "{identity}",
    }
};
```

### Add custom replies to a category

Add a category with a collection of custom replies.

You must send a `application/vnd.lime.collection+json` document of [custom replies](/#customreply) objects.

Replace `{categoryId}` with the category id you want to add custom replies to.

<aside class="notice">
You can also create a new category, just informing a new category id.
</aside>

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/replies/{categoryId}',
        'application/vnd.lime.collection+json',
        {
            'itemType': 'application/vnd.iris.desk.custom-reply+json',
            'items': [
                {
                    'category': '{categoryName}',
                    'document': '{content}',
                    'id': '{messageId}',
                    'isDynamicContent': {True/False},
                    'name': '{replyName}',
                    'type': '{replyType}'
                }
            ]
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@desk.msging.net",
    "method": "set",
    "uri": "/replies/{categoryId}",
    "type": "application/vnd.lime.collection+json",
    "resource":{
        "itemType": "application/vnd.iris.desk.custom-reply+json",
        "items": [
            {
                "category": "{categoryName}",
                "document": "{content}",
                "id": "{messageId}",
                "isDynamicContent": {true/false},
                "name": "{replyName}",
                "type": "{replyType}"
            }
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
    "id": "4ar4b5a4-1b21ae4a",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot@msging.net
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/replies/{categoryId}",
    type: "application/vnd.lime.collection+json",
    resource:{
        itemType: "application/vnd.iris.desk.custom-reply+json",
        items: [
         {
               category: "{categoryName}",
               document: "{content}",
               id: "{messageId}",
               isDynamicContent: "{true/false}",
               name: "{replyName}",
               type: "{replyType}"
           }
        ]
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/replies/{categoryId}"),
    Type: "application/vnd.lime.collection+json",
    Resource = {
        itemType: "application/vnd.iris.desk.custom-reply+json"
        items: [
            {
                category: "{categoryName}",
                document: "{content}",
                id: "{messageId}",
                isDynamicContent: "{true/false}",
                name: "{replyName}",
                type: "{replyType}"
            }
        ]
    }
};
```

### Add ticket tags

Each [ticket](/#ticket) has an optional parameter called `Tags`. A tag is a label to identify important things in a ticket.
To add tags in a specifc ticket send a command with `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{ticketId}/change-tags`, where `ticketId` is the ticket identifier to be updated. Use the `resource` property to send tags informations.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac/change-tags',
        'application/vnd.iris.ticket+json',
        {
            'id': 'ba11b95c-7564-4685-b835-8cc76fae6fac',
            'tags': ['tag1', 'tag2', 'tag3']
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac/change-tags",
  "type": "application/vnd.iris.ticket+json",
  "resource": {
    "id": "ba11b95c-7564-4685-b835-8cc76fae6fac",
    "tags": ["tag1", "tag2", "tag3"]
  }
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac/change-tags",
    type: "application/vnd.iris.ticket+json",
    resource: {
        id: "ba11b95c-7564-4685-b835-8cc76fae6fac",
        tags: ["tag1", "tag2", "tag3"]
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac/change-tags"),
    Resource = myTagsDocument
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

Server responds with ticked created

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "8d1f6a56-e287-4a0f-9030-6983c76ad26c",
    "from": "postmaster@desk.msging.net/#az-iris6",
    "to": "amt@msging.net",
    "metadata": {
        "#command.uri": "lime://amt@msging.net/tickets/d9e8fa05-a1da-4b3e-ab1f-0168be6e5be3/change-tags"
    }
}
```

```javascript
{
  method: 'set',
  status: 'success',
  id: '4aeb921f-406c-42d6-94ea-189be78d92c4',
  from: 'postmaster@desk.msging.net/#az-iris3',
  to: 'testehome1@msging.net/default',
  metadata:
   { '#command.uri':
      'lime://demobot4@msging.net/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac/change-tags' }
      }
```


### Get tags
The `Tags` used to close a [ticket](/#ticket) that can be defined on Tag Manager or on Automatic Closing of Tickets.
To get all the active tags setted on Desk send a command with `GET` method to `postmaster@desk.msging.net` and URI `/tags/active`.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tags/active"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/tags/active',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/tags/active"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tags/active"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

Server responds with actives tag list

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "get",
    "status": "success",
    "id": "8d1f6a56-e287-4a0f-9030-6983c76ad26c",
    "from": "postmaster@desk.msging.net/#az-iris6",
    "to": "amt@msging.net/portal-user%40take.net",
    "type": "application/vnd.lime.collection+json",
    "metadata": {
        "#command.uri": "lime://amt@msging.net/tags/active"
    },
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.tag-tickets-summary+json",
        "items": [
            {
              "name": "tag1", 
              "closedTickets": 0, 
              "ticketsCount": 0
            }
        ]
    },
}
```

### Assign a ticket to an agent

You can assign a [ticket](/#ticket) to a specific agent to give him the attendance.

To make this possible send a command with `SET` method to `postmaster@desk.msging.net` URI `/tickets/change-status` and resource with ticket `id`, `status` with **Open** and `agentIdentity` with the **agent identity**.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/tickets/change-status',
        'application/vnd.iris.ticket+json',
        {
            'id': '{ticketId}',
            'status': 'Open',
            'agentIdentity': '{agentIdentity}'
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets/change-status",
  "type": "application/vnd.iris.ticket+json",
  "resource": {
    "id": "{ticketId}",
    "status": "Open",
    "agentIdentity": "{agentIdentity}"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "fbfda48q962ac",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/tickets/change-status",
    type: "application/vnd.iris.ticket+json",
    resource: {
    id: "{ticketId}",
    status: "Open",
    agentIdentity: "{agentIdentity}"
    }
});
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/change-status"),
    Resource = new Ticket
    {
        Id = ticketId,
        Status = TicketStatusEnum.Open
        AgentIdentity = agentIdentity
    }
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Close a ticket as attendant

Closing a [ticket](/#ticket) as the attendant.

To make this possible send a command with `SET` method to `postmaster@desk.msging.net` URI `/tickets/change-status` and resource with ticket `id` and `status` with **ClosedAttendant**.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/tickets/change-status',
        'application/vnd.iris.ticket+json',
        {
            'id': '{ticketId}',
            'status': 'ClosedAttendant'
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@desk.msging.net",
    "method": "set",
    "uri": "/tickets/change-status",
    "type": "application/vnd.iris.ticket+json",
    "resource": {
        "id": "{ticketId}",
        "status": "ClosedAttendant"
    }
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/tickets/change-status",
    type: "application/vnd.iris.ticket+json",
    resource: {
        id: "{ticketId}",
        status: "ClosedAttendant"
    }
});
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/change-status"),
    Resource = new Ticket
    {
        Id = ticketId,
        Status = TicketStatusEnum.ClosedAttendant
    }
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

Server responds with success.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "fbfd62ac",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "testehome1@msging.net"
}
```

### Close a ticket as user

Sometimes may be interesting allow the users close the [ticket](/#ticket) when they want. To make this possible send a command with `SET` method to `postmaster@desk.msging.net` URI `/tickets/change-status` and resource with ticket `id` and `status` with **ClosedClient**.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/ticket/change-status',
        'application/vnd.iris.ticket+json',
        {
            'id': 'fbfd62ac-1dcc-404b-b174-a8f60ccf8659',
            'status': 'ClosedClient'
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
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

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/tickets/change-status",
    type: "application/vnd.iris.ticket+json",
    resource: {
        id: "ba11b95c-7564-4685-b835-8cc76fae6fac",
        status: "ClosedClient"
    }
});
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/change-status"),
    Resource = new Ticket
    {
        Id = ticketId,
        Status = TicketStatusEnum.ClosedClient
    }
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

Server responds with success.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "fbfd62ac",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "testehome1@msging.net"
}
```

```javascript
{
  method: 'set',
  status: 'success',
  id: '4aaf24xc',
  from: 'postmaster@desk.msging.net/#az-iris3',
  to: 'testehome1@msging.net/default',
}
```

```csharp
result: {Lime.Protocol.Command}
    From [Node]: {postmaster@desk.msging.net/#az-iris6}
    Id [string]: "065f1579-b220-45dc-be69-3a6c844016c3"
    Method [string]: "set"
    status [string]: "sucess"
```

### Create a new ticket

To create a new ticket, you must submit a [ticket](/#ticket) document, with at least a `customerIdentity`.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/tickets',
        'application/vnd.iris.ticket+json',
        {
            'customerIdentity': '{customerIdentity}'
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets",
  "type": "application/vnd.iris.ticket+json",
  "resource": {
    "customerIdentity": "{customerIdentity}"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.ticket+json",
    "resource": {
        "id": "76f5bc38-b476-4895-a0c6-016ed1288ba0",
        "sequentialId": 138,
        "sequentialSuffix": "SFX",
        "ownerIdentity": "demobot@msging.net",
        "customerIdentity": "2627641447@messenger.gw.msging.net",
        "customerDomain": "messenger.gw.msging.net",
        "provider": "Lime",
        "status": "Waiting",
        "storageDate": "2019-12-04T13:45:25.664Z",
        "externalId": "76f5bc38-b476-4895-a0c6-016ed1288ba0",
        "rating": 0,
        "team": "Default",
        "unreadMessages": 0,
        "closed": false,
        "customerInput": {},
        "priority": 0 
    },
    "method": "set",
    "status": "success",
    "id": "5bdf8386-30a2-4916-9456-cc00779b7c5f",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@desk.msging.net",
  method: Lime.CommandMethod.SET,
  uri: "/tickets/",
  type: "application/vnd.iris.ticket+json",
  resource: {
    customerIdentity: "{customerIdentity}"
  }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets"),
    Resource = new Ticket{
        customerIdentity = "{customerIdentity}"
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Create an attendance queue

Set a new attendance queue.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/attendance-queues',
        'application/vnd.iris.desk.attendancequeue+json',
        {
            'ownerIdentity': 'demobot@msging.net',
            'name': 'Queue name',
            'isActive': True,
            'Priority': 0
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@desk.msging.net",
    "method": "set",
    "uri": "/attendance-queues",
    "type": "application/vnd.iris.desk.attendancequeue+json",
    "resource": {
        "ownerIdentity": "demobot@msging.net",
        "name": "Queue name",
        "isActive": true,
        "Priority": 0
    }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.iris.desk.attendancequeue+json",
  "resource": {
    "id": "queuename",
    "ownerIdentity": "demobot@msging.net",
    "name": "Queue name",
    "isActive": true,
    "storageDate": "2021-04-07T14:01:07.034Z",
    "Priority": 0
  },
  "method": "set",
  "status": "success",
  "id": "198e5ce6-2b57-4e00-b5fa-a90ebe7a184e",
  "from": "postmaster@desk.msging.net/!note-mc62",
  "to": "demobot@msging.net/default-634",
  "metadata": {
    "#command.uri": "lime://demobot@msging.net/attendance-queues"
  }
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@desk.msging.net",
  method: Lime.CommandMethod.SET,
  uri: "/attendance-queues",
  type: "application/vnd.iris.desk.attendancequeue+json",
  resource: {
    isActive: true,
    ownerIdentity: "demobot@msging.net",
    Priority: 0
  }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/attendance-queues"),
    Type: "application/vnd.iris.desk.attendancequeue+json",
    Resource = new Rule{
        isActive: true,
        ownerIdentity: "demobot@msging.net",
        Priority: 0
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Create an attendance rule

Set a new attendance rule.

You must send a [rule](/#rule) document with your conditions.

<aside class="notice">For example, if you want to forward a customer to a Team according to their city (using <a href="/#contact">contact</a> extras), you should do the following:</aside>

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@desk.msging.net",
    "method": "set",
    "uri": "/rules",
    "type": "application/vnd.iris.desk.rule+json",
    "resource": {
        "id": "rt5aax7a8a9-8as4da",
        "isActive": true,
        "property": "Contact.Extras.City",
        "relation": "Equals",
        "team": "Default",
        "title": "City Rule ",
        "values": [
            "Belo Horizonte",
            "BH",
            "Minas Gerais",
            "MG"
        ]
        "conditions":[
            {
                "property":"Contact.Extras.City",
                "relation":"Equals",
                "values":[
                    "Belo Horizonte",
                    "BH",
                    "Minas Gerais",
                    "MG"
                ]
            }
        ],
        "operator":"Or",
        "priority":3,
        "storageDate":"2021-01-19T15:13:03.340Z"
    },
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "54ba657c-cefa-4414-bc32-7a7f25390551",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/rules',
        'application/vnd.iris.desk.rules+json',
        {
            'id': 'rt5aax7a8a9-8as4da',
            'isActive': True,
            'property': 'Contact.Extras.City',
            'relation': 'Equals',
            'team': 'Default',
            'title': 'City Rule ',
            'values': [
                'Belo Horizonte',
                'BH',
                'Minas Gerais',
                'MG'
            ]
        },
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/rules",
    type: "application/vnd.iris.desk.rule+json",
    resource: {
        id: "rt5aax7a8a9-8as4da",
        isActive: true,
        property: "Contact.Extras.City",
        relation: "Equals",
        team: "Default",
        title: "City Rule ",
        values: [
           "Belo Horizonte",
           "BH",
           "Minas Gerais",
           "MG"
        ]
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/rules"),
    Type: "application/vnd.iris.desk.rule+json",
    Resource = new Rule{
        id = "rt5aax7a8a9-8as4da",
        isActive = true,
        property = "Contact.Extras.City",
        relation = "Equals",
        team = "Default",
        title = "City Rule ",
        values = [
            "Belo Horizonte",
            "BH",
            "Minas Gerais",
            "MG"
        ]
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Create an attendance priority rule

Set a new attendance rule.

You must send a [priority-rule](/#priorityRule) document with your conditions.

<aside class="notice">For example, if you want to scale the priority for tickets to a Team according to their parametres, do the following:</aside>

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@desk.msging.net",
    "method": "set",
    "uri": "/priority-rules",
    "type": "application/vnd.iris.desk.priority-rules+json",
    "resource": {
        "ownerIdentity": "mybot@msging.net",
        "id": "837d926f-5890-4a87-9e74-0deb2223a028",
        "queueId": "4DR00045-64EB-4580-B8B8-DEAD81808682",
        "title": "regra com prioridade ",
        "conditions": [
            {
                "property": "Message",
                "relation": "Contains",
                "values": [
                    "Prioridade 1"
                ]
            }
        ],
        "isActive": true,
        "opened": false,
        "operator": "Or",
        "repeatConditionsBody": false,
	    "urgency": 1000,
        "valuesEmpty": false
    },
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "54ba657c-cefa-4414-bc32-7a7f25390551",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/priority-rules',
        'application/vnd.iris.desk.priority-rules+json',
        {
            'id': '837d926f-5890-4a87-9e74-0deb2223a028',
            'ownerIdentity': 'mybot@msging.net',
            'queueId': '4DR00045-64EB-4580-B8B8-DEAD81808682',
            'title': 'regra com prioridade ',
            'conditions': [
                {
                    'property': 'Message',
                    'relation': 'Contains',
                    'values': [
                        'Prioridade 1'
                    ]
                }
            ],
            'isActive': true,
            'opened': false,
            'operator': 'Or',
            'repeatConditionsBody': false,
            'urgency': 1000,
            'valuesEmpty': false
        },
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/priority-rules",
    type: "application/vnd.iris.desk.priority-rules+json",
    resource: {
        id: '837d926f-5890-4a87-9e74-0deb2223a028',
        ownerIdentity: 'mybot@msging.net',
        queueId: '4DR00045-64EB-4580-B8B8-DEAD81808682',
        title: 'regra com prioridade ',
        conditions: [
            {
                property: 'Message',
                relation: 'Contains',
                values: [
                    'Prioridade 1'
                ]
            }
        ],
        isActive: true,
        opened: false,
        operator: 'Or',
        repeatConditionsBody: false,
        urgency: 1000,
        valuesEmpty: false
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/priority-rules"),
    Type: "application/vnd.iris.desk.priority-rules+json",
    Resource = new Rule{
        id = '837d926f-5890-4a87-9e74-0deb2223a028',
        ownerIdentity = 'mybot@msging.net',
        queueId = '4DR00045-64EB-4580-B8B8-DEAD81808682',
        title = 'regra com prioridade ',
        conditions = [
            {
                property = 'Message',
                relation = 'Contains',
                values = [
                    'Prioridade 1'
                ]
            }
        ],
        isActive = true,
        opened = false,
        operator = 'Or',
        repeatConditionsBody = false,
        urgency = 1000,
        valuesEmpty = false
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Create a ticket for an attendance

Before start to attendance some user is necessary first open a [ticket](/#ticket).
To open a ticket send a command with `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{customerIdentity}`, where `customerIdentity` is the customer identity to be attended. Use the `resource` property to delivery a context for the ticket.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets/{customerIdentity}",
  "type": "text/plain",
  "resource": "I need a human!"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/tickets/{customerIdentity}',
        'text/plain',
        'I need a Human!',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@desk.msging.net",
  method: Lime.CommandMethod.SET,
  uri: "/tickets/{customerIdentity}",
  type: "text/plain",
  resource: "I need a human!"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/{customerIdentity}"),
    Resource = "I need a human!"
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

Server responds with ticked created

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.ticket+json",
    "resource": {
        "id": "89e18743-ee13-498e-a8a8-de5e8a7da846",
        "sequentialId": 1,
        "sequentialSuffix": "SFX",
        "ownerIdentity": "testehome1@msging.net",
        "customerIdentity": "{customerIdentity}",
        "customerDomain": "0mn.io",
        "provider": "Lime",
        "status": "Waiting",
        "storageDate": "2018-07-05T18:55:59.660Z",
        "externalId": "89e18743-ee13-498e-a8a8-de5e8a7da846",
        "rating": 0,
        "team": "Default",
        "unreadMessages": 0,
        "closed": false,
        "priority": 0 
    },
    "method": "set",
    "status": "success",
    "id": "89e18743",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "testehome1@msging.net"
}
```

```javascript
{type: 'application/vnd.iris.ticket+json',
  resource:
   {
     id: '89e18743-ee13-498e-a8a8-de5e8a7da846',
     sequentialId: 1,
     sequentialSuffix: "SFX",
     ownerIdentity: 'testehome1@msging.net',
     customerIdentity: '{customerIdentity}',
     customerDomain: '0mn.io',
     provider: 'Lime',
     status: 'Waiting',
     storageDate: '2018-07-05T18:55:59.660Z',
     externalId: '89e18743-ee13-498e-a8a8-de5e8a7da846',
     rating: 0,
     team: 'Default',
     unreadMessages: 0,
     closed: false,
     priority: 0  },
  method: 'set',
  status: 'success',
  id: 'a7ee981b-43fa-47a3-a5bc-a6a2b5d979ac',
  from: 'postmaster@desk.msging.net/#az-iris4',
  to: 'testehome1@msging.net/default',
  metadata:
   { '#command.uri':
      'lime://testehome1@msging.net/tickets/{customerIdentity}' }
}
```

```csharp
result: {Lime.Protocol.Command}
    From [Node]: {postmaster@desk.msging.net/#az-iris6}
    Id [string]: "065f1579-b220-45dc-be69-3a6c844016c3"
    Metadata [IDictionary]: Count = 1
        Key [string]: "#command.uri"
        Value [string]: "lime://testehome1@msging.net/tickets/{customerIdentity}"
    Resource [Document]: {Takenet.Iris.Messaging.Resources.Ticket}
        Status [TicketStatusEnum]: Waiting
        SequentialId [int]: 1
        SequentialSuffix [string]: "SFX"
        Provider [string]: "Lime"
        OwnerIdentity [Identity]: {testehome1@msging.net}
```

### Delete a custom reply category

Delete a category of [custom replies](#customreply).

Replace `{categoryId}` with the category id you want to delete.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.DELETE,
        '/replies/{categoryId}',
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "delete",
  "uri": "/replies/{categoryId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "68533181-510d-4e36-93d3-e0f75b6aed93",
    "from": "postmaster@desk.msging.net/#az-iris5",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.DELETE,
    uri: "/replies/{categoryId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/replies/{categoryId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Delete a rule

Delete a specific [attendance rule](/#rule).

Replace `{ruleId}`with the rule id you want to delete.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.DELETE,
        '/rules/{ruleId}',
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "delete",
  "uri": "/rules/{ruleId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "1a407581-7a55-484e-b269-ceb04f354cb3",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.DELETE,
    uri: "/rules/{ruleId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/rules/{ruleId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Delete a priority rule

Delete a specific [attendance priority rule](/#priorityRule).

Replace `{prioritypriorityRuleId}`with the priority rule id you want to delete.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.DELETE,
        '/priority-rules/{priorityRuleId}',
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "delete",
  "uri": "/priority-rules/{priorityRuleId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "1a407581-7a55-484e-b269-ceb04f354cb3",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.DELETE,
    uri: "/priority-rules/{priorityRuleId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/priority-rules/{priorityRuleId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```


### Delete an agent

Delete an specific [agent](/#attendant) from your attendance team.

Replace `{agentId}` with the agent Id you want to delete.

<aside class="notice">
Note: The identity must be in the form <b>jonh%2540email.com@blip.ai</b> for an identity <b>jonh%40email.com</b>
</aside>

```python
result = await client.process_command_async(
    Command(
        CommandMethod.DELETE,
        '/attendants/{agentId}',
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "delete",
  "uri": "/attendants/{agentId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "3756ab51-6ec2-485c-bcc3-f7f59c74d62b",
    "from": "postmaster@desk.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.DELETE,
    uri: "/attendants/{agentId}"
});
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/attendants/{agentId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Finishing a tickets previously closed by customer

The process of close a ticket is the last thing to do during attendance. Close the ticket using the '[Close a ticket as attendant](/#close-a-ticket-as-user)' or '[Close a ticket as user](/#close-a-ticket-as-user)' commands before using this command. 

If a [ticket](/#ticket) is closed by the customer is possible to close permanently to disable any data update. To permanently finalize a ticket, send a command with the `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{ticketId}/close`.

Replace the variable `{ticketId}` with the ticket id you want to finish.

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/tickets/{ticketId}/close',
        'application/vnd.iris.ticket+json',
        {
            'closedBy': 'agent%40email.net@blip.ai',
            'tags': [
                'TestTag'
            ]
        },
        to='postmaster@desk.msging.net'
    )
)
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "method": "set",
    "to": "postmaster@desk.msging.net",
    "uri": "/tickets/{ticketId}/close",
    "type": "application/vnd.iris.ticket+json",
    "resource": {
        "closedBy": "agent%40email.net@blip.ai",
        "tags": [
        	"TestTag"
        ]
    }
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    method: "set",
    to: "postmaster@desk.msging.net",
    uri: "/tickets/{ticketId}/close",
    type: "application/vnd.iris.ticket+json",
    resource: {
        closedBy: "agent%40email.net@blip.ai",
        tags: [
            "TestTag"
        ]
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/{ticketId}/close"),
    Type = "application/vnd.iris.ticket+json",
    Resource = new Ticket
    {
        ClosedBy = "agent%40email.net@blip.ai",
        Tags = [
            "TestTag"
        ]
    }
};
```

<aside class="notice">
Notes: 1) The `tags` property can be hidden if you didn't set the Tags configurations in Portal. 2) If you omit the `ClosedBy` property, we'll use the bot identity to identify the responsible to finish the ticket. 
</aside>

### Forwarding received messages from a human agent to a final user

>Imagine a scenario where a human agent is replying to some message to a user on Messenger channel. The message received by the bot from the human agent must be fowarded to the final user.

First, the bot receives a message as below:

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
    "id": "{{$guid}}",
    "to": "{user_identity}@desk.msging.net",
    "from": "{bot_identity}@msging.net/instance",
    "type": "text/plain",
    "content": "Hello, here is a human being ;)"
}
```

```javascript
client.addMessageReceiver(true, function(message) {
  // Process received message
})
```

```python
def message_processor(message: Message) -> None:
    # Process received message
    pass

client.add_message_receiver(Receiver(True, message_processor))
```

```csharp

```

To forward a received message to the specific final user, the bot must decode the received message node so it knows where to respond **{encoded-user-node}@desk.msging.net**:

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": "2",
    "from": "bot@msging.net/instance",
    "to": "1654804277843415@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Hello, here is a human being ;)"
}
```

```python
client.send_message(
    Message(
        'text/plain',
        'Hello, here is a human being ;)',
        to='1654804277843415@messenger.gw.msging.net'
    )
)
```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    to: "1654804277843415@messenger.gw.msging.net",
    type: "text/plain",
    content:  "Hello, here is a human being ;)"
});
```

```csharp
public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    // Check if a message is a reply from a BLIP HelpDesks application
    if (_helpdeskExtension.FromAttendant(message)){
        await _sender.SendMessageAsync("Hello, here is a human being ;)", "1654804277843415@messenger.gw.msging.net", cancellationToken);
    }
}
```

### Forwarding received messages to a human agent

>Imagine a scenario where a user on Messenger channel asks for human help service. Therefore, while the ticket is still open, any message received by the bot should be sent to a **human agent**.

At first, the bot receives a message and decides if it must route the user to a human agent. Imagine for instance that the message **"Hello, I would like to talk to an attendant."** is enough to send the user to an agent.

```http
POST https://http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "from": "1654804277843415@messenger.gw.msging.net",
    "to": "bot@msging.net/instance",
    "type": "text/plain",
    "content": "Hello, I would like to talk to an attendant."
}
```

```javascript
client.addMessageReceiver(true, function(message) {
  // Process received message
});
```

```python
def message_processor(message: Message) -> None:
    # Process received message
    pass

client.add_message_receiver(Receiver(True, message_processor))
```

To foward a received message to an agent, send the message to **{encoded-user-node}@desk.msging.net**, where

**{encoded-user-node}** is the ASCII-encoded messages' emmiter node.

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": "1",
    "from": "bot@msging.net/instance",
    "to": "1654804277843415%40messenger.gw.msging.net@desk.msging.net",
    "type": "text/plain",
    "content": "Hello, I would like to talk to an attendant."
}
```

```python
client.send_message(
    Message(
        'text/plain',
        'Hello, I would like to talk to an attendant.',
        to='1654804277843415%40messenger.gw.msging.net@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    from: "testehome1@msging.net/instance",
    to:  "1654804277843415%40messenger.gw.msging.net@desk.msging.net",
    type: "text/plain",
    content: "Hello, I would like to talk to an attendant",
})
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.HelpDesk;

namespace user_info_extension_test_c_
{
    public class PlainTextMessageReceiver : IMessageReceiver
    {
        private readonly ISender _sender;
        private readonly Settings _settings;
        private readonly IHelpDeskExtension _helpdeskExtension;

        public PlainTextMessageReceiver(ISender sender, Settings settings, IHelpDeskExtension helpdeskExtension)
        {
            _sender = sender;
            _settings = settings;
            _helpdeskExtension = helpdeskExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        { // Process received message

            await _helpdeskExtension.ForwardMessageToAttendantAsync(message, cancellationToken);

        }
    }
}

```

### Get a custom reply category

Get a category of [custom replies](/#customreply).

Replace `{categoryId}` with the category id you want to get.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/replies/{categoryId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.custom-reply+json",
        "items": [
            {
                "id": "9e4a2a6c-e9c0-401f-a1b9-9cb45528a680",
                "category": "Greetings",
                "name": "Hi friend",
                "document": "Some text",
                "type": "text/plain",
                "isDynamicContent": false
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "1bb745dd-784f-42b2-acab-cb2db6544e34",
    "from": "postmaster@desk.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/replies/{categoryId}',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/replies/{categoryId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/replies/{categoryId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get a report about agents

Get a report about [agents](/#attendant).

Returns a [Attendant Summary](/#attendantticketssummary) document.

The following filters are **required**:

| QueryString | Description                         |
|-------------|-------------------------------------|
| beginDate   | Initial date to retrieve the report |
| endDate     | Limit date to retrieve the report.  |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/analytics/reports/attendants?beginDate=2019-04-15&endDate=2019-06-22"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.desk.attendantticketssummary+json",
        "items": [
            {
                "identity": "john%40email.net@blip.ai",
                "status": "Offline",
                "openedTickets": 0,
                "closedTickets": 12,
                "averageFirstResponseTime": "00:00:06",
                "averageWaitTime": "00:30:35",
                "averageAttendanceTime": "00:15:43",
                "averageResponseTime": "00:00:18.2650000"
            },
            {
                "identity": "joanne%40email.net@blip.ai",
                "status": "Offline",
                "openedTickets": 0,
                "closedTickets": 3,
                "averageFirstResponseTime": "00:00:06",
                "averageWaitTime": "00:00:15",
                "averageAttendanceTime": "00:10:19",
                "averageResponseTime": "00:00:00.8630000"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "2f34985c-96b0-493e-8499-f54e74968a6c",
    "from": "postmaster@desk.msging.net/#az-iris5",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/analytics/reports/attendants?beginDate=2019-04-15&endDate=2019-06-22',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/analytics/reports/attendants?beginDate=2019-04-15&endDate=2019-06-22"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/analytics/reports/attendants?beginDate=2019-04-15&endDate=2019-06-22")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a report about attendance time

Get a report about attendance time.

Returns a [Attendance Time Summary](/#attendancetimesummary) document.

The following filters are **required**:

| QueryString | Description                         |
|-------------|-------------------------------------|
| beginDate   | Initial date to retrieve the report |
| endDate     | Limit date to retrieve the report.  |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/analytics/reports/attendancetime?beginDate=2019-04-15&endDate=2019-06-22"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.desk.attendancetimesummary+json",
    "resource": {
        "attendanceTime": "00:14:49"
    },
    "method": "get",
    "status": "success",
    "id": "fd4ef884-4cc8-4a9a-b92c-bb8747a24bbd",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/analytics/reports/attendancetime?beginDate=2019-04-15&endDate=2019-06-22',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/analytics/reports/attendancetime?beginDate=2019-04-15&endDate=2019-06-22"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/analytics/reports/attendancetime?beginDate=2019-04-15&endDate=2019-06-22")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a report about tags

Get a report about tags.

Returns a [Tag Ticket Summary](/#tagticketssummary) document.

The following filters are **required**:

| QueryString | Description                         |
|-------------|-------------------------------------|
| beginDate   | Initial date to retrieve the report |
| endDate     | Limit date to retrieve the report.  |

<aside class="notice">
Note: By default the <i>beginDate</i> and <i>endDate</i> values are the current date.
</aside>

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/analytics/reports/tags?beginDate=2019-04-15&endDate=2019-06-22"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 3,
        "itemType": "application/vnd.iris.desk.tag-tickets-summary+json",
        "items": [
            {
                "name": "Awesome",
                "closedTickets": 2,
                "averageFirstResponseTime": "00:00:05",
                "averageWaitTime": "00:00:16",
                "averageAttendanceTime": "00:00:35",
                "averageResponseTime": "00:00:18.2650000"
            },
            {
                "name": "Cool",
                "closedTickets": 1
            },
            {
                "name": "Nice",
                "closedTickets": 1
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "4d690307-646f-471a-9ea3-2e0d6623e2c4",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/analytics/reports/tags?beginDate=2019-04-15&endDate=2019-06-22"
})
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/analytics/reports/tags?beginDate=2019-04-15&endDate=2019-06-22',
        to='postmaster@desk.msging.net'
    )
)
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/analytics/reports/tags?beginDate=2019-04-15&endDate=2019-06-22")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a report about teams

Get a report about [teams](/#team).

Returns a [Team Ticket Summary](/#teamticketssummary) document.

The following filters are **required**:

| QueryString | Description                         |
|-------------|-------------------------------------|
| beginDate   | Initial date to retrieve the report |
| endDate     | Limit date to retrieve the report.  |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/analytics/reports/teams?beginDate=2019-04-15&endDate=2019-06-22"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 3,
        "itemType": "application/vnd.iris.desk.teamticketssummary+json",
        "items": [
            {
                "name": "Default",
                "waitingTickets": 0,
                "openedTickets": 0,
                "closedTickets": 14,
                "averageFirstResponseTime": "00:00:06",
                "averageWaitTime": "00:30:34",
                "averageAttendanceTime": "00:17:40",
                "averageResponseTime": "00:00:00.8630000"
            },
            {
                "name": "Priority",
                "waitingTickets": 0,
                "openedTickets": 0,
                "closedTickets": 2,
                "averageFirstResponseTime": "00:00:05",
                "averageWaitTime": "00:00:16",
                "averageAttendanceTime": "00:00:35",
                "averageResponseTime": "00:00:18.2650000"
            },
            {
                "name": "NoPriority",
                "waitingTickets": 0,
                "openedTickets": 0,
                "closedTickets": 1
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "ad8ad8d3-c05f-4f97-a0b6-52e0d5df5d4a",
    "from": "postmaster@desk.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/analytics/reports/teams?beginDate=2019-04-15&endDate=2019-06-22',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/analytics/reports/teams?beginDate=2019-04-15&endDate=2019-06-22"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/analytics/reports/teams?beginDate=2019-04-15&endDate=2019-06-22")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a report about ticket timing

Get a report about the tickets timing.

Returns a [Ticket Metrics Summary](/#ticketsmetricssummary) document.

The following filters are **required**:

| QueryString | Description                         |
|-------------|-------------------------------------|
| beginDate   | Initial date to retrieve the report |
| endDate     | Limit date to retrieve the report.  |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/analytics/reports/timings?beginDate=2019-04-15&endDate=2019-06-22"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.desk.tickets-metrics-summary+json",
    "resource": {
        "maxQueueTime": "02:29:01",
        "maxFirstResponseTime": "00:00:11",
        "avgQueueTime": "00:12:10",
        "avgFirstResponseTime": "00:00:06",
        "avgWaitTime": "00:25:31.6670000",
        "avgResponseTime": "00:00:09.5640000",
        "avgAttendanceTime": "00:14:49"
    },
    "method": "get",
    "status": "success",
    "id": "aaf109bf-9b99-45d0-8d0c-a031128c3550",
    "from": "postmaster@desk.msging.net/#az-iris5",
    "to": "demobot@msging.net",
    "metadata": {
        "#command.uri": "lime://demobot4@msging.net/analytics/reports/timings?beginDate=2019-11-02&$endDate=2019-12-05",
        "uber-trace-id": "ffae5adefbfc9395%3Affae5adefbfc9395%3A0%3A1"
    }
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/analytics/reports/timings?beginDate=2019-04-15&endDate=2019-06-22',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/analytics/reports/timings?beginDate=2019-04-15&endDate=2019-06-22"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/analytics/reports/timings?beginDate=2019-04-15&endDate=2019-06-22)
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a report about tickets

Get a report about [tickets](/#ticket).

Returns a [Tickets Summary](/#ticketssummary) document.

The following filters are **required**:

| QueryString | Description                         |
|-------------|-------------------------------------|
| beginDate   | Initial date to retrieve the report |
| endDate     | Limit date to retrieve the report.  |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/analytics/reports/tickets?beginDate=2019-04-15&endDate=2019-06-22"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 3,
        "itemType": "application/vnd.iris.desk.ticketssummary+json",
        "items": [
            {
                "date": "2019-11-02T03:00:00.000Z",
                "waiting": 0,
                "open": 0,
                "closed": 3,
                "closedAttendant": 3,
                "closedClient": ,
                "transferred": 2,
                "missed": 0
            },
            {
                "date": "2019-11-03T03:00:00.000Z",
                "waiting": 1,
                "open": 0,
                "closed": 5,
                "closedAttendant": 0,
                "closedClient": 0,
                "transferred": 2,
                "missed": 0
            },
            {
                "date": "2019-11-04T03:00:00.000Z",
                "waiting": 0,
                "open": 2,
                "closed": 1,
                "closedAttendant": 0,
                "closedClient": 0,
                "transferred": 0,
                "missed": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "76d535c7-7aa8-4822-b18a-0a53a3d2b865",
    "from": "postmaster@desk.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/analytics/reports/tickets?beginDate=2019-04-15&endDate=2019-06-22',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/analytics/reports/tickets?beginDate=2019-04-15&endDate=2019-06-22"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/analytics/reports/tickets?beginDate=2019-04-15&endDate=2019-06-22")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a attendanceQueue

Get a specific [attendance queue](/#attendance-queues).
Replace `{queueId}`with the queue id you want to get.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/attendance-queues/{queueId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 2,
    "itemType": "application/vnd.iris.desk.attendancequeue+json",
    "items": [
      {
        "id": "queueclientbasic",
        "ownerIdentity": "demobot@msging.net",
        "name": "Queue Client Basic",
        "isActive": true,
        "storageDate": "2021-04-06T15:01:33.240Z",
        "Priority": 0
      },
      {
        "id": "queueclientbeta",
        "ownerIdentity": "demobot@msging.net",
        "name": "Queue Client Beta",
        "isActive": true,
        "storageDate": "2021-04-06T14:59:28.830Z",
        "Priority": 0
      }
    ]
  },
  "method": "get",
  "status": "success",
  "id": "55ab5ef8-6556-46ee-8328-5c4966393f50",
  "from": "postmaster@desk.msging.net/!hmg-az-iris1",
  "to": "demobot@msging.net/default",
  "metadata": {
    "#command.uri": "lime://demobot@msging.net/attendance-queues",
    "uber-trace-id": "840b1d9131b1182f%3A2389284ea498272b%3A8401234531b1182f%3A1"
  }
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/attendance-queues/{queueId}',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/attendance-queues/{queueId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/attendance-queues/{queueId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get a rule

Get a specific [attendance rule](/#rule).

Replace `{ruleId}`with the rule id you want to get.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/rules/{ruleId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.desk.rule+json",
    "resource": {
        "id": "4067c9bc-278e-4ae2-96b1-aaac61428aae",
        "ownerIdentity": "demobot@msging.net",
        "title": "City Rule",
        "team": "Belo Horizonte",
        "property": "Contact.Extras.Cidade",
        "relation": "Equals",
        "isActive": true,
        "values": [
            "Belo Horizonte",
            "BH"
        ],
        "conditions":[
            {
               "property":"Contact.Extras.Cidade",
               "relation":"Equals",
               "values":[
                    "Belo Horizonte",
                    "BH"
                ]
            }
        ],
        "operator":"Or",
        "priority":3,
        "storageDate":"2021-01-19T15:13:03.340Z"
    },
    "method": "get",
    "status": "success",
    "id": "e105ecfe-e89c-458f-ac7b-983aecc8954d",
    "from": "postmaster@desk.msging.net/#az-iris5",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/rules/{ruleId}',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/rules/{ruleId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/rules/{ruleId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get a priority rule

Get a specific [attendance priority rule](/#priorityRule).

Replace `{priorityRuleId}`with the priority rule id you want to get.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/priority-rules/{priorityRuleId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.desk.rule+json",
    "resource": {
        "ownerIdentity": "mybot@msging.net",
        "id": "837d926f-5890-4a87-9e74-0deb2223a028",
        "queueId": "4DR00045-64EB-4580-B8B8-DEAD81808682",
        "title": "regra com prioridade ",
        "conditions": [
            {
                "property": "Message",
                "relation": "Contains",
                "values": [
                    "Prioridade 1"
                ]
            }
        ],
        "isActive": true,
        "opened": false,
        "operator": "Or",
        "repeatConditionsBody": false,
	    "urgency": 1000,
        "valuesEmpty": false
    },
    "method": "get",
    "status": "success",
    "id": "e105ecfe-e89c-458f-ac7b-983aecc8954d",
    "from": "postmaster@desk.msging.net/#az-iris5",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/priority-rules/{priorityRuleId}',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/priority-rules/{priorityRuleId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/priority-rules/{priorityRuleId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get a ticket

Get a specific [ticket](/#ticket).

Replace the variable `{ticketId}` with the ticket id you want to get.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/ticket/{ticketId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.ticket+json",
    "resource": {
        "id": "76fed1288ba0",
        "sequentialId": 138,
        "sequentialSuffix": "SFX",
        "ownerIdentity": "demobot@msging.net",
        "customerIdentity": "26247641447@messenger.gw.msging.net",
        "customerDomain": "messenger.gw.msging.net",
        "provider": "Lime",
        "status": "Waiting",
        "storageDate": "2019-12-04T13:45:25.660Z",
        "externalId": "76f5bc38-b476-4895-a0c6-016ed1288ba0",
        "rating": 0,
        "team": "Default",
        "unreadMessages": 0,
        "closed": false,
        "priority": 0 
    },
    "method": "get",
    "status": "success",
    "id": "c1a55103-7be6-4112-a273-cc8f66e8fea9",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net",
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/ticket/{ticketId}',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/ticket/{ticketId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/ticket/{ticketId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get agents metrics

Get [agents](/#attendantticketssummary) metrics and informations.

The endpoint returns only data related to the current day.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/attendants?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.desk.attendantticketssummary+json",
        "items": [
            {
                "identity": "john%40email.net@blip.ai",
                "status": "Online",
                "openedTickets": 2,
                "closedTickets": 0,
                "averageAttendanceTime": "00:00:00",
                "averageResponseTime": "00:00:00"
            },
            {
                "identity": "joanne%40email.net@blip.ai",
                "status": "Offline",
                "openedTickets": 0,
                "closedTickets": 0,
                "averageAttendanceTime": "00:00:00",
                "averageResponseTime": "00:00:00"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "57ccbdf1-294e-4124-952a-f2248ba3cf1a",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/attendants?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/attendants?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/attendants?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get agents productivity

Get a report about [attendants](/#attendant) productivity.

Returns a [Agent Productivity Summary](/#agentproductivitysummary) document.

The following filters are **required**:

| QueryString | Description                         |
|-------------|-------------------------------------|
| beginDate   | Initial date to retrieve the report |
| endDate     | Limit date to retrieve the report.  |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/analytics/reports/attendants/productivity?beginDate=2019-04-15&endDate=2019-06-22"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.desk.agentproductivitysummary+json",
        "items": [
            {
                "identity": "john%40email.net@blip.ai",
                "online": "2.00:58:27.3058952",
                "paused": "00:00:00",
                "invisible": "3.20:47:20.4700000",
                "offline": "24.20:50:17.7500000",
                "total": "5.21:45:47.7758952"
            },
            {
                "identity": "joanne%40email.net@blip.ai",
                "online": "04:14:33.6700000",
                "paused": "00:00:00",
                "invisible": "00:40:07.4700000",
                "offline": "13.19:55:36.3094029",
                "total": "04:54:41.1400000"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "8d29fe6e-dcae-4eda-8837-515b67dd23df",
    "from": "postmaster@desk.msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/analytics/reports/attendants/productivity?beginDate=2019-04-15&endDate=2019-06-22',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/analytics/reports/attendants/productivity?beginDate=2019-04-15&endDate=2019-06-22"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/analytics/reports/attendants/productivity?beginDate=2019-04-15&endDate=2019-06-22")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all active tickets

Returns all the active [tickets](/#ticket).

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/tickets?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json


  "type": "application/vnd.iris.desk.ticketssummary+json",
    "resource": {
        "waiting": 5,
        "open": 3,
        "closed": 2,
        "closedAttendant": 2,
        "closedClient": 0,
        "transferred": 0,
        "missed": 0
    },
    "method": "get",
    "status": "success",
    "id": "c9e659e4-5ef4-48ef-a13c-537b4d2add82",
    "from": "postmaster@desk.msging.net/#az-iris5",
    "to": "demobot@msging.net",
    "metadata": {
        "#command.uri": "lime://demobot@msging.net/monitoring/tickets?version=2",
        "uber-trace-id": "f7a2da1bdc1890d1%3A77aac8237b3d3172%3Af7a2da1bdc1890d1%3A1"
    }
}

```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/tickets?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/tickets?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/tickets?version=2"
})
```

### Get all bot's agents

In order to get all attendants of some bot send a command with `GET` method to `postmaster@desk.msging.net` and URI `/attendants` . This feature is usefull to know if there are any available attendant to answer customers questions. By default, Blip will return 20 agents.

| QueryString    | Description                             | Example |
|----------------|-----------------------------------------|---------|
| **$skip**      | The number of elements to be skipped.   | 0       |
| **$take**      | Limit of total of items to be returned. | 100     |
| **$ascending** | Sets ascending alphabetical order.      | true    |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/attendants"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/attendants',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/attendants"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/attendants"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

Server responds with a list of attendants and status.

```http
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

```javascript
{
  type: 'application/vnd.lime.collection+json',
  resource:
   {
     total: 1,
     itemType: 'application/vnd.iris.desk.attendant+json',
     items: [
         [Object]
        ]
    },
  method: 'get',
  status: 'success',
  id: '9720839c-1692-4cda-85eb-99a46a655f9f',
  from: 'postmaster@desk.msging.net/#az-iris4',
  to: 'testehome1@msging.net/default',
  metadata: { '#command.uri': 'lime://testehome1@msging.net/attendants' }
}
```

```csharp
result: {Lime.Protocol.Command}
    Id [string]: "065f1579-b220-45dc-be69-3a6c844016c3"
    Type [MediaType]: {application/vnd.lime.collection+json}
    Resource [Document]: {Lime.Protocol.DocumentCollection}
        Total [int]: 1
        Items [Document[]]: {Lime.Protocol.Document[1]}
        ItemType [MediaType]: {application/vnd.iris.desk.attendant+json}
```

### Get all closed tickets

Returns all closed [tickets](/#ticket).

Replace `{customerIdentity}` with the customer id you want to get.

The maximum value of `take` parameter is 100.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets?$filter=(CustomerIdentity%20eq%20'{customer_identity}')&$closed=true&$skip=0&$take=100"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "itemType": "application/vnd.iris.ticket+json",
        "items": []
    },
    "method": "get",
    "status": "success",
    "id": "0de283ce6f32ef",
    "from": "postmaster@desk.msging.net/#az-iris6",
    "to": "demobot@msging.net"
}
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets?$filter=(CustomerIdentity%20eq%20'{customer_identity}')&$closed=true&$skip=0&$take=100")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        "/tickets?filter=(CustomerIdentity%20eq%20'{customer_identity}')&$closed=true&$skip=0&$take=100",
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/tickets?$filter=(CustomerIdentity%20eq%20'{customer_identity}')&$closed=true&$skip=0&$take=100"
})
```

### Get all messages from a customer by a ticket

Return all [messages](/#messages) from the specific owner [ticket](/#ticket) customer. The returned messages will not be just ticket messages, but all messages received and sent from the customer.

Replace `{ticketId}` with the ticket id you want to get the messages.

| QueryString                          | Description                             | Example |
|--------------------------------------|-----------------------------------------|---------|
| **$take**                            | Limit of total of items to be returned. | 100     |
| **$ascending**                       | Sets ascending alphabetical order.      | true    |
| **getFromOwnerIfTunnel** (required*) | Get all messages from owner router.     | true    |

| Parameters   | Example                              |
|--------------|--------------------------------------|
| **ticketId** | f1e95e10-2e21-4438-a076-71183b253981 |

<aside class="notice">
Note: After the ticket is created, it <b>expires in a month</b>. In this situation, messages are accessible only by endpoint <a href="https://docs.blip.ai/#get-last-threads">Get last threads</a>.
</aside>

<aside class="notice">
* Note: By default its value is <i>false</i>. If you are using a Router, it must be <i>true</i> otherwise it can be ommited or false. 
</aside>

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets/{ticketId}/messages"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 3,
        "itemType": "application/vnd.iris.thread-message+json",
        "items": [
            {
                "id": "d7278f36a074e0",
                "direction": "sent",
                "type": "text/plain",
                "content": "937dec5c1a27.demobot@0mn.io",
                "date": "2019-12-04T16:15:34.759Z",
                "status": "dispatched"
            },
            {
                "id": "289ae91a-ff6e-47c1-be72-c41d6a46ff0f",
                "direction": "sent",
                "type": "application/vnd.lime.redirect+json",
                "content": {},
                "date": "2019-12-04T16:15:33.746Z",
                "status": "dispatched"
            },
            {
                "id": "fwd:fwd:b0534f19-d607-4ac9-b6bc-ac191f5aecf7",
                "direction": "sent",
                "type": "text/plain",
                "content": "oi",
                "date": "2019-12-04T16:14:51.952Z",
                "status": "dispatched"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "0ae73314-86d9-4dc0-823d-cfad6636d829",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/tickets/{ticketId}/messages',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/tickets/{ticketId}/messages"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/{ticketId}/messages")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all teams

In order to get all agents [teams](/#team) of some bot send a command with `GET` method to `postmaster@desk.msging.net` and URI `/teams` .

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/teams"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.desk.team+json",
        "items": [
            {
                "name": "Default",
                "agentsOnline": 0
            },
            {
                "name": "Belo Horizonte",
                "agentsOnline": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "29b958d0-1ab7-40ad-96ff-2a3245e8ea8a",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/teams',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/teams"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/teams")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all tickets of a bot

In order to get any ticket of some bot send a command with `GET` method to `postmaster@desk.msging.net` and URI `/tickets` .
To filter specific tickets you can use **$filter** parameter on query string with the following properties:

| **$filter** | Description                                                                        | Example |
|-------------|------------------------------------------------------------------------------------|---------|
| **skip**    | The number of elements to be skipped                                               | 0       |
| **take**    | The number of elements to be returned. The maximum value of this parameter is 100. | 10      |

| Name             | Description                                                                                                         |
|------------------|---------------------------------------------------------------------------------------------------------------------|
| id               | Unique identifier of the ticket                                                                                     |
| sequentialId     | The ticket sequential id (by bot)                                                                                   |
| sequentialSuffix | The optional suffix of sequential id (if config)                                                                    |
| ownerIdentity    | The identity of the bot ticket owner                                                                                |
| customerIdentity | The identity of the customer                                                                                        |
| customerDomain   | The domain of the customer                                                                                          |
| agentIdentity    | The identity of the agent                                                                                           |
| provider         | The name of the agent provider for ticket                                                                           |
| status           | The ticket status*                                                                                                  |
| storageDate      | The ticket creation date                                                                                            |
| externalId       | The provider's ticked id                                                                                            |
| rating           | Ticket rating for the agent identity                                                                                |
| team             | Ticket team                                                                                                         |
| unreadMessages   | Gets or sets the number of unread messages of a ticket. Unread messages are messages without consumed notification. |
| closed           | The ticket is closed or not                                                                                         |
| priority         | The ticket's priority level                                                                                         |

*Ticket status can assume one of the following values*

| Ticket Status   | Description                                                                               |
|-----------------|-------------------------------------------------------------------------------------------|
| None            | Not defined                                                                               |
| Waiting         | The ticket is waiting for an agent                                                        |
| Open            | The ticket was claimed by an agent                                                        |
| ClosedAttendant | The ticket was closed by the agent                                                        |
| ClosedClient    | The ticket was closed by the client                                                       |
| Transferred     | The ticket was transferred                                                                |
| Assigned        | The ticket is assigned to an agent and is waiting for the consumed notification from them |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets?$take=10"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/tickets?$take=10',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/tickets?$take=10"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets?$take=10"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

Server responds with all tickets found.

```http
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
                "sequentialSuffix": "SFX",
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
                "closed": false,
                "priority": 0 
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

```javascript
{
  type: 'application/vnd.lime.collection+json',
  resource:
   { total: 10,
     itemType: 'application/vnd.iris.ticket+json',
     items:
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object]
      ]
    },
  method: 'get',
  status: 'success',
  id: 'd84dd60e-0228-4294-a990-4498641b537a',
  from: 'postmaster@desk.msging.net/#az-iris1',
  to: 'testehome14@msging.net/default',
  metadata:
   { '#command.uri': 'lime://testehome1@msging.net/tickets?$take=10' }
}
```

```csharp
result: {Lime.Protocol.Command}
    Id [string]: "065f1579-b220-45dc-be69-3a6c844016c3"
    Type [MediaType]: {application/vnd.lime.collection+json}
    Resource [Document]: {Lime.Protocol.DocumentCollection}
        Total [int]: 10
        Items [Document[]]: {Lime.Protocol.Document[10]}
        ItemType [MediaType]: {application/vnd.iris.ticket+json}
```

### Get attendance rules

Get all [attendance rules](/#rule).

The following uri filters are available to get rules:

| QueryString   | Description                         | Example |
|---------------|-------------------------------------|---------|
| **skip**      | The number of rules to be skipped.  | 0       |
| **take**      | The number of rules to be returned. | 100     |
| **ascending** | Sets ascending alphabetical order.  | true    |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/rules"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.rule+json",
        "items": [
            {
                "id": "4067c9bc-278e-4ae2-96b1-aaac61428aae",
                "ownerIdentity": "demobot4@msging.net",
                "title": "City rule",
                "team": "Belo Horizonte",
                "property": "Contact.Extras.Cidade",
                "relation": "Equals",
                "isActive": true,
                "values": [
                    "Belo Horizonte",
                    "BH"
                ]
                "conditions":[
                    {
                        "property":"Contact.Extras.Cidade",
                        "relation":"Equals",
                        "values":[
                            "Belo Horizonte",
                            "BH"
                        ]
                    }
                ],
            "operator":"Or",
            "priority":3,
            "storageDate":"2021-01-19T15:13:03.340Z"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "897a7301-81f1-434d-8447-85c776d33875",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot4@msging.net",
    "metadata": {
        "#command.uri": "lime://demobot4@msging.net/rules",
        "uber-trace-id": "364c11dba2c5f82d%3A364c11dba2c5f82d%3A0%3A1"
    }
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/rules',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/rules"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/rules")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get attendance priority rules

Get all [attendance priority rules](/#priorityRule).

The following uri filters are available to get priority rules:

| QueryString   | Description                         | Example |
|---------------|-------------------------------------|---------|
| **skip**      | The number of rules to be skipped.  | 0       |
| **take**      | The number of rules to be returned. | 100     |
| **ascending** | Sets ascending alphabetical order.  | true    |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/priority-rules"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.rule+json",
        "items": [
                {
                "ownerIdentity": "mybot@msging.net",
                "id": "837d926f-5890-4a87-9e74-0deb2223a028",
                "queueId": "4DR00045-64EB-4580-B8B8-DEAD81808682",
                "title": "regra com prioridade ",
                "conditions": [
                    {
                        "property": "Message",
                        "relation": "Contains",
                        "values": [
                            "Prioridade 1"
                        ]
                    }
                ],
                "isActive": true,
                "opened": false,
                "operator": "Or",
                "repeatConditionsBody": false,
                "urgency": 1000,
                "valuesEmpty": false
        }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "897a7301-81f1-434d-8447-85c776d33875",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot4@msging.net",
    "metadata": {
        "#command.uri": "lime://demobot4@msging.net/priority-rules",
        "uber-trace-id": "364c11dba2c5f82d%3A364c11dba2c5f82d%3A0%3A1"
    }
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/priority-rules',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/priority-rules"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/priority-rules")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get custom replies

Get the [custom replies](/#customreply) from your attendance model.

| QueryString    | Description                             | Example |
|----------------|-----------------------------------------|---------|
| **$skip**      | The number of elements to be skipped.   | 0       |
| **$take**      | Limit of total of items to be returned. | 100     |
| **$ascending** | Sets ascending alphabetical order.      | true    |

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/replies"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.custom-reply+json",
        "items": [
            {
                "id": "9e4a2a6c-e9c0-401f-a1b9-9cb45528a680",
                "category": "Greetings",
                "isDynamicContent": false
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "d5c863fe-56b7-49f0-9430-e5e27c4ab303",
    "from": "postmaster@desk.msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/replies',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/replies"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/replies")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get online agents

Get the number of online [agents](/#attendant) in each team.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/teams/agents-online"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.desk.team+json",
        "items": [
            {
                "name": "Default",
                "agentsOnline": 2
            },
            {
                "name": "Belo Horizonte",
                "agentsOnline": 1
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "0189ff97-1d3a-41c7-a80b-d1f139f49e29",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/open-tickets?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/open-tickets?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/open-tickets?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get open tickets metrics

Get [open tickets](/#openticketsummary) metrics and informations.

The endpoint returns only data related to the current day.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/open-tickets?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.desk.open-ticket-summary+json",
        "items": [
            {
                "id": "e05ffb6c-feed-444b-b90a-016ed21ea3d1",
                "sequentialId": 143,
                "agentIdentity": "john%40email.net@blip.ai",
                "customerIdentity": "593ffa2b-67c9-4cb0-9582-f49173b5ebfc.demobot@0mn.io",
                "team": "Default",
                "queueTime": "00:11:29",
                "firstResponseTime": "22:30:34"
            },
            {
                "id": "13171be0-efe6-4db8-a5f2-016ed22a6338",
                "sequentialId": 144,
                "agentIdentity": "john%40email.net@blip.ai",
                "customerIdentity": "4f139096-9190-48c6-bd8e-51478cf7640c.demobot@0mn.io",
                "team": "Default",
                "queueTime": "00:04:00",
                "firstResponseTime": "22:25:13"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "28966cf7-09ce-4e59-9900-983cb72fb50f",
    "from": "postmaster@desk.msging.net/#az-iris4",
    "to": "demobot4@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/open-tickets?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/open-tickets?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/open-tickets?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get teams metrics

Get attendance [teams](/#teamticketssummary) metrics and informations.

The endpoint returns only data related to the current day.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/teams?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.desk.teamticketssummary+json",
        "items": [
            {
                "name": "Priority",
                "waitingTickets": 0,
                "openedTickets": 0,
                "closedTickets": 0,
                "averageAttendanceTime": "00:00:00",
                "averageResponseTime": "00:00:00"
            },
            {
                "name": "Default",
                "waitingTickets": 0,
                "openedTickets": 2,
                "closedTickets": 1,
                "averageAttendanceTime": "00:00:00",
                "averageResponseTime": "00:00:00"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "8ab6b898-a25a-4d4e-85dc-c7a19f2dc8e6",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/teams?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/teams?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/teams?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get tickets metrics

Get [tickets metrics](/#ticketsmetricssummary) for your monitoring.

The endpoint returns only data related to the current day.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/ticket-metrics?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.desk.tickets-metrics-summary+json",
    "resource": {
        "maxQueueTime": 02:33:42,
        "maxFirstResponseTime": 22:20:40,
        "avgQueueTime": 00:00:00,
        "avgFirstResponseTime": 00:00:00,
        "avgWaitTime": 00:00:00,
        "avgResponseTime": 00:00:00,
        "avgAttendanceTime": 00:00:00,
        "ticketsPerAttendant": 2
    },
    "method": "get",
    "status": "success",
    "id": "61098141-66e3-41b1-a71c-12424d008599",
    "from": "postmaster@desk.msging.net/#az-iris2",
    "to": "demobot@msging.net",
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/ticket-metrics?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/ticket-metrics?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/ticket-metrics?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get tickets counters

Get tickets counters by status.

The endpoint returns only data related to the current day.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/tickets?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.desk.ticketssummary+json",
    "resource": {
        "waiting": 1,
        "open": 2,
        "closed": 0,
        "closedAttendant": 0,
        "closedClient": 0,
        "transferred": 0,
        "missed": 0
    },
    "method": "get",
    "status": "success",
    "id": "33889da6-1874-4f6d-91b5-cf1d9c8861ce",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot4@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/tickets?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/tickets?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/tickets?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get tickets per hour

Get tickets-per-hour metrics (**for the current day**).

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/tickets-per-hour?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.tickets-by-hour-summary+json",
        "items": [
            {
                "storageDate": "2019-12-05T14:00:00.000Z",
                "ticketByHour": 1
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "dabe7f4d-0119-4aa0-8873-4dba11553954",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/tickets-per-hour?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/tickets-per-hour?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/tickets-per-hour?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get waiting tickets

Returns all waiting [tickets](/#ticket).

The maximum value of `take` parameter is 100.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets?$filter=status%20eq%20'waiting'&$skip=0&$take=100"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.ticket+json",
        "items": [
            {
                "id": "29af5ee0-e9cd-45bc-96e8-0170c01501c8",
                "sequentialId": 67,
                "sequentialSuffix": "SFX",
                "ownerIdentity": "atendente@msging.net",
                "customerIdentity": "09e6b554-fe22-495c-a2b7-307ce1ba3fde.atendente@0mn.io",
                "customerDomain": "0mn.io",
                "provider": "Lime",
                "status": "Waiting",
                "storageDate": "2020-03-09T16:16:07.110Z",
                "externalId": "29af5ee0-e9cd-45bc-96e8-0170c01501c8",
                "rating": 0,
                "team": "Default",
                "unreadMessages": 0,
                "closed": false,
                "priority": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "511aeebd-21e0-4f8b-bbdc-a5815bb2361f",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "atendente@msging.net",
    "metadata": {
        "#command.uri": "lime://atendente@msging.net/tickets?$filter=status%20eq%20'waiting'&$skip=0&$take=100",
        "uber-trace-id": "96391c2153967ce%3A7a1bc8384ee20f4a%3A96391c2153967ce%3A1"
    }
}

```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        "/tickets?$filter=status%20eq%20'waiting'&$skip=0&$take=100",
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/tickets?$filter=status%20eq%20'waiting'&$skip=0&$take=100"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets?$filter=status%20eq%20'waiting'&$skip=0&$take=100")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get waiting tickets metrics

Get [waiting tickets](/#openticketsummary) metrics and informations.

The endpoint returns only data related to the current day.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/monitoring/waiting-tickets?version=2"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.desk.open-ticket-summary+json",
        "items": [
            {
                "id": "6e2fe873-6c33-4ce9-96ec-016ed667da4d",
                "sequentialId": 145,
                "customerIdentity": "069b8b93-6d39-40d0-a0b4-879ad508e9ef.demobot@0mn.io",
                "team": "Default",
                "queueTime": "02:48:24"
            }
        ]s
    },
    "method": "get",
    "status": "success",
    "id": "9424f492-e13b-4d9a-a731-38e0bd8980c2",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/monitoring/waiting-tickets?version=2',
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/monitoring/waiting-tickets?version=2"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/monitoring/waiting-tickets?version=2")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
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
            "type": "application/vnd.iris.ticket+json",
            "value": {
                "id": "1654804277843415",
                "sequentialId": 0,
                "sequentialSuffix": "SFX",
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

### Send attendance history by email

Send attendance history by email as a *.zip* file.

Replace `{email}` with the email adress you want to send.

<aside class="notice">
Note: You can filter by date range, using two <i>requestDateTime</i> objects, using the <a href=http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#FilterSystemQueryOption">OData syntax</a>.

<br><br><b>The filter can be sent empty.</b> </aside>

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/attendance-history/send-by-email",
  "type": "application/json",
  "resource": {
    "email": "{email}",
    "filter": "requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "f97ada37-8f45-4d2f-b25f-0adc0edac847",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@desk.msging.net',
    method: Lime.CommandMethod.SET,
    uri: "/enhancement/send-by-email",
    type:"application/json",
    resource:{
      email:"{email}",
      filter:"requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
    }
  });
});
```

```python
def message_processor(message: Message) -> None:
    result = await client.process_command_async(
        Command(
            CommandMethod.SET,
            '/enhancement/send-by-email',
            'application/json',
            {
                'email': '{email}',
                'filter': "requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
            },
            to='postmaster@desk.msging.net'
        )
    )

client.add_message_receiver(Receiver(lambda m: m.type_n == 'text/plain', message_processor))
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/enhancement/send-by-email"),
    Type :"application/json"
    Resource = new {
              email = "{email}",
              filter = "requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
            }
    };
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Transfer a ticket to another team

Transfer a specfic [ticket](/#ticket) to another team.

Replace `{ticketId}` with the ticket id you want to transfer.
Replace `{teamName}` with the team name you want to transfer to.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/tickets/{ticketId}/transfer",
  "type": "application/vnd.iris.ticket+json",
  "resource": {
    "team": "{teamName}"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.ticket+json",
    "resource": {
        "id": "9565cc61-d0f4-4af0-9c34-016ed2130a11",
        "sequentialId": 142,
        "sequentialSuffix": "SFX",
        "ownerIdentity": "demobot4@msging.net",
        "customerIdentity": "255d0787b7b2bc.demobot@0mn.io",
        "customerDomain": "0mn.io",
        "provider": "Lime",
        "status": "Waiting",
        "storageDate": "2019-12-04T18:01:33.459Z",
        "externalId": "9565cc61-d0f4-4af0-9c34-016ed2130a11",
        "rating": 0,
        "team": "Default",
        "unreadMessages": 0,
        "closed": false,
        "parentSequentialId": 140,
        "priority": 1
    },
    "method": "set",
    "status": "success",
    "id": "6b69c390-5660-483a-8b4e-1ef30c1088ae",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot4@msging.net"
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.SET,
        '/tickets/{ticketId}/transfer',
        'application/vnd.iris.ticket+json',
        {
            'team': '{teamName}'
        },
        to='postmaster@desk.msging.net'
    )
)
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@desk.msging.net",
  method: Lime.CommandMethod.SET,
  uri: "/tickets/{ticketId}/transfer",
  type: "application/vnd.iris.ticket+json",
  resource: {
    team: "{teamName}"
  }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/{ticketId}/transfer"),
    Resource = new Ticket{
        Team = "{teamName}"
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```
