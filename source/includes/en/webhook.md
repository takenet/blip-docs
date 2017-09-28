# Webhook

**Webhook's** *chatbot* enable an integration via **HTTP endpoints** to exchange messages, notifications and commands.

**Send messages**

To send messages is necessary make a `HTTP POST` request to URL provided on portal (chatbot settings section). The request must contain a authorization header (`Authorization`) with `Key` type, as showed on chatbot settings.

The message data must be send on request `body`. The message must be a *JSON* on LIME protocol format. For more details go to [protocol documentation](http://limeprotocol.org/#message).

Example

Imagine that exist a chatbot with **blipmessaginghubapp** identifier. To send a message from this bot to a BLiP user use:

```
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

Note: For this sample `bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ` is a valid `Key` for **blipmessaginghubapp** chatbot.

For more information about messages, check the [**Messages** documentation page](.#/docs/concepts/messages) or the [supported content types specification](.#/docs/content-types).

2. Receiving notification

All notifications will be delivered on configured chatbot notification URL. Each notification contains the _status_ of messages. Observe that the notifications are sent by the *clients*, informing if received or not some message.

A sample of notification is presented bellow. This notification will be deliverd as a `HTTP POST` request on the chatbot notification URL.

```
{
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net/7a8fr233x",
  "event": "received"
}
```

For more information, check the [**Notification** documentation page](.#/docs/concepts/notifications)



3. Receiving messages

As the notifications, all messages will be delivered as a `HTTP POST` request on configured chatbot messages URL. The messages have a JSON format as defined on [LIME PROTOCOL](http://limeprotocol.org/#message). A sample of received message is presented bellow.

```
{
  "id": "99cf454e-f25d-4ebd-831f-e48a1c612cd4",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "to": "blipmessaginghubapp@msging.net",
  "type": "text/plain",
  "content": "Help"
}
```

4. Sending notifications

In order to correctly show the message history is important that the chatbots send notifications of messages processed to originator clients.

For each message processed is important send a notification with the `consumed` event. In case of problems the chatbot must send a notification with the `failed` event. The request must contain a authorization header (`Authorization`) with `Key` type, as showed on chatbot settings.

For instance, imagine that the received message from example above (whit id **99cf454e-f25d-4ebd-831f-e48a1c612cd4**) was processed with success. The code bellow show a complete notification request including the headers and the body request.
```
POST https://msging.net/notifications HTTP/1.1
Content-Type: application/json
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Length: 131

{
  "id": "99cf454e-f25d-4ebd-831f-e48a1c612cd4",
  "from": "551100001111@0mn.io/4ac58r6e3",
  "event": "consumed"
}
```


5. Sending commands

In order to use the BLiP's [extensions]() (like schedule and directory) is necessary send commands. To do this is necessary make a `HTTP POST` request on `/commands` URL:

For instance, send a command to schedule some message:

```
POST https://msging.net/commands HTTP/1.1
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Type: application/json
Content-Length: 393

{  
  "id":"2",
  "to":"postmaster@scheduler.msging.net",
  "method":"set",
  "uri":"/schedules",
  "type":"application/vnd.iris.schedule+json",
  "resource":{  
    "message":{  
      "id":"ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
      "to":"553100001111@0mn.io",
      "type":"text/plain",
      "content":"Scheduled Message"
    },
    "when":"2016-07-25T17:50:00.000Z"
  }
}
```

The command response is immediately delivered on HTTP response, as bellow:

```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Date: Mon, 12 Sep 2016 17:35:02 GMT
Content-Length: 131

{  
  "id":"2",
  "from":"postmaster@scheduler.msging.net/#irismsging1",
  "to":"blipmessaginghubapp@msging.net",
  "method":"set",
  "status":"success"
}

```

* Result codes for requests

| Code                | Description                                                                               |
|---------------------|-----------------------------------------------------------------------------------------  |
| 202 (Accepted)      | Envelope was accepted by the server                                                       |
| 400 (Bad Request)   | Alert to some problem with format or fields of sent envelope.                             |
| 401 (Unauthorized)  | Alert to some problem or *Authorization* header missing                                   |

---

* Required Settings

| Name                          | Description                                                                   |
|-------------------------------|-------------------------------------------------------------------------------|
| Url to receive messages       | Endpoint where BLiP will post the messages                                    |
| Url to receive notification   | Endpoint where BLiP will post the notifications                               |
