## Artificial Intelligence

| Address                         |
|---------------------------------|
| postmaster@ai.msging.net        |

The  **Artificial Intelligence** extension allows the creation, training and publication of artificial intelligence models in the providers associated with the chatbot, besides performing sentence analysis to identify intentions and entities. The configuration of the chatbot providers is done through the **Artificial Intelligence**  menu in the [BLiP portal] (https://portal.blip.ai).

You can associate **response documents** with the model that should be submitted when an intent is matched in a sentence. In addition, the extension can be used to improve the model by associating questions with intentions.

The training of the model is performed simultaneously on all of the AI ​​providers associated with chatbot. In that case, a snapshot of the model is stored and can be retrieved later to compare its effectiveness with other versions. To use a trained template, you must publish it.

All manipulation of the model can be done through the portal of the BLiP, and this extension can be used only to perform the **analysis of sentences** of the users of the chabot.

**API Resources**

| URI                               | Method   | Description                                |
|-----------------------------------|----------|--------------------------------------------|
| `/intentions`                     | `set`    | Creates a new intention. The `id` of the intention is returned in the command response. |
| `/intentions`                     | `get`    | Search in all intentions that are associated to the chatbot. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/intentions/{id}`                | `get`    | Retrieves an intention by its `id`.           |
| `/entities`                       | `set`    | Creates a new entity. The `id` of the entity is returned in the command response. |
| `/entities`                       | `get`    | Search in all intentions that are associated to the chatbot. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/entities/{id}`                  | `get`    | Retrieves an entity by its `id`.           |
| `/intentions/{id}/questions`      | `set`    | Create questions associated to the intention `id`. |
| `/intentions/{id}/questions`      | `get`    | Search in all questions that are associated to the intention `id`. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/intentions/{id}/questions/{qid}`| `delete` | Removes the question with id `qid`.          |
| `/intentions/{id}/answers`        | `set`    | Create answers associated to the intention `id`. |
| `/intentions/{id}/answers`        | `get`    | Search in all answers that are associated to the intention `id`. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/intentions/{id}/answers/{aid}`  | `delete` | Removes the answer with id `aid`.          |
| `/models`                         | `set`    | Executes the training or publishing of the model. The action depends of the type of the resource (see the table below). |
| `/models`                         | `get`    | Search in all trained and/or published models. |
| `/analysis`                       | `set`    | Analyzes an user sentence using a published model. |
| `/analysis`                       | `get`    | Retrieves the history of performed analysis. It is possible to paginate the request using using `$skip` and `$take` arguments and filter with `$filter`, using the [OData syntax](http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#FilterSystemQueryOption). |
| `/analysis/{id}/feedback`         | `set`    | Provides feedback to a performed analysis and suggest an intention to improve the model. |

The resource types are:

| Name              | MIME Type                                       | Description                                      |
|-------------------|-------------------------------------------------|--------------------------------------------------|
| Intention         | `application/vnd.iris.ai.intention+json`        | Intention expressed through a sentence.                |
| Entity            | `application/vnd.iris.ai.entity+json`           | Entity identified in an intention, with its synonyms.  |
| Question          | `application/vnd.iris.ai.question+json`         | A user's question that is associated with an intention for model training. |
| Answer            | `application/vnd.iris.ai.answer+json`           | Response that can be sent in case a user's intention is identified. |
| Training          | `application/vnd.iris.ai.model-training+json`   | Model training request. |
| Publishing        | `application/vnd.iris.ai.model-publishing+json` | Model publishing request, to make it available for use. |
| Analisys request  | `application/vnd.iris.ai.analysis-request+json` | Sentence analysis request. |
| Analisys response | `application/vnd.iris.ai.analysis-response+json`| Sentence analysis response with the identified intentions and entities. |
| Analisys          | `application/vnd.iris.ai.analysis+json`         | History information about a performed analysis.  |
| Analisys feedback | `application/vnd.iris.ai.analysis-feedback+json`| Feedback information about a performed analysis. |


### Create an entity

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"1",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/entities",
  "type":"application/vnd.iris.ai.entity+json",
  "resource":{
    "name":"Flavor",
    "values":[
      {
        "name":"Pepperoni",
        "synonymous":[
          "Peperoni",
          "Pepperonee",
          "Pepperouni",
          "Peperony"
        ]
      },
      {
        "name":"Mushrooms",
        "synonymous":[
          "Mashrooms",
          "Mushroom",
          "Mshrooms"
        ]
      }
    ]
  }
}
```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"1",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/entities",
  "type":"application/vnd.iris.ai.entity+json",
  "resource":{
    "name":"Flavor",
    "values":[
      {
        "name":"Pepperoni",
        "synonymous":[
          "Peperoni",
          "Pepperonee",
          "Pepperouni",
          "Peperony"
        ]
      },
      {
        "name":"Mushrooms",
        "synonymous":[
          "Mashrooms",
          "Mushroom",
          "Mshrooms"
        ]
      }
    ]
  }
}
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"1",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/entities",
  "type":"application/vnd.iris.ai.entity+json",
  "resource":{
    "name":"Flavor",
    "values":[
      {
        "name":"Pepperoni",
        "synonymous":[
          "Peperoni",
          "Pepperonee",
          "Pepperouni",
          "Peperony"
        ]
      },
      {
        "name":"Mushrooms",
        "synonymous":[
          "Mashrooms",
          "Mushroom",
          "Mshrooms"
        ]
      }
    ]
  }
}

```


```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.entity+json",
  "resource": {
      "id": "flavor"
  }
}
```


```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.entity+json",
  "resource": {
      "id": "flavor"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.entity+json",
  "resource": {
      "id": "flavor"
  }
}
```

### Create an intention

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "2",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "name": "Order pizza"
  }
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "2",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "name": "Order pizza"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "2",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "name": "Order pizza"
  }
}

