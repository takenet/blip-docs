## Messages

> See below the representation of a message:

```csharp
  var message = new Message
  {
      Id = "65603604-fe19-479c-c885-3195b196fe8e",
      From = "551199991111@0mn.io/182310923192",
      To = "mycontact@msging.net",
      Content = new PlainText
      {
          Text = "Hello World"
      }
  };
```

```javascript
var message = {
  id: "65603604-fe19-479c-c885-3195b196fe8e",
  from: "551199991111@0mn.io/182310923192",
  to: "mycontact@msging.net",
  type: "text/plain",
  content: "Hello World"
}
```

```json
{
  "id": "65603604-fe19-479c-c885-3195b196fe8e",
  "from": "551199991111@0mn.io/182310923192",
  "to": "mycontact@msging.net",
  "type": "text/plain",
  "content": "Hello World"
}
```

A **message** allows content exchange between clients and chatbots.

Each message has:

- **id**: Message's unique identifier. The *id* is used as reference for notifications, thus **don't reuse the same id**. One way to guarantee its uniqueness is using a new [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) for each message. This value may be omitted by the originator if it's not interested on notifications, even in case of a failure.
- **from**: Originator’s address. This value is not required by the originator.
- **to**: Recipient’s address. This value is mandatory.
- **type**: Statement with content type, in MIME format. It can be of **plain** type (for example, `text/plain`) or **JSON** (for example, `application/vnd.lime.media-link+json`). [Click here to see all](#content-types) **Content Types** availables.
- **content**: Message's content.

For more information, check the [LIME protocol](http://limeprotocol.org/index.html#message) specification.