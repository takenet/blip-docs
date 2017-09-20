### Sending

It's possible send notifications and messages only after sessions has been stablished.

The following sample show how to send a message after connection has been stablished:

```javascript
client.connect()
    .then(function(session) {
      // After connection is possible send messages
      var msg = { type: "text/plain", content: "Hello, world", to: "553199990000@0mn.io" };
      client.sendMessage(msg);
    });
```

The following sample show how to send a notification after connection has been stablished:

```javascript
client.connect()
    .then(function(session) {
      // Sending "received" notification
      var notification = { id: "ef16284d-09b2-4d91-8220-74008f3a5788", to: "553199990000@0mn.io", event: Lime.NotificationEvent.RECEIVED };
      client.sendNotification(notification);
    });
```