```


```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "2",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "id": "order_pizza"
  }
}
```


```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "2",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "id": "order_pizza"
  }
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "2",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "id": "order_pizza"
  }
}
```

### Delete an intent

Where `{intention_id}` is the intention identifier of an already created intention.

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "delete",
  "uri": "/intentions/{intention_id}",
}
```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "delete",
  "uri": "/intentions/{intention_id}",
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "delete",
  "uri": "/intentions/{intention_id}",
}

```


```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "10",
  "from": "postmaster@ai.msging.net",
  "to": "contact@msging.net/default",
  "method": "delete",
  "status": "success"
}
```


```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "10",
  "from": "postmaster@ai.msging.net",
  "to": "contact@msging.net/default",
  "method": "delete",
  "status": "success"
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "10",
  "from": "postmaster@ai.msging.net",
  "to": "contact@msging.net/default",
  "method": "delete",
  "status": "success"
}
```

### Delete all intents

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "delete",
  "uri": "/intentions"
}
```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "delete",
  "uri": "/intentions"
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "delete",
  "uri": "/intentions"
}

```


```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://botname@msging.net/intentions"
    }
}

```


```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://botname@msging.net/intentions"
    }
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net",
    "to": "contact@msging.net",
    "metadata": {
        "#command.uri": "lime://botname@msging.net/intentions"
    }
}
```



### Query the first 10 intentions

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "3",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/intentions?$skip=0&$take=10"
}

```


```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "3",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/intentions?$skip=0&$take=10"
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "3",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/intentions?$skip=0&$take=10"
}

```
```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "3",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
      "total": 2,
      "itemType": "application/vnd.iris.ai.intention+json",
      "items": [
        {
          "id": "order_pizza",
          "name": "Order pizza"
        },
        {
          "id": "choose_flavor",
          "name": "Choose flavor"
        }
      ]
  }
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "3",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
      "total": 2,
      "itemType": "application/vnd.iris.ai.intention+json",
      "items": [
        {
          "id": "order_pizza",
          "name": "Order pizza"
        },
        {
          "id": "choose_flavor",
          "name": "Choose flavor"
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
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
      "total": 2,
      "itemType": "application/vnd.iris.ai.intention+json",
      "items": [
        {
          "id": "order_pizza",
          "name": "Order pizza"
        },
        {
          "id": "choose_flavor",
          "name": "Choose flavor"
        }
      ]
  }
}
```

### Associate questions to an intention

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "4",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/order_pizza/questions",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.question+json",
    "items":[
      {
        "text": "I want a pizza"
      },
      {
        "text": "I wanna order a pizza"
      },
      {
        "text": "Give me a pizza"
      }
    ]
  }
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "4",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/order_pizza/questions",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.question+json",
    "items":[
      {
        "text": "I want a pizza"
      },
      {
        "text": "I wanna order a pizza"
      },
      {
        "text": "Give me a pizza"
      }
    ]
  }
}

