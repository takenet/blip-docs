## Using HTTP

You can integrate your bot and Blip via **HTTP endpoints** to exchange messages, notifications and commands.
If you are not able to create your chatbot using C\# or Javascript languages, you must use Blip's HTTP API agnostic for any language.

The diagram below shows the messages flow between Blip and your endpoint (API).

<!--![Diagram HTTP message flow](images/http.png)-->

**Requirements**

* You **must have an available and public HTTPS endpoint** in order to receive any Blip's request. You must set at least one endpoint to receive messages and/or notifications but you can choose a different endpoint for each one.
You can use [RequestBin](https://requestbin.fullcontact.com/) or [Ngrok](https://ngrok.com/) tools in order to test the integration.

**Before starting**

Get the `Authorization` token of your bot to be able to connect to the Blip. To get them:

![imagem](images/http-token.png)

* Access the [Blip Portal](https://portal.blip.ai).
* Click on the **Create chatbot** button and choose **Create from scratch** mode. *If you already have your bot created, skip this step*.
* On the chatbot screen, click in **Configurations** (gearwheel icon) and choose **Conection information** option in left side menu.
* Go to **HTTP Endpoints** and get the `Authorization` token.
* Enable the HTTP connection and set the `message` and `notification` **URLs** as discussed before on the **Requirements** section.
 
Optionally you can enable OAuth 2.0 authentication on the `message` and `notification` **URLs**; That way, when calling the provided URLs, Blip will use OAuth authentication.
In order to enable it, open the **OAuth 2.0** section and fill the provided fields.
Note that only authentication through the [Client Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) is supported.

You can also instruct Blip to send custom headers when sending requests to the `message` and `notification` **URLs**.
To do that, click on the **Add header** button under the **Custom Headers** section and set the `key` and `value` fields with the header name and value respectively.

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

To send messages, it is necessary to make a `HTTP POST` request to Blip using the URL `https://http.msging.net/messages`.
The request must contain an authorization header (`Authorization`) with `Key` type, as showed on chatbot settings. To know more about Blip authentication process [click here](#authentication).

The message data must be sent on the request `body` as a *JSON* following the LIME protocol format.
For more details go to [Content Types](#content-types) section.

For instance, given a chatbot with an Authorization token `Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=`, you would send a message from this bot to a Blip user like this:

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

In order to use Blip's [extensions](#extensions) (like schedule and directory), it is necessary to send commands. To do that, a `HTTP POST` request on `/commands` URL must be made.

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
The timeout for the server to deliver the command response to your request is 60 seconds.

### Aditional informations

* Result codes for requests

| Code                  | Description                                                   |
|-----------------------|---------------------------------------------------------------|
| 202 (Accepted)        | Envelope was accepted by the server                           |
| 400 (Bad Request)     | Alert to some problem with format or fields of sent envelope. |
| 401 (Unauthorized)    | Alert to some problem or *Authorization* header missing       |
| 504 (Gateway Timeout) | The server was unable to return a response within 60 seconds. |

* Required Settings

| Name                        | Description                                     |
|-----------------------------|-------------------------------------------------|
| Url to receive messages     | Endpoint where Blip will post the messages      |
| Url to receive notification | Endpoint where Blip will post the notifications |


