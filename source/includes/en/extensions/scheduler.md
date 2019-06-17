## Schedule

The **scheduler** extension allows the chatbot to schedule messages to be sent in specific date and time on its behalf. Any type of message to any destination can be scheduled, including **broadcast** messages (to a distribution list). The scheduling time must be done in the GMT timezone. Any received notification from a scheduled message is forwarded to the chatbot.

To use **scheduler** extension features, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The schedule document. |
| type | **"application/vnd.iris.schedule+json"** |
| uri    | **/schedules**   |
| to     | **postmaster@scheduler.msging.net** |

The command's properties `resource` and `method` can change according to the feature.
A schedule object passed as a document `resource` has the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **message** | A complete message object to be scheduled.                          | { "id": "1", "to": "destination@0mn.io", "type": "text/plain", "content": "Hi" } |
| **when**   | The scheduled time (in the GMT timezone)  | "2017-07-25T17:50:00.000Z" |

### Create a scheduling

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var currentDate = new Date(); 
        currentDate = currentDate.getFullYear() + "-"
                    + ("0" + (currentDate.getMonth() + 1)).slice(-2)  + "-" 
                    + ("0" + currentDate.getDate()).slice(-2) + "T"  
                    + (currentDate.getHours() + 3) + ":"  
                    + (currentDate.getMinutes() + 2) + ":" 
                    + currentDate.getSeconds() + ".000Z";

    await client.sendCommand({  
        id: Lime.Guid(),
        to: 'postmaster@scheduler.msging.net',
        method: Lime.CommandMethod.SET,
        uri: '/schedules',
        type: 'application/vnd.iris.schedule+json',
        resource: {  
            message: {  
                id: Lime.Guid(),
                to: 'destination@0mn.io',
                type: 'text/plain',
                content: 'Scheduling test.'
            },
            when: currentDate
        }
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "1",
  "to": "postmaster@scheduler.msging.net",
  "method": "set",
  "uri": "/schedules",
  "type": "application/vnd.iris.schedule+json",
  "resource": {  
    "message": {  
      "id": "ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
      "to": "destination@0mn.io",
      "type": "text/plain",
      "content": "Scheduling test."
    },
    "when": "2016-07-25T17:50:00.000Z",
    "name": "New Schedule"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "1",
    "from": "postmaster@scheduler.msging.net/#az-iris4",
    "to": "destination@msging.net",
    "metadata": {
        "#command.uri": "lime://destination@msging.net/schedules"
    }
}
```

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Scheduler;
using Lime.Messaging.Contents;

namespace Extensions
{
    public class SampleExtensionMessageReceiver : IMessageReceiver
    {
        private readonly ISchedulerExtension _schedulerExtension;

        public SampleExtensionMessageReceiver(ISchedulerExtension schedulerExtension)
        {
            _schedulerExtension = schedulerExtension;
        }

        public async Task ReceiveAsync(Message receivedMessage, CancellationToken cancellationToken)
        {
            var schedullingDate = DateTimeOffset.Now.AddMinutes(10);
            var messageContent = "Scheduling test.";

            var message = new Message
            {
                Id = Guid.NewGuid().ToString(),
                To = Node.Parse("destination@0mn.io"),
                Content = new PlainText { Text = messageContent }
            };

            //Schedule a message to next 10 minutes
            await _schedulerExtension.ScheduleMessageAsync(message, schedullingDate);
        }
    }
}
```

Scheduling a message text/plain with the content 'Scheduling test' to be sent to the user **destination@0mn.io** in **2016-07-25T17:50:00.000Z**

### Get a scheduled message

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var scheduledMessage = await client.sendCommand({  
        id: Lime.Guid(),
        to: 'postmaster@scheduler.msging.net',
        method: Lime.CommandMethod.GET,
        uri: '/schedules/ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67'
    });
    console.log(scheduledMessage);
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "2",
  "to": "postmaster@scheduler.msging.net",
  "method": "get",
  "uri": "/schedules/ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.schedule+json",
    "resource": {
        "when": "2019-06-17T13:29:00.000Z",
        "message": {
            "type": "text/plain",
            "content": "Scheduling test.",
            "id": "ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
            "from": "contact@msging.net",
            "pp": "postmaster@scheduler.msging.net/contact%40msging.net",
            "to": "destination@0mn.io",
            "metadata": {
                "#scheduler.when": "06/17/2019 13:29:00"
            }
        },
        "status": "scheduled"
    },
    "method": "get",
    "status": "success",
    "id": "2",
    "from": "postmaster@scheduler.msging.net/#az-iris6",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/schedules/ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Scheduler;

namespace Extensions
{
    public class SampleExtensionMessageReceiver : IMessageReceiver
    {
        private readonly ISchedulerExtension _schedulerExtension;

        public SampleExtensionMessageReceiver(ISchedulerExtension schedulerExtension)
        {
            _schedulerExtension = schedulerExtension;
        }

        public async Task ReceiveAsync(Message receivedMessage, CancellationToken cancellationToken)
        {
            var scheduledMessage = await _schedulerExtension.GetScheduledMessageAsync("ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67", cancellationToken);
        }
    }
}
```

Getting an existing scheduled message with id `ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67`. Each scheduled message has tree possible `status` values: `scheduled`, `executed` and `canceled`. This values are returned when you search for a specific scheduled message.