```



```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "4",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/order_pizza/questions",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.question+json",
    "items":[
      {
        "text": "I want a pizza"
      },
      {
        "text": "I wanna order a pizza"
      },
      {
        "text": "Give me a pizza"
      }
    ]
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "4",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

### Associate answers to an intention

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "5",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/order_pizza/answers",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.answer+json",
    "items":[
      {
        "type":"text/plain",
        "value":"Which flavor do you want?"
      }
    ]
  }
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "5",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/order_pizza/answers",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.answer+json",
    "items":[
      {
        "type":"text/plain",
        "value":"Which flavor do you want?"
      }
    ]
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "5",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/order_pizza/answers",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.answer+json",
    "items":[
      {
        "type":"text/plain",
        "value":"Which flavor do you want?"
      }
    ]
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "5",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```
```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "5",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```



```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "5",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

### Get intent's answers

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "10",
    "method": "get",
    "to": "postmaster@ai.msging.net",
    "uri": "/intentions/{intentionId}/answers?skip=0&take=100&ascending=false"
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "10",
    "method": "get",
    "to": "postmaster@ai.msging.net",
    "uri": "/intentions/{intentionId}/answers?skip=0&take=100&ascending=false"
}


```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "10",
    "method": "get",
    "to": "postmaster@ai.msging.net",
    "uri": "/intentions/{intentionId}/answers?skip=0&take=100&ascending=false"
}


```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.ai.answer+json",
        "items": [
            {
                "id": "1",
                "type": "text/plain",
                "value": "Agendaremos pra você"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "9f4d7980-c61a-4e2e-9fa2-233b5ecb2af1",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris2",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/intentions/agendar/answers?skip=0&take=100&ascending=false"
    }
}
```
```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.ai.answer+json",
        "items": [
            {
                "id": "1",
                "type": "text/plain",
                "value": "Agendaremos pra você"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris2",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/intentions/agendar/answers?skip=0&take=100&ascending=false"
    }
}
```
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "application/vnd.iris.ai.answer+json",
        "items": [
            {
                "id": "1",
                "type": "text/plain",
                "value": "Agendaremos pra você"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris2",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/intentions/agendar/answers?skip=0&take=100&ascending=false"
    }
}
```

