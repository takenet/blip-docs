## Chat history

The **threads** (or **chat history**) extension allows the chatbot to retrieve the last threads and messages exchanged with the customers.

To get client's **threads** or **messages** exchanged with a bot, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | **get**  |
| uri    | **/threads**   |
| to     | **postmaster@msging.net** (not required) |


### Get last threads

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var lastThreads = await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        uri: '/threads'
    });
    lastThreads.resource.items.forEach(function (item) {
        console.log(item);
    });  
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "get",
  "uri": "/threads"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.lime.collection+json",
  "resource": {
      "itemType": "application/vnd.iris.thread+json",
      "items": [
        {
          "ownerIdentity": "contact@msging.net",
          "identity": "1180740631991418@messenger.gw.msging.net",
          "lastMessage": {
            "id": "39ed84b9-f89e-4090-a27e-6bd1e69bdfef",
            "direction": "sent",
            "type": "text/plain",
            "content": "Welcome to our service!",
            "date": "2016-12-06T12:32:44.799Z"
          },
          "unreadMessages": 0
        },
        {
          "ownerIdentity": "contact@msging.net",
          "identity": "29%3A1SaTsDWumQFx72srIXI8uhTlpRzPwuJ4TRVhRpSBB7mQ@skype.gw.msging.net",
          "lastMessage": {
            "id": "cc2b70ce-921b-4856-ae41-f00d897f1423",
            "direction": "received",
            "type": "text/plain",
            "content": "Hi",
            "date": "2016-11-24T20:41:38.940Z"
          },
          "unreadMessages": 1
        }
      ]
  },
  "method": "get",
  "status": "success",
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#az-iris3",
  "to": "contact@msging.net",
  "metadata": {
      "#command.uri": "lime://contact@msging.net/threads"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.Threads;

namespace Extensions
{
    public class GetThreadsReceiver : IMessageReceiver
    {
        private readonly IThreadExtension _threadExtension;

        public GetThreadsReceiver(IThreadExtension threadExtension)
        {
            _threadExtension = threadExtension;
        }

        public async Task ReceiveAsync(Message receivedMessage, CancellationToken cancellationToken)
        {
            var lastThreads = await _threadExtension.GetThreadsAsync(cancellationToken);
        }
    }
}
```

Getting the last chatbot's threads. By default, BLiP returns the last 50 threads.

The following uri filters are available to get chatbot's threads:

| QueryString  | Description                               |
|--------------|-------------------------------------------|
| $take        | Limit of total of items to be returned. The maximum value allowed is 100 |
| messageDate  | Initial date on the threads query         |

### Get last messages

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var lastMessages = await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        uri: '/threads/destination@0mn.io'
    });
    lastMessages.resource.items.forEach(function (item) {
        console.log(item);
    });  
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "get",
  "uri": "/threads/1180740631991418@messenger.gw.msging.net"
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
          "id": "39ed84b9-f89e-4090-a27e-6bd1e69bdfef",
          "direction": "sent",
          "type": "text/plain",
          "content": "Welcome!",
          "date": "2016-12-06T12:32:44.799Z",
          "status": "consumed"
        },
        {
          "id": "15073ef5-9bab-493c-b630-8636eacba33e",
          "direction": "sent",
          "type": "text/plain",
          "content": "This is a test chatbot.",
          "date": "2016-12-06T12:32:40.640Z",
          "status": "consumed"
        },
        {
          "id": "9b49a7d6-d025-4bb6-a370-1d48fb457deb",
          "direction": "received",
          "type": "text/plain",
          "content": "Good morning",
          "date": "2016-12-06T12:32:35.398Z",
          "status": "accepted"
        }
      ]
  },
  "method": "get",
  "status": "success",
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#az-iris1",
  "to": "contact@msging.net",
  "metadata": {
      "#command.uri": "lime://contact@msging.net/threads/destination@0mn.io"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.Threads;

namespace Extensions
{
    public class GetMessagesReceiver : IMessageReceiver
    {
        private readonly IThreadExtension _threadExtension;

        public GetMessagesReceiver(IThreadExtension threadExtension)
        {
            _threadExtension = threadExtension;
        }

        public async Task ReceiveAsync(Message receivedMessage, CancellationToken cancellationToken)
        {
            var lastMessages = await _threadExtension.GetThreadAsync(
                "destination@0mn.io", 
                cancellationToken
            );
        }
    }
}
```

Getting the last chatbot's messages in a specific thread. The thread is identified by a client identity (for example: `1180740631991418@messenger.gw.msging.net`). By default, BLiP will return the last 20 thread messages.

The following uri filters are available to get a chatbot's thread:

| QueryString  | Description                               |
|--------------|-------------------------------------------|
| $take        | Limit of total of items to be returned. The maximum value allowed is 100 |
| messageId  | Initial message id for the thread messages query        |
| direction  | Possible values: `asc` and `desc`. Define if will be returned de messages after or before respectively |
