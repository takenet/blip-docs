## Bucket

| Address               | Base URI     |
|-----------------------|--------------|
| postmaster@msging.net (default address - not required) | /buckets |

The **bucket** extension allows the storage of documents in the server on a isolated chatbot's container. This extensions is useful to store information about the clients that have interacted with the chatbot, like preferences and navigation state.

Each document have an **identifier** which is provided during the write operation and this identifier should be used for retrieving the value later. It is possible to set an optional **expiration date** for the document. Both the identifier and the expiration date are specified in the **URI** of the command which is sent to the extension.

### Store a JSON Document

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
        'id': '1',
        'method': 'set',
        'uri': '/buckets/xyz1234',
        'type': 'application/json',
        'resource': {  
            'key1': 'value1',
            'key2': 2,
            'key3': [  
                '3a', '3b', '3c'
            ]
        }
    });
});
```

```http
POST /commands HTTP/1.1
Content-Type: application/json
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
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

### Store a custom document

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({
        "id": "2",
        "method": "set",
        "uri": "/buckets/abcd9876?expiration=30000",
        "type": "application/x-my-type+json",
        "resource": {  
            "myTypeKey1": "value1",
            "myTypeKey2": 2
        }
    });
});
```

```http
POST /commands HTTP/1.1
Content-Type: application/json
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
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

Storing an custom document with type **application/x-my-type+json** and **abcd9876** identifier, setting the expiration to 30000 milisseconds (or 30 seconds):

### Get a document

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        'id': '3',
        'method': 'get',
        'uri': '/buckets/xyz1234'
    });
});
```

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "3",
  "method": "get",
  "uri": "/buckets/xyz1234"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
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
