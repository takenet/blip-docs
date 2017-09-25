## Resources

```json
//Examples
//1 - Storing a resource of type **media link** with the key **xyz1234**:
{  
  "id": "1",
  "method": "set",
  "uri": "/resources/xyz1234",
  "type": "application/vnd.lime.media-link+json",
  "resource": {
    "title": "Cat",
    "text": "Here is a cat image for you!",
    "type": "image/jpeg",
    "uri": "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
    "size": 227791,
    "previewUri": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8qkelB28RstsNxLi7gbrwCLsBVmobPjb5IrwKJSuqSnGX4IzX",
    "previewType": "image/jpeg"
  }
}
//#Response on success:

{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//2 - Storing a resource of type **text/plain** with the key **help-message**:

{  
  "id": "2",
  "method": "set",
  "uri": "/resources/help-message",
  "type": "text/plain",
  "resource": "To use our services, please send a text message."
}
//Response on success:

{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//3 - Storing a resource of type **text/plain** with a replacement variable:

{  
  "id": "3",
  "method": "set",
  "uri": "/resources/welcome-message",
  "type": "text/plain",
  "resource": "Welcome to our service, ${contact.name}!"
}
//Response on success:

{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```


| Endereço              | Base URI     | C#              |
|-----------------------|--------------|------------------
| postmaster@msging.net (default address - not required) | /resources | [ResourceExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Resource/ResourceExtension.cs) |

The **resources** extension allows the storage of documents in the server in an isolated space for each chatbot, similar to the **storage** extension. The main difference is that these documents can be mapped as **contents** for messages sent to the chatbot destinations, thought the resource **key**. This means that the chatbot developer can choose to **store the content of his messages in the server** instead of keeping they on the chatbot side.

In order to send a resource message, the developer must use the [**resource** content type](https://portal.blip.ai/#/docs/content-types/resource).

The **BLiP** portal offers an resource management interface which helps in the case of editing these content, avoiding the need to update the code on the application side in case of changes in chatbot content.

#### Replacement variables

It is possible to use contact replacement variables in the created resources. For more information, please check the documentation of the [**Contacts** extension](https://portal.blip.ai/#/docs/extensions/contacts).

