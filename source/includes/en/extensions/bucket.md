## Bucket

```http

// Exemples
//1 - Storing an generic JSON document with the **xyz1234** identifier:

{  
  "id": "1",
  "method": "set",
  "uri": "/buckets/xyz1234",
  "type": "application/json",
  "resource": {  
    "key1": "value1",
    "key2": 2,
    "key3": [  
      "3a", "3b", "3c"
    ]
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

//2 - Storing an custom document with type **application/x-my-type+json** and **abcd9876** identifier, setting the expiration to 30000 milisseconds (or 30 seconds):

{  
  "id": "2",
  "method": "set",
  "uri": "/buckets/abcd9876?expiration=30000",
  "type": "application/x-my-type+json",
  "resource": {  
    "myTypeKey1": "value1",
    "myTypeKey2": 2
  }
}
//Response on success:

{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//3 - Retrieving an existing document with **xyz1234** identifier:

{  
  "id": "3",
  "method": "get",
  "uri": "/buckets/xyz1234"
}
//Response on success:

{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/json",
  "resource": {  
    "key1": "value1",
    "key2": 2,
    "key3": [  
      "3a", "3b", "3c"
    ]
  }  
}
```

| Address               | Base URI     | C#              |
|-----------------------|--------------|-----------------|
| postmaster@msging.net (default address - not required) | /buckets | [BucketExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Bucket/BucketExtension.cs) |

The **bucket** extension allows the storage of documents in the server on a isolated chatbot's container. This extensions is useful to store information about the clients that have interacted with the chatbot, like preferences and navigation state.

Each document have an **identifier** which is provided during the write operation and this identifier should be used for retrieving the value later. It is possible to set an optional **expiration date** for the document. Both the identifier and the expiration date are specified in the **URI** of the command which is sent to the extension.


