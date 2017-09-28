### Sending commands

<blockquote class="lang-specific csharp">
<p>ISender interface also enable send commands to the server, as the follow sample:</p>
</blockquote>

```csharp
// For this case, the command response is received on a synchronous way.

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
        var command = new Command {
            Id = 1,
            Method = CommandMethod.Get,
            Uri = new LimeUri("/account")
        };
        
        var response = await _sender.ProcessCommandAsync(command, cancellationToken);
    }
}
```

```javascript
var pingCommand = {
    id: Lime.Guid(),
    uri: '/ping',
    method: 'get'
};

messagingHubClient
    .sendCommand(pingCommand)
    .then(function (commandResponse) {
        utils.logLimeCommand(pingCommand, 'Ping sent');
        utils.logLimeCommand(commandResponse, 'Ping response');
    })
    .catch(function (err) {
        utils.logMessage('An error occurred: ' + err);
    });

```

```http

POST https://msging.net/commands HTTP/1.1
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Type: application/json
Content-Length: 393

{  
    "id":"2",
    "to":"postmaster@scheduler.msging.net",
    "method":"set",
    "uri":"/schedules",
    "type":"application/vnd.iris.schedule+json",
    "resource":{  
    "message":{  
        "id":"ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
        "to":"553100001111@0mn.io",
        "type":"text/plain",
        "content":"Scheduled Message"
    },
    "when":"2016-07-25T17:50:00.000Z"
    }
}
```

In order to use the BLiP's extensions (like schedule and directory) is necessary send commands. 

REQUEST

| Name | Description |
|---------------------------------|--------------|
| id     | Unique command identifier   |
| from   | Command originator address   |
| to     | Command recipient address  |
| uri    | The path at the recipient the resource the command refers to |
| method | Method for resource manipulation defined at uri. This value is mandatory |
| type | Declaration of the resource value type, in the MIME format |
| resource | JSON resource representation |
| status | Indicates the command processing result, it is mandatory in the answers |
| reason | Indicates the command processing failure reason |

Obs: The **uri** value is mandatory in the requests and can be omitted in the responses. A response command may have status and reason properties.

#### Result codes for requests

| Code                | Description                                                                               |
|---------------------|-----------------------------------------------------------------------------------------  |
| 202 (Accepted)      | Envelope was accepted by the server                                                       |
| 400 (Bad Request)   | Alert to some problem with format or fields of sent envelope.                             |
| 401 (Unauthorized)  | Alert to some problem or *Authorization* header missing                                   |


