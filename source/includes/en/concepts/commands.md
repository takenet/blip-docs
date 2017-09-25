## Commands

> See below the representation of a command for the distribution list creation.

```csharp
var command = new Command()
{
    Id = EnvelopeId.NewId(),
    To = "postmaster@broadcast.msging.net",
    Method = CommandMethod.Set,
    Uri = new LimeUri("/lists"),
    Resource = new JsonDocument(DistributionList.MediaType)
    {
        {"identity", "list@broadcast.msging.net"}
    }
};
```

```javascript
var command = {
  id:  "1",
  to: "postmaster@broadcast.msging.net",
  method: "set",
  uri: "/lists",
  type: "application/vnd.iris.distribution-list+json",
  resource: {
    identity:  "list@broadcast.msging.net"
  }
} 
```

```http
{
  "id":  "1",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "uri": "/lists",
  "type": "application/vnd.iris.distribution-list+json",
  "resource": {
    "identity":  "list@broadcast.msging.net"
  }
} 
```

> Reponse in the case of a successful answer:

```json
{
  "id": "1",
  "from": "postmaster@broadcast.msging.net/#hmgirismsging2",
  "to": "my-contact@msging.net/default",
  "method": "set",
  "status": "success"
} 
```

> In the case of a failure:

```json
{
  "id": "1",
  "from": "postmaster@broadcast.msging.net/#hmgirismsging2",
  "to": "my-contact@msging.net/default",
  "method": "set",
  "status": "failure",
  "reason": {
   "code": 60,
   "description": "Invalid list identifier"
  }
} 
```

A **command** allows query and manipulation of server resources and the consumption of **BLiP Messaging Hub** extensions. It provides an request-response interface similar to HTTP, with verbs and URIs.

Each command has:

- **id** - Unique command identifier. The *id* is used as reference in the command response. This value is mandatory, with exception to method `observe` commands. 
- **from** - Command originator address. This value may be omitted in the requests, as default it is considered the connected chatbot address.
- **to** - Command recipient address. This value may be omitted in the requests, as default it is considered the server remote address. It must be provided in case the command is sent to an **extension**.
- **uri** - The path at the recipient the resource the command refers to. This value is mandatory in the requests and can be omitted in the responses.
- **method** – Method for resource manipulation defined at **uri**. This value is mandatory. Possible values are:
  * **get** – Acquires an existent value.
  * **set** – Creates or updates a value.
  * **delete** – Removes an existing value.
  * **Subscribe** – Subscribes a resource to receive change notifications of the defined value at the **uri**.
  * **Unsubscribe** – Removes a subscription of a resource. 
  * **Observe** - Notify about changes of the value of a resource. Usually they are sent by the server or an extension. Commands with this method are sent are unidirectional and the recipient should not send an answer. For this reason, they do not have **id**.
- **type** – Declaration of the **resource** value type, in the MIME format.
- **resource** – JSON resource representation. Must be present in requests of **set** and **observe** methods and success answers of **get** method.

Besides the properties previously mentioned, a response command may have:

- **status** – Indicates the command processing result, it is mandatory in the answers. The valid values are:
  * **success** – The command was successfully processed. In case of **get** method command, the **resource** value must be present.
  * **failure** – a problem occurred during the command processing. In this case, the answer **reason** property must be present.
- **reason** – Indicates the command processing failure reason. It contains the following properties:
  * **code** – Failure numeric code. This value is mandatory.
  * **description** – Failure description message.

For more details, check the [LIME protocol](http://limeprotocol.org/index.html#notification) specification.
