### List
| MIME type                            |
|--------------------------------------|
| application/vnd.lime.list+json       |

Allows send a list of different documents on a single message. Is also possible define a document as a list header.

#### Examples
1 - Sending a list with a **weblink** header to a Messenger user:
```http
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

#### Channel support

| Channel              | Type                    | 
|--------------------|---------------------------|
| BLiP Chat          | Not supported yet         |
| Messenger          | [List template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template)|
| SMS                | Text                   |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
