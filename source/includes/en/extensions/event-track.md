## Event Analysis

The **event analysis** extension allows chatbot's events registration in order to create analytics reports in the BLiP portal. The events are agregated by category, action and day. The reports and graphs can be generated through the [portal](https://portal.blip.ai), in the *Panel* -> *Data analysis* option.

To use any feature of **event analysis** extension, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb.  |
| resource | The event document. |
| type | **"application/vnd.iris.eventTrack+json"** |
| uri    | **/event-track**   |
| to     | **postmaster@analytics.msging.net** |

The command's properties `resource` and `method` can change according of the feature.
An event track object passed as a document `resource` has the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **category** | Category to aggregate the related events.                          | billing |
| **action**   | The action associated to the event. The event counting is made using the actions.  | payment |
| **contact**  | **Optional** contact associated to the event. If contact is a 'testers' group member, the event will be ignored.  | {"contact": {"identity": "123456@messenger.gw.msging.net"}} |
| **extras**   | **Optional** extra information to be stored within the event.         | {"customerId": "41231", "paymentId": "ca82jda"} |

### Create an event

Imagine that your chatbot must track the number of payment orders realized and show this data on a real time report. To make this possible you can register every single *success order* as an **action** of the *payments* **category**.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    method: Lime.CommandMethod.SET,
    type: 'application/vnd.iris.eventTrack+json',
    uri: '/event-track',
    resource: {
      category: 'billing',
      action: 'payment'
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
  "to": "postmaster@analytics.msging.net",
  "method": "set",
  "type": "application/vnd.iris.eventTrack+json",
  "uri": "/event-track",
  "resource": {
    "category": "payments",
    "action": "success-order"
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
    "from": "postmaster@analytics.msging.net/#az-iris1",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/event-track"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.EventTracker;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IEventTrackExtension _eventTrackExtension;

        public SampleMessageReceiver(IEventTrackExtension eventTrackExtension)
        {
            _eventTrackExtension = eventTrackExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            await _eventTrackExtension.AddAsync("payments", "success-order", contact: null, extras: null, cancellationToken: cancellationToken);
        }
    }
}
```

### Create event with contact

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        type: 'application/vnd.iris.eventTrack+json',
        uri: '/event-track',
        resource: {
            category: 'billing',
            action: 'payment',
            contact: {
                identity: '123456@messenger.gw.msging.net'
            }
        }
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "9494447a-2581-4597-be6a-a5dff33af156",
    "to": "postmaster@analytics.msging.net",
    "method": "set",
    "type": "application/vnd.iris.eventTrack+json",
    "uri": "/event-track",
    "resource": {
        "category": "payments",
        "action": "success-order",
        "contact": { 
            "identity": "123456@messenger.gw.msging.net"
        }
    }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "9494447a-2581-4597-be6a-a5dff33af156",
    "from": "postmaster@analytics.msging.net/#az-iris4",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/event-track"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.EventTracker;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IEventTrackExtension _eventTrackExtension;

        public SampleMessageReceiver(IEventTrackExtension eventTrackExtension)
        {
            _eventTrackExtension = eventTrackExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            await _eventTrackExtension.AddAsync("payments", "success-order", identity: new Identity("123456", "messenger.gw.msging.net"));
        }
    }
}
```

It is also possible to associate a specific contact in an event. You can use this to ignore events of a tester user for example.
If your bot has a `123456@messenger.gw.msging.net` contact identity as a tester user, you can ignore all of its tracked events by adding this identity to the event resource object.

