## Media

| Address                     |
|-----------------------------|
| postmaster@media.msging.net |

The **Media** extension allows to manipulate the chatbot's medias.

### Refresh a media expired link

 Medias are stored and accessed with expirable links. After the expiration date, the media link becomes unavailable. This resource allows retrieving a new and valid url to see the media.

| Name     | Description                       |
|----------|-----------------------------------|
| id       | Unique identifier of the command. |
| method   | `set`                             |
| resource | The expired MediaLink Uri         |
| uri      | **/refresh-media-uri**            |
| to       | **postmaster@media.msging.net**   |
| type     | `text/plain`                      |

 ```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "to": "postmaster@media.msging.net",
  "method": "set",
  "uri": "/refresh-media-uri",
  "type": "text/plain",
  "resource": "{{expiredMediaLinkUri}}"
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

```python
result = await client.media_extension.refresh_media_async('{{expiredMediaId}}')
```

### Get Upload Token

Get token to upload a media.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "to": "postmaster@media.msging.net",
  "method": "GET",
  "uri": "/upload-media-uri?secure=true"
}
```

```python
result = await client.media_extension.get_upload_token_async(True)
```
