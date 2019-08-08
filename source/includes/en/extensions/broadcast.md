## Broadcast

The **broadcast** extension allows creation and management of distribution lists and their members for sending messages to multiple destinations simultaneously. 

Each distribution list has a unique address in the format `list-name@broadcast.msging.net` in addition to the members, who are the recipients of messages sent to this list. Only the chatbot that created a remote list has permission to send messages to it.

Notifications are forwarded to the chatbot when received by the extension.

In order to use **broadcast** extension features, you must send commands with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The schedule document. |
| type | **"application/vnd.iris.distribution-list+json"** |
| uri    | **/lists**   |
| to     | **postmaster@broadcast.msging.net** |

The command's properties `resource` and `method` can change according to the feature.
An schedule object passed as a document `resource` has the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **identity** | Identifier of a distribution list.                          | news@broadcast.msging.net |

#### Default list

BLiP automatically creates a distribution list with all clients that have already contacted your chatbot. Its address is `[bot-identifier]+senders@broadcast.msging.net` where `bot-identifier` is the identifier of your chatbot, which is used with the access key for authentication.

For example, for a chatbot with identifier `mychatbot`, this list address would be `mychatbot+senders@broadcast.msging.net`.

#### Replacement variables

It is possible to use contact replacement variables in the sent messages. For more information, please check the documentation of the [**Contacts** extension](#contacts).

#### Availability

The Broadcast service is available in the following domains:

|Domain     |Available  |Observation                                            |
|---	      |---	      |---                                                    |
|Messenger  |x          |Needed initial user interaction with chatbot           |
|BLiP Chat  |x          |Not necessary initial user interaction with chatbot    |
|Skype      |x          |Needed initial user interaction with chatbot           |
|SMS        |x          |Not necessary initial user interaction with chatbot    |
|Telegram   |x          |Needed initial user interaction with chatbot           |
|Workplace  |x          |Needed initial user interaction with chatbot           |


### Create a list

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@broadcast.msging.net",
    method: Lime.CommandMethod.SET,
    type: "application/vnd.iris.distribution-list+json",
    uri: "/lists",
    resource: {
        "identity": "your_distributionList@broadcast.msging.net"
    }
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "1",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "type": "application/vnd.iris.distribution-list+json",
  "uri": "/lists",
  "resource": {  
    "identity": "your_distributionList@broadcast.msging.net"
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

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Broadcast;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBroadcastExtension _broadcastExtension;

        public SampleMessageReceiver(IBroadcastExtension broadcastExtension)
        {
            _broadcastExtension = broadcastExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var listName = "your_distributionList";

            await _broadcastExtension.CreateDistributionListAsync(listName);
        }
    }
}
```

Before making a broadcast, it is necessary to create a distribution list and add some members to it. To create a distribution list with `your_distributionList` identifier you must send command with `SET` method and a `resource` document with identity equal to `your_distributionList@broadcast.msging.net`.

### Get all lists

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@broadcast.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/lists"
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "2",
  "to": "postmaster@broadcast.msging.net",
  "method": "get",
  "uri": "/lists"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "2",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 2,
    "itemType": "application/vnd.lime.identity",
    "items": [
      "list1@msging.net",
      "contact+senders@msging.net"
    ]
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Broadcast;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBroadcastExtension _broadcastExtension;

        public SampleMessageReceiver(IBroadcastExtension broadcastExtension)
        {
            _broadcastExtension = broadcastExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            // 0 is the initial position (number of lists to be skipped)
            // 5 is the number os lists to be returned
            await _broadcastExtension.GetRecipientsAsynGetAllDistributionListsAsync(0, 5, cancellationToken);
        }
    }
}
```

To get all distribution lists associated with your chatbot, you must send a command with `GET` method.