### Train model

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "6",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/models",
  "type": "application/vnd.iris.ai.model-training+json",
  "resource": {
  }
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "6",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/models",
  "type": "application/vnd.iris.ai.model-training+json",
  "resource": {
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "6",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/models",
  "type": "application/vnd.iris.ai.model-training+json",
  "resource": {
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "6",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "6",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "6",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```
### Query the trained

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "7",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/models"
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "7",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/models"
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "7",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/models"
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "7",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
      "total": 1,
      "itemType": "application/vnd.iris.ai.model+json",
      "items": [
        {
          "id":"d3190b46-c723-4831-b9e8-fe43c1816f80",
          "provider":"Watson",
          "externalId":"b518633d-26f6-454c-bd17-890b426f2d40",
          "storageDate":"2017-07-07T18:13:00.000Z",
          "trainingDate":"2017-07-07T18:13:00.000Z"
        },
        {
          "id":"fa0aa23b-5c62-4b90-9c13-986148c0d171",
          "provider":"Luis",
          "externalId":"713331f2-0375-462d-aa58-ff9b8c5075be",
          "storageDate":"2017-07-07T18:13:00.000Z",
          "trainingDate":"2017-07-07T18:13:00.000Z"
        }
      ]
  }
}
```
```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "7",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
      "total": 1,
      "itemType": "application/vnd.iris.ai.model+json",
      "items": [
        {
          "id":"d3190b46-c723-4831-b9e8-fe43c1816f80",
          "provider":"Watson",
          "externalId":"b518633d-26f6-454c-bd17-890b426f2d40",
          "storageDate":"2017-07-07T18:13:00.000Z",
          "trainingDate":"2017-07-07T18:13:00.000Z"
        },
        {
          "id":"fa0aa23b-5c62-4b90-9c13-986148c0d171",
          "provider":"Luis",
          "externalId":"713331f2-0375-462d-aa58-ff9b8c5075be",
          "storageDate":"2017-07-07T18:13:00.000Z",
          "trainingDate":"2017-07-07T18:13:00.000Z"
        }
      ]
  }
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "7",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
      "total": 1,
      "itemType": "application/vnd.iris.ai.model+json",
      "items": [
        {
          "id":"d3190b46-c723-4831-b9e8-fe43c1816f80",
          "provider":"Watson",
          "externalId":"b518633d-26f6-454c-bd17-890b426f2d40",
          "storageDate":"2017-07-07T18:13:00.000Z",
          "trainingDate":"2017-07-07T18:13:00.000Z"
        },
        {
          "id":"fa0aa23b-5c62-4b90-9c13-986148c0d171",
          "provider":"Luis",
          "externalId":"713331f2-0375-462d-aa58-ff9b8c5075be",
          "storageDate":"2017-07-07T18:13:00.000Z",
          "trainingDate":"2017-07-07T18:13:00.000Z"
        }
      ]
  }
}
```

### Publish model
```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "8",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/models",
  "type": "application/vnd.iris.ai.model-publishing+json",
  "resource": {
    "id":"d3190b46-c723-4831-b9e8-fe43c1816f80"
  }
}

```
```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "8",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/models",
  "type": "application/vnd.iris.ai.model-publishing+json",
  "resource": {
    "id":"d3190b46-c723-4831-b9e8-fe43c1816f80"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "8",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/models",
  "type": "application/vnd.iris.ai.model-publishing+json",
  "resource": {
    "id":"d3190b46-c723-4831-b9e8-fe43c1816f80"
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "8",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "8",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "8",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

### Analyze a sentence in the last published model

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "9",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"I want a pepperoni pizza"
  }
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "9",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"I want a pepperoni pizza"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "9",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"I want a pepperoni pizza"
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "9",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "intentions":[
      {
        "id":"order_pizza",
        "name":"Order pizza",
        "score": 0.95
      }
    ],
    "entities":[
      {
        "id":"flavor",
        "name":"Flavor",
        "value":"Pepperoni"
      }
    ]
  }
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "9",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "intentions":[
      {
        "id":"order_pizza",
        "name":"Order pizza",
        "score": 0.95
      }
    ],
    "entities":[
      {
        "id":"flavor",
        "name":"Flavor",
        "value":"Pepperoni"
      }
    ]
  }
}
```



```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "9",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "intentions":[
      {
        "id":"order_pizza",
        "name":"Order pizza",
        "score": 0.95
      }
    ],
    "entities":[
      {
        "id":"flavor",
        "name":"Flavor",
        "value":"Pepperoni"
      }
    ]
  }
}
```

### Analyze a sentence with a specific model

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "modelId":"fa0aa23b-5c62-4b90-9c13-986148c0d171"
  }
}

```
```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}### Analyze a sentence with a specific model

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "modelId":"fa0aa23b-5c62-4b90-9c13-986148c0d171"
  }
}


