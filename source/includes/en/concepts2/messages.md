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

```python
message = Message(
  id="65603604-fe19-479c-c885-3195b196fe8e",
  from_n="551199991111@0mn.io/182310923192",
  to="mycontact@msging.net",
  type_n="text/plain",
  content="Hello World"
)
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

<aside class="warning"> Every message needs to be sent through your unique HTTP endpoint. You can find this information by accessing you Chatbot, going to <strong>Configurations menu</strong> and then <strong>Connection information.</strong><br><br>Remember to replace {{contract_id}}* with your id!<br><br>*The contract_id value can be identified as being part of your URL, in the following format:  https://{{contract_id}}.http.msging.net/messages<br><br><img src="https://www.dropbox.com/s/ris7r8itbofp949/imagem%20docs%203.jpg?dl=1"></aside>


Each message has:

- **id**: Message's unique identifier. The *id* is used as reference for notifications, thus **don't reuse the same id**. One way to guarantee its uniqueness is using a new [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) for each message. This value may be omitted by the originator if it's not interested on notifications, even in case of a failure.
- **from**: Originator address. This value is not required by the originator.
- **to**: Recipient address. This value is mandatory.
- **type**: Statement with content type, in MIME format. It can be of **plain** type (for example, `text/plain`) or **JSON** (for example, `application/vnd.lime.media-link+json`). [Click here to see all](#content-types) **Content Types** availables.
- **content**: Message's content.

For more information, check the [LIME protocol](http://limeprotocol.org/index.html#message) specification.