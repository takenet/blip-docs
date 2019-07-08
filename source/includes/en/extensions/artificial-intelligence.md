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

Defining the entities present in user phrases.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/entities',
    type: 'application/vnd.iris.ai.entity+json',
    resource: {
      name: 'Flavor',
      values: [
        {
          name: 'Pepperoni',
          synonymous: [
            'Peperoni',
            'Pepperonee',
            'Pepperouni',
            'Peperony'
          ]
        },
        {
          name: 'Mushrooms',
          synonymous: [
            'Mashrooms',
            'Mushroom',
            'Mshrooms'
          ]
        }
      ]
    }
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "1",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/entities",
  "type": "application/vnd.iris.ai.entity+json",
  "resource": {
    "name": "Flavor",
    "values": [
      {
        "name": "Pepperoni",
        "synonymous": [
          "Peperoni",
          "Pepperonee",
          "Pepperouni",
          "Peperony"
        ]
      },
      {
        "name": "Mushrooms",
        "synonymous": [
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
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.iris.ai.entity+json",
  "resource": {
    "id": "flavor"
  },
  "method": "set",
  "status": "success",
  "id": "1",
  "from": "postmaster@ai.msging.net/#az-iris6",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/entities"
  }
}
```


```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

namespace Extensions
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }

        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var entity = new Entity{
                Name = "Flavor",
                Values = new [] { 
                    new EntityValues {
                        Name = "Pepperoni",
                        Synonymous = new [] {
                            "Peperoni",
                            "Pepperonee",
                            "Pepperouni",
                            "Peperony"
                        },
                    },
                    new EntityValues {
                        Name = "Mushrooms",
                        Synonymous = new [] {
                            "Mashrooms",
                            "Mushroom",
                            "Mshrooms"
                        }
                    }
                }
            };

            await _artificialIntelligenceExtension.SetEntityAsync(entity, cancellationToken);
        }
    }
}
```

### Create an intention

Defining how the chatbot should interpret and respond to the user.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/intentions',
    type: 'application/vnd.iris.ai.intention+json',
    resource: {
      name: 'Order pizza'
    }
  });
});
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

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
    "id": "order_pizza"
  },
  "method": "set",
  "status": "success",
  "id": "2",
  "from": "postmaster@ai.msging.net/#az-iris2",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/intentions"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var intention = new Intention { Name = "Order pizza" };

            await _artificialIntelligenceExtension.SetIntentionAsync(intention, cancellationToken);
        }
    }
}
```

### Delete an intention

Deleting an intention, where `{intention_id}` is the intention identifier of an already created intention.

<aside class="notice">
Note: Remember to replace the variable <b>{intention_id}</b> for the intention identifier you want to delete.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.DELETE,
    uri: '/intentions/{intention_id}',
  });
});
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

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "delete",
  "status": "success",
  "id": "10",
  "from": "postmaster@ai.msging.net/#az-iris4",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/intentions/{intention_id}"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly ISender _sender;

        public ArtificialIntelligenceReceiver(ISender sender)
        {
           _sender = sender;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var command = new Command{
                Id = EnvelopeId.NewId(),
                Method = CommandMethod.Delete,
                Uri = new LimeUri("/intentions/{intention_id}")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
    }
}
```

### Query the first 10 intentions

Querying the first 10 intentions.

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **skip** | The number of intentions to be skipped.                                |    0    |
| **take** | The number of intentions to be returned.                               |   100   |
| **ascending** | Sets ascending alphabetical order.                                |    -    |

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  var intentions = await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/intentions?$skip=0&$take=10',
  });
  
  intentions.resource.items.forEach(function (item) {
    console.log(item);
  });
});
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

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 2,
    "itemType": "application/vnd.iris.ai.intention+json",
    "items": [
      {
        "id": "order_pizza",
        "name": "Order pizza",
        "healthScore": 0,
        "storageDate": "2019-06-26T17:37:56.570Z"
      },
      {
        "id": "choose_flavor",
        "name": "Choose flavor",
        "healthScore": 0,
        "storageDate": "2019-06-26T17:38:08.880Z"
      }
    ]
  },
  "method": "get",
  "status": "success",
  "id": "3",
  "from": "postmaster@ai.msging.net/#az-iris2",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/intentions?$skip=0&$take=10"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver4 : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver4(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var intentions = await _artificialIntelligenceExtension.GetIntentionsAsync(0, 10, cancellationToken: cancellationToken);
        }
    }
}
```

### Associate questions to an intention

