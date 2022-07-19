## Collection

> A text Collection

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class OptionDocumentCollectionMessageReceiver : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public OptionDocumentCollectionMessageReceiver(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

PlainText[] documents = new PlainText[]
{
    new PlainText
    {
        Text = "Text 1"
    },
    new PlainText
    {
        Text = "Text 2"
    },
    new PlainText
    {
        Text = "Text 3"
    }
};

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new DocumentCollection
    {
        ItemType = "text/plain",
        Items = documents
    };
    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```javascript
    client.sendMessage({
        id: Lime.Guid(),
        type: "application/vnd.lime.collection+json",
        to: "128271320123982@messenger.gw.msging.net",
        content: {
            itemType: "text/plain",
            items: [
                "Text 1",
                "Text 2",
                "Text 3"
            ]
        }
    });
```

```python
client.send_message(
    Message.from_json(
        {
            'to': '553199990000@0mn.io',
            'type': 'application/vnd.lime.collection+json',
            'content': {
                'itemType': 'text/plain',
                'items': [
                    'Text 1',
                    'Text 2',
                    'Text 3'
                ]
            }   
        }
    )
)
```

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "to": "553199990000@0mn.io",
    "type": "application/vnd.lime.collection+json",
    "content": {
        "itemType": "text/plain",
        "items": [
            "Text 1",
            "Text 2",
            "Text 3"
        ]
    }   
}
```

> A different type of collection, using **container**

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class CollectionWithDiferentTypes : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public CollectionWithDiferentTypes(ISender sender)
{
    _sender = sender;
    _settings = settings;
}

DocumentContainer[] documents = new DocumentContainer[]
{
    new DocumentContainer{
        Value = new MediaLink
        {
            Uri = new Uri("http://www.petshoplovers.com/wp-content/uploads/2014/03/CUIDADOS-B%C3%81SICOS-PARA-CRIAR-COELHOS.jpg"),
            Text = "Welcome to our store!",
            Type = "image/jpeg"
        }
    },
    new DocumentContainer{
        Value = new Select
        {
            Text = "Choose what you need",
            Options = new SelectOption[]
            {
                new SelectOption
                {
                    Order = 1,
                    Text = "See our stock"
                },
                new SelectOption
                {
                    Order = 2,
                    Text = "Follow an order"
                }
            }

        }
    }
};

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new DocumentCollection
    {
        ItemType = "application/vnd.lime.container+json",
        Items = documents
    };
    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}
}
```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    type: "application/vnd.lime.collection+json",
    to: "128271320123982@messenger.gw.msging.net",
    content: {
        itemType: "application/vnd.lime.container+json",
        items: [
            {
                type: "application/vnd.lime.media-link+json",
                value: {
                    text: "Welcome to our store!",
                    type: "image/jpeg",
                    uri: "http://www.petshoplovers.com/wp-content/uploads/2014/03/CUIDADOS-B%C3%81SICOS-PARA-CRIAR-COELHOS.jpg"
                }
            },
            {
                type: "application/vnd.lime.select+json",
                value: {
                    text: "Choose what you need",
                    options: [
                        {
                            order: 1,
                            text: "See our stock"
                        },
                        {
                            order: 2,
                            text: "Follow an order"
                        }
                    ]
                }
            }
        ]
    }
});
```

```python
client.send_message(
    Message.from_json(
        {
            'to': '553199990000@0mn.io',
            'type': 'application/vnd.lime.collection+json',
            'content': {
            'itemType': 'application/vnd.lime.container+json',
            'items': [
                {
                    'type': 'application/vnd.lime.media-link+json',
                    'value': {
                        'text': 'Welcome to our store!',
                        'type': 'image/jpeg',
                        'uri': 'http://www.petshoplovers.com/wp-content/uploads/2014/03/CUIDADOS-B%C3%81SICOS-PARA-CRIAR-COELHOS.jpg'
                    }
                },
                {
                    'type': 'application/vnd.lime.select+json',
                    'value': {
                        'text': 'Choose what you need',
                        'options': [
                            {
                                'order': 1,
                                'text': 'See our stock'
                            },
                            {
                                'order': 2,
                                'text': 'Follow an order'
                            }
                        ]
                    }
                }
            ]
            }
        }
    )
)
```

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "to": "553199990000@0mn.io",
    "type": "application/vnd.lime.collection+json",
    "content": {
       "itemType": "application/vnd.lime.container+json",
       "items": [
           {
               "type": "application/vnd.lime.media-link+json",
               "value": {
                   "text": "Welcome to our store!",
                   "type": "image/jpeg",
                   "uri": "http://www.petshoplovers.com/wp-content/uploads/2014/03/CUIDADOS-B%C3%81SICOS-PARA-CRIAR-COELHOS.jpg"
               }
           },
           {
               "type": "application/vnd.lime.select+json",
               "value": {
                   "text": "Choose what you need",
                   "options": [
                       {
                           "order": 1,
                           "text": "See our stock"
                       },
                       {
                           "order": 2,
                           "text": "Follow an order"
                       }
                   ]
               }
           }
       ]
    }
}

```

