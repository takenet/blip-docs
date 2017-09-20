### Event analysis
| Address               | Base URI     |  C#                 |
|-----------------------|--------------|---------------------|
| postmaster@msging.net (default address - not required) | /event-track | [EventTrackExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/EventTrack/EventTrackExtension.cs) |

The **event analysis** extension allows the registration of chatbot's events for creation of analytics reports in the portal. The events are agregated by category, action and day. The reports can be generated thought the [portal](https://portal.blip.ai), in the *Panel* -> *Data analysis* option.

To register an event, the chatbot must provide the following properties:

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **category** | Category to aggregate the related events.                          | billing |
| **action**   | The action associated to the event. The event counting is made using the actions.  | payment |
| **identity** | Optional contact associated to the event. If contact is a 'testers' group member the event will be ignored.  | 123456@messenger.gw.msging.net |
| **extras**   | Optional extra informations to be stored within the event.         | {"customerId": "41231", "paymentId": "ca82jda"} |


#### Exemples
1 - Registering an event:
```json
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
Response on success:
```json
{
  "method": "set",
  "status": "success",
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```
2 - Registering an event passing identity:
```json
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
Response on success:
```json
{
  "method": "set",
  "status": "success",
  "id": "9494447a-2581-4597-be6a-a5dff33af156",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default"
}
```

3 - Retrieving stored event categories:
```json
{  
  "id": "3",
  "method": "get",
  "uri": "/event-track"
}
```
Response on success:
```json
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


4 - Retrieving event counters:

Available *querystring* filters:

| QueryString  | Description                               |
|--------------|-------------------------------------------|
| $take        | Limit of total of items to be returned    |
| startDate    | Initial date to seach for events          |
| endDate      | Limit date to retrieve the events         |

```json
{  
  "id": "4",
  "method": "get",
  "uri": "/event-track/billing?startDate=2016-01-01&$take=10"
}
```

Response on success:
```json
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

5 - Retrieving the event details for a category and action:

Available *querystring* filters:

| QueryString  | Description                               |
|--------------|-------------------------------------------| 
| $skip        | Number of items to be skipped for paging  |
| $take        | Limit of total of items to be returned    |
| startDate    | Initial date to seach for events          |
| endDate      | Limit date to retrieve the events         |


```json
{  
  "id": "5",
  "method": "get",
  "uri": "/event-track/billing/payment?startDate=2016-01-01&$take=10"
}
```

Response on success:
```json
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
