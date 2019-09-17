## Artificial Intelligence

| Address                         |
|---------------------------------|
| postmaster@ai.msging.net        |

The  **Artificial Intelligence** extension allows the creation, training and publication of artificial intelligence models in the providers associated with the chatbot, besides performing sentence analysis to identify intents and entities. The configuration of the chatbot providers is done through the **Artificial Intelligence**  menu in the [BLiP portal] (https://portal.blip.ai).

You can associate **response documents** with the model that should be submitted when an intent is matched in a sentence. In addition, the extension can be used to improve the model by associating questions with intents.

The training of the model is performed simultaneously on all of the AI ​​providers associated with chatbot. In that case, a snapshot of the model is stored and can be retrieved later to compare its effectiveness with other versions. To use a trained template, you must publish it.

All manipulation of the model can be done through the portal of the BLiP, and this extension can be used only to perform the **analysis of sentences** of the users of the chabot.

**API Resources**

| URI                               | Method   | Description                                |
|-----------------------------------|----------|--------------------------------------------|
| `/intentions`                     | `set`    | Creates a new intent. The `id` of the intent is returned in the command response. |
| `/intentions`                     | `get`    | Search in all intents that are associated to the chatbot. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/intentions/{id}`                | `get`    | Retrieves an intent by its `id`.           |
| `/entities`                       | `set`    | Creates a new entity. The `id` of the entity is returned in the command response. |
| `/entities`                       | `get`    | Search in all intents that are associated to the chatbot. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/entities/{id}`                  | `get`    | Retrieves an entity by its `id`.           |
| `/intentions/{id}/questions`      | `set`    | Create questions associated to the intent `id`. |
| `/intentions/{id}/questions`      | `get`    | Search in all questions that are associated to the intent `id`. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/intentions/{id}/questions/{qid}`| `delete` | Removes the question with id `qid`.          |
| `/intentions/{id}/answers`        | `set`    | Create answers associated to the intent `id`. |
| `/intentions/{id}/answers`        | `get`    | Search in all answers that are associated to the intent `id`. It is possible to paginate the request using `$skip` and `$take` arguments. |
| `/intentions/{id}/answers/{aid}`  | `delete` | Removes the answer with id `aid`.          |
| `/models`                         | `set`    | Executes the training or publishing of the model. The action depends of the type of the resource (see the table below). |
| `/models`                         | `get`    | Search in all trained and/or published models. |
| `/analysis`                       | `set`    | Analyzes an user sentence using a published model. |
| `/analysis`                       | `get`    | Retrieves the history of performed analysis. It is possible to paginate the request using using `$skip` and `$take` arguments and filter with `$filter`, using the [OData syntax](http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#FilterSystemQueryOption). |
| `/analysis/{id}/feedback`         | `set`    | Provides feedback to a performed analysis and suggest an intent to improve the model. |

The resource types are:

| Name              | MIME Type                                       | Description                                      |
|-------------------|-------------------------------------------------|--------------------------------------------------|
| Intent         | `application/vnd.iris.ai.intention+json`        | Intent expressed through a sentence.                |
| Entity            | `application/vnd.iris.ai.entity+json`           | Entity identified in an intent, with its synonyms.  |
| Question          | `application/vnd.iris.ai.question+json`         | A user's question that is associated with an intent for model training. |
| Answer            | `application/vnd.iris.ai.answer+json`           | Response that can be sent in case a user's intent is identified. |
| Training          | `application/vnd.iris.ai.model-training+json`   | Model training request. |
| Publishing        | `application/vnd.iris.ai.model-publishing+json` | Model publishing request, to make it available for use. |
| Analisys request  | `application/vnd.iris.ai.analysis-request+json` | Sentence analysis request. |
| Analisys response | `application/vnd.iris.ai.analysis-response+json`| Sentence analysis response with the identified intents and entities. |
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

### Create an intent

The set intent command creates a new intent, or set of intents, and cleans the old intents on the knowledge base.

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

### Merge an intent into a base

The merge intent command creates a new intent, or set of intents, and merges them into the knowledge base without deleting the old intents.
Note that there is currently no implementation for this method using the C# SDK.

Defining how the chatbot should interpret and respond to the user.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.MERGE,
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
  "method": "merge",
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
  "method": "merge",
  "status": "success",
  "id": "2",
  "from": "postmaster@ai.msging.net/#az-iris2",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/intentions"
  }
}
```

### Delete an intent

Deleting an intent, where `{intent_id}` is the intent identifier of an already created intent.

<aside class="notice">
Note: Remember to replace the variable <b>{intent_id}</b> for the intent identifier you want to delete.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.DELETE,
    uri: '/intentions/{intent_id}',
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
  "uri": "/intentions/{intent_id}",
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
    "#command.uri": "lime://contact@msging.net/intentions/{intent_id}"
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
                Uri = new LimeUri("/intentions/{intent_id}")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
    }
}
```

### Delete all intents

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
                Uri = new LimeUri("/intentions")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
    }
}
```

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.DELETE,
    uri: '/intentions'    
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
  "uri": "/intentions"
}

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

