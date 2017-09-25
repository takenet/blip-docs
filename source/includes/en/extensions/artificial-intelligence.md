## Artificial Intelligence

```json
//Examples

//1 - Creating an entity:

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
//Response on success:

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

//2 - Creating an intention:

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
//Response on success:

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

//3 - Quering the first 10 intentions:

{  
  "id": "3",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/intentions?$skip=0&$take=10"
}
//Response on success:

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

//4 - Associating questions to an intention:

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
//Response on success:

{
  "id": "4",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//5 - Associating answers to an intention:

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
//Response on success:

{
  "id": "5",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//6 - Training the mode in all registered providers:

{  
  "id": "6",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/models",
  "type": "application/vnd.iris.ai.model-training+json",
  "resource": {  
  }  
}
//Response on success:

{
  "id": "6",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//7 - Quering the trained models:

{  
  "id": "7",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/models"
}
//Response on success:

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

//8 - Publishing a trained model:

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
//Resposta em caso de sucesso:

{
  "id": "8",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}

//9 - Analysing a sentence in the last published model in the default provider (defined in portal):

{  
  "id": "9",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "uri": {
    "text":"I want a pepperoni pizza"
  }
}
//Response on success:

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

//10 - Analysing a sentence with a specific model:

{  
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "uri": {
    "text":"I want a pepperoni pizza",
    "modelId":"fa0aa23b-5c62-4b90-9c13-986148c0d171"
  }
}
//Response on success:

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

//11 - Retrieving the last 10 performed analysis that doesn't have feedback:

{  
  "id": "11",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/analysis?$take=10&$filter=feedback%20eq%20none"
}
//Response on success:

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

//12 - Sending an 'approved' feedback to a performed analysis:

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
//Response on success:

{
  "id": "12",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"  
}

//13 - Sending a 'rejected' feedback to a performed analysis, passing the correct intention:

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
//Resposta em caso de sucesso:

{
  "id": "13",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"  
}
```


| Address                         |
|---------------------------------|
| postmaster@ai.msging.net        |

The  **Artificial Intelligence** extension allows the creation, training and publication of artificial intelligence models in the providers associated with chatbot, besides performing sentence analysis to identify intentions and entities. The configuration of the chatbot providers is done through the **Artificial Intelligence**  menu in the [BLiP portal] (https://portal.blip.ai).

You can associate **response documents** with the model that should be submitted when an intent is matched in a sentence. In addition, the extension can be used to improve the model by associating questions with intentions.

The training of the model is performed simultaneously on all of the AI ​​providers associated with chatbot. In that case, a snapshot of the model is stored and can be retrieved later to compare its effectiveness with other versions. To use a trained template, you must publish it.

All manipulation of the model can be done through the portal of the BLiP, and this extension can be used only to perform the **analysis of sentences** of the users of the chabot.

#### Resources

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
| `/analysis/{id}/feedback`         | `set`    | Allows provide a feedback to a performed analysis and suggest an intention to improve the model. |

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

