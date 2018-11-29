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

| MIME type                                 |
|-------------------------------------------|
| application/vnd.lime.document-select+json |

Allows sending an options menu to customers where the header and options can be of any content type, such as **media link** or **web link**, and not only **text** - like in the *Select* type. For each option, it is possible to define a document that is delivered to the contact when the customer performs a choice (depending on the channel support).

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#document-select) specification.

### Carousel

You can send carousels by using [Document Collection](/#collection) content type and passing an array of [Select](/#select) type as the Items atribute.

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

namespace MessageTypes
{
    public class OptionDocumentCollectionMessageReceiver : IMessageReceiver
    {
        private readonly ISender _sender;
        Document[] documents;
        JsonDocument jsonDocuments;
        JsonDocument jsonDocuments2;
        JsonDocument jsonDocuments3;

        public OptionDocumentCollectionMessageReceiver(ISender sender)
        {
            _sender = sender;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            Document document;
            document = getDocumentCollectionMenuMultimidia();

            await _sender.SendMessageAsync(document, message.From, cancellationToken);
        }

        public DocumentCollection getDocumentCollectionMenuMultimidia()
        {
            jsonDocuments = new JsonDocument();
            jsonDocuments2 = new JsonDocument();
            jsonDocuments3 = new JsonDocument();

            jsonDocuments.Add("Key1", "value1");
            jsonDocuments.Add("Key2", "2");

            jsonDocuments2.Add("Key3", "value3");
            jsonDocuments2.Add("Key4", "4");

            jsonDocuments3.Add("Key5", "value5");
            jsonDocuments3.Add("Key6", "6");

            DocumentSelect[] documents = new DocumentSelect[]
            {
                new DocumentSelect
                {
                    Header = new DocumentContainer
                    {
                        Value = new MediaLink
                        {
                            Title = "Title",
                            Text = "This is a first item",
                            Type = "image/jpeg",
                            Uri = new Uri("http://www.isharearena.com/wp-content/uploads/2012/12/wallpaper-281049.jpg"),
                        }
                    },
                    Options = new DocumentSelectOption[]
                    {
                        new DocumentSelectOption
                        {
                            Label = new DocumentContainer
                            {
                                Value = new WebLink
                                {
                                    Title = "Link",
                                    Uri = new Uri("http://www.adoteumgatinho.org.br/")
                                }
                            }
                        },
                        new DocumentSelectOption
                        {
                            Label = new DocumentContainer
                            {
                                Value = new PlainText
                                {
                                    Text = "Text 1"
                                }
                            },
                            Value = new DocumentContainer
                            {
                                Value = jsonDocuments
                            }
                        }
                    }
                },
                new DocumentSelect
                {
                    Header = new DocumentContainer
                    {
                        Value = new MediaLink
                        {
                            Title = "Title 2",
                            Text = "This is another item",
                            Type = "image/jpeg",
                            Uri = new Uri("http://www.freedigitalphotos.net/images/img/homepage/87357.jpg")
                        }
                    },
                    Options = new DocumentSelectOption[]
                    {
                        new DocumentSelectOption
                        {
                            Label = new DocumentContainer
                            {
                                Value = new WebLink
                                {
                                    Title = "Second link",
                                    Text = "Weblink",
                                    Uri = new Uri("https://pt.dreamstime.com/foto-de-stock-brinquedo-pl%C3%A1stico-amarelo-do-pato-image44982058")
                                }
                            }
                        },
                        new DocumentSelectOption
                        {
                            Label = new DocumentContainer
                            {
                                Value = new PlainText {
                                    Text = "Second text"
                                }
                            },
                            Value = new DocumentContainer
                            {
                                Value = jsonDocuments2
                            }
                        },
                        new DocumentSelectOption
                        {
                            Label = new DocumentContainer
                            {
                                Value = new PlainText {
                                    Text = "More one text"
                                }
                            },
                            Value = new DocumentContainer
                            {
                                Value = jsonDocuments3
                            }
                        }
                    }
                }

            };

            var document = new DocumentCollection
            {
                ItemType = "application/vnd.lime.document-select+json",
                Items = documents,
            };

            return document;
        }
    }
}

```

```javascript
 client.sendMessage({
        id: Lime.Guid(),
        type: "application/vnd.lime.collection+json",
        to: "128271320123982@messenger.gw.msging.net",
        content: {
            itemType: "application/vnd.lime.document-select+json",
            items: [
                {
                    header: {
                        type: "application/vnd.lime.media-link+json",
                        value: {
                            title: "Title",
                            text: "This is a first item",
                            type: "image/jpeg",
                            uri: "http://www.isharearena.com/wp-content/uploads/2012/12/wallpaper-281049.jpg"
                        }
                    },
                    options: [
                        {
                            label: {
                                type: "application/vnd.lime.web-link+json",
                                value: {
                                    title: "Link",
                                    uri: "http://www.adoteumgatinho.org.br/"
                                }
                            }
                        },
                        {
                            label: {
                                type: "text/plain",
                                value: "Text 1"
                            },
                            value: {
                                type: "application/json",
                                value: {
                                    key1: "value1",
                                    key2: 2
                                }
                            }
                        }
                    ]
                },
                {
                    header: {
                        type: "application/vnd.lime.media-link+json",
                        value: {
                            title: "Title 2",
                            text: "This is another item",
                            type: "image/jpeg",
                            uri: "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg"
                        }
                    },
                    options: [
                        {
                            label: {
                                type: "application/vnd.lime.web-link+json",
                                value: {
                                    title: "Second link",
                                    text: "Weblink",
                                    uri: "https://pt.dreamstime.com/foto-de-stock-brinquedo-pl%C3%A1stico-amarelo-do-pato-image44982058"
                                }
                            }
                        },
                        {
                            label: {
                                type: "text/plain",
                                value: "Second text"
                            },
                            value: {
                                type: "application/json",
                                value: {
                                    key3: "value3",
                                    key4: 4
                                }
                            }
                        },
                        {
                            label: {
                                type: "text/plain",
                                value: "More one text"
                            },
                            value: {
                                type: "application/json",
                                value: {
                                    key5: "value5",
                                    key6: 6
                                }
                            }
                        }
                    ]
                }
            ]
        }
    });
```
```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "5",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.collection+json",
    "content": {
        "itemType": "application/vnd.lime.document-select+json",
        "items": [
            {
                "header": {
                    "type": "application/vnd.lime.media-link+json",
                    "value": {
                        "title": "Title",
                        "text": "This is a first item",
                        "type": "image/jpeg",
                        "uri": "http://www.isharearena.com/wp-content/uploads/2012/12/wallpaper-281049.jpg"
                    }
                },
                "options": [
                    {
                        "label": {
                            "type": "application/vnd.lime.web-link+json",
                            "value": {
                                "title": "Link",
                                "uri": "http://www.adoteumgatinho.org.br"
                            }
                        }
                    },
                    {
                        "label": {
                            "type": "text/plain",
                            "value": "Text 1"
                        },
                        "value": {
                            "type": "application/json",
                            "value": {
                                "key1": "value1",
                                "key2": "2"
                            }
                        }
                    }
                ]
            },
            {
                "header": {
                    "type": "application/vnd.lime.media-link+json",
                    "value": {
                        "title": "Title 2",
                        "text": "This is another item",
                        "type": "image/jpeg",
                        "uri": "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg"
                    }
                },
                "options": [
                    {
                        "label": {
                            "type": "application/vnd.lime.web-link+json",
                            "value": {
                                "title": "Second link",
                                "text": "Weblink",
                                "uri": "https://pt.dreamstime.com/foto-de-stock-brinquedo-pl%C3%A1stico-amarelo-do-pato-image44982058"
                            }
                        }
                    },
                    {
                        "label": {
                            "type": "text/plain",
                            "value": "Second text"
                        },
                        "value": {
                            "type": "application/json",
                            "value": {
                                "key3": "value3",
                                "key4": "4"
                            }
                        }
                    },
                    {
                        "label": {
                            "type": "text/plain",
                            "value": "More one text"
                        },
                        "value": {
                            "type": "application/json",
                            "value": {
                                "key5": "value5",
                                "key6": "6"
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```

| Messenger                              |                                              |
|----------------------------------------|----------------------------------------------|
| ![imagem](images/carrosel_mssngr.png)  | ![imagem](images/carrosel2_mssngr.png)       |

| BLiPChat                                  |                                           |
|-------------------------------------------|-------------------------------------------|
| ![imagem](images/carrossel_blipchat2.png) | ![imagem](images/carrossel_blipchat.png)  |


### Multimedia Menu Channel mapping

| Channel            | Type                    |
|--------------------|-------------------------|
| BLiP Chat          | Document select         |
| Messenger          | [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template)|
| Whatsapp           | Text                   |
| SMS                | Text                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
