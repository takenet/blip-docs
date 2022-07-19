# Authentication

If you need to build your chatbot using one of the SDKs or using HTTP or if you need to access any Blip internal API (for extensions and integrations) **you must to be authenticated**. This section explain how to authenticate your chatbot in order to use Blip.

### SDKs

On both `C# and Javascript`, you will need an `identifier` and an `access key` to be able to connect to the Blip. To get them:

![imagem](images/csharp1.png)

* Access the [Blip Portal](https://portal.blip.ai).
* Click in **Create chatbot** button and choose **Create from scratch** mode. *If you already have your bot created just access them*.
* After your chatbot has been created click in **Configurations** and choose **Conection information** option in left side menu.
* Enable the SDK connection and get the `identifier` and `access key` informations.

### HTTP

On `HTTP`, whatever request made (messages/notifications/commands) must contain an authorization header (`Authorization`) with a Key type, as showed on [Blip Portal](https://portal.blip.ai/#/application) chatbot configurations.

![imagem](images/http-token.png)

### Auth Samples

<aside class="notice">
Use the code sidebar at right to see samples for C#, Javascript and HTTP.
</aside>

<blockquote class="lang-specific http">
<p>Imagine a chatbot with an Authorization 'Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ='. To send a message from this bot to a Blip user, use:</p>
</blockquote>

```http
Note: For this sample, bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ is a valid Key.

POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
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
<p>With <b>C#</b>, the authentication of your chatbot is made on <i>application.json</i> file. Basically, this file defines all receivers and other control properties.</p>
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