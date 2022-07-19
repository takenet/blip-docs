## Resource

> Sending a resource message with the **welcome-message** identifier:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class OptionResourceMessageReceiver : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public OptionResourceMessageReceiver(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new Resource
    {
        Key = "welcome-message" //recurso previamente adicionado com extensão 'recursos' ou através do portal
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.iris.resource+json",
    "content": {
        "key": "welcome-message"
    }
}
```

```python
client.send_message(
    Message.from_json(
        {
            'id': '1',
            'to': '1042221589186385@messenger.gw.msging.net',
            'type': 'application/vnd.iris.resource+json',
            'content': {
                'key': 'welcome-message'
            }
        }
    )
)
```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    type: "application/vnd.iris.resource+json",
    to: "1042221589186385@messenger.gw.msging.net",
    content: {
        key: "welcome-message"
    }
});
```

> In case there is a resource with this key, the server replaces the content and forwards it to the destination. Imagining that the resource with **welcome-message** key is a `text/plain` document with value `Welcome to our service`, the final message would be like this:

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Welcome to our service"
}
```

```python
client.send_message(
    Message.from_json(
        {
            'id': '1',
            'to': '1042221589186385@messenger.gw.msging.net',
            'type': 'text/plain',
            'content': 'Welcome to our service'
        }
    )
)
```

```javascript
{
    id: "1",
    to: "1042221589186385@messenger.gw.msging.net",
    type: "text/plain",
    content: "Welcome to our service"
}
```

| MIME type                          |
|------------------------------------|
| application/vnd.iris.resource+json |

Allows sending of a message where the content is a **resource** stored in the server. The resource should be stored through the [**resources** extension](https://portal.blip.ai/#/docs/extensions/resources). The server automatically replaces the content with the stored resource, in case the resource **key** already exists for the caller chatbot.

The resource may contain variables which can be replaced by values specified during sending time, through the `variables` property.

You can enter substitution variables for the resource using the `variables` property. In this case, the variables present in the resource with the `${variableName}` format are replaced by the specified values.

For example, imagine that the resource in the `welcome-message` key has the value `Welcome to our service, ${name}!'`. If you send the following:

> Request

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class ResourceMessageReplace : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public ResourceMessageReplace(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var openWith = new Dictionary<string, string>();
    openWith.Add("name",message.From.Name);

    var document = new Resource
    {
        Key = "welcome-message",
        Variables = openWith

    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.iris.resource+json",
    "content": {
        "key": "welcome-message",
        "variables": {
            "name": "John Doe"
        }
    }
}
```

```python
client.send_message(
    Message.from_json(
        {
            'id': '1',
            'to': '1042221589186385@messenger.gw.msging.net',
            'type': 'application/vnd.iris.resource+json',
            'content': {
                'key': 'welcome-message',
                'variables': {
                    'name': 'John Doe'
                }
            }
        } 
    )
)
```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    to: "1042221589186385@messenger.gw.msging.net",
    type: "application/vnd.iris.resource+json",
    content: {
        key: "welcome-message",
        variables: {
            name: "John Doe"
        }
    }
});
```

The final message will be:

> Response

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Welcome to our service, John Doe!"
}
```

```python
client.send_message(
    Message.from_json(
        {
            'id': '1',
            'to': '1042221589186385@messenger.gw.msging.net',
            'type': 'text/plain',
            'content': 'Welcome to our service, John Doe!'
        }
    )
)
```

```javascript
{
    id: "1",
    to: "1042221589186385@messenger.gw.msging.net",
    type: "text/plain",
    content: "Welcome to our service, John Doe!"
}
```
#### Channel mapping

This content type is supported on all channels.

