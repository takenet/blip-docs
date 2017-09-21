## Resource

> Sending a resource message with the **welcome-message** identifier:

```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.iris.resource+json",
    "content": {
        "key": "welcome-message"
    }
}
```
> In case there is a resource with this key, the server replaces the content and forward to the destination. Imagining that the resource with **welcome-message** key is a `text/plain` document with value `Welcome to our service`, the final message would be like this:

```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Welcome to our service"
}
```

| MIME type                            | 
|--------------------------------------|
| application/vnd.iris.resource+json   |

Allows sending a message where the content is a **resource** stored in the server. The resource should be stored thought the [**resources** extension](https://portal.blip.ai/#/docs/extensions/resources). The server automatically replaces the content with the stored resource, in the case the resource **key** exists for the caller chatbot.

The resource may contains variables which can be replaced by values specified in the sending time, through the `variables` property.

You can enter substitution variables for the resource using the `variables` property. In this case, the variables present in the resource with the `${variableName}` format are replaced by the specified values.

For example, imagine that the resource in the `welcome-message` key has the value `Welcome to our service, ${name}!'`. If you send the following:

> Request

```json
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

The final message will be:

> Response

```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Welcome to our service, John Doe!"
}
```

### Channel mapping

This content type is supported on all channels.

