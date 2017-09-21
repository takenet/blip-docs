## Conversation commands

#### Result codes for requests

| Code                | Description                                                                               |
|---------------------|-----------------------------------------------------------------------------------------  |
| 202 (Accepted)      | Envelope was accepted by the server                                                       |
| 400 (Bad Request)   | Alert to some problem with format or fields of sent envelope.                             |
| 401 (Unauthorized)  | Alert to some problem or *Authorization* header missing                                   |


#### Required Settings

| Name                          | Description                                                                   |
|-------------------------------|-------------------------------------------------------------------------------|
| Url to receive messages       | Endpoint where BLiP will post the messages                                    |
| Url to receive notification   | Endpoint where BLiP will post the notifications                               |

### Sending commands

```csharp
// For this case, the command response is received on a synchronous way.
var command = new Command {
    Method = CommandMethod.Get,
    Uri = new LimeUri("/account")
};

var response = await _sender.ProcessCommandAsync(command, cancellationToken);
```

```http
//For instance, send a command to schedule some message

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


// Or using async/await
try {
    var commandResponse = await messagingHubClient.sendCommand(pingCommand);
    utils.logLimeCommand(pingCommand, 'Ping sent');
    utils.logLimeCommand(commandResponse, 'Ping response');
}
catch (e) {
    utils.logMessage('An error occurred: ' + err);
}
```

#### Webhook

In order to use the BLiP's extensions (like schedule and directory) is necessary send commands. To do this is necessary make a HTTP POST request on /commands URL