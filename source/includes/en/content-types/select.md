## Select

>Creating a menu with 3 options

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;
//Send an options list to give your client the choice between multiple answers using Select type:
public class PlainTextMessageReceiver : IMessageReceiver
{
private readonly ISender _sender;
private readonly Settings _settings;

public PlainTextMessageReceiver(ISender sender, Settings settings)
{
    _sender = sender;
    _settings = settings;
}

public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
{
    jsonDocuments = new JsonDocument();
    jsonDocuments.Add("Key1", "value1");
    jsonDocuments.Add("Key2", "2");

    var document = new Select
    {
        //Scope = SelectScope.Immediate, (create a quickreply instead menu)
        Text = "Choose an option:",
        Options = new SelectOption[]
        {
            new SelectOption
            {
                Order = 1,
                Text = "First option!",
                Value = new PlainText { Text = "1" }
            },
            new SelectOption
            {
                Order = 2,
                Text = "Second option",
                Value = new PlainText { Text = "2" }
            },
            new SelectOption
            {
                Order = 3,
                Text = "Third option",
                Value = jsonDocuments
            }
        }
    };

    await _sender.SendMessageAsync(document, message.From, cancellationToken);
}

}
Note:

//NOTE:
//Value field is optional. If informed, your value will be sent to the chatbot when the user chooses the option.
//If Value field is not provided, one of the following fields must be provided: Order or Text. The Order field will be used only if Value and Text is not provided.
//
//Limitations:
//Facebook Messenger: Limit of 3 options. Otherwise, your message will not be delivered.
//If sending more than 3 options is necessary, divide them into multiple messages.
//Tangram SMS: The Value field will be ignored. Only the Order field will be sent if the option be selected.
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.select+json",
      to: "1042221589186385@messenger.gw.msging.net",
      content: {
        text: "Choose an option",
        options: [
            {
                text: "First option"
            },
            {
                order: 2,
                text: "Second option"
            },
            {
                order: 3,
                text: "Third option",
                type: "application/json",
                value: {
                    key1: "value1",
                    key2: 2
                }
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
    "id":"311F87C0-F938-4FF3-991A-7C5AEF7771A5",
    "to":"1042221589186385@messenger.gw.msging.net",
    "type":"application/vnd.lime.select+json",
    "content":{
        "text":"Choose an option",
        "options":[
            {
                "text":"First option"
            },
            {
                "order":2,
                "text":"Second option"
            },
            {
                "order":3,
                "text":"Third option",
                "type":"application/json",
                "value":{
                    "key1":"value1",
                    "key2":2
                }
            }
        ]
    }
}
```
| MIME type                                 |
|-------------------------------------------|
| application/vnd.lime.select+json |

Allows sending of a text menu to customers to make a choice. It is possible to define a document that may be delivered to the chatbot when the customer selects an option - depending on the channel support. The options can also be numbered, if needed.

Some channels support the options scope limitation, which determines for how much time they are valid for the user selection. For example, in some cases, sent options can only be selected by the customer at that time and must disappear after the choice. In this case, the scope is **immediate**. In others, the options are valid for the selection at any time, and the scope is **persistent**.

For more details, check the [LIME protocol](http://limeprotocol.org/content-types.html#select) specification.


### Menu with numbered options


> JSON 1

```csharp
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "f8cf7a7a-be4f-473a-8516-60d55534b5a6",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "text/plain",
    "content": "First option"
}
```

```javascript
    client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.select+json",
      to: "blipcontact@msging.net",
      content: "First option"
    });
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "f8cf7a7a-be4f-473a-8516-60d55534b5a6",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "text/plain",
    "content": "First option"
}
```

>JSON 2

```csharp
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "76CB408D-39E6-4212-8AA1-7435B42A6993",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "text/plain",
    "content": "Second option"
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.select+json",
      to: "blipcontact@msging.net",
      content: "Second option"
    });
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "76CB408D-39E6-4212-8AA1-7435B42A6993",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "text/plain",
    "content": "Second option"
}
```

>JSON 3

```csharp
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "035E675C-D25B-437D-80BD-057AD6F70671",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "application/json",
    "content": {
        "key1":"value1",
        "key2":2
    }
}
```

```javascript
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.select+json",
      to: "blipcontact@msging.net",
      content: {
            key1: "value1",
            key2: 2
        }
    });
```

```http
POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "035E675C-D25B-437D-80BD-057AD6F70671",
    "from": "1042221589186385@messenger.gw.msging.net",
    "to": "blipcontact@msging.net",
    "type": "application/json",
    "content": {
        "key1":"value1",
        "key2":2
    }
}
```
When the user selects one option, a message returns according to the rule:

- If the option contains the field 'value', it should be returned
- If not, the 'order' filled value should be returned, if present
- If not, field 'text' should be returned


Return example of the above mentioned menu:

When selecting the first option: **(JSON 1)**:

When selecting the second option **(JSON 2)**:

At last, when selecting the third option **(JSON 3)**:



The return message *type* will always be the same as the chosen option. When a value for the field *value* is not defined, the type will be `text/plain`.

#### Channel mapping

| Channel              | Type                    |
|--------------------|-------------------------|
| BLiP Chat           | Select  |
| Messenger          | [Button template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template) (on default scope) e [Quick replies](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies) (on *immediate* scope)|
| Whatsapp           | Text                  |
| SMS                | Text                  |
| Skype              | [Activity](https://docs.botframework.com/en-us/skype/chat/#sending-messages-1)|
| Telegram           | [Message](https://core.telegram.org/bots/api#message)|