{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "modelId":"fa0aa23b-5c62-4b90-9c13-986148c0d171"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "modelId":"fa0aa23b-5c62-4b90-9c13-986148c0d171"
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "10",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "intentions":[
      {
        "id":"order_pizza",
        "name":"Order pizza",
        "score": 0.95
      }
    ],
    "entities":[
      {
        "id":"flavor",
        "name":"Flavor",
        "value":"Pepperoni"
      }
    ]
  }
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "10",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "intentions":[
      {
        "id":"order_pizza",
        "name":"Order pizza",
        "score": 0.95
      }
    ],
    "entities":[
      {
        "id":"flavor",
        "name":"Flavor",
        "value":"Pepperoni"
      }
    ]
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "10",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"I want a pepperoni pizza",
    "intentions":[
      {
        "id":"order_pizza",
        "name":"Order pizza",
        "score": 0.95
      }
    ],
    "entities":[
      {
        "id":"flavor",
        "name":"Flavor",
        "value":"Pepperoni"
      }
    ]
  }
}
```

###Get the last 10 analysis

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "11",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/analysis?$take=10&$filter=feedback%20eq%20none"
}
```
```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "11",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/analysis?$take=10&$filter=feedback%20eq%20none"
}
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "11",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/analysis?$take=10&$filter=feedback%20eq%20none"
}
```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "11",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType":"application/vnd.iris.ai.analysis+json",
    "items":[
      {
        "id": "7363369c-8c99-4293-883f-aaabac7dd822",
        "requestDateTime": "2017-07-13T12:28:14.040Z",
        "text": "quero uma pizza marguerita",
        "intention": "I want a pepperoni pizza",
        "score": 1.0,
        "intentions": [
          {
            "id":"order_pizza",
            "name":"Order pizza",
            "score": 1.0
          }
        ],
        "entities": [
          {
            "id":"flavor",
            "name":"Flavor",
            "value":"Pepperoni"
          }
        ],
      }
    ]
  }
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "11",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType":"application/vnd.iris.ai.analysis+json",
    "items":[
      {
        "id": "7363369c-8c99-4293-883f-aaabac7dd822",
        "requestDateTime": "2017-07-13T12:28:14.040Z",
        "text": "quero uma pizza marguerita",
        "intention": "I want a pepperoni pizza",
        "score": 1.0,
        "intentions": [
          {
            "id":"order_pizza",
            "name":"Order pizza",
            "score": 1.0
          }
        ],
        "entities": [
          {
            "id":"flavor",
            "name":"Flavor",
            "value":"Pepperoni"
          }
        ],
      }
    ]
  }
}
```



```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "11",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType":"application/vnd.iris.ai.analysis+json",
    "items":[
      {
        "id": "7363369c-8c99-4293-883f-aaabac7dd822",
        "requestDateTime": "2017-07-13T12:28:14.040Z",
        "text": "quero uma pizza marguerita",
        "intention": "I want a pepperoni pizza",
        "score": 1.0,
        "intentions": [
          {
            "id":"order_pizza",
            "name":"Order pizza",
            "score": 1.0
          }
        ],
        "entities": [
          {
            "id":"flavor",
            "name":"Flavor",
            "value":"Pepperoni"
          }
        ],
      }
    ]
  }
}
```

### Send an 'approved' feedback

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```
```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "12",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "12",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "12",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

### Send a 'rejected' feedback

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"13",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"rejected",
    "intentionId":"other_intention"
  }
}

```
```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"13",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"rejected",
    "intentionId":"other_intention"
  }
}

```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"13",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"rejected",
    "intentionId":"other_intention"
  }
}

```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "13",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```
```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "13",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "13",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```
###Send enhancement analysis models by email

While the filter can be sended empty.

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
   "id":"10",
   "method":"set",
   "resource":{  
      "email":"test%40take.net",
      "filter":"requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
   },
   "to":"postmaster@ai.msging.net",
   "type":"application/json",
   "uri":"/enhancement/send-by-email"
}
```
```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
   "id":"10",
   "method":"set",
   "resource":{  
      "email":"test%40take.net",
      "filter":"requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
   },
   "to":"postmaster@ai.msging.net",
   "type":"application/json",
   "uri":"/enhancement/send-by-email"
}
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
   "id":"10",
   "method":"set",
   "resource":{  
      "email":"test%40take.net",
      "filter":"requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
   },
   "to":"postmaster@ai.msging.net",
   "type":"application/json",
   "uri":"/enhancement/send-by-email"
}
```

```csharp
HTTP/1.1 200 OK
Content-Type: application/json

{  
   "id":"10",
   "method":"set",
   "resource":{  
      "email":"test%40take.net",
      "filter":"requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
   },
   "to":"postmaster@ai.msging.net",
   "type":"application/json",
   "uri":"/enhancement/send-by-email"
}
```

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{  
   "id":"10",
   "method":"set",
   "resource":{  
      "email":"test%40take.net",
      "filter":"requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
   },
   "to":"postmaster@ai.msging.net",
   "type":"application/json",
   "uri":"/enhancement/send-by-email"
}
```



```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  {
    "method": "set",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris1",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/enhancement/send-by-email"
    }
}
```

### Get version's models

