### Recurso
| MIME type                            | 
|--------------------------------------|
| application/vnd.iris.resource+json   |

Permite o envio de mensagens onde o conteúdo é um **recurso** armazenado no servidor. O recurso deve ser armazenado através da [extensão **recursos**](https://portal.blip.ai/#/docs/extensions/resources) ou através do portal, no menu **Recursos** do chatbot. O servidor realiza automaticamente a substituição do conteúdo, caso a **chave** fornecida exista para o chatbot que originou a mensagem.

O recurso pode conter variáveis que podem ser substituidas por valores fornecidos no momento do envio, através da propriedade `variables`.

#### Exemplos
Enviando uma mensagem do recurso com a chave **welcome-message**.
```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.iris.resource+json",
    "content": {
        "key": "welcome-message"
    }
}
```
Caso exista um recurso com esta chave, o servidor realiza a substituição do conteúdo da mensagem e encaminha para o destinatário. Supondo que o recurso com a chave **welcome-message** seja do tipo `text/plain` com valor `Seja bem vindo a nosso serviço`, a mensagem final ficaria da seguinte forma:

```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Seja bem vindo a nosso serviço"
}
```

É possível informar variáveis de substuição para o recurso, através da propriedade `variables`. Neste caso, as variáveis presentes no recurso no formato `${variableName}` são substituidas pelos valores informados.

Por exemplo, imagine que o recurso na chave `welcome-message` possua o valor `Seja bem vindo a nosso serviço, ${name}"`. Caso seja efetuado o seguinte envio:

```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.iris.resource+json",
    "content": {
        "key": "welcome-message",
        "variables": {
            "name": "João da Silva"
        }
    }
}
```

A mensagem final ficaria da seguinte forma:

```json
{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Seja bem vindo a nosso serviço, João da Silva!"
}
```


### Mapeamento nos canais

O tipo de conteúdo é suportado em todos os canais.