> A **multimedia menu** collection

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class CollectionMultimidiaMenu : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

JsonDocument jsonDocuments;
JsonDocument jsonDocuments2;
JsonDocument jsonDocuments3;

public CollectionMultimidiaMenu(ISender sender)
{
    _sender = sender;
}

DocumentSelect[] documents = new DocumentSelect[]
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

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new DocumentCollection
    {
        ItemType = "application/vnd.lime.document-select+json",
        Items = documents,
    };
    await _sender.SendMessageAsync(document, message.From, cancellationToken);
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

```python
client.send_message(
    Message.from_json(
        {
            'id': '5',
            'to': '1042221589186385@messenger.gw.msging.net',
            'type': 'application/vnd.lime.collection+json',
            'content': {
                'itemType': 'application/vnd.lime.document-select+json',
                'items': [
                    {
                        'header': {
                            'type': 'application/vnd.lime.media-link+json',
                            'value': {
                                'title': 'Title',
                                'text': 'This is a first item',
                                'type': 'image/jpeg',
                                'uri': 'http://www.isharearena.com/wp-content/uploads/2012/12/wallpaper-281049.jpg'
                            }
                        },
                        'options': [
                            {
                                'label': {
                                    'type': 'application/vnd.lime.web-link+json',
                                    'value': {
                                        'title': 'Link',
                                        'uri': 'http://www.adoteumgatinho.org.br'
                                    }
                                }
                            },
                            {
                                'label': {
                                    'type': 'text/plain',
                                    'value': 'Text 1'
                                },
                                'value': {
                                    'type': 'application/json',
                                    'value': {
                                        'key1': 'value1',
                                        'key2': 2
                                    }
                                }
                            }
                        ]
                    },
                    {
                        'header': {
                            'type': 'application/vnd.lime.media-link+json',
                            'value': {
                                'title': 'Title 2',
                                'text': 'This is another item',
                                'type': 'image/jpeg',
                                'uri': 'http://www.freedigitalphotos.net/images/img/homepage/87357.jpg'
                            }
                        },
                        'options': [
                            {
                                'label': {
                                    'type': 'application/vnd.lime.web-link+json',
                                    'value': {
                                        'title': 'Second link',
                                        'text': 'Weblink',
                                        'uri': 'https://pt.dreamstime.com/foto-de-stock-brinquedo-pl%C3%A1stico-amarelo-do-pato-image44982058'
                                    }
                                }
                            },
                            {
                                'label': {
                                    'type': 'text/plain',
                                    'value': 'Second text'
                                },
                                'value': {
                                    'type': 'application/json',
                                    'value': {
                                        'key3': 'value3',
                                        'key4': 4
                                    }
                                }
                            },
                            {
                                'label': {
                                    'type': 'text/plain',
                                    'value': 'More one text'
                                },
                                'value': {
                                    'type': 'application/json',
                                    'value': {
                                        'key5': 'value5',
                                        'key6': 6
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    )
)
```

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
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
                                "key2": 2
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
                                "key4": 4
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
                                "key6": 6
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```

| MIME type                            | C#                                                                                                                             |
|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| application/vnd.lime.collection+json | [Lime.Protocol.DocumentCollection](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Protocol/DocumentCollection.cs) |

Allows sending **multiple contents** of the same type in a single message. Some channels support this type of aggregation with special layouts (for example, in Facebook Messenger a **multimedia menu** collection is displayed as a *carousel*). In other channels, multiple messages are sent instead.

**Note:** It is possible to send different content types using a collection of the **container** type.

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#collection) specification.

#### Channel mapping

| Channel   | Type                                                                                                                                                                         |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Blip Chat | Collection                                                                                                                                                                   |
| Messenger | Multiple messages / [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template) (if is a **multimedia menu** collection) |
| WhatsApp  | Text (multiple lines)                                                                                                                                                        |
| SMS       | Text (multiple lines)                                                                                                                                                        |
| Skype     | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1) (multiple lines)                                                                              |
| Telegram  | [Message](https://core.telegram.org/bots/api#message) (multiple lines)                                                                                                       |
