### Armazenamento
| Endereço              | URI base     | Permissões requeridas   | C#              |
|-----------------------|--------------|-------------------------|------------------
| postmaster@msging.net (endereço padrão, não é necessário informar) | /buckets | Nenhuma | [BucketExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Bucket/BucketExtension.cs) |

A extensão **armazenamento** permite o armazenamento de documentos JSON no servidor em um espaço isolado de cada chatbot. Esta extensão é útil armazenar informações de clientes que interagiram com o chatbot, como configurações e estado de navegação.

Para cada documento existe um identificador definido no momento da criação que deve ser utilizada para acesso posterior. É possível definir uma data de expiração opcional para o documento. Tanto o identificador quanto a expiração devem ser definidos na **URI** do comando.

#### Exemplos
1 - Armazenando um documento JSON genérico com o identificador **xyz1234**:
```json
{  
  "id": "1",
  "method": "set",
  "uri": "/buckets/xyz1234",
  "type": "application/json",
  "resource": {  
    "key1": "value1",
    "key2": 2,
    "key3": [  
      "3a", "3b", "3c"
    ]
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "1",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

2 - Armazenando um documento do tipo customizado **application/x-my-type+json** com o identificador **abcd9876** e expiração de 30000 ms (30 segundos):
```json
{  
  "id": "2",
  "method": "set",
  "uri": "/buckets/abcd9876?expiration=30000",
  "type": "application/x-my-type+json",
  "resource": {  
    "myTypeKey1": "value1",
    "myTypeKey2": 2
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "2",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

3 - Obtendo um documento existente com o identificador **xyz1234**:
```json
{  
  "id": "3",
  "method": "get",
  "uri": "/buckets/xyz1234"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/json",
  "resource": {  
    "key1": "value1",
    "key2": 2,
    "key3": [  
      "3a", "3b", "3c"
    ]
  }  
}
```
