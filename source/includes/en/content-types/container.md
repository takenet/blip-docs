### Container

| MIME type                            |
|--------------------------------------|
| application/vnd.lime.container+json | |

Encapsulates a JSON content with its MIME type declaration, allowing sending different contents in composite types, such as **collection**. For this reason, there is no need to use this type individually.

#### Example

A collection of different types, utilizing **container**
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
					        "text": "See stock"
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

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#document-container) specification.