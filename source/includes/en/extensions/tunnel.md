## Tunnel

The **tunnel** extension allows routing and exchange of messages and notifications between different chatbots of the Blip platform. In this way, a **sender** bot can forward received messages to a **receiver** bot in a transparent way, and the mechanism of reception for this is exactly the same as the messages coming from external channels (Messenger, Telegram, SMS , Blip Chat, etc.). Therefore, the receiver bot **does not need to be specifically implemented** to receive forwarded messages, and the notifications and response messages generated by the receivers are automatically forwarded to the sender.

This feature is useful for **isolating different parts of navigation in independent bots** with only one published on the channel. For example, imagine that you want to have a chatbot on a Facebook page that has an automatic navigation (static answers), part questions and answers and part attendance made by an human operator. You would then need a bot **main** (SDK / Webhook) that will act as a *switcher* and three **sub-bots** - the first of the SDK/Webhook template, the second FAQ and the last human operator. These last three **would not be published directly on the channel**, but would only receive messages from the main bot, this one - published on Facebook and other channels. The main bot would be the **sender** and the other **receivers** of the tunnel.

*Note: The Blip portal offers the [**master** template](https://portal.blip.ai) that uses the tunnel extension and acts as a switcher for the sub-bots, so the implementation is not necessary in most cases.*

To create a tunnel between two *chatbots*, the **sender** needs to send a message to a address using the following convention:

```
[receiver-identifier]@tunnel.msging.net/[originator-address]
```

Where:

- **receiver-identifier** - The identifier of the bot that should receive the forwarded message

- **originator-address** - Original address of the external message, with URL encoding (replacing the '@' for '%40', for instance)

The receiver receives messages, sends notifications and response messages to an adress in the following format:

```
[tunnel-id]@tunnel.msging.net
```

Where:

- **tunnel-id** - Unique tunnel id, which represents the **sender**, **receiver** and **originator** (original address of who sent the message) addresses.

| Address                      | Base URI |
|------------------------------|----------|
| postmaster@tunnel.msging.net | N/A      |

### Creating Flow Bot(5 steps)

Imagine a scenario where there are two bots: **flow** and **operator**, where the first is responsible for presenting an automatic navigation and the second receiving the handover of an eventual manual attendance. Only the **flow** bot is published in *Messenger* and it needs, at a certain point in its flow, to forward the messages to the **operator** bot that controls the manual attendance.

The complete path of a message from this external channel to the service bot is:

The main bot receives a message from a Messenger user.

```
{
    "id": "1",
    "from": "1654804277843415@messenger.gw.msging.net",
    "to": "flow@msging.net/instance",
    "type": "text/plain",
    "content": "Hello, I would like to talk to an attendant."
}
```

According to its internal rules, the flow bot decides to forward this message to the operator bot. To do this, it changes the recipient of the message and sends it as below:

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Hello, I would like to talk to an attendant."
}
```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    to: "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    type: "text/plain",
    content: "Hello, I would like to talk to an attendant"
})
```

```python
client.send_message(
    Message(
        'text/plain',
        'Hello, I would like to talk to an attendant',
        to='operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net'
    )
)
```

Internally, the server creates an **id** for the tunnel and forwards the message to the **operator** bot, which receives it as follows:

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "from": "ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net",
    "to": "operator@msging.net",
    "type": "text/plain",
    "content": "Hello, I would like to talk to an attendant."
}
```

```javascript
{
    id: 1,
    from: "ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net",
    to: "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    type: "text/plain",
    content: "Hello, I would like to talk to an attendant"
}
```

```python
{
    'id': 1,
    'from': "ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net",
    'to': "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    'type': "text/plain",
    'content': "Hello, I would like to talk to an attendant"
}
```

The operator bot generates a reply to the message and forwards it to the source address, **without differentiating a message received directly from a channel** (the same goes for received/consumed notifications):

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net",
    "type": "text/plain",
    "content": "Hi, my name is Andre. How may I help you?"
}
```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    to: "ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net",
    type: "text/plain",
    content: "Hi, my name is Andre. How may I help you?"
})
```

```python
client.send_message(
    Message(
        'text/plain',
        'Hi, my name is Andre. How may I help you?',
        to='ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net'
    )
)
```

The server uses the tunnel **id** to change the address of the response message and forwards it to the **flow** bot:

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "from": "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    "to": "flow@msging.net/instance",
    "type": "text/plain",
    "content": "Hi, my name is Andre. How may I help you?"
}
```

