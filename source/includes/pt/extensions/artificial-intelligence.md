### Inteligência artificial
| Endereço                        | C#                                 |
|---------------------------------|------------------------------------|
| postmaster@ai.msging.net        | [ArtificialIntelligenceExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/ArtificialIntelligence/ArtificialIntelligenceExtension.cs) |

A extensão **Inteligência Artificial** permite a criação, treinamento e publicação de modelos de inteligência artificial nos provedores associados ao chatbot, além de realizar a análise de sentenças para identificação de intenções e entidades. A configuração dos provedores do chatbot é feita através do menu **Inteligência artificial** no [portal do BLiP](https://portal.blip.ai).

É possível associar **documentos de resposta** ao modelo que devem ser enviados quando reconhecida uma intenção. Além disso, a extensão pode ser utilizada para aprimoramento do modelo através da associação de perguntas às intenções.

O treinamento do modelo é realizado simultâneamente em todos os provedores de IA associados ao chatbot. Neste momento, é armazenado um *snapshot* do modelo que pode ser recuperado posteriormente para comparação da sua efetividade com outras versões. Para utilizar um modelo treinado, é necessária a publicação do mesmo.

Toda a manipulação do modelo pode ser feita através do portal do BLiP, podendo esta extensão ser utilizada apenas para realizar a **análise de sentenças** dos usuários do chabot. 

#### Recursos

| URI                               | Método   | Descrição                                  |
|-----------------------------------|----------|--------------------------------------------|
| `/intentions`                     | `set`    | Cria uma nova intenção. O `id` da intenção é retornado na resposta do comando. |
| `/intentions`                     | `get`    | Pesquisa em todas as intenções associadas ao chatbot. É possível paginar através dos parâmetros opcionais `$skip` e `$take`. |
| `/intentions/{id}`                | `get`    | Recupera uma intenção pelo `id`.           |
| `/entities`                       | `set`    | Cria uma nova entidade. O `id` da entidade é retornado na resposta do comando. |
| `/entities`                       | `get`    | Pesquisa em todas as entidades associadas ao chatbot. É possível paginar através dos parâmetros opcionais `$skip` e `$take`. |
| `/entities/{id}`                  | `get`    | Recupera uma entidade pelo `id`.           |
| `/intentions/{id}/questions`      | `set`    | Cria perguntas associadas à intenção `id`. |
| `/intentions/{id}/questions`      | `get`    | Pesquisa em todas as perguntas associadas à intenção `id`. É possível paginar através dos parâmetros opcionais `$skip` e `$take`. |
| `/intentions/{id}/questions/{qid}`| `delete` | Remove uma pergunta com id `qid`.          |
| `/intentions/{id}/answers`        | `set`    | Cria respostas associadas à intenção `id`. |
| `/intentions/{id}/answers`        | `get`    | Pesquisa em todas as respostas associadas à intenção `id`. É possível paginar através dos parâmetros opcionais `$skip` e `$take`. |
| `/intentions/{id}/answers/{aid}`  | `delete` | Remove uma resposta com id `aid`.          |
| `/models`                         | `set`    | Realiza o treinamento ou publicação de um modelo. A ação depende do tipo do recurso enviado (veja na tabela abaixo). |
| `/models`                         | `get`    | Pesquisa em todos os modelos treinados e/ou publicados. |
| `/analysis`                       | `set`    | Realiza a análise de uma sentença do usuário através de um modelo publicado. |
| `/analysis`                       | `get`    | Recupera o histórico de análises realizadas. É possível paginar através dos parâmetros opcionais `$skip` e `$take` e filtrar através de `$filter` utilizando a sintaxe [OData](http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#FilterSystemQueryOption). |
| `/analysis/{id}/feedback`         | `set`    | Permite fornecer um feedback a uma análise realizada e sugerir uma intenção a mesma para aprimoramento do modelo. |

Os tipos dos recursos são:

| Nome                | MIME Type                                             | Descrição                                   |
|---------------------|-------------------------------------------------------|---------------------------------------------|
| Intenção            | `application/vnd.iris.ai.intention+json`              | Intenção expressada através de uma sentença. |
| Entidade            | `application/vnd.iris.ai.entity+json`                 | Entidade identificada em uma intenção, com seus sinônimos. |
| Pergunta            | `application/vnd.iris.ai.question+json`               | Pergunta de um usuário associada a uma intenção para treinamento do modelo. |
| Resposta            | `application/vnd.iris.ai.answer+json`                 | Resposta que pode ser enviada no caso de identificada uma intenção. |
| Treinamento         | `application/vnd.iris.ai.model-training+json`         | Solicitação de treinamento de modelo. |
| Publicação          | `application/vnd.iris.ai.model-publishing+json`       | Solicitação de publicação de um modelo. |
| Pedido de análise   | `application/vnd.iris.ai.analysis-request+json`       | Solicitação de análise de sentença. |
| Resposta de análise | `application/vnd.iris.ai.analysis-response+json`      | Resultado de análise de uma sentença. |
| Análise             | `application/vnd.iris.ai.analysis+json`               | Informações históricas de uma análise realizada . |
| Feedback de análise | `application/vnd.iris.ai.analysis-feedback+json`      | Informações de feedback de uma análise realizada. |


#### Exemplos

1 - Criando uma entidade:
```json
{  
  "id":"1",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/entities",
  "type":"application/vnd.iris.ai.entity+json",
  "resource":{  
    "name":"Sabor",
    "values":[  
      {  
        "name":"Marguerita",
        "synonymous":[  
          "Marguerita",
          "Margerita",
          "Margarita",
          "Margarida"
        ]
      },
      {  
        "name":"Pepperoni",
        "synonymous":[  
          "Pepperoni",
          "Peperoni",
          "Peperone"
        ]
      }
    ]
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "1",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.entity+json",
  "resource": {
      "id": "sabor"
  }
}
```

2 - Criando uma intenção:
```json
{  
  "id": "2",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "name": "Pedir pizza"
  }  
}
```
Resposta em caso de sucesso:
```json
{
  "id": "2",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.intention+json",
  "resource": {
      "id": "pedir_pizza"
  }  
}
```

3 - Recuperando as primeiras 10 intenções:
```json
{  
  "id": "3",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/intentions?$skip=0&$take=10"
}
```
Resposta em caso de sucesso:
```json
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
          "id": "pedir_pizza",
          "name": "Pedir pizza"
        },
        {
          "id": "escolher_sabor",
          "name": "Escolher sabor"
        }
      ]
  }
}
```

4 - Associando perguntas a uma intenção:
```json
{  
  "id": "4",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/pedir_pizza/questions",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.question+json",
    "items":[
      {
        "text": "Quero uma pizza"
      },
      {
        "text": "Gostaria de pedir uma pizza"
      },
      {
        "text": "Me da uma pizza"
      }
    ]
  }  
}
```
Resposta em caso de sucesso:
```json
{
  "id": "4",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

5 - Associando respostas a uma intenção:
```json
{  
  "id": "5",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/intentions/pedir_pizza/answers",
  "type": "application/vnd.lime.collection+json",
  "resource": {
    "itemType": "application/vnd.iris.ai.answer+json",
    "items":[
      {
        "type":"text/plain",
        "value":"Qual sabor você deseja?"
      }
    ]
  }  
}
```
Resposta em caso de sucesso:
```json
{
  "id": "5",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

6 - Treinando o modelo em todos provedores cadastrados no portal:
```json
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
Resposta em caso de sucesso:
```json
{
  "id": "6",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

7 - Recuperando os modelos treinados:
```json
{  
  "id": "7",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/models"
}
```
Resposta em caso de sucesso:
```json
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

8 - Publicando um modelo treinado:
```json
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
Resposta em caso de sucesso:
```json
{
  "id": "8",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

9 - Analisando uma sentença no último modelo publicado do provedor padrão (definido no portal):
```json
{  
  "id": "9",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"Quero uma pizza marguerita"
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "9",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"Quero uma pizza marguerita",
    "intentions":[
      {
        "id":"pedir_pizza",
        "name":"Pedir pizza",
        "score": 0.95,
        "answer": {
          "id": "1",
          "type": "text/plain",
          "value": "Obrigado pelo seu pedido"
        }
      }
    ],
    "entities":[
      {
        "id":"sabor",
        "name":"Sabor",
        "value": "Marguerita"
      }
    ]
  }
}
```

10 - Analisando uma sentença em um modelo publicado específico:
```json
{  
  "id": "10",
  "to": "postmaster@ai.msging.net",
  "method": "set",
  "uri": "/analysis",
  "type": "application/vnd.iris.ai.analysis-request+json",
  "resource": {
    "text":"Quero uma pizza marguerita",
    "modelId":"fa0aa23b-5c62-4b90-9c13-986148c0d171"
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "10",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success",
  "type": "application/vnd.iris.ai.analysis-response+json",
  "resource": {
    "text":"Quero uma pizza marguerita",
    "intentions":[
      {
        "id":"pedir_pizza",
        "name":"Pedir pizza",
        "score": 0.95,
        "answer": {
          "id": "1",
          "type": "text/plain",
          "value": "Obrigado pelo seu pedido"
        }
      }
    ],
    "entities":[
      {
        "id":"sabor",
        "name":"Sabor",
        "value": "Marguerita"
      }
    ]
  }
}
```

11 - Listando o histórico das 10 últimas análises realizadas sem feedback:
```json
{  
  "id": "11",
  "to": "postmaster@ai.msging.net",
  "method": "get",
  "uri": "/analysis?$take=10&$filter=feedback%20eq%20none"
}
```
Resposta em caso de sucesso:
```json
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
        "intention": "Pedir pizza",
        "score": 1.0,
        "intentions": [
          {
            "id": "pedir_pizza",
            "name": "Pedir pizza",
            "score": 1.0
          }
        ],
        "entities": [
          {
            "id": "sabor",
            "name": "Sabor",
            "value": "Marguerita"
          }
        ],
      }
    ]
  }
}
```

12 - Enviando feedback de sucesso para uma análise realizada:
```json
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
Resposta em caso de sucesso:
```json
{
  "id": "12",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"  
}
```

13 - Enviando feedback de rejeitado para uma análise realizada, informando a intenção correta:
```json
{  
  "id":"13",
  "to":"postmaster@ai.msging.net",
  "method":"set",
  "uri":"/analysis/7363369c-8c99-4293-883f-aaabac7dd822/feedback",
  "type":"application/vnd.iris.ai.analysis-feedback+json",
  "resource":{
    "feedback":"rejected",
    "intentionId":"outra_intencao"
  }  
}
```
Resposta em caso de sucesso:
```json
{
  "id": "13",
  "from": "postmaster@ai.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"  
}
```
