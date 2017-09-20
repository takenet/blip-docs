## Messages

> See below a sample JSON representation of a message:

```json
{
  "id": "65603604-fe19-479c-c885-3195b196fe8e",
  "from": "551199991111@0mn.io/182310923192",
  "to": "mycontact@msging.net",
  "type": "text/plain",
  "content": "Hello World"
}
```

A **message** allows the content exchange between clients and chatbots.

Each message has:

- **id**: Message unique identifier. The *id* is used as reference for notifications, thus **avoid to reuse the same id**. One way to guarantee its uniqueness is using a new [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) for each message. This value may be omitted by the originator if it does not have interest on notifications, even in case of failures.
- **from**: Originator’s address. This value its not required by the originator.
- **to**: Recipient’s address. This value is mandatory.
- **type**: Statement with content type, in the MIME format. It can be of **plain** type (for example, `text/plain` ) or **JSON** (for example, `application/vnd.lime.media-link+json`). Check the **Content Types** section for more information.
- **content**: Message content.

For more information, check the [LIME protocol](http://limeprotocol.org/index.html#message) specification.