```javascript
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "10",
    "to": "postmaster@ai.msging.net",
    "method": "get",
    "uri": "/analytics/confusion-matrix"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.ai.confusion-matrix+json",
        "items": [
            {
                "OwnerIdentity": "botbot1@msging.net",
                "id": "acabea5d-f9d8-44ff-ad7a-0743e92263dc",
                "modelId": "botbot1_5fcc572f-f9c5-47f9-964f-016ac7541425",
                "version": "Reportão",
                "score": 0,
                "sampleSize": 30,
                "createdDate": "2019-05-17T21:18:33.540Z",
                "accuracy": 0.96,
                "avgScore": 0.61698660140000006,
                "precision": 0.92207792207792216,
                "recall": 0.90238095238095239,
                "f1Score": 0.980796980796981,
                "numberOfSamples": 50
            },
            {
                "OwnerIdentity": "botbot1@msging.net",
                "id": "4dcb1b00-dc95-488e-a38f-95f8d213f842",
                "modelId": "botbot1_5fcc572f-f9c5-47f9-964f-016ac7541425",
                "version": "Reportão",
                "score": 0,
                "sampleSize": 30,
                "createdDate": "2019-05-17T21:18:30.520Z",
                "accuracy": 1,
                "avgScore": 0.67095285047619058,
                "precision": 1,
                "recall": 1,
                "f1Score": 1,
                "numberOfSamples": 21
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "71c0b1f1-332d-498e-afa6-792dbe86d464",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris1",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/analytics/confusion-matrix"
    }
}
```

```csharp
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "10",
    "to": "postmaster@ai.msging.net",
    "method": "get",
    "uri": "/analytics/confusion-matrix"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.ai.confusion-matrix+json",
        "items": [
            {
                "OwnerIdentity": "botbot1@msging.net",
                "id": "acabea5d-f9d8-44ff-ad7a-0743e92263dc",
                "modelId": "botbot1_5fcc572f-f9c5-47f9-964f-016ac7541425",
                "version": "Reportão",
                "score": 0,
                "sampleSize": 30,
                "createdDate": "2019-05-17T21:18:33.540Z",
                "accuracy": 0.96,
                "avgScore": 0.61698660140000006,
                "precision": 0.92207792207792216,
                "recall": 0.90238095238095239,
                "f1Score": 0.980796980796981,
                "numberOfSamples": 50
            },
            {
                "OwnerIdentity": "botbot1@msging.net",
                "id": "4dcb1b00-dc95-488e-a38f-95f8d213f842",
                "modelId": "botbot1_5fcc572f-f9c5-47f9-964f-016ac7541425",
                "version": "Reportão",
                "score": 0,
                "sampleSize": 30,
                "createdDate": "2019-05-17T21:18:30.520Z",
                "accuracy": 1,
                "avgScore": 0.67095285047619058,
                "precision": 1,
                "recall": 1,
                "f1Score": 1,
                "numberOfSamples": 21
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "71c0b1f1-332d-498e-afa6-792dbe86d464",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris1",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/analytics/confusion-matrix"
    }
}
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "10",
    "to": "postmaster@ai.msging.net",
    "method": "get",
    "uri": "/analytics/confusion-matrix"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 2,
        "itemType": "application/vnd.iris.ai.confusion-matrix+json",
        "items": [
            {
                "OwnerIdentity": "botbot1@msging.net",
                "id": "acabea5d-f9d8-44ff-ad7a-0743e92263dc",
                "modelId": "botbot1_5fcc572f-f9c5-47f9-964f-016ac7541425",
                "version": "Reportão",
                "score": 0,
                "sampleSize": 30,
                "createdDate": "2019-05-17T21:18:33.540Z",
                "accuracy": 0.96,
                "avgScore": 0.61698660140000006,
                "precision": 0.92207792207792216,
                "recall": 0.90238095238095239,
                "f1Score": 0.980796980796981,
                "numberOfSamples": 50
            },
            {
                "OwnerIdentity": "botbot1@msging.net",
                "id": "4dcb1b00-dc95-488e-a38f-95f8d213f842",
                "modelId": "botbot1_5fcc572f-f9c5-47f9-964f-016ac7541425",
                "version": "Reportão",
                "score": 0,
                "sampleSize": 30,
                "createdDate": "2019-05-17T21:18:30.520Z",
                "accuracy": 1,
                "avgScore": 0.67095285047619058,
                "precision": 1,
                "recall": 1,
                "f1Score": 1,
                "numberOfSamples": 21
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "71c0b1f1-332d-498e-afa6-792dbe86d464",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris1",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/analytics/confusion-matrix"
    }
}
```