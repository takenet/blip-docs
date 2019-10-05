## Builder

| Address                         |
|---------------------------------|
| postmaster@msging.net           |

**Builder** is a visual tool for create any type of bots with no code. Behind the scenes Builder is a state machine fully integrated with the others BLiP's components.

**The Builder** extension allows change some Builder's behaviors programmaticaly. You can **change or reset a user state** with a command. In addition, the extension can be used to manage the whole bot flow.

### Change user state

In order to change a user state, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | **set**  |
| uri    | **/contexts/{{user-identity}}/stateid%40{{flow-identifier}}**   |
| to     | **postmaster@msging.net** (not required) |
| type   | **text/plain** |
| resource | **{{state-id}}** |

Access the portal, go to Builder and click on the block contextual menu to get its ID (as picture below).

![image](state_id.png)

To get the flow identifier, click in Builder's settings and go to Flow Identifier section (as picture below).

![image](flow_id.png)

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to reset (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io</b>). You must also define what is the new state you want to send the user, replacing the {{state-id}} variable (for instance: <b>state-one</b>).
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        to: 'postmaster@msging.net',
        method: Lime.CommandMethod.SET,
        uri: '/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io/stateid%400',
        type: 'text/plain',
        resource: 'state-one'
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "1294447a-2581-4597-be6a-a5dff33af156",
  "to": "postmaster@msging.net",
  "method": "set",
  "uri": "/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io/stateid%400",
  "type": "text/plain",
  "resource": "state-one"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "1294447a-2581-4597-be6a-a5dff33af156",
    "from": "postmaster@msging.net/#az-iris3",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io/stateid%400"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Session;

namespace Extensions
{
    public class ChangeUserStateReceiver : IMessageReceiver
    {
        private readonly IStateManager _stateManager;

        public ChangeUserStateReceiver(IStateManager stateManager)
        {
            _stateManager = stateManager;
        }
        
        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            await _stateManager.SetStateAsync(message.From, "state-one", cancellationToken);
        }
    }
}
```

### Get user state

In order to get a user state, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| to     | **postmaster@msging.net** (not required) |
| method    | **get**  |
| uri    | **/contexts/{{user-identity}}/stateid%40{{flow-identifier}}**   |

To get the flow identifier, click in Builder's settings and go to Flow Identifier section (as picture below).

![image](flow_id.png)

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to reset (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io</b>).
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        to: 'postmaster@msging.net',
        method: Lime.CommandMethod.GET,
        uri: '/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io/stateid%400'        
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "1294447a-2581-4597-be6a-a5dff33af156",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io/stateid%400"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{    
    "type": "text/plain",
    "resource": "950dbc23-124a-41ac-8014-37dc6a7909d6",
    "method": "get",
    "status": "success",
    "id": "1294447a-2581-4597-be6a-a5dff33af156",
    "from": "postmaster@msging.net/#az-iris4",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io/stateid%400"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Session;

namespace Extensions
{
    public class GetUserStateReceiver : IMessageReceiver
    {
        private readonly IStateManager _stateManager;

        public GetUserStateReceiver(IStateManager stateManager)
        {
            _stateManager = stateManager;
        }
        
        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var state = await _stateManager.GetStateAsync(message.From, cancellationToken);
        }
    }
}
```

### Reset user state

In order to reset a user state, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | **delete**  |
| uri    | **/contexts/{{user-identity}}/stateid%40{{flow-identifier}}**   |
| to     | **postmaster@msging.net** (not required) |

To get the flow identifier, click in Builder's settings and go to Flow Identifier section (as picture below).

![image](flow_id.png)

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to reset (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io</b>)
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.DELETE,
        uri: '/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io/stateid%400f2b4564-9063-43e4-b0ef-46406dea65a5'
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "delete",
  "uri": "/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io/stateid%400f2b4564-9063-43e4-b0ef-46406dea65a5"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "0094447a-2581-4597-be6a-a5dff33af156",
    "from": "postmaster@msging.net/#az-iris1",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io/stateid%400f2b4564-9063-43e4-b0ef-46406dea65a5"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Session;

namespace Extensions
{
    public class ResetUserStateReceiver : IMessageReceiver
    {
        private readonly IStateManager _stateManager;

        public ResetUserStateReceiver(IStateManager stateManager)
        {
            _stateManager = stateManager;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            await _stateManager.ResetStateAsync(message.From, cancellationToken);
        }
    }
}
```