## Broadcast

The **broadcast** extension allows creation and management of distribution lists and their members for sending messages to multiple destinations simultaneously. 

Each distribution list has a unique address in the format `list-name@broadcast.msging.net` in addition to the members, who are the recipients of messages sent to this list. Only the chatbot that created a remote list has permissions to send messages to it.

Notifications are forwarded to the chatbot when received by the extension.

In order to use **broadcast** extension features you must send commands with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The schedule document. |
| type | **"application/vnd.iris.distribution-list+json"** |
| uri    | **/lists**   |
| to     | **postmaster@broadcast.msging.net** |

The command's properties `resource` and `method` can change according of the feature.
An schedule object passed as a document `resource` has the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **identity** | Identifier of a distribution list.                          | news@broadcast.msging.net |

#### Default list

BLiP automatically creates a distribution list with all clients that have already contacted your chatbot. Its address is `[bot-identifier]+senders@broadcast.msging.net` where `bot-identifier` is the identifier of your chatbot, which is used with the access key for authentication.

For example, for a chatbot with identifier `mychatbot`, this list address would be `mychatbot+senders@broadcast.msging.net`.

#### Replacement variables

It is possible to use contact replacement variables in the sent messages. For more information, please check the documentation of the [**Contacts** extension](https://portal.blip.ai/#/docs/extensions/contacts).

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
    "id": "1",
    "to": "postmaster@broadcast.msging.net",
    "method": "set",
    "type": "application/vnd.iris.distribution-list+json",
    "uri": "/lists",
    "resource": {
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
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Broadcast;

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

Before to make a broadcast is necessary create a distribution list and add some members. To create a distribution list with `your_distributionList` identifier you must send command with `SET` method and a `resource` document with identity equals to `your_distributionList@broadcast.msging.net`.

### Add a member to list

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({  
      "id": "2",
      "to": "postmaster@broadcast.msging.net",
      "method": "set",
      "uri": "/lists/your_distributionList@broadcast.msging.net/recipients",
      "type": "application/vnd.lime.identity",
      "resource": message.from //user identity
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
  "id": "2",
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
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Broadcast;

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

After to create a distribution list you must add some members to receive your broadcasts. To add a member with `551100001111@0mn.io` identity to a list with `your_distributionList` identifier you must send command with `SET` method and a `resource` document equals to a member identity (`551100001111@0mn.io`). Note that the command URI also must contains the list identifier (`/lists/your_distributionList@broadcast.msging.net/recipients`)

### Remove members from list

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({  
    "id": "3",
    "to": "postmaster@broadcast.msging.net",
    "method": "delete",
    "uri": "/lists/your_distributionList@broadcast.msging.net/recipients/user_identity@0mn.io"
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

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Broadcast;

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

As the same way you add some members into a distribution list is possible remove the members. To remove a member with `551100001111@0mn.io` identity to a list with `your_distributionList` identifier you must send command with `DELETE` method and command URI with the list and memeber identifier (`/lists/your_distributionList@broadcast.msging.net/recipients/551100001111@0mn.io`)

###Send message

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    'id': '4',
    'to': 'your_distributionList@broadcast.msging.net',
    'type': 'text/plain',
    'content': 'Hello participants of this list!'
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "4",
  "to": "your_distributionList@broadcast.msging.net",
  "type": "text/plain",
  "content": "Hello participants of this list!"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

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

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Broadcast;
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

If you already have a distribution list with some members you can send messages to this list. Any message sent to a specific list you be received to all of your members.

###Send message with replacement variable

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({  
    "id": "5",
    "to": "your_distributionList@broadcast.msging.net",
    "type": "text/plain",
    "content": "Hello ${contact.name}, come to check out our prices!"
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "5",
  "to": "your_distributionList@broadcast.msging.net",
  "type": "text/plain",
  "content": "Hello ${contact.name}, come to check out our prices!"
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Broadcast;
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
Note: To make your broadcast more personal you can also replace contact variables in messages sent to a distribution list. 
</aside>

For more information, please check the documentation of the [**Contacts** extension](#contacts).