### Query the first 10 intents

Querying the first 10 intents.

| Property     | Description                                                        | Example |
|--------------|--------------------------------------------------------------------|---------|
| **skip** | The number of intents to be skipped.                                |    0    |
| **take** | The number of intents to be returned.                               |   100   |
| **ascending** | Sets ascending alphabetical order.                                |    -    |

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  var intents = await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/intentions?$skip=0&$take=10',
  });
  
  intents.resource.items.forEach(function (item) {
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

### Associate questions to an intent

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
            var intentId = "order_pizza";

            var questions = new List<Question>(){
                new Question{ Text = "I want a pizza" },
                new Question{ Text = "I wanna order a pizza" },
                new Question{ Text = "Give me a pizza" }
            };

            await _artificialIntelligenceExtension.SetQuestionsAsync(intentId, questions, cancellationToken);
        }
    }
}
```

### Get questions from intent

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/intentions/order_pizza/questions'
  });
});
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
            var intentId = "order_pizza";
            var skip = 0; //optional
            var take = 100; //optional
            var ascending = true; //optional

            await _artificialIntelligenceExtension.GetQuestionsAsync(intentId, cancellationToken);
        }
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
  "uri": "/intentions/pesquisa_veiculo/questions"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 33,
        "itemType": "application/vnd.iris.ai.question+json",
        "items": [
            {
                "id": "32",
                "text": "O carro saiu de linha?"
            },
            {
                "id": "33",
                "text": "Qual o valor do fiat"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris1",l
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/intentions/pesquisa_veiculo/questions"
    }
}
```

### Associate answers to an intent

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
            var intentId = "order_pizza";

            var answers = new List<Answer>(){ new Answer{ Value = "Which flavor do you want?" } };

            await _artificialIntelligenceExtension.SetAnswersAsync(intentId, answers, cancellationToken);
        }
    }
}
```

### Get intent's answers

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
            var intentId = "order_pizza";
            var skip = 0; //optional
            var take = 100; //optional
            var ascending = true; //optional

            await _artificialIntelligenceExtension.GetAnswersAsync(intentId, cancellationToken);
        }
    }
}

```

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/intentions/{intentId}/answers?skip=0&take=100&ascending=false'
  });
});
```


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "10",
    "method": "get",
    "to": "postmaster@ai.msging.net",
    "uri": "/intentions/{intentId}/answers?skip=0&take=100&ascending=false"
}

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

### Delete answer from intent

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.DELETE,
    uri: '/intentions/{intentId}/answers/{answerId}'
  });
});
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
                Uri = new LimeUri("/intentions/{intentId}/answers/{answerId}")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
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
  "method": "delete",
  "uri": "/intentions/{intentId}/answers/{answerId}"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris1",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/intentions/pesquisa_veiculo/answers/1"
    }
}
```

### Train model

Before you train an artificial intelligence model, you need to configure the artificial intelligence provider that will be associated with chatbot and add user intents to the model.

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

