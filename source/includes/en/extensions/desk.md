## Desk

The **desk** extension allows routing and exchange of messages and notifications between bot users and human agents. The human agents can reply the messages using any BLiP supported help desk application ([BLiP Desk](https://desk.blip.ai) for instance). Hence, a bot can forward received messages from users to a **human agent** on the chosen help desk application and vice versa, in a transparent way.

This feature is useful for **enabling humans to reply some complex or unhandled messages as the bot**. For example, imagine that you want a chatbot that knows a lot about soccer teams, but for some reason it doesn't know exactly the tickets prices for some matchs. In this scenario, you can use a human to help the bot answer only when users ask about ticket prices.

*Note: BLiP offers [BLiP Desk](https://desk.blip.ai), a free and powerful desk application to enable humans to reply messages sent by a bot.*

Before using this extension, check if you have already properly set a customer service tool (help desk application) on the Portal and if you already have at least one available human agent to receive and reply to messages.

### Add a new agent

Add a new agent to your attendance team.

You must submit a [attendant](/#attendant) document, with at least an `identity`, an `email` and a `team`.

<aside class="notice">
Note: The identity must be in the form <b>jonh%40email.com@blip.ai</b> for an email <b>jonh@email.com</b>
</aside>

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "75481236",
  "to": "postmaster@desk.msging.net",
  "method": "set",
  "uri": "/attendants",
  "type": "application/vnd.iris.desk.attendant+json",
  "resource": {
    "identity": "{identity}",
    "email": "{email}",
    "teams": [
        "{team1}"
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
    email: "{email}",
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
        Email = "{email}"
    }
};
```

### Adding ticket tags

Each [ticket](/#ticket) has an optional parameter called `Tags`. A tag is a label to identify important things in a ticket.
To add tags in a specifc ticket send a command with `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{ticketId}/change-tags`, where `ticketId` is the ticket identifier to be updated. Use the `resource` property to send tags informations.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "8d1f6a56-e287-4a0f-9030-6983c76ad26c",
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

### Close a ticket as attendant

Closing a [ticket](/#ticket) as the attendant.

To make this possible send a command with `SET` method to `postmaster@desk.msging.net` URI `/tickets/change-status` and resource with ticket `id` and `status` with **ClosedAttendant**.

```http
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

```http
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

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "487556",
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
        "customerInput": {}
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

### Create a ticket for an attendance

Before start to attendance some user is necessary first open a [ticket](/#ticket).
To open a ticket send a command with `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{customerIdentity}`, where `customerIdentity` is the customer identity to be attended. Use the `resource` property to delivery a context for the ticket.

```http
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

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@desk.msging.net",
  method: Lime.CommandMethod.SET,
  uri: "/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1%400mn.io",
  type: "text/plain",
  resource: "I need a human!"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1%400mn.io"),
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

```javascript
{type: 'application/vnd.iris.ticket+json',
  resource:
   {
     id: '89e18743-ee13-498e-a8a8-de5e8a7da846',
     sequentialId: 1,
     ownerIdentity: 'testehome1@msging.net',
     customerIdentity: 'ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1@0mn.io',
     customerDomain: '0mn.io',
     provider: 'Lime',
     status: 'Waiting',
     storageDate: '2018-07-05T18:55:59.660Z',
     externalId: '89e18743-ee13-498e-a8a8-de5e8a7da846',
     rating: 0,
     team: 'Default',
     unreadMessages: 0,
     closed: false },
  method: 'set',
  status: 'success',
  id: 'a7ee981b-43fa-47a3-a5bc-a6a2b5d979ac',
  from: 'postmaster@desk.msging.net/#az-iris4',
  to: 'testehome1@msging.net/default',
  metadata:
   { '#command.uri':
      'lime://testehome1@msging.net/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1%400mn.io' }
}
```

```csharp
result: {Lime.Protocol.Command}
    From [Node]: {postmaster@desk.msging.net/#az-iris6}
    Id [string]: "065f1579-b220-45dc-be69-3a6c844016c3"
    Metadata [IDictionary]: Count = 1
        Key [string]: "#command.uri"
        Value [string]: "lime://testehome1@msging.net/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac.testehome1%400mn.io"
    Resource [Document]: {Takenet.Iris.Messaging.Resources.Ticket}
        Status [TicketStatusEnum]: Waiting
        SequentialId [int]: 1
        Provider [string]: "Lime"
        OwnerIdentity [Identity]: {testehome1@msging.net}
```

### Delete an agent

Delete an specific [agent](/#attendant) from your attendance team.

Replace `{agentId}` with the agent Id you want to delete.

<aside class="notice">
Note: The identity must be in the form <b>jonh%2540email.com@blip.ai</b> for an identity <b>jonh%40email.com</b>
</aside>

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "14857699",
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

The proccess of close a ticket is the last thing to do during an attendance. If a [ticket](/#ticket) is closed by the customer is possible close permanently to unable any data update. In order to finalize permanently a ticket send a command with `SET` method to `postmaster@desk.msging.net` and URI `/tickets/{ticketId}/close` .

```http
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

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    uri: "/tickets/ba11b95c-7564-4685-b835-8cc76fae6fac/close",
    resource: {
        customerIdentity: "1654804277843415@messenger.gw.msging.net",
        id: "ba11b95c-7564-4685-b835-8cc76fae6fac",
        ownerIdentity: "testehome1@msging.net",
        status: "ClosedClient",
        tags: ["AtendimentoTeste"]
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/change-status"),
    Resource = new Ticket{
        CustomerIdentity = "1654804277843415@messenger.gw.msging.net", 
        Id =  "ba11b95c-7564-4685-b835-8cc76fae6fac",
        OwnerIdentity = "testehome1@msging.net",
        Status = TicketStatusEnum.ClosedClient,
        Tags = ["AtendimentoTeste"]
    }
};
```

<aside class="notice">
Note: The `tags` property can be hide if you didn't set the Tags configurations in Portal.
</aside>

### Forwarding received messages from a human agent to a final user

>Imagine a scenario where a human agent is replying to some message to a user on Messenger channel. The message received by the bot from the human agent must be fowarded to the final user.

First, the bot receives a message as below:

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{
    "id": "2",
    "from": "1654804277843415%40messenger.gw.msging.net@desk.msging.net",
    "to": "bot@msging.net/instance",
    "type": "text/plain",
    "content": "Hello, here is a human being ;)"
}
```

```javascript
client.addMessageReceiver(true, function(message) {
  // Process received message
})
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
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
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

### Get a ticket

Get a specific [ticket](/#ticket).

Replace the variable `{ticketId}` with the ticket id you want to get.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "74863215",
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
        "closed": false
    },
    "method": "get",
    "status": "success",
    "id": "c1a55103-7be6-4112-a273-cc8f66e8fea9",
    "from": "postmaster@desk.msging.net/#az-iris7",
    "to": "demobot@msging.net",
}
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

### Get all active tickets

Returns all the active [tickets](/#ticket).

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "8541256",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets/active"
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
    "id": "056e24b4-414f-4f53-87fc-98172c30d27a",
    "from": "postmaster@desk.msging.net/#az-iris5",
    "to": "demobot@msging.net"
}
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/active")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/tickets/active"
})
```

### Get all bot's attendants

In order to get all attendants of some bot send a command with `GET` method to `postmaster@desk.msging.net` and URI `/attendants` . This feature is usefull to know if there are any available attendant to answer customers questions.

```http
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

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "0125744",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets/{customerIdentity}/closed"
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
    Uri = new LimeUri("/tickets/{customerId}/closed")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/tickets/{customerId}/closed"
})
```

### Get all messages in a ticket

Return all [messages](/#messages) from a specific [ticket](/#ticket).

Replace `{ticketId}` with the ticket id you want to get the messages.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "0258413",
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

### Get all tickets of a bot

In order to get any ticket of some bot send a command with `GET` method to `postmaster@desk.msging.net` and URI `/tickets` .
To filter specific tickets you can use **$filter** parameter on query string with the following properties:


| **$filter**     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **skip** | The number of elements to be skipped                           | 0 |
| **take** | The number of elements to be returned                          | 10 |

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

```http
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

### Get waiting tickets

Returns the number of waiting [tickets](/#ticket).

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "4965782",
  "to": "postmaster@desk.msging.net",
  "method": "get",
  "uri": "/tickets/waiting"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "text/plain",
    "resource": "5",
    "method": "get",
    "status": "success",
    "id": "33d4-26a6c1c26b0e",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@desk.msging.net",
    method: "get",
    uri: "/tickets/waiting"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postsmaster@desk.msging.net",
    Uri = new LimeUri("/tickets/waiting")
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

### Transfer a ticket to another team

Transfer a specfic [ticket](/#ticket) to another team.

Replace `{ticketId}` with the ticket id you want to transfer.
Replace `{teamName}` with the team name you want to transfer to.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "1488774",
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
        "parentSequentialId": 140
    },
    "method": "set",
    "status": "success",
    "id": "6b69c390-5660-483a-8b4e-1ef30c1088ae",
    "from": "postmaster@desk.msging.net/#az-iris1",
    "to": "demobot4@msging.net"
}
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
    Uri = new LimeUri("/tickets/{ticketId/transfer"),
    Resource = new Ticket{
        Team = "{teamName}"
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```