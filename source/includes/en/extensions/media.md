## Media

| Address                         |
|---------------------------------|
| postmaster@media.msging.net     |

The **Media** extension allows to manipulate the chatbot's medias.

### Refresh an expired media

 Medias are stored with an expiration date. After this date, the media becomes unavailable. But it's possible to retrieve a new and valid url to see the media.

 Name      | Description                       |
|----------|-----------------------------------|
| id       | Unique identifier of the command. |
| method   | `set`                             |
| resource | The expired MediaLink Uri         |
| uri      | **/refresh-media-uri**            |
| to       | **postmaster@media.msging.net**   |
| type     | `text/plain`                      |

 ```http
POST https://http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "a43aa4d2-566a-4be0-bc51-38d43597eb58",
  "to": "postmaster@media.msging.net",
  "method": "set",
  "uri": "/refresh-media-uri",
  "type": "text/plain",
  "resource": "URI_WITH_EXPIRED_TOKEN"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "text/plain",
    "resource": "URI_WITH_NEW_TOKEN",
    "method": "set",
    "status": "success",
    "id": "a43aa4d2-566a-4be0-bc51-38d43597eb58",
    "from": "postmaster@media.msging.net/#az-iris1",
    "to": "demobot@msging.net"
}
```