### Instantiating the client

You will need an `identifier` and a `access key` to connect a chatbot to **Blip**. To get thems:
- Go to [Painel Blip](http://portal.blip.ai/) and login.
- Click in `Chatbots` and then click in `Create chatbot`.
- Choose `SDK` template option
- Ok, `identifier` and `access key` will be displayed

In order to instantiating the client use `ClientBuilder` class informing the `identifier` and `access key`:

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

Each `client` instance represent a server connection and can be reused. To close a connection use:

```javascript

client.close()
    .then(function() { /* Disconnection success */ })
    .catch(function(err) { /* Disconnection failed */ });

```
