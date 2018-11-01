## Using SDK Javascript

If you are a Javascript developer and want to create a chatbot with **BLiP**, you must use the BLiP Javascript SDK. It was developed to help sending and receiving of BLiP messages using Javascript for browsers or [node.js](https://nodejs.org/) through persistent WebSocket connections.

Go to [Github](https://github.com/takenet/blip-sdk-js) to see the source code and the full documentation.

**Requirements**

* Node.js version 8.9.1 or above (download [here](https://nodejs.org/en/download/)).

**Before start**

Create a empty Node.js project

```
mkdir MyBot
cd MyBot
npm init
```

Install `blip-sdk` package (via npm) as a dependecy of your project in order to access the BLiP server.

```
npm install --save blip-sdk lime-transport-websocket
```

### 1. Starting the bot (js)

You will need an `identifier` and an `access key` to be able to connect to the BLiP. To get them:

![imagem](images/csharp1.png)

* Access the [BLiP Portal](https://portal.blip.ai).
* Click in **Create chatbot** button and choose **Create from scratch** mode.
* After your chatbot has been created click in **Configurations** and choose **Conection information** option in left side menu.
* Enable the SDK connection and get the `identifier` and `access key` informations.

> Create a `index.js` file add the code bellow and replace the variables IDENTIFIER and ACCESS_KEY with informations of your bot.

```javascript
import * as BlipSdk from 'blip-sdk';
import * as WebSocketTransport from 'lime-transport-websocket'

// Put your identifier and access key here
let IDENTIFIER = '';
let ACCESS_KEY = '';

// Create a client instance passing the identifier and accessKey of your chatbot 
let client = new BlipSdk.ClientBuilder()
    .withIdentifier(IDENTIFIER)
    .withAccessKey(ACCESS_KEY)
    .withTransportFactory(() => new WebSocketTransport())
    .build();

// Connect with server asynchronously
// Connection will occurr via websocket on 8081 port.
client.connect() // This method return a 'promise'.
    .then(function(session) { 
        // Connection success. Now is possible send and receive envelopes from server. */ 
        console.log('Application started. Press Ctrl + c to stop.')
    })  
    .catch(function(err) { /* Connection failed. */ }); 
```

* After setted connection informations run your project. The console should show the following messages:  

`Application started. Press Ctrl + c to stop.`

### 2. Receiving a message (js)

In order to receive and handle messages you need to use `addMessageReceiver` method in `client` object. 
All messages sent to the chatbot are redirected to defined **messages** (or **notifications**) receivers. You also can define filters to each receiver. 

> The following example show how to add a simple message receiver:

```javascript
client.addMessageReceiver(true, function(message) {
  // Process received message
});
```

> It's also possible use a custom function as receiver filter. The sample above shows a message receiver with filter of originator:

```javascript
client.addMessageReceiver(function(message) { message.from === "553199990000@0mn.io" }, function(message) {
  // Process received message
});
```

> Each registration of receivers return a handler that can be used to cancel the registration:

```javascript
var removeJsonReceiver = client.addMessageReceiver("application/json", handleJson);
// ...
removeJsonReceiver();
```


*Optional*

Optionally is also possible handle **notifications** adding a notification receiver. The proccess is very similar to receiving message.
The notifcations are fire-and-forget and if occur some exception on receiver, this fail will be ignored.

> The next sample show how to add notification receiver with filter to received event type:

```javascript
client.addNotificationReceiver("received", function(notification) {
  // Process received notifications
});
```

> Adding notification receiver with a filter using lambda expression

```javascript
// Using lambda expression
client.addNotificationReceiver(() => true, function(notification) {
  // Process received notifications
});
```

### 3. Sending a message (js)

In order to send messages and notifications use the `sendMessage` (or `sendNotification`) method  in `client` object. 

<aside class="notice">
It's possible send notifications and messages only after sessions has been stablished.
</aside>

> The following sample show how to send a message after connection has been stablished:

```javascript
client.connect()
    .then(function(session) {
        // After connection is possible send messages
        var msg = { 
            type: "text/plain", 
            content: "Hello, world", 
            to: "553199990000@0mn.io" 
        };
        client.sendMessage(msg);
    });
```

> The following sample show how to send a notification after connection has been stablished:

```javascript
client.connect()
    .then(function(session) {
        // Sending "received" notification
        var notification = { 
            id: "ef16284d-09b2-4d91-8220-74008f3a5788", 
            to: "553199990000@0mn.io", 
            event: Lime.NotificationEvent.RECEIVED 
        };
        client.sendNotification(notification);
    });
```

The process of send message is asynchronous and the status of sent messages is delivered to application by notifications.
If you need to send any other message content type [click here](#content-types)

### 4. Sending a command (js)

A **command** allows querying and manipulation of server resources and the consumption of **BLiP** extensions and integrations. To see more details about what are the commands [click here](#commands).

One of the most common extension is **[Event Analysis](#event-analysis)** that allows to register chatbot's events to create analytics reports in portal.

Let see some samples of how to send commands:

> Using `sendCommand` method

```javascript

let resource = { category: 'payments', action: 'success-order' };

client.sendCommand({
    id: Lime.Guid(),
    method: Lime.CommandMethod.SET,
    type: 'application/vnd.iris.eventTrack+json',
    uri: '/event-track',
    resource: resource
})
```

Go to [Extensions](#extensions) or [Integrations](#integrations) sections to see all commands available to be used.

