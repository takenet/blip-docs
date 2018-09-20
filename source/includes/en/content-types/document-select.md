## Multimedia menu

> Menu with image in the header and a link and text as options:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class OptionMultimidiaMenuMessageReceiver : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public OptionMultimidiaMenuMessageReceiver(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

DocumentSelectOption[] options = new DocumentSelectOption[]
{
    new DocumentSelectOption
    {
        Label = new DocumentContainer
        {
            Value = new WebLink
            {
                Text = "Go to your site",
                Uri = new Uri("https://meusanimais.com.br/14-nomes-criativos-para-o-seu-gato/")
            }
        }
    },
    new DocumentSelectOption
    {
        Label = new DocumentContainer
        {
            Value = new PlainText
            {
                Text = "Show stock here!"
            }
        },
        Value = new DocumentContainer
        {
            Value = new JsonDocument()
        }
    }
};


public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new DocumentSelect
        {
            Header = new DocumentContainer
            {
                Value = new MediaLink
                {
                    Title = "Welcome to mad hatter",
                    Text = "Here we have the best hats for your head.",
                    Type = "image/jpeg",
                    Uri = new Uri("http://i.overboard.com.br/imagens/produtos/0741720126/Ampliada/chapeu-new-era-bucket-print-vibe.jpg"),
                    AspectRatio = "1.1"
                }
            },
            Options = options
        };


    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}

```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.document-select+json",
    "content": {
        "header": {
            "type": "application/vnd.lime.media-link+json",
            "value": {
                "title": "Welcome to mad hatter",
                "text": "Here we have the best hats for your head.",
                "type": "image/jpeg",
                "uri": "http://petersapparel.parseapp.com/img/item100-thumb.png",
                "aspectRatio": "1:1"
            }
        },
        "options": [
            {
                "label": {
                    "type": "application/vnd.lime.web-link+json",
                    "value": {
                        "text": "Go to our site",
                        "uri": "https://petersapparel.parseapp.com/view_item?item_id=100"
                    }
                }
            },
            {
                "label": {
                    "type": "text/plain",
                    "value": "Show stock"
                },
                "value": {
                    "type": "application/json",
                    "value": {
                        "action": "show-items"
                    }
                }
            }
        ]
    }
}
```

```javascript
    client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.document-select+json",
      to: "1042221589186385@messenger.gw.msging.net",
      content: {
            header: {
                type: "application/vnd.lime.media-link+json",
                value: {
                    title: "Welcome to mad hatter",
                    text: "Here we have the best hats for your head.",
                    type: "image/jpeg",
                    uri: "http://petersapparel.parseapp.com/img/item100-thumb.png",
                    aspectRatio: "1:1"
                }
            },
            options: [
                {
                    label: {
                        type: "application/vnd.lime.web-link+json",
                        value: {
                            text: "Go to our site",
                            uri: "https://petersapparel.parseapp.com/view_item?item_id=100"
                        }
                    }
                },
                {
                    label: {
                        type: "text/plain",
                        value: "Show stock"
                    },
                    value: {
                        type: "application/json",
                        value: {
                            action: "show-items"
                        }
                    }
                }
            ]
        }
    });
```

>  Getting the location of a Messenger user:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class MenuMultimidiaGetLocation : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public MenuMultimidiaGetLocation(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new DocumentSelect
        {
            Header = new DocumentContainer
            {
                Value = new PlainText
                {
                    Text = "Please, share your location"
                }
            },
            Options = new DocumentSelectOption[]{
                new DocumentSelectOption {
                    Label = new DocumentContainer{
                        Value = new Input {
                            Label = new DocumentContainer {
                                Value = new PlainText {
                                    Text = "Press Button"
                                }
                            },
                            Validation = new InputValidation
                            {
                                Type = Location.MediaType,
                                Rule = InputValidationRule.Type
                            }
                        }
                    }
                }
            }
        };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "2",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.document-select+json",
    "content": {
        "scope": "immediate",
        "header": {
            "type": "text/plain",
            "value": "Please, share your location"
        },
        "options": [
            {
                "label": {
                    "type": "application/vnd.lime.input+json",
                    "value": {
                        "validation": {
                          "rule": "type",
                          "type": "application/vnd.lime.location+json"
                        }
                    }
                }
            }
        ]
    }
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.document-select+json",
      to: "1042221589186385@messenger.gw.msging.net",
      content: {
            scope: "immediate",
            header: {
                type: "text/plain",
                value: "Please, share your location"
            },
            options: [
                {
                    label: {
                        type: "application/vnd.lime.input+json",
                        value: {
                            validation: {
                                rule: "type",
                                type: "application/vnd.lime.location+json"
                            }
                        }
                    }
                }
            ]
        }
    });
```

| MIME type                                 |
|-------------------------------------------|
| application/vnd.lime.document-select+json |

Allows sending an options menu to customers where the header and options can be of any content type, such as **media link** or **web link**, and not only **text** - like in the *Select* type. For each option, it is possible to define a document that is delivered to the contact when the customer performs a choice (depending on the channel support).

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#document-select) specification.

#### Channel mapping

| Channel            | Type                    |
|--------------------|-------------------------|
| BLiP Chat          | Document select         |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template)|
| Whatsapp           | Text                   |
| SMS                | Text                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
