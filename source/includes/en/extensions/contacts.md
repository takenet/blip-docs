## Contacts

```http
// Examples
//1 - Sending a message including the contact name:

{  
  "id": "1",
  "to": "11121023102013021@messenger.gw.msging.net",
  "type": "text/plain",
  "value": "Hello ${contact.name}, welcome to the ${contact.extras.plan} plan!",
  "metadata": {
    "#message.replaceVariables": "true"
  }
}

//In this example, the final message which will be sent to the customer is:

{  
  "id": "1",
  "to": "11121023102013021@messenger.gw.msging.net",
  "type": "text/plain",
  "value": "Hello John Doe, welcome to the Gold plan!",
  "metadata": {
    "#message.replaceVariables": "true"
  }
}
```

| Address               | Base URI     | C#              |
|-----------------------|--------------|-----------------|
| postmaster@msging.net (default address - not required)) | /contacts | [ContactExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Contacts/ContactExtension.cs) |

The **contacts** extension allows the management of the chatbot's roster, which can be used to store data of the chatbot clients. It is possible to save information like name, address, gender and other generic information, using the `extras` property. It is also possible to use the contacts fields as variables of the messages sent by the chatbot. This property only allows `string` values and does not allows complex objects. You can also set the `group` property for contacts organization. Events which the `identity` property is from a special group called 'testers' will be ignored on BLiP events dashboard.

For more information about the supported fields, please refer to the [Lime protocol](http://limeprotocol.org/resources.html#contact) documentation.

```http
// Examples
//#1 - Adding a Messenger contact:

{  
  "id": "1",
  "method": "set",
  "uri": "/contacts",
  "type": "application/vnd.lime.contact+json",
  "resource": {
    "identity": "11121023102013021@messenger.gw.msging.net",
    "name": "John Doe",
    "gender":"male",
    "group":"friends",    
    "extras": {
      "plan":"Gold",
      "code":"1111"      
    }
  }
}
//Response on success:

{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//2 - Getting a contact:

{  
  "id": "2",
  "method": "get",
  "uri": "/contacts/11121023102013021@messenger.gw.msging.net"
}

//Response on success:

{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.contact+json",
  "resource": {
    "identity": "11121023102013021@messenger.gw.msging.net",
    "name": "John Doe",
    "gender":"male",
    "group":"friends",
    "extras": {
      "plan":"Gold",
      "code":"1111"      
    }
  }  
}

//3 - Getting 3 contacts in the roster with paging:

{  
  "id": "3",
  "method": "get",
  "uri": "/contacts?$skip=0&$take=3"
}
//Response on success:

{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType":"application/vnd.lime.contact+json",
    "total":10,
    "items": [
      {"identity": "11121023102013021@messenger.gw.msging.net","name": "John Doe","gender":"male", "group":"friends", "extras":{"plan":"Gold","code":"1111"}},
      {"identity": "213121@telegram.gw.msging.net","name": "Joseph from Telegram","email":"ze@gmail.com"},
      {"identity": "5511999990000@take.io","name": "Mary"}
    ]    
  }  
}
```

#### Message variable replacement

The contacts fields can be used to replace variables on messages sent by the chatbot. To active the replacement in a message, the `metadata` key `#message.replaceVariables` should be present with the value `true` and the message text should have variables in the  `${contact.<propertyName>}` format, where `<propertyName>` is the contact property for replacement. It is possible to use all fields from the contact, including the keys in the `extras` property. In this case, is only required to use the `${contact.extras.<extraPropertyName>}` convention, where `<extraPropertyName>` is the value for replacement. If the value is not available, it is only removed from the message.


