## Resources

The **resources** extension allows the storage of documents in the server in an isolated space for each chatbot, similar to the **bucket** extension. The main difference is that these documents can be mapped as **contents** for messages sent to the chatbot destinations, thought the resource **key**. This means that the chatbot developer can choose to **store the content of his messages in the server** instead of keeping they on the chatbot code side.

To manage all resources programmatically use **resources** extension sending a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The resource document. |
| type | The type of the resource document |
| uri    | **/resources**   |
| to     | **postmaster@msging.net** (not required) |

The **BLiP** portal offers an resource management interface which helps in the case of editing these content, avoiding the need to update the code on the application side in case of changes in chatbot content.

In order to send a resource message, the developer must use the [**resource** content type](#resource).

### Store a **media link** resource

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "1",
  "method": "set",
  "uri": "/resources/xyz1234",
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
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Resource;
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

            await _resourceExtension.SetAsync("xyz1234", mediaLink);
        }
    }
}
```

Storing a `media link` document with `xyz1234` key.

### Store a **text/plain** resource


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "2",
  "method": "set",
  "uri": "/resources/help-message",
  "type": "text/plain",
  "resource": "To use our services, please send a text message."
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
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Resource;
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

            await _resourceExtension.SetAsync("help-message", plainText);   
        }
    }
}
```

Storing a `text plain` document with `help-message` key.

#### Replacement variables

It is possible to use contact replacement variables in the created resources. For more information, please check the documentation of the [**Contacts** extension](#contacts).

### Store a **text/plain** resource with replacement variable


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "3",
  "method": "set",
  "uri": "/resources/welcome-message",
  "type": "text/plain",
  "resource": "Welcome to our service, ${contact.name}!"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "3",
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
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Resource;
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

            await _resourceExtension.SetAsync("welcome-message", plainText);            
        }
    }
}
```

Storing a `text plain` document with `welcome-message` key using replacement variables.

#### Sending a resource message

[Click here](#resource) to see how can you send a resource message.