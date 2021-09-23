## Resources

The **resources** extension allows the storage of documents in the server in an isolated space for each chatbot, similar to the **bucket** extension. The main difference is that these documents can be mapped as **contents** for messages sent to the chatbot destinations, through the resource **key**. This means that the chatbot developer can choose to **store the content of its messages in the server** instead of keeping them on the chatbot code side.

**Note: The resource key should always be URI encoded**

To manage all resources programmatically, use **resources** extension sending a command with the following properties:

| Name     | Description                               |
|----------|-------------------------------------------|
| id       | Unique identifier of the command.         |
| method   | The command verb.                         |
| resource | The resource document.                    |
| type     | The type of the resource document.        |
| uri      | **/resources**                            |
| to       | **postmaster@msging.net** (not required). |

The **Blip** portal offers a resource management interface which helps with the edition of content, avoiding the need to update the code on the application side in case of changes in the chatbot.

In order to send a resource message, the developer must use the [**resource** content type](#resource).

### Add a **media link** resource

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        uri: '/resources/abcd%c3%a9%201234',
        type: 'application/vnd.lime.media-link+json',
        resource: {
            title: 'Cat',
            text: 'Here is a cat image for you!',
            type: 'image/jpeg',
            uri: 'http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg',
            size: 227791,
            previewUri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX',
            previewType: 'image/jpeg'
        }
    });
});
```

```python
async def message_processor_async(message: Message) -> None:
    result = await client.process_command_async(
        Command(
            CommandMethod.SET,
            '/resources/abcd%c3%a9%201234',
            'application/vnd.lime.media-link+json',
            {
                'title': 'Cat',
                'text': 'Here is a cat image for you!',
                'type': 'image/jpeg',
                'uri': 'http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg',
                'size': 227791,
                'previewUri': 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX',
                'previewType': 'image/jpeg'
            }
        )
    )

client.add_message_receiver(Receiver(True, message_processor_async))
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "set",
  "uri": "/resources/abcd%c3%a9%201234",
  "type": "application/vnd.lime.media-link+json",
  "resource": {
    "title": "Cat",
    "text": "Here is a cat image for you!",
    "type": "image/jpeg",
    "uri": "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
    "size": 227791,
    "previewUri": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX",
    "previewType": "image/jpeg"
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
    "from": "postmaster@msging.net/#az-iris3",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/resources/abcd%c3%a9%201234"
    }
}
```

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Resource;
using Lime.Messaging.Contents;

namespace Extensions
{
    public class ResourceMessageReceiver : IMessageReceiver
    {
        private IResourceExtension _resourceExtension;

        public ResourceMessageReceiver(IResourceExtension resourceExtension)
        {
            _resourceExtension = resourceExtension;
        }
        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken = default(CancellationToken))
        {
            var mediaLink = new MediaLink
            {
                Title = "Cat",
                Text = "Here is a cat image for you!",
                Uri = new Uri("http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg"),
                Size = 227791,
                Type = MediaType.Parse("image/jpeg"),
                PreviewType = MediaType.Parse("image/jpeg"),
                PreviewUri = new Uri("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX")
            };

            await _resourceExtension.SetAsync<MediaLink>("abcd%c3%a9%201234", mediaLink);
        }
    }
}
```

Storing a `media link` document with `abcdé 1234` key.

### Add a **text/plain** resource

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        uri: '/resources/abcd%c3%a9%201234',
        type: 'text/plain',
        resource: 'To use our services, please send a text message.'
    });
});
```

```python
async def message_processor_async(message: Message) -> None:
    result = await client.process_command_async(
        Command(
            CommandMethod.SET,
            '/resources/abcd%c3%a9%201234',
            'text/plain',
            'To use our services, please send a text message.'
        )
    )

client.add_message_receiver(Receiver(True, message_processor_async))
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "set",
  "uri": "/resources/abcd%c3%a9%201234",
  "type": "text/plain",
  "resource": "To use our services, please send a text message."
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "2",
    "from": "postmaster@msging.net/#az-iris6",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/resources/abcd%c3%a9%201234"
    }
}
```

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Resource;
using Lime.Messaging.Contents;

namespace Extensions
{
    public class ResourceMessageReceiver : IMessageReceiver
    {
        private IResourceExtension _resourceExtension;

        public ResourceMessageReceiver(IResourceExtension resourceExtension)
        {
            _resourceExtension = resourceExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken = default(CancellationToken))
        {
            var plainText = new PlainText
            {
                Text = "To use our services, please send a text message."
            };

            await _resourceExtension.SetAsync<PlainText>("abcd%c3%a9%201234", plainText);   
        }
    }
}
```

Storing a `text plain` document with `abcdé 1234` key.

### Delete a specific resource

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.DELETE,
        uri: '/resources/abcd%c3%a9%201234'
    });
});
```

```python
async def message_processor_async(message: Message) -> None:
    result = await client.process_command_async(
        Command(
            CommandMethod.DELETE,
            '/resources/abcd%c3%a9%201234'
        )
    )

