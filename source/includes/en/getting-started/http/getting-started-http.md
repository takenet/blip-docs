## Using HTTP

**Webhook** enables an integration between your bot and BLiP via **HTTP endpoints** to exchange messages, notifications and commands.
If you are not able to create your chatbot using C\# or Javascript languages you must use BLiP's HTTP API agnostic for any language.

The diagram below shows the messages flow between BLiP and your endpoint (API).

<!--![Diagram HTTP message flow](images/http.png)-->

**Requirements**

* You **must have some available and public enpoint** in order to receive any BLiP's request. Is necessary at least one endpoint to receive messages and notifications but you can choice different endpoint for each one.
Please use [RequestBin](https://requestbin.fullcontact.com/) or [Ngrok](https://ngrok.com/) tools if you want just test the integration.

**Before start**

<aside class="notice">
From <b>April 2020</b>, the BLiP HTTP endpoint will change from <b>https://msging.net</b> to <b>https://http.msging.net</b>. <br><br>We strongly advise users to start using the new endpoint as soon as possible.
</aside>

Get the `Authorization` token of your bot to be able to connect to the BLiP. To get them:

![imagem](images/http-token.png)

* Access the [BLiP Portal](https://portal.blip.ai).
* Click in **Create chatbot** button and choose **Create from scratch** mode. *If you already have your bot created just access them*.
* After your chatbot has been created click in **Configurations** and choose **Conection information** option in left side menu.
* Go to **Enpoints HTTP** and get the `Authorization` token.
* Enable the HTTP connection and set the `message` and `notification` **URLs** as discussed before on **Requirements** section.

### 1. Receiving messages

Any message will be delivered as a `HTTP POST` request on the configured chatbot's message URL. These messages have a JSON format as defined on [Content Types](#content-types) section. A sample of a received text message is presented below.

```
{
  "id": "99cf454e-f25d-4ebd-831f-e48a1c612cd4",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net",
  "type": "text/plain",
  "content": "Help"
}
```

### 2. Sending messages

To send messages, it is necessary to make a `HTTP POST` request to BLiP using the URL `https://http.msging.net/messages`.
The request must contain an authorization header (`Authorization`) with `Key` type, as showed on chatbot settings. To know more about BLiP authentication process [click here](#authentication).

The message data must be sent on the request `body` as a *JSON* following the LIME protocol format.
For more details go to [Content Types](#content-types) section.

Imagine a chatbot with an Authorization token `Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=`. To send a message from this bot to a BLiP user, use:

```
POST https://http.msging.net/messages HTTP/1.1
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

For more information about messages, check the [**Messages** documentation page](.#/docs/concepts/messages) or the [supported content types specification](.#/docs/content-types).

### 3. Receiving notification

All notifications will be delivered on the configured chatbot's notification URL. Each notification contains the _status_ of messages. Observe that notifications are sent by *clients*, informing if received or not some message.

A sample of notification is presented below. This notification will be deliverd as a `HTTP POST` request on the chatbot notification URL.

```
{
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net/7a8fr233x",
  "event": "received"
}
```

For more information, check the [**Notification** documentation page](.#/docs/concepts/notifications)

### 4. Sending notifications

In order to correctly show the message history, it is important that the chatbots send notifications of messages processed to originator clients.

For each message processed, it is important to send a notification with the `consumed` event. In case of problems, the chatbot must send a notification with the `failed` event. The request must use the URL `https://http.msging.net/notifications` and contain an authorization header (`Authorization`) with `Key` type, as showed on chatbot settings.

For instance, imagine that the received message from the example above (whit id **99cf454e-f25d-4ebd-831f-e48a1c612cd4**) was processed with success. The code below shows a complete notification request including the headers and the body request.

```
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

### 5. Sending commands

In order to use BLiP's [extensions](#extensions) (like schedule and directory), it is necessary to send commands. To do that, a `HTTP POST` request on `/commands` URL must be made.

For instance, send a command to schedule some message:

```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "1",
  "to": "postmaster@scheduler.msging.net",
  "method": "set",
  "uri": "/schedules",
  "type": "application/vnd.iris.schedule+json",
  "resource": {  
    "message": {  
      "id": "ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
      "to": "destination@0mn.io",
      "type": "text/plain",
      "content": "Scheduling test."
    },
    "when": "2016-07-25T17:50:00.000Z",
    "name": "New Schedule"
  }
}
```

The command response is immediately delivered on HTTP response, as below:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "set",
  "status": "success",
  "id": "1",
  "from": "postmaster@scheduler.msging.net/#az-iris4",
  "to": "destination@0mn.io",
  "metadata": {
    "#command.uri": "lime://destination@0mn.io/schedules"
  }
}
```

### Aditional informations

* Result codes for requests

| Code                | Description                                                                               |
|---------------------|-----------------------------------------------------------------------------------------  |
| 202 (Accepted)      | Envelope was accepted by the server                                                       |
| 400 (Bad Request)   | Alert to some problem with format or fields of sent envelope.                             |
| 401 (Unauthorized)  | Alert to some problem or *Authorization* header missing                                   |

* Required Settings

| Name                          | Description                                                                   |
|-------------------------------|-------------------------------------------------------------------------------|
| Url to receive messages       | Endpoint where BLiP will post the messages                                    |
| Url to receive notification   | Endpoint where BLiP will post the notifications                               |