### Add a member to list

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({  
      id: Lime.Guid(),
      to: "postmaster@broadcast.msging.net",
      method: Lime.CommandMethod.SET,
      uri: "/lists/your_distributionList@broadcast.msging.net/recipients",
      type: "application/vnd.lime.identity",
      resource: message.from //user identity
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "3",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "uri": "/lists/your_distributionList@broadcast.msging.net/recipients",
  "type": "application/vnd.lime.identity",
  "resource": "551100001111@0mn.io"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "3",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Broadcast;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBroadcastExtension _broadcastExtension;

        public SampleMessageReceiver(IBroadcastExtension broadcastExtension)
        {
            _broadcastExtension = broadcastExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var listName = "your_distributionList";

            await _broadcastExtension.AddRecipientAsync(listName, Identity.Parse("551100001111@0mn.io"));
        }
    }
}
```

After creating a distribution list, you must add some members to receive your broadcasts. To add a member with `551100001111@0mn.io` identity to a list with `your_distributionList` identifier, you must send a command with `SET` method and `resource` document equal to a member identity (`551100001111@0mn.io`). Note that the command URI also must contains the list identifier (`/lists/your_distributionList@broadcast.msging.net/recipients`)

### Remove members from list

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({  
    id: Lime.Guid(),
    to: "postmaster@broadcast.msging.net",
    method: Lime.CommandMethod.DELETE,
    uri: "/lists/your_distributionList@broadcast.msging.net/recipients/user_identity@0mn.io"
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "4",
  "to": "postmaster@broadcast.msging.net",
  "method": "delete",
  "uri": "/lists/your_distributionList@broadcast.msging.net/recipients/551100001111@0mn.io"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Broadcast;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBroadcastExtension _broadcastExtension;

        public SampleMessageReceiver(IBroadcastExtension broadcastExtension)
        {
            _broadcastExtension = broadcastExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var listName = "your_distributionList";

            await _broadcastExtension.DeleteRecipientAsync(listName, Identity.Parse("551100001111@0mn.io"));
        }
    }
}
```

As the same way you add some members into a distribution list, it is possible to remove its members. To remove a member with `551100001111@0mn.io` identity from a list with `your_distributionList` identifier, you must send a command with `DELETE` method and command URI with the list and memeber identifier (`/lists/your_distributionList@broadcast.msging.net/recipients/551100001111@0mn.io`)

### Get all members of a list

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@broadcast.msging.net",
    method: Lime.CommandMethod.GET,
    uri: "/lists/your_distributionList@broadcast.msging.net/recipients?$skip=0&$take=5"
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "5",
  "to": "postmaster@broadcast.msging.net",
  "method": "get",
  "uri": "/lists/your_distributionList@broadcast.msging.net/recipients?$skip=0&$take=5"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "5",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 30,
    "itemType": "application/vnd.lime.identity",
    "items": [
      "contact+senders@msging.net",
      "list1@msging.net",
      "list2@msging.net",
      "list3@msging.net",
      "list4@msging.net"
    ]
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Broadcast;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBroadcastExtension _broadcastExtension;

        public SampleMessageReceiver(IBroadcastExtension broadcastExtension)
        {
            _broadcastExtension = broadcastExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var listName = "your_distributionList";

            await _broadcastExtension.GetRecipientsAsync(listName, 0, 5, cancellationToken);
        }
    }
}
```

To get all members of a distribution list, you must send a command with `GET` method and command URI with the list identifier (`/lists/your_distributionList@broadcast.msging.net/recipients`)

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **skip** | The number of members to be skipped                           | 0 |
| **take** | The number of members to be returned                          | 100 |


###Send message

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'your_distributionList@broadcast.msging.net',
    type: 'text/plain',
    content: 'Hello participants of this list!'
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "6",
  "to": "your_distributionList@broadcast.msging.net",
  "type": "text/plain",
  "content": "Hello participants of this list!"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "6",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  event": "received"
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "6",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "event": "consumed"
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Broadcast;
using Lime.Messaging.Contents;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBroadcastExtension _broadcastExtension;

        public SampleMessageReceiver(IBroadcastExtension broadcastExtension)
        {
            _broadcastExtension = broadcastExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var listName = "your_distributionList";

            await _broadcastExtension.SendMessageAsync(listName, new PlainText { Text = "Hello participants of this list!" });
        }
    }
}
```

If you already have a distribution list with some members, you can send messages to this list. Any message sent to a specific list will be received by all of its members.

### Send message with replacement variable

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendMessage({  
    id: Lime.Guid(),
    to: "your_distributionList@broadcast.msging.net",
    type: "text/plain",
    content: "Hello ${contact.name}, come to check out our prices!"
  });
});
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "7",
  "to": "your_distributionList@broadcast.msging.net",
  "type": "text/plain",
  "content": "Hello ${contact.name}, come to check out our prices!"
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Broadcast;
using Lime.Messaging.Contents;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBroadcastExtension _broadcastExtension;

        public SampleMessageReceiver(IBroadcastExtension broadcastExtension)
        {
            _broadcastExtension = broadcastExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var listName = "your_distributionList";

            await _broadcastExtension.SendMessageAsync(listName, new PlainText { Text = "Hello ${contact.name}, come to check out our prices!" });
        }
    }
}
```

<aside class="notice">
Note: To make your broadcast more personal, you can also replace contact variables in messages sent to a distribution list. 
</aside>

For more information, please check the documentation of the [**Contacts** extension](#contacts).