client.add_message_receiver(Receiver(True, message_processor_async))
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "delete",
  "uri": "/resources/abcd%c3%a9%201234"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "a07258fa-0137-4596-a67e-859a5c2ce38f",
    "from": "postmaster@msging.net/#az-iris1",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/resources/abcd%c3%a9%201234"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.Resource;

namespace Extensions
{
    public class ResourceMessageReceiver : IMessageReceiver
    {
        private IResourceExtension _resourceExtension;

        public ResourceMessageReceiver(IResourceExtension resourceExtension)
        {
            _resourceExtension = resourceExtension;
        }

        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            await _resourceExtension.DeleteAsync("abcd%c3%a9%201234", cancellationToken);
        }
    }
}
```

Deleting a specific resource by id.

### Get a specific resource

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var resource = await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        uri: '/resources/abcd%c3%a9%201234'
    });
    console.log(resource);
});
```

```python
async def message_processor_async(message: Message) -> None:
    result = await client.process_command_async(
        Command(
            CommandMethod.GET,
            '/resources/abcd%c3%a9%201234'
        )
    )

client.add_message_receiver(Receiver(True, message_processor_async))
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "get",
  "uri": "/resources/abcd%c3%a9%201234"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.media-link+json",
    "resource": {
        "type": "image/jpeg",
        "size": 227791,
        "uri": "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
        "previewUri": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX",
        "previewType": "image/jpeg",
        "title": "Cat",
        "text": "Here is a cat image for you!"
    },
    "method": "get",
    "status": "success",
    "id": "78981a10-d7a9-4fbb-84cf-1916a8ed93b8",
    "from": "postmaster@msging.net/#az-iris6",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/resources/abcd%c3%a9%201234"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.Resource;

namespace Extensions
{
    public class ResourceMessageReceiver : IMessageReceiver
    {
        private IResourceExtension _resourceExtension;

        public ResourceMessageReceiver(IResourceExtension resourceExtension)
        {
            _resourceExtension = resourceExtension;
        }

        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var resource = await _resourceExtension.GetAsync<MediaLink>("abcd%c3%a9%201234", cancellationToken);
        }
    }
}
```

Getting a specific resource by id.

### Get all Resources

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var resources = await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        uri: '/resources'
    });
    console.log(resources);
});
```

```python
async def message_processor_async(message: Message) -> None:
    result = await client.process_command_async(
        Command(
            CommandMethod.GET,
            '/resources'
        )
    )

client.add_message_receiver(Receiver(True, message_processor_async))
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "get",
  "uri": "/resources"
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
            "help-message",
            "abcdé 1234"
        ]
    },
    "method": "get",
    "status": "success",
    "id": "3cbdd83c-d7ad-4d1e-886a-a0dffb96fd37",
    "from": "postmaster@msging.net/#az-iris2",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/resources"
    }
}
```

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Resource;
using Lime.Messaging.Contents;

namespace Extensions
{
    public class ResourceMessageReceiver : IMessageReceiver
    {
        private IResourceExtension _resourceExtension;

        public ResourceMessageReceiver(IResourceExtension resourceExtension)
        {
            _resourceExtension = resourceExtension;
        }
        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken = default(CancellationToken))
        {
            var resources = await _resourceExtension.GetIdsAsync(0, 100, cancellationToken);
        }
    }
}
```

Getting all bot resources.

| Property | Description                             | Example |
|----------|-----------------------------------------|---------|
| **skip** | The number of resources to be skipped.  | 0       |
| **take** | The number of resources to be returned. | 100     |

### Store a **text/plain** resource with replacement variable

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        uri: '/resources/abcd%c3%a9%201234',
        type: 'text/plain',
        resource: 'Welcome to our service, ${contact.name}!'
    });
});
```

```python
async def message_processor_async(message: Message) -> None:
    result = await client.process_command_async(
        Command(
            CommandMethod.SET,
            '/resources/abcd%c3%a9%201234',
            'text/plain',
            'Welcome to our service, ${contact.name}!'
        )
    )

client.add_message_receiver(Receiver(True, message_processor_async))
```

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "set",
  "uri": "/resources/abcd%c3%a9%201234",
  "type": "text/plain",
  "resource": "Welcome to our service, ${contact.name}!"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "3",
    "from": "postmaster@msging.net/#az-iris2",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/resources/abcd%c3%a9%201234"
    }
}
```

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Resource;
using Lime.Messaging.Contents;

namespace Extensions
{
    public class ResourceMessageReceiver : IMessageReceiver
    {
        private IResourceExtension _resourceExtension;

        public ResourceMessageReceiver(IResourceExtension resourceExtension)
        {
            _resourceExtension = resourceExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken = default(CancellationToken))
        {
            var plainText = new PlainText
            {
                Text = "Welcome to our service, ${contact.name}!"
            };

            await _resourceExtension.SetAsync<PlainText>("abcd%c3%a9%201234", plainText);            
        }
    }
}
```

Storing a `text plain` document with `abcdé 1234` key using replacement variables.

It is possible to use contact replacement variables in the created resources, just as in this example. For more information, please check the documentation of the [**Contacts** extension](#contacts).
