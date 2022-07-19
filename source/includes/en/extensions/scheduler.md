## Schedule

The **scheduler** extension allows the chatbot to schedule messages to be sent in specific date and time on its behalf. Any type of message to any destination can be scheduled, including **broadcast** messages (to a distribution list). The scheduling time must be done in the GMT timezone. Any received notification from a scheduled message is forwarded to the chatbot.

To use **scheduler** extension features, send a command with the following properties:

| Name     | Description                              |
|----------|------------------------------------------|
| id       | Unique identifier of the command.        |
| method   | The command verb                         |
| resource | The schedule document.                   |
| type     | **"application/vnd.iris.schedule+json"** |
| uri      | **/schedules**                           |
| to       | **postmaster@scheduler.msging.net**      |

The command's properties `resource` and `method` can change according to the feature.
A schedule object passed as a document `resource` has the following properties:

| Property    | Description                                | Example                                                                          |
|-------------|--------------------------------------------|----------------------------------------------------------------------------------|
| **message** | A complete message object to be scheduled. | { "id": "1", "to": "destination@0mn.io", "type": "text/plain", "content": "Hi" } |
| **when**    | The scheduled time (in the GMT timezone)   | "2017-07-25T17:50:00.000Z"                                                       |

### Cancel a scheduling

You can cancel a scheduling sending a DELETE command.

Replace `{messageId}` with the message id for the scheduled message you want to delete. Use the [Get a scheduled message](/#get-a-scheduled-message) method to claim this information.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "to": "postmaster@scheduler.msging.net",
  "method": "delete",
  "uri": "/schedules/{messageId}",
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "e7018403-55da-41b5-ad7e-505025a1e13a",
    "from": "postmaster@scheduler.msging.net/#az-iris5",
    "to": "demobot@msging.net",
}
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.DELETE,
        '/schedules/{messageId}',
        to='postmaster@scheduler.msging.net'
    )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@scheduler.msging.net",
    method: "delete",
    uri: "/schedules/{messageId}"
})
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
            var scheduledMessage = await _schedulerExtension.CancelScheduledMessageAsync("{messageId}", cancellationToken);
        }
    }
}
```

### Create a scheduling

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var currentDate = new Date(),
        currentDate = currentDate.toISOString();

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

```python
result = await client.process_command_async(
    date = datetime() # from datetime import datetime
    Command(
        CommandMethod.SET,
        '/schedules',
        'application/vnd.iris.schedule+json',
        {
            'message': {
                'id': '{{$guid}}',
                'to': 'destination@0mn.io',
                'type': 'text/plain',
                'content': 'Scheduling test.'
            },
            'when': date.isoformat()
        },
        to='postmaster@scheduler.msging.net'
    )
)
```

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
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
    "to": "destination@0mn.io",
    "metadata": {
        "#command.uri": "lime://destination@0mn.io/schedules"
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

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/schedules/ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67',
        to='postmaster@scheduler.msging.net'
    )
)
```

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
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

### Get all schedules

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var scheduledMessage = await client.sendCommand({  
        id: Lime.Guid(),
        to: 'postmaster@scheduler.msging.net',
        method: Lime.CommandMethod.GET,
        uri: '/schedules/'
    });
    console.log(scheduledMessage);
});
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/schedules',
        to='postmaster@scheduler.msging.net'
    )
)
```

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{guid}}",
  "to": "postmaster@scheduler.msging.net",
  "method": "get",
  "uri": "/schedules"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 3,
        "itemType": "application/vnd.iris.schedule+json",
        "items": [
            {
                "name": "Campaign for Easter",
                "when": "2020-02-21T17:08:41.920Z",
                "message": {
                    "type": "application/vnd.iris.content-unavailable",
                    "content": null,
                    "id": "992d1ae3-5449-4cbf-9e75-c07f1ed3d037",
                    "to": "listaTelegram@broadcast.msging.net"
                },
                "status": "executed"
            },
            {
                "name": "Lead Campaign",
                "when": "2020-05-21T13:27:32.820Z",
                "message": {
                    "type": "application/vnd.iris.content-unavailable",
                    "content": null,
                    "id": "44b4cbf5-7849-4b0e-b132-340005fb8719",
                    "to": "myemail2@broadcast.msging.net"
                },
                "status": "executed"
            },
            {
                "name": "Xmas Campaign",
                "when": "2020-05-21T13:29:07.140Z",
                "message": {
                    "type": "application/vnd.iris.content-unavailable",
                    "content": null,
                    "id": "f3d1e274-bf5d-4e1f-8d7e-cc06c461c678",
                    "to": "myemail2@broadcast.msging.net"
                },
                "status": "executed"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "fb5d4669-f14a-4c4c-8051-764b3094644f",
    "from": "postmaster@scheduler.msging.net/#iris-hosted-5",
    "to": "demobot4@msging.net/!iris-hosted-6-smdmmbpm",
    "metadata": {
        "#command.uri": "lime://demobot4@msging.net/schedules",
        "uber-trace-id": "90322227a57faf10%3A14d590093e4c35a0%3A90322227a57faf10%3A1"
    }
}
```

Get all schedules messages.

The response should be a [Schedule document](#schedules) list.

<aside class="notice">
From April 2021, this method will have a return <b>limit of 1000 scheduled messages</b>.
</aside>
