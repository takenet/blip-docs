### Container

| MIME type                            | C#                                 |
|--------------------------------------|------------------------------------|
| application/vnd.lime.container+json | [Lime.Protocol.DocumentContainer](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Protocol/DocumentContainer.cs) |

Encapsula um conteúdo com sua declaração de tipo MIME, permitindo o envio de conteúdos diferentes em tipos compostos, como **coleção**. Por este motivo, não existe necessidade do uso deste tipo indivualmente.

#### Exemplo
Uma coleção de tipos diferentes, utilizando **container**
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
					"text": "Seja bem-vindo a nossa loja!",
					"type": "image/jpeg",
					"uri": "http://petersapparel.parseapp.com/img/item100-thumb.png"
				}
			},
			{
				"type": "application/vnd.lime.select+json",
				"value": {
					"text": "Escolha o que deseja fazer",
					"options": [
					    {
					        "order": 1,
					        "text": "Ver nosso estoque"
					    },
					    {
					        "order": 2,
					        "text": "Acompanhar um pedido"
					    }
					]
				}
			}			
		]
	}
}

```

