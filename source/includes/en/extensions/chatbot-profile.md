## Chatbot profile

The **profile** extension allows the configuration of chatbot profile properties, which can reflect on the clients in the published channel - if supported. Each property is a document of a type supported by the platform.

To manage chatbot's profile information, send commands with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The profile property document. |
| type | The resource document type  |
| uri    | **/profile**   |
| to     | **postmaster@msging.net** (not required) |

The command's properties `resource` and `method` can change according to the feature.

The current supported profile properties are:

| Name             | Identifier        | Document type     | Supported channels  |
|------------------|-------------------|-------------------|---------------------|
| Start button     | `get-started`     | Text              | Messenger, BLiP Chat           |
| Start button label     | `get-started-label`     | Text              | Messenger, BLiP Chat           |
| Greeting message | `greeting`        | Text              | Messenger, BLiP Chat           |
| Persistent menu  | `persistent-menu` | Multimedia menu   | Messenger           |

Note: In Messenger, the value of `get-started` must be defined before the value of `persistent-menu`.

### Delete a profile property

Delete a message for a profile property.

Replace `{propertyIdentifier}` with the property identifier you want to delete.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "pwaxbha-asda78520",
  "to": "postmaster@msging.net",
  "method": "delete",
  "uri": "/profile/{propertyIdentifier}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "c5e786ab-2b9b-468d-a93a-56255083b75f",
    "from": "postmaster@msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@msging.net",
  method: Lime.CommandMethod.DELETE,
  uri: "/profile/{propertyIdentifier}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/profile/{propertyIdentifier}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get profile properties

Get all the active chatbot's profile properties.

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "4544aacab-adaa2t21920a",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/profile"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 3,
        "itemType": "text/plain",
        "items": [
            "get-started",
            "get-started-label",
            "greeting"
        ]
    },
    "method": "get",
    "status": "success",
    "id": "98208a66-d3b3-4b95-a266-c6ad73b9e348",
    "from": "postmaster@msging.net/#az-iris1",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@msging.net",
  method: Lime.CommandMethod.GET,
  uri: "/profile"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/profile"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Get profile properties messages

Get a message for each profile property.

Replace `{propertyIdentifier}` with one of the possible properties:  
* get-started  
* get-started-label  
* greeting  
* persistent-menu  

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "absb1a24a8-a989-aca-wt",
  "method": "get",
  "to": "postmaster@msging.net",
  "uri": "/profile/{propertyIdentifier}"  
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "5",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "text/plain",
  "resource": "Hello and welcome to our service!"
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  to: "postmaster@msging.net",
  method: Lime.CommandMethod.GET,
  uri: "/profile/{propertyIdentifier}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/profile/{propertyIdentifier}"),
};

var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

<aside class="notice">
Example: Retrieve a saved chatbot's greeting message using a <b>get</b> command on <b>/profile/greeting</b> URI. </aside>

### Set a start message

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "4",
  "method": "set",
  "uri": "/profile/get-started",
  "type": "text/plain",
  "resource": "Let's begin"
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  method: Lime.CommandMethod.SET,
  uri: "/profile/get-started",
  type: "text/plain",
  resource: "Let's begin"
})
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Lime.Messaging.Contents;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Profile;

namespace Extensions
{
    public class ProfileMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IProfileExtension _profileExtension;

        public ProfileMessageReceiver(IMessagingHubSender sender, IProfileExtension profileExtension)
        {
            _sender = sender;
            _settings = settings;
            _profileExtension = profileExtension;
        }

        public async Task ReceiveAsync(Message m, CancellationToken cancellationToken)
        {
            await _profileExtension.SetGetStartedAsync(new PlainText { Text = "Let's begin" }, cancellationToken);
        }
    }
}
```

In order to set a get started button for your chatbot, use a set command on `/profile/get-started` URI. This sample shows how to add a button that sends the text `Let's begin` to your chatbot during the first client interaction.

### Set start button

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "4",
  "method": "set",
  "uri": "/profile/get-started-label",
  "type": "text/plain",
  "resource": "Start now"
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  method: Lime.CommandMethod.SET,
  uri: "/profile/get-started-label",
  type: "text/plain",
  resource: "Start now"
})
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Lime.Messaging.Contents;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Profile;

namespace Extensions
{
    public class ProfileMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IProfileExtension _profileExtension;

        public ProfileMessageReceiver(IMessagingHubSender sender, IProfileExtension profileExtension)
        {
            _sender = sender;
            _settings = settings;
            _profileExtension = profileExtension;
        }

