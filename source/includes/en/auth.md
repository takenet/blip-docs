<blockquote class="lang-specific http">
<p>Imagine a chatbot with an Authorization 'Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ='. To send a message from this bot to a BLiP user, use:</p>
</blockquote>

```http
Note: For this sample, bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ is a valid Key.

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
<p>With `C#`, the authentication of your chatbot is made on application.json file. Basically, this file defines all receivers and other control properties.</p>
</blockquote>

```csharp
//Check an example of how to set your application.json file:
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
<p>In order to instantiate the client, use ClientBuilder class informing the identifier and access key:</p>
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

 In order to authenticate your chatbot, you need to follow these steps:

 On `Webhook`, whatever request made (messages/notifications/commands) must contain an authorization header (Authorization) with a Key type, as showed on [BLiP Portal](https://portal.blip.ai/#/application) chatbot configurations.

 On both `C# and Javascript`, you will need to check credentials on [BLiP Portal](https://portal.blip.ai/#/application), inside chatbot configuration menu, and find your identifier and access key. Then, you need to insert them in a specific place.

 See the `examples` at code sidebar.
