
### Perfil do chatbot
| Endereço              | URI base     | Permissões requeridas   | C#              |
|-----------------------|--------------|-------------------------|-----------------|
| postmaster@msging.net (endereço padrão, não é necessário informar) | /profile | Nenhuma | [ProfileExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Profile/ProfileExtension.cs) |

A extensão **perfil** permite a configuração de propriedades de perfil do chatbot, que podem refletir para o usuários nos canais publicados, dependendo do suporte. Cada propriedade é um **documento** de um tipo de conteúdo suportado pela plataforma.

As propriedades suportadas atualmente são:

| Nome             | Identificador     | Tipo de documento | Canais suportados   |
|------------------|-------------------|-------------------|---------------------|
| Mensagem inicial | `greeting`        | Texto             | Messenger           |
| Botão começar    | `get-started`     | Texto             | Messenger           |
| Menu persistente | `persistent-menu` | Menu multimídia   | Messenger           |

Observação: No Messenger, o valor do `get-started` tem que ser definido antes do `persistent-menu`.

#### Exemplos
1 - Definindo a mensagem inicial:
```json
{  
  "id": "1",
  "method": "set",
  "uri": "/profile/greeting",
  "type": "text/plain",
  "resource": "Olá, seja bem vindo a nosso serviço!"
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

2 - Definindo um menu persistente com três opções:
```json
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
          "value":"Opção 1"
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Opção 2"
        }
      },
      {
        "label":{
          "type":"text/plain",
          "value":"Opção 3"
        }
      }
    ]
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


3 - Definindo um menu persistente complexo, com submenus e links web:
```json
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
                "value":"Opção 1"
              },
              "options":[
                {
                  "label":{
                    "type":"text/plain",
                    "value":"Opção 1.1"
                  }
                },
                {
                  "label":{
                    "type":"application/vnd.lime.web-link+json",
                  "value":{
                    "text":"Opção 1.2",
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
                      "value":"Opção 1.3"
                    },
                    "options":[
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Opção 1.3.1"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Opção 1.3.2"
                        }
                      },
                      {
                        "label":{
                          "type":"text/plain",
                          "value":"Opção 1.3.3"
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
          "value":"Opção 2"
        }
      },
      {
        "label":{
          "type":"application/vnd.lime.web-link+json",
          "value":{
            "text":"Opção 3",
            "uri":"https://address.com/option1.3"
          }
        }
      }
    ]
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "3",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```
4 - Definindo o valor do botão começar:
```json
{  
  "id": "4",
  "method": "set",
  "uri": "/profile/get-started",
  "type": "text/plain",
  "resource": "Início"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "4",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

5 - Consultando a mensagem inicial definida:
```json
{  
  "id": "5",
  "method": "get",
  "uri": "/profile/greeting"  
}
```
Resposta em caso de sucesso:
```json
{
  "id": "5",
  "from": "postmaster@msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "text/plain",
  "resource": "Olá, seja bem vindo a nosso serviço!"
}
```