### Get Categories

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    var categories = await client.sendCommand({
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        uri: '/event-track'
    });
    categories.resource.items.forEach(function (item) {
        console.log(item);
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "3",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/event-track"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "itemType": "application/vnd.iris.eventTrack+json",
        "items": [
            {
                "category": "accounts"
            },
            {
                "category": "payments"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "3",
    "from": "postmaster@analytics.msging.net/#az-iris5",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/event-track"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.EventTracker;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IEventTrackExtension _eventTrackExtension;

        public SampleMessageReceiver(IEventTrackExtension eventTrackExtension)
        {
            _eventTrackExtension = eventTrackExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var events = await _eventTrackExtension.GetCategoriesAsync();
        }
    }
}
```

Retrieves all tracked categories.

### Get Counters

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  var events = await client.sendCommand({
    id:Lime.Guid(),
    method: Lime.CommandMethod.GET,
    uri: '/event-track/payments?startDate=2019-06-21&endDate=2019-06-28&$take=10'
  });
  events.resource.items.forEach(function (item) {
    console.log(item);
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "4",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/event-track/payments?startDate=2019-06-21&endDate=2019-06-28&$take=10"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.eventTrack+json",
    "items": [
      {
        "storageDate": "2019-06-25T03:00:00.000Z",
        "category": "payments",
        "action": "success-order",
        "count": "4"
      },
      {
        "storageDate": "2019-06-24T03:00:00.000Z",
        "category": "payments",
        "action": "success-order",
        "count": "1"
      }
    ]
  },
  "method": "get",
  "status": "success",
  "id": "4",
  "from": "postmaster@analytics.msging.net/#az-iris5",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/event-track/payments?startDate=2019-06-21&endDate=2019-06-28&$take=10"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.EventTracker;
using System;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IEventTrackExtension _eventTrackExtension;

        public SampleMessageReceiver(IEventTrackExtension eventTrackExtension)
        {
            _eventTrackExtension = eventTrackExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var startDate = new DateTimeOffset(2019, 6, 21, 0, 0, 0, default(TimeSpan));
            var endDate = new DateTimeOffset(2019, 6, 28, 15, 27, 0, default(TimeSpan));
            var take = 10;

            var events = await _eventTrackExtension.GetCategoryActionsCounterAsync(startDate, endDate, "payments", take);
        }
    }
}
```

To retrieve all counters of a category, add the category name to the command uri (for instance **/event-track/payments**). Those counters represent the number of events tracked in a specific pair of action and categories grouped by days. It is also possible to add *query strings* parameters as request filters. The following filters are available:

| QueryString  | Description                               |
|--------------|-------------------------------------------|
| $take        | Limit of total of items to be returned.   |
| startDate    | Initial date to search for events.        |
| endDate      | Limit date to retrieve the events.        |

### Get Details

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  var events = await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@analytics.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/event-track/payments/success-order?startDate=2019-06-21&endDate=2019-06-28&$take=10'
  });
  events.resource.items.forEach(function (item) {
    console.log(item);
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "5",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/event-track/payments/success-order?startDate=2019-06-21&endDate=2019-06-28&$take=10"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 5,
        "itemType": "application/vnd.iris.eventTrack+json",
        "items": [
            {
                "category": "payments",
                "action": "success-order",
                "storageDate": "2016-01-01T12:30:00.000Z",
                "extras": {
                    "expiration": "2015-12-30",
                    "customerId": "199213"
                }   
            },
            {
                "category": "payments",
                "action": "success-order",
                "storageDate": "2016-01-02T09:15:00.000Z",
                "extras": {
                    "expiration": "2016-01-01",
                    "customerId": "4123123"
                }
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "5",
    "from": "postmaster@analytics.msging.net/#az-iris2",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/event-track/payments/success-order?startDate=2019-06-21&endDate=2019-06-28&$take=10"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.EventTracker;
using System;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly IEventTrackExtension _eventTrackExtension;

        public SampleMessageReceiver(IEventTrackExtension eventTrackExtension)
        {
            _eventTrackExtension = eventTrackExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var startDate = new DateTimeOffset(2019, 6, 21, 0, 0, 0, default(TimeSpan));
            var endDate = new DateTimeOffset(2019, 6, 28, 15, 27, 0, default(TimeSpan));

            var events = await _eventTrackExtension.GetAllAsync(startDate, endDate, "payments", "success-order", 0, 20, cancellationToken);
        }
    }
}
```

Retrieves all events tracked with a specific pair of action and categories. The following filters are available as possible *query strings*:

| QueryString  | Description                               |
|--------------|-------------------------------------------|
| $skip        | Number of items to be skipped for paging. |
| $take        | Limit of total of items to be returned.   |
| startDate    | Initial date to search for events.        |
| endDate      | Limit date to retrieve the events.        |

### Delete an event category

If you need to delete a specific event category use the following command.
Remember to replace {{categoryName}} variable for the category name that you want delete.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
       id: Lime.Guid(),
       to: "postmaster@analytics.msging.net",
       method: Lime.CommandMethod.DELETE,
       uri: "/event-track/{{categoryName}}"
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "6",
  "to": "postmaster@analytics.msging.net",
  "method": "delete",
  "uri": "/event-track/{{categoryName}}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "6",
    "from": "postmaster@analytics.msging.net/#az-iris3",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://contact@msging.net/event-track/{{categoryName}}"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private readonly ISender _sender;

        public SampleMessageReceiver(ISender sender)
        {
            _sender = sender;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var command = new Command{
                Id = EnvelopeId.NewId(),
                Method = CommandMethod.Delete,
                Uri = new LimeUri("/event-track/{{categoryName}}")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);
        }
    }
}
```

