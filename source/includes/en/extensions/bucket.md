## Bucket

The **bucket** extension allows the storage of documents in the server on an isolated chatbot's container. This extension is useful to store information about clients that have interacted with the chatbot, like preferences and navigation state.

Each document has an **identifier** which is provided during the write operation and this identifier should be used for retrieving the value later. It is possible to set an optional **expiration date** for the document. Both the identifier and the expiration date are specified in the **URI** of the command which is sent to the extension.

**Note: If expiration date is not provided, the document will never expire.**

To use the **bucket** extension, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The document to be stored. |
| type | The document type |
| uri    | **/buckets**   |
| to     | **postmaster@msging.net** (not required) |

The command's properties `resource` and `method` can change according to the feature.
The document to be stored must be passed on the `resource` property.

### Delete a Document

Delete a specific document command. Remember to replace `{documentKey}` variable for the document Key that you want delete.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "1306d0bb-29f8-41c3-bdf2-c84dec02852c",
  "to": "postmaster@msging.net",
  "method": "delete",
  "uri": "/buckets/{documentKey}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "method": "delete",
    "status": "success",
    "id": "1306d0bb-29f8-41c3-bdf2-c84dec02852c",
    "from": "postmaster@msging.net/#az-iris4"
}
```

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.DELETE,
        uri: '/buckets/xyz1234'
    });
});
```
### Get a document

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        uri: '/buckets/xyz1234'
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "3",
  "method": "get",
  "uri": "/buckets/xyz1234"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/json",
  "resource": {  
    "key1": "value1",
    "key2": 2,
    "key3": [  
      "3a", "3b", "3c"
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
using Take.Blip.Client.Extensions.Bucket;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBucketExtension _bucketExtension;

        public SampleMessageReceiver(IBucketExtension bucketExtension)
        {
            _bucketExtension = bucketExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var document = await _bucketExtension.GetAsync<JsonDocument>("xyz1234", cancellationToken);
        }
    }
}
```

Retrieving a JSON document identified by `xyz1234` key.

### Get a document collection

Retrieving all documents identifieds by ID key.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "199591239123",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/buckets"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "text/plain",
        "items": [
            "abcd9876",
            "xyz1234"
        ]
    },
    "method": "get",
    "status": "success",
    "id": "ed5f2afb-2107-43e2-9c61-43637a7aafaa",
    "from": "postmaster@msging.net/#az-iris3",
    "to": "demobot4@msging.net",
    "metadata": {
        "#command.uri": "lime://demobot4@msging.net/buckets"
    }
}
```

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        uri: '/buckets'
    });
});
```

### Store a custom document

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        uri: "/buckets/abcd9876?expiration=30000",
        type: "application/x-my-type+json",
        resource: {  
            "myTypeKey1": "value1",
            "myTypeKey2": 2
        }
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "2",
  "method": "set",
  "uri": "/buckets/abcd9876?expiration=30000",
  "type": "application/x-my-type+json",
  "resource": {  
    "myTypeKey1": "value1",
    "myTypeKey2": 2
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
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
using Take.Blip.Client.Extensions.Bucket;
using System.Runtime.Serialization;
using Take.Blip.Client.Extensions;

namespace Extensions
{
    [DataContract]
    public class MyType : Document
    {
        public const string MIME_TYPE = "application/x-my-type+json";

        public static readonly MediaType MediaType = MediaType.Parse(MIME_TYPE);

        public MyType()
            : base(MediaType)
        {
        }

        [DataMember]
        public string MyTypeKey1 { get; set; }

        [DataMember]
        public int MyTypeKey2 { get; set; }
    }

    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBucketExtension _bucketExtension;

        public SampleMessageReceiver(IBucketExtension bucketExtension)
        {
            _bucketExtension = bucketExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            // Storing a custom document without expiration
            var myTypeDocument = new MyType();
            myTypeDocument.MyTypeKey1 = "value1";
            myTypeDocument.MyTypeKey2 = 2;
            await _bucketExtension.SetAsync("abcd9876", myTypeDocument);
            
            // Storing a custom document with expiration
            var bucketId = "abcd9876";
            var expiration = 3000;
            var command = new Command(){
                Id = EnvelopeId.NewId(),
                Method = CommandMethod.Set,
                Uri = new LimeUri($"/buckets/{bucketId}?expiration={expiration}"), 
                Resource = myTypeDocument
            };

        }
    }
}
```

Storing a custom document with type `application/x-my-type+json` and `abcd9876` identifier, setting the expiration to 30000 milisseconds (or 30 seconds):

<aside  class="notice">
Note: If you create a custom document, <b>you must</b> register this type on <i>Startup.cs</i> class. To do that, follow this steps: Create a field <code>private  readonly  IDocumentTypeResolver  _documentTypeResolver</code>, assign it in the class constructor and then, on <i>StartAsync</i> method add this line: <code>_documentTypeResolver.WithBlipDocuments();</code>
</aside>

### Store a JSON document

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        uri: '/buckets/xyz1234',
        type: 'application/json',
        resource: {  
            'key1': 'value1',
            'key2': 2,
            'key3': [  
                '3a', '3b', '3c'
            ]
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
  "method": "set",
  "uri": "/buckets/xyz1234",
  "type": "application/json",
  "resource": {  
    "key1": "value1",
    "key2": 2,
    "key3": [  
      "3a", "3b", "3c"
    ]
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Bucket;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IBucketExtension _bucketExtension;

        public SampleMessageReceiver(IBucketExtension bucketExtension)
        {
            _bucketExtension = bucketExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var jsonDocument = new JsonDocument();
            jsonDocument.Add("key1", "value1");
            jsonDocument.Add("key2", 2);
            jsonDocument.Add("key3", new string[] { "3a", "3b", "3c"} );

            await _bucketExtension.SetAsync("xyz1234", jsonDocument);
        }
    }
}
```

Storing a JSON object `{"key1": "value1", "key2": 2, "key3": ["3a", "3b", "3c"]}` identified by `xyz1234` key.