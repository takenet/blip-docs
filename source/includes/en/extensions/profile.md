## Chatbot profile


| Address               | Base URI     |
|-----------------------|--------------|
| postmaster@msging.net (default address - not required) | /profile |

The **profile** extension allows the configuration of chatbot profile properties, which can reflect to the clients in the published channel - if supported. Each property is a document of a type supported by the platform.

The current supported profile properties are:

| Name             | Identifier        | Document type     | Supported channels  |
|------------------|-------------------|-------------------|---------------------|
| Start button     | `get-started`     | Text              | Messenger           |
| Greeting message | `greeting`        | Text              | Messenger           |
| Persistent menu  | `persistent-menu` | Multimedia menu   | Messenger           |

Note: In Messenger, the value of `get-started` must be defined before the value of `persistent-menu`.

### Setting Greeting Message

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "1",
  "method": "set",
  "uri": "/profile/greeting",
  "type": "text/plain",
  "resource": "Hello and welcome to our service!"
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

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination address of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
| resource | greeting message |

###Seting simple persistent menu


```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "2",
  "method": "set",
  "uri":"/profile/persistent-menu",
  "type":"application/vnd.lime.document-select+json",
  "resource": {
    "options":[
      {
        "label":{
          "type":"text/plain",
          "value":"Option 1"
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Option 2"
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Option 3"
        }
      }
    ]
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

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination address of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
| resource | Menu info |

###Seting complex persistent menu


```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "3",
  "method": "set",
  "uri":"/profile/persistent-menu",
  "type":"application/vnd.lime.document-select+json",
    "resource":{
      "options":[
        {
          "label":{
            "type":"application/vnd.lime.document-select+json",
            "value":{
              "header":{
                "type":"text/plain",
                "value":"Option 1"
              },
              "options":[
                {
                  "label":{
                    "type":"text/plain",
                    "value":"Option 1.1"
                  }
                },
                {
                  "label":{
                    "type":"application/vnd.lime.web-link+json",
                  "value":{
                    "text":"Option 1.2",
                    "uri":"https://address.com/option1.2"
                  }
                }
              },
              {
                "label":{
                  "type":"application/vnd.lime.document-select+json",
                  "value":{
                    "header":{
                      "type":"text/plain",
                      "value":"Option 1.3"
                    },
                    "options":[
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.1"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.2"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Option 1.3.3"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Option 2"
        }
      },
      {
        "label":{
          "type":"application/vnd.lime.web-link+json",
          "value":{
            "text":"Option 3",
            "uri":"https://address.com/option1.3"
          }
        }
      }
    ]
  }
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination address of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
| resource | Menu info |

###Set start button

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "4",
  "method": "set",
  "uri": "/profile/get-started",
  "type": "text/plain",
  "resource": "Start now"
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "4",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination address of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
| resource | Button info |

###Get greeting message

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "5",
  "method": "get",
  "uri": "/profile/greeting"  
}

```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "5",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "text/plain",
  "resource": "Hello and welcome to our service!"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| to    | The destination address of the command.   |
| method    | The command verb   |
| uri    | The command uri   |
| resource | Button info |