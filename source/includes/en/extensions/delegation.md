## Delegation

The **delegation** extension allows the chatbot to give permissions to other **BLiP** identities - like another chatbots - to execute action *on its behalf* like sending messages. The delegation can be required by some extensions. It is required to be execute only once for each delegated identity.

To use the **delegation** extension send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The delegation document |
| type | The document type |
| uri    | **/delegations**   |
| to     | **postmaster@msging.net** (not required) |

The command's properties `resource` and `method` can change according of the feature.
A delegation object passed as a `resource` document has the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **target** | Identity that will receive permission to make request as the caller. | postmaster@broadcast.msging.net |
| **envelopeTypes**   | Envelope types that the target you receive permission to send behalf of the caller  | ["message", "notification"] |

For more details, check the **delegation** resource on [LIME protocol](http://limeprotocol.org/resources.html#delegation) specification.

### Give permissions

```http
POST https://msging.net/commands HTTP/1.1
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
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Sender;
using Takenet.MessagingHub.Client.Extensions.Delegation;

namespace Extensions
{
    public class DelegationMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IDelegationExtension _delegationExtension;

        public DelegationMessageReceiver(IMessagingHubSender sender, IDelegationExtension delegationExtension)
        {
            _sender = sender;
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

### Revoke permissions
```http
POST https://msging.net/commands HTTP/1.1
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
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Sender;
using Takenet.MessagingHub.Client.Extensions.Delegation;

namespace Extensions
{
    public class DelegationMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IDelegationExtension _delegationExtension;

        public DelegationMessageReceiver(IMessagingHubSender sender, IDelegationExtension delegationExtension)
        {
            _sender = sender;
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