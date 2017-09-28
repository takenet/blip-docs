## Schedule

The **scheduler** extensions allows the chatbot to schedule messages to be sent in specific date and time on its behalf. Any type of message to any destination can be scheduled, including **broadcast** messages (to a distribution list). The scheduling time must be done in the GMT timezone. Any received notification from a scheduled message is forwarded to the chatbot.

To use **scheduler** extension features send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The schedule document. |
| type | **"application/vnd.iris.schedule+json"** |
| uri    | **/schedules**   |
| to     | **postmaster@scheduler.msging.net** |

The command's properties `resource` and `method` can change according of the feature.
An schedule object passed as a document `resource` has the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **message** | A complete message object to be scheduled.                          | { "id": "1", "to": "destination@0mn.io", "type": "text/plain", "content": "Hi" } |
| **when**   | The scheduling time (in the GMT timezone)  | "2017-07-25T17:50:00.000Z" |

### Create a scheduling

```http
POST /commands HTTP/1.1
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
      "content": "Scheduling test"
    },
    "when": "2016-07-25T17:50:00.000Z"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{ 
  "id": "1",
  "from": "postmaster@scheduler.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Scheduler;
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
            var messageContent = "Scheduling test";

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

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "75c1621e-350c-4e85-8854-3e2cf3abbc3a",
  "to": "postmaster@scheduler.msging.net",
  "method": "get",
  "uri": "/schedules/ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "from": "postmaster@scheduler.msging.net/#hmgirismsging2",
  "to": "rssreader@msging.net/default",
  "id": "75c1621e-350c-4e85-8854-3e2cf3abbc3a",
  "method": "get",
  "status": "success",
  "type": "application/vnd.iris.schedule+json",
  "resource": {
    "when": "2016-07-25T17:50:00.000Z",
    "message": {
      "id": "9abfd060-f05b-4ccb-944c-ec9f13525fe0",
      "type": "text/plain",
      "content": "Teste agendamento",
      "from": "contact@msging.net",
      "pp": "postmaster@scheduler.msging.net/contact%40msging.net",
      "to": "destination@0mn.io",
    },
    "status": "scheduled"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Takenet.MessagingHub.Client.Listener;
using Takenet.MessagingHub.Client.Extensions.Scheduler;

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

Getting an existing scheduled message with id `ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67`. Each scheduled message has tree possible `status` values: `scheduled`, `executed` and `canceled`. This values are returned when you search for a specific message scheduled.

