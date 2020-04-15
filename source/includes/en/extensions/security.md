### <a name="delegation" style="display:none">Delegation</a>

## Security

The **security** extension allows the chatbot to work with account keys and give permissions (delegation) to other **BLiP** identities - like another chatbots - to execute actions *on its behalf*, like sending messages. The delegation can be required by some extensions. It is required to be executed only once for each delegated identity.

To use the **security** extension, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| type | The document type |
| uri    | **/delegations** and **/accounts**   |
| to     | **postmaster@msging.net** (not required) |

### Get a permission

Get more informations about a specific [delegation](https://limeprotocol.org/resources.html#delegation) (permission).

<aside class="notice">
You can optionally inform an instance, as /delegations/{target}/{instance}.
</aside>

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "4061c985-35ee-4e05-91a8-eb9dcb8bd8c5",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/delegations/postmaster@broadcast.msging.net?envelopeTypes=message"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.delegation+json",
    "resource": {
        "target": "postmaster@broadcast.msging.net"
    },
    "method": "get",
    "status": "success",
    "id": "4061c985-35ee-4e05-91a8-eb9dcb8bd8c5",
    "from": "postmaster@msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/delegations/postmaster@broadcast.msging.net?envelopeTypes=message"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/delegations/postmaster@broadcast.msging.net?envelopeTypes=message"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get all account keys

Get a collection of all account keys

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "938aec47-4ff8-484f-b662-3190ffb1dcf2",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/account/keys"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.accessKey+json",
        "items": [
            {
                "id": "8f38e465-ce25-4dc4-8118-ee92414495ad",
                "account": "demobot@msging.net",
                "requirer": "demobot@msging.net/rd281278f76735"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "938aec47-4ff8-484f-b662-3190ffb1dcf2",
    "from": "postmaster@msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/account/keys"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/account/keys"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Give permissions

```http
POST https://http.msging.net/commands HTTP/1.1
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

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Delegation;

namespace Extensions
{
    public class DelegationMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IDelegationExtension _delegationExtension;

        public DelegationMessageReceiver(IMessagingHubSender sender, IDelegationExtension delegationExtension)
        {
            _sender = sender;
            _settings = settings;
            _delegationExtension = delegationExtension;
        }

        public async Task ReceiveAsync(Message m, CancellationToken cancellationToken)
        {
            var envelopeTypes = new EnvelopeType[]
            {
                EnvelopeType.Message
            };

            await _delegationExtension.DelegateAsync(Identity.Parse("postmaster@broadcast.msging.net"), envelopeTypes, cancellationToken);
        }
    }
}
```

Giving permission to another identity send message as the caller (the bot).

<aside class="notice">
You can optionally inform an instance, as /delegations/{target}/{instance}. This is importante if you wanted to delegate specific target instances.
</aside>

### Revoke permissions

```http
POST https://http.msging.net/commands HTTP/1.1
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

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Delegation;

namespace Extensions
{
    public class DelegationMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IDelegationExtension _delegationExtension;

        public DelegationMessageReceiver(IMessagingHubSender sender, IDelegationExtension delegationExtension)
        {
            _sender = sender;
            _settings = settings;
            _delegationExtension = delegationExtension;
        }

        public async Task ReceiveAsync(Message m, CancellationToken cancellationToken)
        {
            var envelopeTypes = new EnvelopeType[]
            {
                EnvelopeType.Message
            };

            await _delegationExtension.UndelegateAsync(Identity.Parse("postmaster@broadcast.msging.net"), envelopeTypes, cancellationToken);
        }
    }
}
```

Revoking granted permission.

<aside class="notice">
You can optionally inform an instance, as /delegations/{target}/{instance}. This is importante if you wanted to revoke specific target instances.
</aside>

### Set an account key

Crete a new account key to your account.

You must send an [AccountKeyRequest](/#accountkeyrequest) document as a resource.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "6b8bb25e-6a43-4ba8-b9b8-8933c9b2abbf",
  "to": "postmaster@msging.net",
  "method": "set",
  "uri": "/account/keys/",
  "type": "application/vnd.iris.keyRequest+json",
  "resource": {
    "id": "{id}"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.accessKey+json",
    "resource": {
        "id": "a5479d24-8572-416a-ab48-32f3906b2f2c",
        "account": "demobot@msging.net",
        "key": "bDhvUFlWd1hYVkVxSmU2SzQ4ZkE=",
        "requirer": "demobot@msging.net/~ea5145df-95e9-4361-a598-f93932fbd2a3",
        "temporary": false
    },
    "method": "set",
    "status": "success",
    "id": "ea5145df-95e9-4361-a598-f93932fbd2a3",
    "from": "postmaster@msging.net/#az-iris6",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: Lime.CommandMethod.SET,
    uri: "/account/keys",
    type: "application/vnd.iris.keyRequest+json",
    resource: {
        "id": "{id}"
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/account/keys"),
    Type = "application/vnd.iris.keyRequest+json",
    Resource = "{id}"
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

<!-- ### Delete an account key

Delete a bot's account key.

Replace `{accountId}` with the account key you want to delete.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "897a4a9b-e234-4e19-834c-149ad549f0b9",
  "to": "postmaster@msging.net",
  "method": "delete",
  "uri": "/account/keys/{accountId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "897a4a9b-e234-4e19-834c-149ad549f0b9",
    "from": "postmaster@msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: Lime.CommandMethod.DELETE,
    uri: "/account/keys/{accountId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/account/keys/{accountId}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```
 -->