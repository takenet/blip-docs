### <a name="event-analysis" style="display:none">Event Analysis</a>

## Analytics

The **analytics** extension allows chatabot's metrics and event tracking in order to create analytics reports in the BLiP portal. The reports, metrics and graphs can be generated through the [portal](https://portal.blip.ai), in the *Panel* -> *Analytics* option.

To use any feature of **analytics** extension, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb.  |
| resource | The analytics document. |
| uris    | **/event-track**, **/reports**, **/metrics** or **/statistics**   |
| to     | **postmaster@analytics.msging.net** |

### Create a chart in a report

Add a [charts](/#chart) in a specific [report](/#report).

Replace `{reportId}` with the report id you want to add a chart into.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "a43aa4d2-566a-4be0-bc51-38d43597eb58",
  "to": "postmaster@analytics.msging.net",
  "method": "set",
  "uri": "/reports/{reportId}/charts",
  "type": "application/vnd.iris.chart+json",
  "resource": {
        "id": "14444-2995-492b-ab18-016ef01055e55",
        "name": "My Users Metrics",
        "chartType": "pie",
        "dimension": "users",
        "category": "activeUsers",
        "order": 1
   }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.chart+json",
    "resource": {
        "id": "14444-2995-492b-ab18-016ef01055e55",
        "name": "My Users Metrics",
        "chartType": "pie",
        "dimension": "users",
        "category": "activeUsers",
        "order": 1
    },
    "method": "set",
    "status": "success",
    "id": "a43aa4d2-566a-4be0-bc51-38d43597eb58",
    "from": "postmaster@analytics.msging.net/#az-iris1",
    "to": "demobot@msging.net"
}
```


```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "set",
    uri: "/reports/{reportId}/charts",
    type: "application/vnd.iris.chart+json",
    resource: {
        id: Lime.Guid(),
        name: "My Users Metrics",
        chartType: "pie",
        dimension: "users",
        category: "activeUsers",
        order: 1
   }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports/{reportId}/charts"),
    Type: "application/vnd.iris.chart+json",
    Resource = new Chart {
        Id = EnvelopeId.NewId(),
        Name = "My Users Metrics",
        ChartType = "pie",
        Dimension = "users",
        Category = "activeUsers",
        Order = 1
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Create an event

Imagine that your chatbot must track the number of payment orders realized and show this data on a real time report. To make this possible you can register every single *success order* as an **action** of the *payments* **category**, creating an [Event Track](/#eventtrack).

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

### Create a report

Create a new report.

You must send a [report](/#report) document, informing your data.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "tgawe1231-abab486",
  "to": "postmaster@analytics.msging.net",
  "method": "set",
  "uri": "/reports",
  "type": "application/vnd.iris.report+json",
  "resource": {
    "id": "d0b4f58a-664c-4c46-8d07-016ef5d5788ec",
    "name": "Testing",
    "isPrivate": true,
    "ownerUserIdentity": "jonh%40email.net@blip.ai"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.report+json",
    "resource": {
        "id": "d0b4f58a-664c-4c46-8d07-016ef5d5788ec",
        "name": "Testing 2",
        "isPrivate": false
    },
    "method": "set",
    "status": "success",
    "id": "5eb2c731-77e7-4506-bef0-7163c66810d5",
    "from": "postmaster@analytics.msging.net/#az-iris6",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "set",
    uri: "/reports"
    type: "application/vnd.iris.report+json",
    resource: {
        id: Lime.Guid(),
        name: "Testing",
        isPrivate: true,
        ownerIdentity: "jonh%40email.net@blip.ai"
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports"),
    Type: "application/vnd.iris.report+json",
    Resource = new Report{
        Id: EnvelopeId.NewId(),
        Name = "Testing",
        IsPrivate = true,
        OwnerIdentity: "jonh%40email.net@blip.ai"
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
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

It is possible to associate a specific contact in an event. You can use this to ignore events of a tester user for example.
If your bot has a `123456@messenger.gw.msging.net` contact identity as a tester user, you can ignore all of its tracked events by adding this identity to the event resource object.

### Delete a chart

Delete a specific [chart](/#chart) from a specific [report](/#report).

Replace `{reportId}` with the report id you want to delete the chart from.
Replace `{chartId}` with the chart id you want to delete.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "50da3293-371b-4ab8-b264-6812aa40895d",
  "to": "postmaster@analytics.msging.net",
  "method": "delete",
  "uri": "/reports/{reportId}/charts/{chartId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "50da3293-371b-4ab8-b264-6812aa40895d",
    "from": "postmaster@analytics.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "delete",
    uri: "/reports/{reportId}/charts/{chartId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports/{reportId}/charts/{chartId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Delete a report

If you need to delete a specific [report](/#report) use the following command.

Remember to replace `{reportId}` with the report id you want delete.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "25aad309-5336-4a1c-be26-4b69bfeef554",
  "to": "postmaster@analytics.msging.net",
  "method": "delete",
  "uri": "/reports/{reportId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "25aad309-5336-4a1c-be26-4b69bfeef554",
    "from": "postmaster@analytics.msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "delete",
    uri: "/reports/{reportId}"
})
```


```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports/{reportId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Delete an event category

If you need to delete a specific event category use the following command.
Remember to replace {categoryName} variable for the category name that you want delete.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
       id: Lime.Guid(),
       to: "postmaster@analytics.msging.net",
       method: Lime.CommandMethod.DELETE,
       uri: "/event-track/{categoryName}"
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
  "uri": "/event-track/{categoryName}"
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
        "#command.uri": "lime://contact@msging.net/event-track/{categoryName}"
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
                Uri = new LimeUri("/event-track/{categoryName}")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);
        }
    }
}
```

### Get active messages

Get the [metrics](/#metricindicators) of active messages by an interval.

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "320c2b30-aaf3-4549-85fa-bddb3389022f",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/metrics/active-messages/{interval}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.analytics.metric-indicators+json",
        "items": [
            {
                "intervalStart": "2019-11-05T03:00:00.000Z",
                "intervalEnd": "2019-12-05T03:00:00.000Z",
                "count": 7
            },
            {
                "intervalStart": "2019-12-05T03:00:00.000Z",
                "intervalEnd": "2019-12-10T03:00:00.000Z",
                "count": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "541a4c6a-77c5-4928-a0e3-af79cfc77ad3",
    "from": "postmaster@analytics.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/metrics/active-messages/{interval}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/metrics/active-messages/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

<aside clas="notice">
<i>Example: If you want to get a <b>Daily</b> metric, starting from december 12 to december 14:</i>

<br><br>
<code>/metrics/active-messages/D?startDate=2019-12-12T03%3A00%3A00.000Z&endDate=2019-12-14T03%3A00%3A00.000Z</code>
</aside>

### Get all reports

Get a collection of [reports](/#report).

| QueryString     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **$skip** |The number of elements to be skipped.                                |    0    |
| **$take** | Limit of total of items to be returned.                               |   100   |
| **$ascending** | Sets ascending alphabetical order.                                |    true    |

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "aba9899-a4as4d5asd4-aaabb",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/reports"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.report+json",
        "items": [
            {
                "id": "77ce265f-e7f2-4fb0-9b9c-016e7f6682b0",
                "isPrivate": true,
                "modifiedAt": 1574095454859,
                "ownerUserIdentity": "john%40email.net@blip.ai"
            },
            {
                "id": "b6db6c73-f1ad-4891-b100-016d681e8257",
                "name": "Testing",
                "isPrivate": false,
                "modifiedAt": 1574078756205,
                "ownerUserIdentity": "john%40email.net@blip.ai"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "9f6bfb32-d89d-4093-8f42-32934fc30273",
    "from": "postmaster@analytics.msging.net/#az-iris5",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/reports"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a report

Get a specific [report](/#report) by id.

Replace `{reportId}` with the report id you want to get.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "ty8a9b4a-q98b1a5s-a9s0",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/reports/{reportId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.report+json",
    "resource": {
        "id": "7644-4f75-8ff7-016efc0",
        "name": "Testing",
        "isPrivate": false
    },
    "method": "get",
    "status": "success",
    "id": "e9f2c31e-caaa-4e9b-a498-02d7980b8dc3",
    "from": "postmaster@analytics.msging.net/#az-iris5",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/reports/{reportId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports/{reportId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get active users

Get the [metrics](/#metricindicators) of active users by an interval.

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "880e6454-65e0-44ad-b2f4-7a4f3a5149c5",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/metrics/active-identity/{interval}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 5,
        "itemType": "application/vnd.iris.analytics.metric-indicators+json",
        "items": [
            {
                "intervalStart": "2019-12-05T03:00:00.000Z",
                "intervalEnd": "2019-12-06T03:00:00.000Z",
                "count": 1
            },
            {
                "intervalStart": "2019-12-06T03:00:00.000Z",
                "intervalEnd": "2019-12-07T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-07T03:00:00.000Z",
                "intervalEnd": "2019-12-08T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-08T03:00:00.000Z",
                "intervalEnd": "2019-12-09T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-09T03:00:00.000Z",
                "intervalEnd": "2019-12-10T03:00:00.000Z",
                "count": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "f792891e-2b1e-4caf-9649-9256c900ac65",
    "from": "postmaster@analytics.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/metrics/active-identity/{interval}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/metrics/active-identity/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

<aside clas="notice">
<i>Example: If you want to get a <b>Daily</b> metric, starting from december 12 to december 14:</i>

<br><br>
<code>/metrics/active-identity/D?startDate=2019-12-12T03%3A00%3A00.000Z&endDate=2019-12-14T03%3A00%3A00.000Z</code>
</aside>

### Get categories

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

| QueryString     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **$skip** |The number of elements to be skipped.                                |    0    |
| **$take** | Limit of total of items to be returned.                               |   100   |

### Get charts in a report

Get a collection of [charts](/#chart) in a [report](/#report).

Replace `{reportId}` with the report id you want to get the charts in.

| QueryString     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **$skip** |The number of elements to be skipped.                                |    0    |
| **$take** | Limit of total of items to be returned.                               |   100   |
| **$ascending** | Sets ascending alphabetical order.                                |    true    |

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "751a2c4b9a-5as68as8-b4a8w9q",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/reports/{reportId}/charts"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.chart+json",
        "items": [
            {
                "id": "39465840-2995-492b-ab18-016ef5fd5e55",
                "name": "My Users Metrics",
                "chartType": "list",
                "dimension": "users",
                "category": "activeUsers",
                "order": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "from": "postmaster@analytics.msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/reports/{reportId}/charts"
})
```


```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports/{reportId}/charts")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get counters

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

### Get details

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

### Get engaged users

Get the [metrics](/#metricindicators) of engaged users by an interval.

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "880e6454-65e0-44ad-b2f4-7a4f3a5149c5",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/metrics/engaged-identity/{interval}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 5,
        "itemType": "application/vnd.iris.analytics.metric-indicators+json",
        "items": [
            {
                "intervalStart": "2019-12-05T03:00:00.000Z",
                "intervalEnd": "2019-12-06T03:00:00.000Z",
                "count": 1
            },
            {
                "intervalStart": "2019-12-06T03:00:00.000Z",
                "intervalEnd": "2019-12-07T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-07T03:00:00.000Z",
                "intervalEnd": "2019-12-08T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-08T03:00:00.000Z",
                "intervalEnd": "2019-12-09T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-09T03:00:00.000Z",
                "intervalEnd": "2019-12-10T03:00:00.000Z",
                "count": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "f792891e-2b1e-4caf-9649-9256c900ac65",
    "from": "postmaster@analytics.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/metrics/engaged-identity/{interval}"
})
```


```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/metrics/engaged-identity/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

<aside clas="notice">
<i>Example: If you want to get a <b>Daily</b> metric, starting from december 12 to december 14:</i>

<br><br>
<code>/metrics/engaged-identity/D?startDate=2019-12-12T03%3A00%3A00.000Z&endDate=2019-12-14T03%3A00%3A00.000Z</code>
</aside>

### Get received messages

Get the [metrics](/#metricindicators) of received messages by an interval.

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "320c2b30-aaf3-4549-85fa-bddb3389022f",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/metrics/received-messages/{interval}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.analytics.metric-indicators+json",
        "items": [
            {
                "intervalStart": "2019-11-05T03:00:00.000Z",
                "intervalEnd": "2019-12-05T03:00:00.000Z",
                "count": 16
            },
            {
                "intervalStart": "2019-12-05T03:00:00.000Z",
                "intervalEnd": "2019-12-10T03:00:00.000Z",
                "count": 2
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "621ffd0b-6dfd-4bb2-a01d-d1f4021e9702",
    "from": "postmaster@analytics.msging.net/#az-iris4",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/metrics/received-messages/{interval}"
})
```


```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/metrics/received-messages/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

<aside clas="notice">
<i>Example: If you want to get a <b>Monthly</b> metric, starting from november 05 to december 09:</i>

<br><br>
<code>/metrics/received-messages/M?startDate=2019-11-05T03%3A00%3A00.000Z&endDate=2019-12-09T03%3A00%3A00.000Z</code>
</aside>

### Get sent messages

Get the [metrics](/#metricindicators) of sent messages by an interval.

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "320c2b30-aaf3-4549-85fa-bddb3389022f",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/metrics/sent-messages/{interval}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 5,
        "itemType": "application/vnd.iris.analytics.metric-indicators+json",
        "items": [
            {
                "intervalStart": "2019-12-05T03:00:00.000Z",
                "intervalEnd": "2019-12-06T03:00:00.000Z",
                "count": 2
            },
            {
                "intervalStart": "2019-12-06T03:00:00.000Z",
                "intervalEnd": "2019-12-07T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-07T03:00:00.000Z",
                "intervalEnd": "2019-12-08T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-08T03:00:00.000Z",
                "intervalEnd": "2019-12-09T03:00:00.000Z",
                "count": 0
            },
            {
                "intervalStart": "2019-12-09T03:00:00.000Z",
                "intervalEnd": "2019-12-10T03:00:00.000Z",
                "count": 0
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "320c2b30-aaf3-4549-85fa-bddb3389022f",
    "from": "postmaster@analytics.msging.net/#az-iris7",
    "to": "demobot@msging.net",
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "get",
    uri: "/metrics/sent-messages/{interval}"
})
```


```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/metrics/sent-messages/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

<aside clas="notice">
<i>Example: If you want to get a <b>Daily</b> metric, starting from december 12 to december 14:</i>

<br><br>
<code>/metrics/sent-messages/D?startDate=2019-12-12T03%3A00%3A00.000Z&endDate=2019-12-14T03%3A00%3A00.000Z</code>
</aside>

### Update a chart in a report

You can update a specific [chart](/#chart) in a [report](/#report).

Replace `{reportId}` with the report id you want to update the chart into.
Replace `{chartId}` with the chart id you want to update.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "a43aa4d2-566a-4be0-bc51-38d43597eb58",
  "to": "postmaster@analytics.msging.net",
  "method": "set",
  "uri": "/reports/{reportId}/charts/{chartId}",
  "type": "application/vnd.iris.chart+json",
  "resource": {
        "id": "{chartId}",
        "name": "My Users Metrics",
        "chartType": "list",
        "dimension": "users",
        "category": "activeUsers",
        "order": 1
   }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "d5b1c796-38cc-48ed-80e2-af261c31046d",
    "from": "postmaster@analytics.msging.net/#az-iris1",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@analytics.msging.net",
    method: "set",
    uri: "/reports/{reportId}/charts/{chartId}",
    type: "application/vnd.iris.chart+json",
    resource: {
        id: "{chartId}",
        name: "My Users Metrics",
        chartType: "pie",
        dimension: "users",
        category: "activeUsers",
        order: 1
   }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postmaster@analytics.msging.net",
    Uri = new LimeUri("/reports/{reportId}/charts/{chartId}"),
    Type: "application/vnd.iris.chart+json",
    Resource = new Chart {
        Id = "{chartId}",
        Name = "My Users Metrics",
        ChartType = "pie",
        Dimension = "users",
        Category = "activeUsers",
        Order = 1
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```