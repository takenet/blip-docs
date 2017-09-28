## Event Analysis

The **event analysis** extension allows chatbot's events registration in order to create analytics reports in the BLiP portal. The events are agregated by category, action and day. The reports and graphs can be generated thought the [portal](https://portal.blip.ai), in the *Panel* -> *Data analysis* option.

To use any feature of **event analysis** extension you must send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | The command verb  |
| resource | The event document. |
| type | **"application/vnd.iris.eventTrack+json"** |
| uri    | **/event-track**   |
| to     | **postmaster@analytics.msging.net** |

The command's properties `resource` and `method` can change according of the feature.
An event track document passed as a document `resource` has the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **category** | Category to aggregate the related events.                          | billing |
| **action**   | The action associated to the event. The event counting is made using the actions.  | payment |
| **identity** | **Optional** contact associated to the event. If contact is a 'testers' group member the event will be ignored.  | 123456@messenger.gw.msging.net |
| **extras**   | **Optional** extra informations to be stored within the event.         | {"customerId": "41231", "paymentId": "ca82jda"} |

### Create an event

Imagine that your chatbot must track the number of payment orders realized and show this data on a real time report. To make this possible you can register every single *success order* as an **action** of the *payments* **category**.

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "to": "postmaster@analytics.msging.net",
  "method": "set",
  "type": "application/vnd.iris.eventTrack+json",
  "uri": "/event-track",
  "resource": {  
    "category": "payments",
    "action": "success-order"
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
  "from": "postmaster@analytics.msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

### Create event with identity

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
  {  
    "id": "9494447a-2581-4597-be6a-a5dff33af156",
    "to": "postmaster@analytics.msging.net",
    "method": "set",
    "type": "application/vnd.iris.eventTrack+json",
    "uri": "/event-track",
    "resource": {  
      "category": "payments",
      "action": "success-order"
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
  "from": "postmaster@analytics.msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

Is also possible associate a specific contact in an event. You can use this to ignore events of a tester user for example.
If your bot has a `123456@messenger.gw.msging.net` contact identity as a tester user you can ignore all of your tracks events adding this identity on event resource object.

### Get Categories

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "3",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/event-track"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{  
  "id": "3",
  "from": "postmaster@analytics.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.eventTrack+json",
    "items": [{
        "category": "payments"
    },
    {
        "category": "accounts"
    }]
  }
}
```

Retrieves all tracked categories.

### Get Counters

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "4",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/event-track/payments?startDate=2016-01-01&$take=10"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@analytics.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",  
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.eventTrack+json",
    "items": [{
        "category": "payments",
        "action": "success-order",
        "storageDate": "2016-01-01",
        "count": 10
    },
    {
        "category": "payments",
        "action": "success-order",
        "storageDate": "2016-01-02",
        "count": 20
    }]
  }
}
```

To retrieve all counters of a category add the category name on command uri (for instance **/event-track/payments**). This counters represents the number of events track in a specific pair of action and categories grouped by days. There is also possible add *query strings* parameters as request filters. The following filters are available:

| QueryString  | Description                               |
|--------------|-------------------------------------------|
| $take        | Limit of total of items to be returned    |
| startDate    | Initial date to seach for events          |
| endDate      | Limit date to retrieve the events         |

### Get Details

```http
POST /commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}
{  
  "id": "5",
  "to": "postmaster@analytics.msging.net",
  "method": "get",
  "uri": "/event-track/payments/success-order?startDate=2016-01-01&$take=10"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": "5",
  "from": "postmaster@analytics.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.eventTrack+json",
    "items": [{
        "category": "payments",
        "action": "success-order",
        "storageDate": "2016-01-01T12:30:00.000Z",
        "extras": {
          "expiration": "2015-12-30",
          "customerId": "199213"
        }      
    },
    {
        "category": "payments",
        "action": "success-order",
        "storageDate": "2016-01-02T09:15:00.000Z",
        "extras": {
          "expiration": "2016-01-01",
          "customerId": "4123123"
        }  
    }]
  }
}
```

Retrieves all events tracked with a specific pair of action and categories. The following filters are available as possible *query strings*:

| QueryString  | Description                               |
|--------------|-------------------------------------------| 
| $skip        | Number of items to be skipped for paging  |
| $take        | Limit of total of items to be returned    |
| startDate    | Initial date to seach for events          |
| endDate      | Limit date to retrieve the events         |

