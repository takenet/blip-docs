## Event Analysis

```http
POST /commands HTTP/1.1
Content-Type: application/json
{  
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "method": "set",
  "type": "application/vnd.iris.eventTrack+json",
  "uri": "/event-track",
  "resource": {  
    "category": "billing",
    "action": "payment"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "method": "set",
  "status": "success",
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

| Address               | Base URI     |
|-----------------------|--------------|
| postmaster@msging.net (default address - not required) | /event-track |

The **event analysis** extension allows the registration of chatbot's events for creation of analytics reports in the portal. The events are agregated by category, action and day. The reports can be generated thought the [portal](https://portal.blip.ai), in the *Panel* -> *Data analysis* option.

To register an event, the chatbot must provide the following properties:

###Create an event


```http
POST /commands HTTP/1.1
Content-Type: application/json
{  
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "method": "set",
  "type": "application/vnd.iris.eventTrack+json",
  "uri": "/event-track",
  "resource": {  
    "category": "billing",
    "action": "payment"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "method": "set",
  "status": "success",
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| type | The type of the resource. |
| uri    | The command uri   |
| resource | The event document. |




### Create event with identity

```http
POST /commands HTTP/1.1
Content-Type: application/json
  {  
    "id": "9494447a-2581-4597-be6a-a5dff33af156",
    "method": "set",
    "type": "application/vnd.iris.eventTrack+json",
    "uri": "/event-track",
    "resource": {  
      "category": "billing",
      "action": "payment",
      "identity": "123456@messenger.gw.msging.net",
    }
  }
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "method": "set",
  "status": "success",
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| type | The type of the resource. |
| uri    | The command uri   |
| resource | The event document. |


### Get Categories

```http
POST /commands HTTP/1.1
Content-Type: application/json
{  
  "id": "3",
  "method": "get",
  "uri": "/event-track"
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
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.eventTrack+json",
    "items": [{
        "category": "billing"
    },
    {
        "category": "account"
    }]
  }
}
```


| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| uri    | The command uri   |

### Get Counters

```http
POST /commands HTTP/1.1
Content-Type: application/json
{  
  "id": "4",
  "method": "get",
  "uri": "/event-track/billing?startDate=2016-01-01&$take=10"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",  
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.eventTrack+json",
    "items": [{
        "category": "billing",
        "action": "payment",
        "storageDate": "2016-01-01",
        "count": 10
    },
    {
        "category": "billing",
        "action": "payment",
        "storageDate": "2016-01-02",
        "count": 20
    }]
  }
}
```
| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| uri    | The command uri   |

Available *querystring* filters:

| QueryString  | Description                               |
|--------------|-------------------------------------------|
| $take        | Limit of total of items to be returned    |
| startDate    | Initial date to seach for events          |
| endDate      | Limit date to retrieve the events         |

### Get Details

```http
POST /commands HTTP/1.1
Content-Type: application/json
{  
  "id": "5",
  "method": "get",
  "uri": "/event-track/billing/payment?startDate=2016-01-01&$take=10"
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
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.eventTrack+json",
    "items": [{
        "category": "billing",
        "action": "payment",
        "storageDate": "2016-01-01T12:30:00.000Z",
        "extras": {
          "expiration": "2015-12-30",
          "customerId": "199213"
        }      
    },
    {
        "category": "billing",
        "action": "payment",
        "storageDate": "2016-01-02T09:15:00.000Z",
        "extras": {
          "expiration": "2016-01-01",
          "customerId": "4123123"
        }  
    }]
  }
}
```

| Name | Description |
|---------------------------------|--------------|
|  id    | Unique identifier of the command.   |
| method    | The command verb   |
| uri    | The command uri   |


Available *querystring* filters:

| QueryString  | Description                               |
|--------------|-------------------------------------------| 
| $skip        | Number of items to be skipped for paging  |
| $take        | Limit of total of items to be returned    |
| startDate    | Initial date to seach for events          |
| endDate      | Limit date to retrieve the events         |

