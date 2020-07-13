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
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key bWVzc2FnaW5naHViQHRha2VuZXQuY29tLmJyOjEyMzQ=
Content-Length: 131

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

<blockquote class="lang-specific http">
<p>Reponse in the case of a successful answer:</p>
</blockquote>


```http

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1",
  "from": "postmaster@broadcast.msging.net/#hmgirismsging2",
  "to": "my-contact@msging.net/default",
  "method": "set",
  "status": "success"
} 
```
<blockquote class="lang-specific http">
<p>In the case of a failure:</p>
</blockquote>

```http

HTTP/1.1 200 OK
Content-Type: application/json

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

A **command** allows querying and manipulation of server resources and the consumption of **BLiP** extensions. It provides a request-response interface similar to HTTP, with verbs and URIs.

Each command has:

- **id**: Unique command identifier. It's used as reference in the command's response. This value is mandatory, except for `observe` commands.
- **from**: Command originator address. This value may be omitted in the requests, and by default it is the connected chatbot address.
- **to**: Command recipient address. This value may be omitted in the requests, and by default it is the server remote address. It must be provided in case the command is sent to an **extension**.
- **uri**: The path at the recipient the resource's command refers to. This value is mandatory for all requests and can be omitted in the responses.

<aside class="notice">This uri needs to go through the encoding process <strong>if it has some kind of special character</strong>. See information <a href="https://www.w3schools.com/tags/ref_urlencode.asp">clicking here</a>.</aside>
- **method**: Method for resource manipulation defined at the **uri**. This value is mandatory. Possible values are:
  * **get**: Acquires an existent value.
  * **set**: Creates or updates a value.
  * **merge**: Merges the resource document with an existing one. If the resource doesn't exist, it is created.
  * **delete**: Removes an existing value.
  * **subscribe**: Subscribes a resource to receive change notifications of the defined value at the **uri**.
  * **unsubscribe**: Removes a subscription of a resource. 
  * **observe**: Notify about a resource's value change. They are usually sent by the server or an extension. Commands sent with this method are unidirectional and the recipient should not send an answer. For this reason, they do not have **id**.
- **type**: Declaration of the **resource** value type, in MIME format.
- **resource**: JSON resource representation. Must be present in requests of **set** and **observe** methods and success answers of **get** method.

> Note: Some extensions cannot accept all of the available methods.

Besides the properties previously mentioned, a response command may have:

- **status**: Indicates the command's processing result, and it's mandatory in the answers. Valid values are:
  * **success**: The command was successfully processed. In case of **get** method command, the **resource** value must be present.
  * **failure**: A problem occurred during the command's processing. In this case, the answer's **reason** property must be present.
- **reason**: Indicates the command's processing failure reason. It contains the following properties:
  * **code**: The failure's numeric code. This value is mandatory.
  * **description**: Failure's description message.

For more details, check the [LIME protocol](http://limeprotocol.org/index.html#notification) specification.
