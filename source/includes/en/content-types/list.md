## List

> Sending a list with a **weblink** header to a Messenger user:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

public class OptionListMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;

    public OptionListMessageReceiver(ISender sender)
    {
        _sender = sender;
    }

    

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        var document = new DocumentList
        {
            Header = {
                Value = new WebLink {
                    Title = "Classic T-Shirt Collection",
                    Text = "See all our colors",
                    PreviewUri = new Uri("https://peterssendreceiveapp.ngrok.io/img/collection.png"),
                    Uri = new Uri("https://peterssendreceiveapp.ngrok.io/shop_collection?messengerExtensions=true"),
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
                        PreviewUri = new Uri("https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png"),
                        Uri = new Uri("https://peterssendreceiveapp.ngrok.io/view?item=100&messengerExtensions=true"),
                        Target = WebLinkTarget.SelfTall
                    }
                },
                new DocumentContainer
                {
                    Value = new WebLink
                    {
                        Title = "Classic Blue T-Shirt",
                        Text = "100% Cotton, 200% Comfortable",
                        PreviewUri = new Uri("https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png"),
                        Uri = new Uri("https://peterssendreceiveapp.ngrok.io/view?item=101&messengerExtensions=true"),
                        Target = WebLinkTarget.SelfTall

                    }
                },
                new DocumentContainer
                {
                    Value = new WebLink
                    {
                        Title = "Classic Black T-Shirt",
                        Text = "100% Cotton, 200% Comfortable",
                        PreviewUri = new Uri("https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png"),
                        Uri = new Uri("https://peterssendreceiveapp.ngrok.io/view?item=102&messengerExtensions=true"),
                        Target = WebLinkTarget.SelfTall
                    }
                }
            }
        };
        await _sender.SendMessageAsync(document, message.From, cancellationToken);
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
              previewUri: "https://peterssendreceiveapp.ngrok.io/img/collection.png",
              uri: "https://peterssendreceiveapp.ngrok.io/shop_collection?",
              target: "selfTall"
          }
      },
      items:[  
          {  
              type: "application/vnd.lime.web-link+json",
              value:{  
                  title: "Classic White T-Shirt",
                  text: "100% Cotton, 200% Comfortable",
                  previewUri: "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
                  uri: "https://peterssendreceiveapp.ngrok.io/view?item=100",
                  target: "selfTall"
              }
          },
          {  
              type: "application/vnd.lime.web-link+json",
              value:{  
                  title: "Classic Blue T-Shirt",
                  text: "100% Cotton, 200% Comfortable",
                  previewUri: "https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
                  uri: "https://peterssendreceiveapp.ngrok.io/view?item=101",
                  target: "selfTall"
              }
          },
          {  
              type: "application/vnd.lime.web-link+json",
              value:{  
                  title: "Classic Black T-Shirt",
                  text: "100% Cotton, 200% Comfortable",
                  previewUri: "https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png",
                  uri: "https://peterssendreceiveapp.ngrok.io/view?item=102",
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
        "previewUri":"https://peterssendreceiveapp.ngrok.io/img/collection.png",
        "uri":"https://peterssendreceiveapp.ngrok.io/shop_collection?messengerExtensions=true",
        "target":"selfTall"
      }
    },
    "items":[  
      {  
        "type":"application/vnd.lime.web-link+json",
        "value":{  
          "title":"Classic White T-Shirt",
          "text":"100% Cotton, 200% Comfortable",
          "previewUri":"https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
          "uri":"https://peterssendreceiveapp.ngrok.io/view?item=100&messengerExtensions=true",
          "target":"selfTall"
        }
      },
      {  
        "type":"application/vnd.lime.web-link+json",
        "value":{  
          "title":"Classic Blue T-Shirt",
          "text":"100% Cotton, 200% Comfortable",
          "previewUri":"https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
          "uri":"https://peterssendreceiveapp.ngrok.io/view?item=101&messengerExtensions=true",
          "target":"selfTall"
        }
      },
      {  
        "type":"application/vnd.lime.web-link+json",
        "value":{  
          "title":"Classic Black T-Shirt",
          "text":"100% Cotton, 200% Comfortable",
          "previewUri":"https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png",
          "uri":"https://peterssendreceiveapp.ngrok.io/view?item=102&messengerExtensions=true",
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