        public async Task ReceiveAsync(Message m, CancellationToken cancellationToken)
        {
            var command = new Command()
            {
                Id = EnvelopeId.NewId(),
                Method = CommandMethod.Set,
                Uri = new LimeUri("/profile/get-started-label"),
                Resource = new PlainText { Text = "Start now" }
            };

            await _sender.SendCommandAsync(command, cancellationToken);
        }
    }
}
```

In order to set a get started button for your chatbot, use a `set` command on `/profile/get-started-label` URI. This sample shows how to add a button with `Start now` as label.
<aside  class="notice">
Note: Messenger doesn't allow the label to be changed </aside>

### Set complex persistent menu

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "3",
  "method": "set",
  "uri":"/profile/persistent-menu",
  "type":"application/vnd.lime.document-select+json",
    "resource":{
      "options":[
        {
          "label":{
            "type":"application/vnd.lime.document-select+json",
            "value":{
              "header":{
                "type":"text/plain",
                "value":"Option 1"
              },
              "options":[
                {
                  "label":{
                    "type":"text/plain",
                    "value":"Option 1.1"
                  }
                },
                {
                  "label":{
                    "type":"application/vnd.lime.web-link+json",
                  "value":{
                    "text":"Option 1.2",
                    "uri":"https://address.com/option1.2"
                  }
                }
              },
              {
                "label":{
                  "type":"application/vnd.lime.document-select+json",
                  "value":{
                    "header":{
                      "type":"text/plain",
                      "value":"Option 1.3"
                    },
                    "options":[
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.1"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.2"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.3"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Option 2"
        }
      },
      {
        "label":{
          "type":"application/vnd.lime.web-link+json",
          "value":{
            "text":"Option 3",
            "uri":"https://address.com/option1.3"
          }
        }
      }
    ]
  }
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
client.sendCommand({  
    id: Lime.Guid(),
    method: Lime.CommandMethod.SET,
    type:"application/vnd.lime.document-select+json",
    resource:{
      "options":[
        {
          "label":{
            "type":"application/vnd.lime.document-select+json",
            "value":{
              "header":{
                "type":"text/plain",
                "value":"Option 1"
              },
              "options":[
                {
                  "label":{
                    "type":"text/plain",
                    "value":"Option 1.1"
                  }
                },
                {
                  "label":{
                    "type":"application/vnd.lime.web-link+json",
                  "value":{
                    "text":"Option 1.2",
                    "uri":"https://address.com/option1.2"
                  }
                }
              },
              {
                "label":{
                  "type":"application/vnd.lime.document-select+json",
                  "value":{
                    "header":{
                      "type":"text/plain",
                      "value":"Option 1.3"
                    },
                    "options":[
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.1"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.2"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.3"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Option 2"
        }
      },
      {
        "label":{
          "type":"application/vnd.lime.web-link+json",
          "value":{
            "text":"Option 3",
            "uri":"https://address.com/option1.3"
          }
        }
      }
    ]
  }
})
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Lime.Messaging.Contents;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Profile;
using System;

namespace Extensions
{
    public class ProfileMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IProfileExtension _profileExtension;

        public ProfileMessageReceiver(IMessagingHubSender sender, IProfileExtension profileExtension)
        {
            _sender = sender;
            _settings = settings;
            _profileExtension = profileExtension;
        }

        public async Task ReceiveAsync(Message m, CancellationToken cancellationToken)
        {
            var complexMenu = new DocumentSelect
            {
                Options = new DocumentSelectOption[]
                {
                    new DocumentSelectOption
                    {
                        Label = new DocumentContainer
                        {
                            Value = new DocumentSelect
                            {
                                Header = new DocumentContainer{
                                    Value = new PlainText
                                    {
                                        Text = "Option 1"
                                    }
                                },
                                Options = new DocumentSelectOption[]
                                {
                                    new DocumentSelectOption
                                    {
                                        Label = new DocumentContainer
                                        {
                                            Value = new PlainText
                                            {
                                                Text = "Option 1.1"
                                            }
                                        }
                                    },
                                    new DocumentSelectOption
                                    {
                                        Label = new DocumentContainer
                                        {
                                            Value = new WebLink
                                            {
                                                Text = "Option 1.2",
                                                Uri = new Uri("https://address.com/option1.2")
                                            }
                                        }
                                    },
                                    new DocumentSelectOption
                                    {
                                        Label = new DocumentContainer
                                        {
                                            Value = new DocumentSelect
                                            {
                                                Header = new DocumentContainer{
                                                    Value = new PlainText
                                                    {
                                                        Text = "Option 1.3"
                                                    }
                                                },
                                                Options = new DocumentSelectOption[]
                                                {
                                                    new DocumentSelectOption
                                                    {
                                                        Label = new DocumentContainer{
                                                            Value = new PlainText
                                                            {
                                                                Text = "Option 1.3.1"
                                                            }
                                                        },
                                                    },
                                                    new DocumentSelectOption
                                                    {
                                                        Label = new DocumentContainer{
                                                            Value = new PlainText
                                                            {
                                                                Text = "Option 1.3.2"
                                                            }
                                                        },
                                                    },
                                                    new DocumentSelectOption
                                                    {
                                                        Label = new DocumentContainer{
                                                            Value = new PlainText
                                                            {
                                                                Text = "Option 1.3.3"
                                                            }
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    new DocumentSelectOption
                    {
                        Label = new DocumentContainer
                        {
                            Value = new PlainText
                            {
                                Text = "Option 2"
                            }
                        }
                    },
                    new DocumentSelectOption
                    {
                        Label = new DocumentContainer
                        {
                            Value = new PlainText
                            {
                                Text = "Option 3"
                            }
                        }
                    }
                }
            };

            await _profileExtension.SetPersistentMenuAsync(complexMenu, cancellationToken);
        }
    }
}
```

