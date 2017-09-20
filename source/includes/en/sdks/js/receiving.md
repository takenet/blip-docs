### Receiving

All messages sent to the chatbot are redirected to registered `receivers` of messages and notifications. You also can define filters to each `receiver`.
The following example show how to add a simple message receiver:

```javascript
client.addMessageReceiver(true, function(message) {
  // Process received message
});

```
The next sample show how to add notification receiver with filter to `received` event type:

```javascript
client.addNotificationReceiver("received", function(notification) {
  // Process received notifications
});

```

It's also possible use a custom function as receiver filter:

Example of message receiver with filter of originator:

```javascript
client.addMessageReceiver(function(message) { message.from === "553199990000@0mn.io" }, function(message) {
  // Process received message
});

// Using expression lambda
client.addNotificationReceiver(() => true, function(message) {
  // Process received notifications
});

```

Each registration of receivers return a `handler` that can be used to cancell the registration:

```javascript
var removeJsonReceiver = client.addMessageReceiver("application/json", handleJson);
// ...
removeJsonReceiver();
```