Associating examples of questions from the user. A variety of examples may be added to train the artificial intelligence model.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/intentions/order_pizza/questions',
    type: 'application/vnd.lime.collection+json',
    resource: {
      itemType: 'application/vnd.iris.ai.question+json',
      items: [
        {
          text: 'I want a pizza'
        },
        {
          text: 'I wanna order a pizza'
        },
        {
          text: 'Give me a pizza'
        }
      ]
    }
  });
});
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

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "set",
  "status": "success",
  "id": "4",
  "from": "postmaster@ai.msging.net/#az-iris5",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/intentions/order_pizza/questions"
  }
}
```

```csharp
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var intentionId = "order_pizza";

            var questions = new List<Question>(){
                new Question{ Text = "I want a pizza" },
                new Question{ Text = "I wanna order a pizza" },
                new Question{ Text = "Give me a pizza" }
            };

            await _artificialIntelligenceExtension.SetQuestionsAsync(intentionId, questions, cancellationToken);
        }
    }
}
```

### Associate answers to an intention

Associating possible answers to send to the user. 

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/intentions/order_pizza/answers',
    type: 'application/vnd.lime.collection+json',
    resource: {
      itemType: 'application/vnd.iris.ai.answer+json',
      items: [
        {
          type: 'text/plain',
          value: 'Which flavor do you want?'
        }
      ]
    }
  });
});
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

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "set",
  "status": "success",
  "id": "5",
  "from": "postmaster@ai.msging.net/#az-iris1",
  "to": "contact@msging.net",
  "metadata": {
      "#command.uri": "lime://contact@msging.net/intentions/order_pizza/answers"
  }
}
```

```csharp
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var intentionId = "order_pizza";

            var answers = new List<Answer>(){ new Answer{ Value = "Which flavor do you want?" } };

            await _artificialIntelligenceExtension.SetAnswersAsync(intentionId, answers, cancellationToken);
        }
    }
}
```

### Train model

Before you train an artificial intelligence model, you need to configure the artificial intelligence provider that will be associeated with chatbot and add user intentions to the model.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/models',
    type: 'application/vnd.iris.ai.model-training+json',
    resource: {}
  });
});
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
  "resource": {}
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "set",
  "status": "success",
  "id": "6",
  "from": "postmaster@ai.msging.net/#az-iris1",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/models"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            await _artificialIntelligenceExtension.TrainModelAsync(cancellationToken);
        }
    }
}
```

### Query the trained

Querying information about created models.

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **skip** | The number of models to be skipped.                                    |    0    |
| **take** | The number of models to be returned.                                   |   100   |
| **ascending** | Sets ascending alphabetical order.                                |    -    |

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  var models = await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/models',
  });

  models.resource.items.forEach(function (item) {
    console.log(item);
  });
});
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

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 4,
    "itemType": "application/vnd.iris.ai.model+json",
    "items": [
      {
        "id": "12345",
        "culture": "pt-br",
        "provider": "Watson",
        "externalId": "678910",
        "storageDate": "2019-07-01T13:35:36.930Z",
        "trainingDate": "2019-07-01T13:35:36.930Z",
        "apiUri": "https://gateway.watsonplatform.net/assistant/api",
        "status": "Training"
      },
      {
        "id": "111213",
        "culture": "pt-br",
        "provider": "Dialogflow",
        "externalId": "141516",
        "storageDate": "2019-07-01T13:35:34.330Z",
        "trainingDate": "2019-07-01T13:35:34.330Z",
        "status": "Trained"
      },
      {
        "id": "171819",
        "culture": "pt-br",
        "provider": "Watson",
        "storageDate": "2019-07-01T13:28:05.520Z",
        "trainingDate": "2019-07-01T13:28:05.520Z",
        "apiUri": "https://gateway.watsonplatform.net/assistant/api",
        "status": "Deleted"
      },
      {
        "id": "202122",
        "culture": "pt-br",
        "provider": "Dialogflow",
        "storageDate": "2019-07-01T13:28:01.870Z",
        "trainingDate": "2019-07-01T13:28:01.870Z",
        "status": "Deleted"
      }
    ]
  },
  "method": "get",
  "status": "success",
  "id": "7",
  "from": "postmaster@ai.msging.net/#az-iris5",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/models"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var models = await _artificialIntelligenceExtension.GetModelsAsync(0, 100, cancellationToken: cancellationToken);
        }
    }
}
```

### Publish model

Publishing an existing artificial intelligence model.

