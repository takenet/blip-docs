## Redirect
| MIME type                          |  C#                                 |
|------------------------------------|-------------------------------------|
| application/vnd.lime.redirect+json | [Lime.Messaging.Contents.Redirect](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/Redirect.cs) |

Allows the redirection of a particular chatbot conversation to a new address. In practice, makes possible the **handover** of a conversation between different chatbots, which can be of any template (FAQ, Human Operator) or SDK / Webhooks.

Currently, redirection is only supported on chatbots configured as services in [**master template**](https://portal.blip.ai/#/docs/templates/master). This can be done using the chatbot (identifier) address or the service name defined in the master model settings in the portal.

It is possible to define a document that represents the **context** of the conversation and that will be received by the chatbot to which the conversation was directed. The context is useful for defining a specific flow in the destination chatbot, for example.

#### Examples
1 - Redirecting to the **attendance** service

```http
{
    "id": "1",
    "to": "54f1dd2e-42d2-43f2-9100-68fbbabb9c83@tunnel.msging.net",
    "type": "application/vnd.iris.redirect+json",
    "content": {
        "address": "attendance"
    }
}
```
From this moment, the messages sent by the client will be forwarded to the chatbot configured as a service *attendance* in the master model settings tab. Note: The customer identifier is **not the same** for the other bot.

2 - Redirecting to the chatbot with identifier *mysdkbot , passing a document as the context of the conversation.

```http
{
    "id": "2",
    "to": "54f1dd2e-42d2-43f2-9100-68fbbabb9c83@tunnel.msging.net",
    "type": "application/vnd.iris.redirect+json",
    "content": {
        "address": "mysdkbot@msging.net",
        "context": {
            "type": "text/plain",
            "value": "Get started"
        }
    }
}
```
In this example, the chatbot with `mysdkbot` identifier will receive the messages sent by the client, in addition to receiving a message with the content defined in the context, as if it had been sent by the client:

```http
{
    "id": "3",
    "from": "2bdcd8d0-9e69-484f-a88a-d5a529708864@tunnel.msging.net",
    "to": "mysdkbot@msging.net",
    "type": "text/plain",
    "content": "Get started"
}
```

### Channel mapping

Redirect is currently supported only by chatbots configured as services in the master template. In this case, all messages will have the domain @tunnel.msging.net, since the master template uses the [tunnel extension](https://portal.blip.ai/#/docs/tunnel) for communication with services (sub-bots).

