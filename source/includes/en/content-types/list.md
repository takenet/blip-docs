## List

> Sending a list with a **weblink** header to a Messenger user:

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

namespace MessageTypes
{
public class OptionListMessageReceiver : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public OptionListMessageReceiver(ISender sender)
{
    _sender = sender;
    _settings = settings;
}



public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    var document = new DocumentList
    {
        Header = new DocumentContainer
        {
            Value = new WebLink
            {
                Title = "Classic T-Shirt Collection",
                Text = "See all our colors",
                PreviewUri = new Uri("http://streetwearvilla.com/image/cache/data/Products/Supreme/T-shirt/supreme-box-logo-t-shirt-collection-600x600.png"),
                Uri = new Uri("http://streetwearvilla.com/supreme-box-logo-t-shirt-white"),
                Target = WebLinkTarget.SelfTall
            }
        },
        Items = new DocumentContainer[]{
            new DocumentContainer
            {
                Value = new WebLink
                {
                    Title = "Classic White T-Shirt",
                    Text = "100% Cotton, 200% Comfortable",
                    PreviewUri = new Uri("http://www.plainwhitetshirt.co.uk/image/cache/catalog/images/GD010vwhiteteegildan-750x750.jpg"),
                    Uri = new Uri("http://www.plainwhitetshirt.co.uk/gildan-soft-style-white-vneck-tshirt"),
                    Target = WebLinkTarget.SelfTall
                }
            },
            new DocumentContainer
            {
                Value = new WebLink
                {
                    Title = "Classic Blue T-Shirt",
                    Text = "100% Cotton, 200% Comfortable",
                    PreviewUri = new Uri("https://cdn.shopify.com/s/files/1/1475/5420/products/Classic_Blue_Front_12068_1024x1024.jpg?"),
                    Uri = new Uri("https://www.theringboxingclubshop.com/products/ring-classic-blue-t-shirt"),
                    Target = WebLinkTarget.SelfTall

                }
            },
            new DocumentContainer
            {
                Value = new WebLink
                {
                    Title = "Classic Black T-Shirt",
                    Text = "100% Cotton, 200% Comfortable",
                    PreviewUri = new Uri("http://www.lvnlifestyle.com/wp-content/uploads/2014/08/mens.black_.tshirt.jpg"),
                    Uri = new Uri("http://www.lvnlifestyle.com/product/black-mens-bamboo-organic-cotton-classic-t-shirt/"),
                    Target = WebLinkTarget.SelfTall
                }
            }
        }
    };
    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}

}
}

```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    type: "application/vnd.lime.list+json",
    to: "123129898129832@msging.gw.msging.net",
    content: {  
      header:{  
          type: "application/vnd.lime.web-link+json",
          value: {  
              title: "Classic T-Shirt Collection",
              text: "See all our colors",
              previewUri: "http://streetwearvilla.com/image/cache/data/Products/Supreme/T-shirt/supreme-box-logo-t-shirt-collection-600x600.png",
              uri: "http://streetwearvilla.com/supreme-box-logo-t-shirt-white",
              target: "selfTall"
          }
      },
      items:[  
          {  
              type: "application/vnd.lime.web-link+json",
              value:{  
                  title: "Classic White T-Shirt",
                  text: "100% Cotton, 200% Comfortable",
                  previewUri: "http://www.plainwhitetshirt.co.uk/image/cache/catalog/images/GD010vwhiteteegildan-750x750.jpg",
                  uri: "http://www.plainwhitetshirt.co.uk/gildan-soft-style-white-vneck-tshirt",
                  target: "selfTall"
              }
          },
          {  
              type: "application/vnd.lime.web-link+json",
              value:{  
                  title: "Classic Blue T-Shirt",
                  text: "100% Cotton, 200% Comfortable",
                  previewUri: "https://cdn.shopify.com/s/files/1/1475/5420/products/Classic_Blue_Front_12068_1024x1024.jpg?",
                  uri: "https://www.theringboxingclubshop.com/products/ring-classic-blue-t-shirt",
                  target: "selfTall"
              }
          },
          {  
              type: "application/vnd.lime.web-link+json",
              value:{  
                  title: "Classic Black T-Shirt",
                  text: "100% Cotton, 200% Comfortable",
                  previewUri: "http://www.lvnlifestyle.com/wp-content/uploads/2014/08/mens.black_.tshirt.jpg",
                  uri: "http://www.lvnlifestyle.com/product/black-mens-bamboo-organic-cotton-classic-t-shirt/",
                  target: "selfTall"
              }
          }
      ]
    }
  });
```

 ```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id":"1",
  "to":"123129898129832@msging.gw.msging.net",
  "type":"application/vnd.lime.list+json",
  "content":{  
    "header":{  
      "type":"application/vnd.lime.web-link+json",
      "value":{  
        "title":"Classic T-Shirt Collection",
        "text":"See all our colors",
        "previewUri":"http://streetwearvilla.com/image/cache/data/Products/Supreme/T-shirt/supreme-box-logo-t-shirt-collection-600x600.png",
        "uri":"http://streetwearvilla.com/supreme-box-logo-t-shirt-whitemessengerExtensions=true",
        "target":"selfTall"
      }
    },
    "items":[  
      {  
        "type":"application/vnd.lime.web-link+json",
        "value":{  
          "title":"Classic White T-Shirt",
          "text":"100% Cotton, 200% Comfortable",
          "previewUri":"http://www.plainwhitetshirt.co.uk/image/cache/catalog/images/GD010vwhiteteegildan-750x750.jpg",
          "uri":"http://www.plainwhitetshirt.co.uk/gildan-soft-style-white-vneck-tshirt&messengerExtensions=true",
          "target":"selfTall"
        }
      },
      {  
        "type":"application/vnd.lime.web-link+json",
        "value":{  
          "title":"Classic Blue T-Shirt",
          "text":"100% Cotton, 200% Comfortable",
          "previewUri":"https://cdn.shopify.com/s/files/1/1475/5420/products/Classic_Blue_Front_12068_1024x1024.jpg?",
          "uri":"https://www.theringboxingclubshop.com/products/ring-classic-blue-t-shirt&messengerExtensions=true",
          "target":"selfTall"
        }
      },
      {  
        "type":"application/vnd.lime.web-link+json",
        "value":{  
          "title":"Classic Black T-Shirt",
          "text":"100% Cotton, 200% Comfortable",
          "previewUri":"http://www.lvnlifestyle.com/wp-content/uploads/2014/08/mens.black_.tshirt.jpg",
          "uri":"http://www.lvnlifestyle.com/product/black-mens-bamboo-organic-cotton-classic-t-shirt/&messengerExtensions=true",
          "target":"selfTall"
        }
      }
    ]
  }
}
```


| MIME type                            |
|--------------------------------------|
| application/vnd.lime.list+json       |

Allows sending of a list of different documents on a single message. It's also possible to define a document as a list header.

#### Channel support

| Channel              | Type                    | 
|--------------------|---------------------------|
| BLiP Chat          | Not supported yet         |
| Messenger          | [List template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template)|
| SMS                | Text                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
