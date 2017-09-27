<blockquote class="lang-specific http">
<p>Imagine that exist a chatbot with Authorization 'Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ='. To send a message from this bot to a BLiP user use:</p>
</blockquote>

```http
Note: For this sample bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ is a valid Key.

POST https://msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Length: 131

{
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "to": "551100001111@0mn.io",
    "type": "text/plain",
    "content": "Hello, how can I help you?"
}
```

<blockquote class="lang-specific csharp">
<p>With `C#` the authentication of your chatbot is made on application.json file. Basically this file define all receivers and others control properties. check example on C# tab</p>
<p>Check a example of how to set your application.json file:</p>
</blockquote>

```csharp

{
  "identifier": "xpto",
  "accessKey": "cXkzT1Rp",
  "messageReceivers": [
    {
      "type": "PlainTextMessageReceiver",
      "mediaType": "text/plain"
    }
  ]
}
```
<blockquote class="lang-specific javascript">
<p>In order to instantiating the client use ClientBuilder class informing the identifier and access key:</p>
</blockquote>

```javascript

// Create a client instance passing the identifier and accessKey of your chatbot 
var client = new ClientBuilder()
    .withIdentifier(identifier)
    .withAccessKey(accessKey)
    .withTransportFactory(() => new WebSocketTransport())
    .build();

// Register a receiver for messages of 'text/plain' type
client.addMessageReceiver('text/plain', function(message) {
  // TODO: Proccess the received message
});

// Register a receiver to any notification
client.addNotificationReceiver(true, function(notification) {
  // TODO: Proccess the received notification
});

// Connect with server asynchronously
// Connection will occurr via websocket on 8081 port.
client.connect() // This method return a 'promise'.
    .then(function(session) { 
        // Connection success. Now is possible send and receive envelopes from server. */ 
        })  
    .catch(function(err) { /* Connection failed. */ }); 

```

 In order to authenticate your chatbot you need to follow this steps for each platform:

 On `Webhook` whatever request(messages/notifications/commands) must contain a authorization header (Authorization) with Key type, as showed on chatbot settings.

 On both `C# and Javascript` you will need to check credentials inside configurations menu and find your identifier and access key. Then you need to put they in a specific place.

 See `examples` at code sidebar

<!-- ## C\# 

The C# SDK makes easier to build chatbots with BLiP platform. It is based on [.NET Core](https://dot.net/core), which allows the creation of multiplatform chatbots.

You can check the SDK source code in [Github](https://github.com/takenet/blip-sdk-csharp/).

## Javascript

If you are a Javascript developer and want create a chatbot with **BLiP** so you must use the BLiP SDK Javascript. It was developed to make easy to send and receive BLiP messages using Javascript for browsers or [node.js](https://nodejs.org/) through of persistent WebSocket connections.

Go to [Github](https://github.com/takenet/messaginghub-client-js) to see the source code. -->

