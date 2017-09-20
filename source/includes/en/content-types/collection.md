### Collection
| MIME type                            | C#                                 |
|--------------------------------------|------------------------------------|
| application/vnd.lime.collection+json | [Lime.Protocol.DocumentCollection](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Protocol/DocumentCollection.cs)|

Allows sending **multiple contents** of the same type in a single message. Some channels support this type of aggregation with special layouts (for example, in Facebook Messenger a **multimedia menu** collection is displayed as a *carousel*). In other channels, multiple messages are sent.

**Note:** It is possible to send different content types using a collection of the **container** type.

#### Examples

1 – A **text** collection

```json
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

2 - A different types collection, using **container**
```json
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
					"uri": "http://petersapparel.parseapp.com/img/item100-thumb.png"
				}
			},
			{
				"type": "application/vnd.lime.select+json",
				"value": {
					"text": "Choice what you need",
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

3 - A **multimedia menu** collection
```json
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
                                "uri": "https://server.com/first/link1"
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
                                "uri": "https://server.com/second/link2"
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

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#collection) specification.

#### Channel mapping

| Channel              | Type                    | 
|--------------------|---------------------------|
| BLiP Chat           | Collection               |
| Messenger          | Multiple messages / [Generic template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template) (if is a **multimedia menu** collection)|
| SMS                | Text (multiple lines) |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1) (multiple lines)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message) (multiple lines)|
