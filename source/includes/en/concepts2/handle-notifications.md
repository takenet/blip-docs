### Sending notifications

<blockquote class="lang-specific javascript">
<p>We send a notification using a client object with method <em>sendNotification</em></p>
</blockquote>

```javascript
client.connect()
    .then((session) => {
        // Sending "received" notification
        var notification = {
            id: 'ef16284d-09b2-4d91-8220-74008f3a5788',
            to: '553199990000@0mn.io',
            event: Lime.NotificationEvent.RECEIVED
        };
        client.sendNotification(notification);
    });

// Using await keyword
let session = await client.connect();
let notification = {
    id: 'ef16284d-09b2-4d91-8220-74008f3a5788',
    to: '553199990000@0mn.io',
    event: Lime.NotificationEvent.RECEIVED
};

client.sendNotification(notification);
```

<blockquote class="lang-specific python">
<p>We send a notification using a client object with method <em>send_notification</em></p>
</blockquote>

```python
await client.connect_async()
    
# Sending "received" notification
var notification = Notification.from_json(
    {
        'id': 'ef16284d-09b2-4d91-8220-74008f3a5788',
        'to': '553199990000@0mn.io',
        'event': lime_python.NotificationEvent.RECEIVED
    }
)
client.send_notification(notification)
```

```csharp
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
         var notification = new Notification
            {
                Id = message.Id,
                To = message.From,
                Event = Event.Consumed
            };

        await _sender.SendNotificationAsync(notification, cancellationToken);
    }
}
```

<blockquote class="lang-specific http">
<p>For instance, imagine that the received a message from example above (whit id 99cf454e-f25d-4ebd-831f-e48a1c612cd4</p>
</blockquote>

```http
POST https://http.msging.net/notifications HTTP/1.1
Content-Type: application/json
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Length: 131

{
    "id": "99cf454e-f25d-4ebd-831f-e48a1c612cd4",
    "from": "551100001111@0mn.io/4ac58r6e3",
    "event": "consumed"
}
```

In order to correctly show the message history, it is important that the chatbots send notifications of messages processed to originator clients.

For each message processed, a notification must be sent with the consumed event. In case of problems, the chatbot must send a notification with the failed event. 

REQUEST

| Name   | Description                                                            |
|--------|------------------------------------------------------------------------|
| id     | Identifier of the related message                                      |
| from   | Notification originator’s address                                      |
| to     | Notification recipient’s address                                       |
| event  | Event related to the message                                           |
| reason | In case of failed events, represents the reason of the message failure |


### Receiving notifications

<blockquote class="lang-specific javascript">
<p>The next sample shows how to add a notification receiver with filter to the `received` event type:</p>
</blockquote>

```javascript
client.addNotificationReceiver("received", function(notification) {
  // Process received notifications
});

// Using expression lambda
client.addNotificationReceiver(() => true, function(message) {
  // Process received notifications
});
```

<blockquote class="lang-specific python">
<p>The next sample shows how to add a notification receiver with filter to the `received` event type:</p>
</blockquote>

```python
def notification_processor(notification: Notification) -> None:
    # Process received notifications
    pass

client.add_notification_receiver(Receiver(lambda n: n.event == 'received', notification_processor))
```

<blockquote class="lang-specific csharp">
<p>The receipt of notifications is done using the interface INotificationReceiver.</p>
</blockquote>

```csharp
public class ConsumedNotificationReceiver : INotificationReceiver
{
    public async Task ReceiveAsync(Notification notification, CancellationToken cancellationToken)
    {
        // Write the received notification to the console
        Console.WriteLine(notification.ToString());
    }
}
```

<blockquote class="lang-specific http">
<p>All notifications will be delivered as a HTTP POST request on the configured URL for chatbot notifications.</p>
</blockquote>

```http
POST https://your.endpoint/notifications HTTP/1.1
Content-Type: application/json

{
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net/7a8fr233x",
  "event": "received"
}
```
Each notification contains the status of messages. Observe that the notifications are sent by the clients, informing if they received some message or not.
