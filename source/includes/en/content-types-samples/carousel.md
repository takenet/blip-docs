## Carousel

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

You can send carousel by using [Document Collection](/#collection) content type and passing an array of [Select](/#select) type as Items atribute. 

| Messenger                         |                                              |
|-----------------------------------|----------------------------------------------|
| ![imagem](images/carrousel_mssngr.png)  | ![imagem](images/carrousel2_mssngr.png)|

| BLiPChat                          |                                                  |
|-----------------------------------|--------------------------------------------------|
| ![imagem](images/collectionBlipChat.png)  | ![imagem](images/collectionBlipChat2.png)|