<aside class="notice">
Note: Remember to replace the variable <b>{your_model_id}</b> for the model identifier you want to publish.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/models',
    type: 'application/vnd.iris.ai.model-publishing+json',
    resource: {
      id: '{your_model_id}'
    }
  });
});
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
    "id": "{your_model_id}"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "set",
  "status": "success",
  "id": "8",
  "from": "postmaster@ai.msging.net/#az-iris2",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/models"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            await _artificialIntelligenceExtension.PublishModelAsync("{your_model_id}", cancellationToken);
        }
    }
}
```

### Analyze a sentence with a specific model

It is possible to analyze a sentence with a specific model, to improve the model. 

<aside class="notice">
Note: Remember to replace the variable <b>modelId</b> for the model identifier you want to use (for instance: <b>12345</b>).
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  var result = await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/analysis',
    type: 'application/vnd.iris.ai.analysis-request+json',
    resource: {
      text: 'I want a pepperoni pizza',
      modelId: '12345'
    }
  });

  result.resource.intentions.forEach(function (intention) {
    console.log(intention);
  });
  
  result.resource.entities.forEach(function (entity) {
    console.log(entity);
  });
});
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
    "modelId":"12345"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "id": "456789",
    "text": "i want a pepperoni pizza",
    "intentions": [
      {
        "id": "order_pizza",
        "name": "Order pizza",
        "score": 0.5535872,
        "answer": {
          "id": "1",
          "type": "text/plain",
          "value": "Which flavor do you want?"
        }
      }
    ],
    "entities": [
      {
        "id": "flavor",
        "name": "Flavor",
        "value": "pepperoni"
      }
    ],
    "provider": "Dialogflow",
    "modelId": "12345"
  },
  "method": "set",
  "status": "success",
  "id": "10",
  "from": "postmaster@ai.msging.net/#az-iris4",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/analysis"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver10 : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver10(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var analysisRequest = new AnalysisRequest{
                Text = "I want a pepperoni pizza",
                ModelId = "12345"
            };

            var result = await _artificialIntelligenceExtension.AnalyzeAsync(analysisRequest, cancellationToken);
        }
    }
}
```

###Get the last 10 analysis

```javascript

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

```csharp

```

### Send an 'approved' feedback

Sending positive feedback about an analysis.

<aside class="notice">
Note: Remember to replace the variable <b>{analyze_id}</b> for the analyze identifier you want to approve.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/analysis/{analyze_id}/feedback',
    type: 'application/vnd.iris.ai.analysis-feedback+json',
    resource: {
      feedback: 'approved'
    }
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id":"12",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/{analyze_id}/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"approved"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "set",
  "status": "success",
  "id": "12",
  "from": "postmaster@ai.msging.net/#az-iris3",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/analysis/{analyze_id}/feedback"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var analysisFeedback = new AnalysisFeedback{
                Feedback = AnalysisModelFeedback.Approved
            };

            await _artificialIntelligenceExtension.SendFeedbackAsync("{analyze_id}", analysisFeedback, cancellationToken);
        }
    }
}
```

### Send a 'rejected' feedback

To submit a rejection feedback, it is necessary to enter the id of the correct intention for the case.

<aside class="notice">
Note: Remember to replace the variable <b>{analyze_id}</b> for the analyze id you want to reject and <b>{other_intention_id}</b> for the intention identifier you really want to use.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/analysis/{analyze_id}/feedback',
    type: 'application/vnd.iris.ai.analysis-feedback+json',
    resource: {
      feedback: 'rejected',
      intentionId: '{other_intention_id}}'
    }
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "13",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis/{analyze_id}/feedback",
  "type": "application/vnd.iris.ai.analysis-feedback+json",
  "resource": {
    "feedback": "rejected"
    "intentionId": "{other_intention_id}}"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "method": "set",
  "status": "success",
  "id": "13",
  "from": "postmaster@ai.msging.net/#az-iris3",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/analysis/{analyze_id}/feedback"
  }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Extensions.ArtificialIntelligence;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

namespace Extension
{
    public class ArtificialIntelligenceReceiver : IMessageReceiver
    {
        private readonly IArtificialIntelligenceExtension _artificialIntelligenceExtension;

        public ArtificialIntelligenceReceiver(IArtificialIntelligenceExtension artificialIntelligenceExtension)
        {
            _artificialIntelligenceExtension = artificialIntelligenceExtension;
        }
        
        public async Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            var analysisFeedback = new AnalysisFeedback{
                Feedback = AnalysisModelFeedback.Rejected,
                IntentionId = "{other_intention_id}"
            };

            await _artificialIntelligenceExtension.SendFeedbackAsync("{analyze_id}", analysisFeedback, cancellationToken);
        }
    }
}
```