### Analyze a sentence in the last published model

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

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
                Method = CommandMethod.Set,
                Uri = new LimeUri("/analysis"),
                Type = 'application/vnd.iris.ai.analysis-request+json',
                Resource = new AnalysisRequest {
                  Text = 'I want a pepperoni pizza'
                }
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
    }
}
```

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: '/analysis',
    type: 'application/vnd.iris.ai.analysis-request+json',
    resource: {
      text: 'I want a pepperoni pizza'
    }
  });
});
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

  result.resource.intentions.forEach(function (intent) {
    console.log(intent);
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

Getting the last 10 analysis given by the artificial intelligence provider for user phrases.

| Property     | Description                                                          | Example |
|--------------|----------------------------------------------------------------------|---------|
| **skip** | The number of analysis to be skipped.                                    |    0    |
| **take** | The number of analysis to be returned.                                   |   100   |

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  var analisys = await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/analysis?$skip=0&$take=10',
  });

  analisys.resource.items.forEach(function (item) {
    console.log(item);
  });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "11",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/analysis?$skip=0&$take=10"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "total": 6,
    "itemType": "application/vnd.iris.ai.analysis+json",
    "items": [
      {
        "id": "2b05bb98-b470-475c-a6fb-016bb411bfb9",
        "requestDateTime": "2019-07-02T19:03:09.660Z",
        "text": "i want a pepperoni pizza",
        "intention": "order_pizza",
        "score": 0.9580827713012696,
        "intentions": [
          {
            "id": "order_pizza",
            "name": "Order pizza",
            "score": 0.9580827713012696,
            "answer": {
              "id": "1",
              "type": "text/plain",
              "value": "{}"
            }
          },
          {
            "id": "help",
            "name": "help",
            "score": 0.24191724956035615
          }
        ],
        "entities": [
          {
            "id": "flavor",
            "name": "Flavor",
            "value": "pepperoni"
          }
        ]
      },
      {
        "id": "d011e14d-5bb6-4dce-82c7-016bb308a973",
        "requestDateTime": "2019-07-02T14:13:36.040Z",
        "text": "i want a mushrooms pizza",
        "intention": "order_pizza",
        "score": 0.5515909,
        "intentions": [
          {
            "id": "order_pizza",
            "name": "Order pizza",
            "score": 0.5515909,
            "answer": {
              "id": "1",
              "type": "text/plain",
              "value": "{}"
            }
          }
        ],
        "entities": [
          {
            "id": "flavor",
            "name": "Flavor",
            "value": "mushrooms"
          }
        ]
      },
      {
        "id": "a3d8e978-a57b-4f0f-9abc-016baf4d338a",
        "requestDateTime": "2019-07-01T20:49:58.980Z",
        "text": "i want a mushrooms pizza",
        "intention": "order_pizza",
        "score": 0.5515909,
        "feedback": "rejected",
        "intentions": [
          {
            "id": "order_pizza",
            "name": "Order pizza",
            "score": 0.5515909,
            "answer": {
              "id": "1",
              "type": "text/plain",
              "value": "{}"
            }
          }
        ],
        "entities": [
          {
            "id": "flavor",
            "name": "Flavor",
            "value": "mushrooms"
          }
        ]
      },
      {
        "id": "4e0892f9-4188-47ee-9527-016baf12d13f",
        "requestDateTime": "2019-07-01T19:46:13.260Z",
        "text": "i want a mushrooms pizza",
        "intention": "order_pizza",
        "score": 0.5515909,
        "intentions": [
          {
            "id": "order_pizza",
            "name": "Order pizza",
            "score": 0.5515909,
            "answer": {
              "id": "1",
              "type": "text/plain",
              "value": "{}"
            }
          }
        ],
        "entities": [
          {
            "id": "flavor",
            "name": "Flavor",
            "value": "mushrooms"
          }
        ]
      },
      {
        "id": "60b6716f-7e43-46fe-823c-016baf0db599",
        "requestDateTime": "2019-07-01T19:40:38.260Z",
        "text": "i want a pepperoni pizza",
        "intention": "order_pizza",
        "score": 0.5535872,
        "intentions": [
          {
            "id": "order_pizza",
            "name": "Order pizza",
            "score": 0.5535872,
            "answer": {
              "id": "1",
              "type": "text/plain",
              "value": "{}"
            }
          }
        ],
        "entities": [
          {
            "id": "flavor",
            "name": "Flavor",
            "value": "pepperoni"
          }
        ]
      },
      {
        "id": "bde80a9f-9374-4f09-b0bf-016baf047fbd",
        "requestDateTime": "2019-07-01T19:30:34.630Z",
        "text": "i want a pepperoni pizza",
        "intention": "order_pizza",
        "score": 0.5535872,
        "intentions": [
          {
            "id": "order_pizza",
            "name": "Order pizza",
            "score": 0.5535872,
            "answer": {
              "id": "1",
              "type": "text/plain",
              "value": "{}"
            }
          }
        ],
        "entities": [
          {
            "id": "flavor",
            "name": "Flavor",
            "value": "pepperoni"
          }
        ]
      }
    ]
  },
  "method": "get",
  "status": "success",
  "id": "11",
  "from": "postmaster@ai.msging.net/#az-iris4",
  "to": "contact@msging.net",
  "metadata": {
    "#command.uri": "lime://contact@msging.net/analysis?$skip=0&$take=10"
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
            var skip = 0;
            var take = 10;

            var command = new Command{
                Id = EnvelopeId.NewId(),
                Method = CommandMethod.Get,
                To = Node.Parse("postmaster@ai.msging.net"),
                Uri = new LimeUri($"/analysis?$skip={skip}&$take={take}")
            };

           var analisys = await _sender.ProcessCommandAsync(command, cancellationToken);
        }
    }
}
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

To submit a rejection feedback, it is necessary to enter the id of the correct intent for the case.

<aside class="notice">
Note: Remember to replace the variable <b>{analyze_id}</b> for the analyze id you want to reject and <b>{other_intent_id}</b> for the intent identifier you really want to use.
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
      intentionId: '{other_intent_id}}'
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
    "intentionId": "{other_intent_id}}"
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
                IntentionId = "{other_intent_id}"
            };

            await _artificialIntelligenceExtension.SendFeedbackAsync("{analyze_id}", analysisFeedback, cancellationToken);
        }
    }
}
```