```javascript
client.sendMessage({
    id: Lime.Guid(),
    from: "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    to: "flow@msging.net/instance",
    type: "text/plain",
    content: "Hi, my name is Andre. How may I help you?"
})
```

```python
client.send_message(
    Message(
        'text/plain',
        'Hi, my name is Andre. How may I help you?',
        from_n='operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net',
        to='flow@msging.net/instance'
    )
)
```

The bot flow identifies the message received from a **receiver**, decodes the original address that is in **instance** and sends the message to the final recipient:

```http
POST https://{{contract.id}}.http.msging.net/messages HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "1654804277843415@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Hi, my name is Andre. How may I help you?"
}
```

```javascript
{
    id: "2",
    to: "1654804277843415@messenger.gw.msging.net",
    type: "text/plain",
    content: "Hi, my name is Andre. How may I help you?"
}
```

```python
{
    'id': "2",
    'to': "1654804277843415@messenger.gw.msging.net",
    'type': "text/plain",
    'content': "Hi, my name is Andre. How may I help you?"
}
```

### Get a tunnel info

Get a specific [tunnel](/#tunnels) by id.

Replace `{tunnelId}` with the tunnel id you want to get.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "to": "postmaster@tunnel.msging.net",
  "method": "get",
  "uri": "/tunnels/{tunnelId}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.tunnel+json",
    "resource": {
        "owner": "routerdobruno@msging.net",
        "originator": "377d0d23-6aa2-445b-9725-0fe15c9d882a.routerdobruno@0mn.io",
        "destination": "demobot@msging.net"
    },
    "method": "get",
    "status": "success",
    "id": "47c7e7e1-5e75-4ca4-a86b-2f8b06829160",
    "from": "postmaster@tunnel.msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@tunnel.msging.net",
    method: "get",
    uri: "/tunnels/{tunnelId}"
})
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        '/tunnes/{tunnelId}',
        to='postmaster@tunnel.msging.net'
    )
)
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@tunnel.msging.net",
    Uri = new LimeUri("/tunnels/{tunnelId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
```

### Querying information

The **tunnel** extension also allows querying information from the message originator in the **directory**, as long as the information is stored in the contact roster of the **sender** bot. To use this feature, the bot just needs to send a common directory request:

Sending a command to the query in the directory using the tunnel **id**:

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "postmaster@tunnel.msging.net",
    "method":"get",
    "uri": "lime://tunnel.msging.net/accounts/ecb99cf5-fb5c-4376-8acd-4b478091de15"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    method: Lime.CommandMethod.GET,
    to: "postmaster@tunnel.msging.net",
    uri: "lime://tunnel.msging.net/accounts/ecb99cf5-fb5c-4376-8acd-4b478091de15"
})
```

```python
result = await client.process_command_async(
    Command(
        CommandMethod.GET,
        'lime://tunnel.msging.net/accounts/ecb99cf5-fb5c-4376-8acd-4b478091de15'
    )
)
```

The server identifies that the query is for a tunnel user and performs the query **on behalf of the sender** directly in its contacts roster and returns the information:

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "{{$guid}}",
    "to": "operator@msging.net/instance",
    "method":"get",
    "status": "success",
    "type": "application/vnd.lime.account+json",
    "resource": {
        "fullName": "John Deere",
        "gender": "male"
    }
}
```

```javascript
{
    id: "3",
    to: "operator@msging.net/instance",
    method:"get",
    status: "success",
    type: "application/vnd.lime.account+json",
    resource: {
        fullName: "John Deere",
        gender: "male"
    }
}
```

```python
<class='Command'
    'id': '3'
    'to': 'operator@msging.net/instance'
    'method':'get'
    'status': 'success'
    'type_n': 'application/vnd.lime.account+json'
    'resource': <class='dict'
        'fullName': 'John Deere'
        'gender': 'male'
    >
>
```

For more information about the contacts extension, please refer to the [extension documentation](https://docs.blip.ai/?http#contacts).