Last but not least, you can also add a complex persistent menu (with links and submenus) using a `SET` command on `/profile/persistent-menu` URI. This sample shows how to add a complex persistent menu (only on Facebook Messenger channel) with 3 options `SubMenu 1`, `Option 2` and `Option 3 as a web link`.

### Set Greeting Message

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "1",
  "method": "set",
  "uri": "/profile/greeting",
  "type": "text/plain",
  "resource": "Hello and welcome to our service!"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
client.sendCommand({
  id: Lime.Guid(),
  method: Lime.CommandMethod.SET,
  uri: "/profile/greeting",
  type: "text/plain",
  resource: "Hello and welcome to our service!"
})
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Lime.Messaging.Contents;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Profile;

namespace Extensions
{
    public class ProfileMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IProfileExtension _profileExtension;

        public ProfileMessageReceiver(IMessagingHubSender sender, IProfileExtension profileExtension)
        {
            _sender = sender;
            _settings = settings;
            _profileExtension = profileExtension;
        }

        public async Task ReceiveAsync(Message m, CancellationToken cancellationToken)
        {
            await _profileExtension.SetGreetingAsync(new PlainText { Text = "Hello and welcome to our service!" }, cancellationToken);
        }
    }
}
```

In order to set a text greeting message for your chatbot, use a `set` command on `/profile/greeting` URI. This sample shows how to add a greeting message with the content `"Hello and welcome to our service!"`.

### Set simple persistent menu

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "2",
  "method": "set",
  "uri":"/profile/persistent-menu",
  "type":"application/vnd.lime.document-select+json",
  "resource": {
    "options":[
      {
        "label":{
          "type":"text/plain",
          "value":"Option 1"
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Option 2"
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Option 3"
        }
      }
    ]
  }
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
client.sendCommand({  
    id: Lime.Guid(),
    method: Lime.CommandMethod.SET,
    uri:"/profile/persistent-menu",
    type:"application/vnd.lime.document-select+json",
    resource: {
        "options":[
        {
            "label":{
            "type":"text/plain",
            "value":"Option 1"
            }
        },
        {
            "label":{
            "type":"text/plain",
            "value":"Option 2"
            }
        },
        {
            "label":{
            "type":"text/plain",
            "value":"Option 3"
            }
        }
        ]
    }
})
``` 

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Lime.Messaging.Contents;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Profile;

namespace Extensions
{
    public class ProfileMessageReceiver : IMessageReceiver
    {
        private readonly IMessagingHubSender _sender;
        private readonly IProfileExtension _profileExtension;

        public ProfileMessageReceiver(IMessagingHubSender sender, IProfileExtension profileExtension)
        {
            _sender = sender;
            _settings = settings;
            _profileExtension = profileExtension;
        }

        public async Task ReceiveAsync(Message m, CancellationToken cancellationToken)
        {
            var menu = new DocumentSelect
            {
                Options = new DocumentSelectOption[]
                {
                    new DocumentSelectOption
                    {
                        Label = new DocumentContainer
                        {
                            Value = new PlainText
                            {
                                Text = "Option 1"
                            }
                        }
                    },
                    new DocumentSelectOption
                    {
                        Label = new DocumentContainer
                        {
                            Value = new PlainText
                            {
                                Text = "Option 2"
                            }
                        }
                    },
                    new DocumentSelectOption
                    {
                        Label = new DocumentContainer
                        {
                            Value = new PlainText
                            {
                                Text = "Option 3"
                            }
                        }
                    }
                }
            };

            await _profileExtension.SetPersistentMenuAsync(menu, cancellationToken);
        }
    }
}
```

In order to set a Messenger persistent menu for your chatbot, use a `set` command on `/profile/persistent-menu` URI. This sample shows how to add a simple persistent menu (only on Facebook Messenger channel) with 3 options `Option 1`, `Option 2` and `Option 3`.