###Send enhancement analysis models by email

The filter can be sent empty.

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: "/enhancement/send-by-email",
    type:"application/json",
    resource:{  
      email:"test%40take.net",
      filter:"requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
    }
  });
});
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
            Method = CommandMethod.Set,
            Uri = new LimeUri("/enhancement/send-by-email"),
            Resource = new {  
              email = "test%40take.net",
              filter = "requestDateTime%20ge%20datetimeoffset'2019-04-29T16%3A31%3A00.000Z'%20and%20requestDateTime%20le%20datetimeoffset'2019-05-30T16%3A31%3A00.000Z'"
            },
            Type :"application/json"
          };
           
          await _sender.SendCommandAsync(command, cancellationToken);     
        }           
    }
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

### Create a confusion matrix

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.SET,
    uri: "/analytics/confusion-matrix",
    type: "application/vnd.iris.ai.confusion-matrix+json",
    resource: {
        version: "test",
        sampleSize: 2
    }
  });
});
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Takenet.Iris.Messaging.Resources.ArtificialIntelligence;

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
                Method = CommandMethod.Set,
                Uri = new LimeUri("/analytics/confusion-matrix")
                Type= "application/vnd.iris.ai.confusion-matrix+json",
                Resource = new ConfusionMatrix{
                  Version = "teste",
                  SampleSize = 2
                }
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
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
    "uri": "/analytics/confusion-matrix",
    "type": "application/vnd.iris.ai.confusion-matrix+json",
    "resource": {
        "version": "teste",
        "sampleSize": 2
    }
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.ai.confusion-matrix+json",
    "resource": {
        "OwnerIdentity": "botbot1@msging.net",
        "id": "d0b71e41-897c-48c4-a565-29d227013111",
        "modelId": "botbot1_543659e7-902a-4326-8a2e-016adbc4b100",
        "version": "teste",
        "score": 0,
        "sampleSize": 2,
        "createdDate": "2019-05-30T17:22:02.139Z",
        "accuracy": 0,
        "avgScore": 0,
        "precision": 0,
        "recall": 0,
        "f1Score": 0,
        "numberOfSamples": 0
    },
    "method": "set",
    "status": "success",
    "id": "10",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris2",
    "to": "botbot1@msging.net",
    "metadata": {
        "#command.uri": "lime://botbot1@msging.net/analytics/confusion-matrix"
    }
}
```

### Get confusion matrices

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/analytics/confusion-matrix'
  });
});
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
                Method = CommandMethod.Get,
                Uri = new LimeUri("/analytics/confusion-matrix")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
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
                "id": "{confusionMatrixId}",
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

### Get a confusion matrix

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.GET,
    uri: '/analytics/confusion-matrix/{confusionMatrixId}'
  });
});
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
                Method = CommandMethod.Get,
                Uri = new LimeUri("/analytics/confusion-matrix/{confusionMatrixId}")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
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
    "uri": "/analytics/confusion-matrix/{confusionMatrixId}"
}

```

```http

HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.iris.ai.confusion-matrix+json",
    "resource": {
        "OwnerIdentity": "botbot1@msging.net",
        "id": "{confusionMatrixId}",
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
        "numberOfSamples": 50,
        "matrix": [[],...],
        "perClasses": [{},...]
    },
    "method": "get",
    "status": "success",
    "id": "e909fedf-fb70-463e-88c1-1cd02218c712",
    "from": "postmaster@ai.msging.net/#hmg-az-lx-iris1",
    "to": "test@msging.net",
    "metadata": {
        "#command.uri": "lime://test@msging.net/analytics/confusion-matrix/{confusionMatrixId}"
    }
}
```

### Delete a confusion matrix

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
                Uri = new LimeUri("/analytics/confusion-matrix/{confusionMatrixId}")
            };
           
           await _sender.SendCommandAsync(command, cancellationToken);     
        }           
    }
}
```

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({
    id: Lime.Guid(),
    to: 'postmaster@ai.msging.net',
    method: Lime.CommandMethod.DELETE,
    uri: '/analytics/confusion-matrix/{confusionMatrixId}'    
  });
});
```

```http

POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
	"id": "10",
	"method": "delete",
	"to": "postmaster@ai.msging.net",
	"uri": "/analytics/confusion-matrix/{confusionMatrixId}",
	"from": "postmaster@ai.msging.net/#hmg-az-lx-iris1"
}
```

```http

HTTP/1.1 200 OK
Content-Type: application/json

{
	"id": "10",
	"method": "delete",
	"status": "success",
	"to": "test.net/portal-test%40take.net"
}

```