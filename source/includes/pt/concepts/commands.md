### Comandos

Um **comando** permite a consulta e manipulação de recursos do servidor e de extensões do **BLiP Messaging Hub**. Provê uma interface pedido-resposta, semelhante ao HTTP, com verbos e URIs. 

Cada comando possui:
- **id**: Identificador único do comando. O *id* é utilizado como referência nas respostas dos comandos. Este valor é obrigatório, exceto para comandos do método `observe`.
- **from**: Endereço do originador do comando. Este valor pode ser omitido nas requisições, sendo que por padrão é considerado o endereço do chatbot conectado.
- **to**: Endereço do destinatário do comando. Este valor pode ser omitido nas requisições, sendo que por padrão é considerado o endereço remoto (do servidor). Deve ser fornecido caso o comando seja enviado a uma **extensão**.
- **uri**: O caminho no destinatário do recurso que o comando se refere. Este valor é obrigatório nas requisições e pode ser omitido nas respostas. 
- **method** - Método para manipulação do recurso definido na **uri**. Este valor é obrigatório. Os valores possíveis são:
  * **get** - Obtém um valor existente.
  * **set** - Cria ou atualiza um valor.
  * **delete** - Remove um valor existente.
  * **subscribe** - Assina um recurso para recebimento de notificações de mudança do valor definido na **uri**.
  * **unsubscribe** - Remove uma assinatura de um recurso.
  * **observe** - Notifica sobre mudanças no valor de um recurso e normalmente são emitidos pelo servidor ou uma extensão. Comandos com este método são emitidos são unidirecionais e o destinatário não deve enviar uma resposta aos mesmos. Por este motivo, não possuem **id**.
- **type** - Declaração do tipo do valor de **resource**, no formato MIME.
- **resource** - Representação JSON do recurso. Deve estar presente em requisições dos métodos **set** e **observe** e respostas de sucesso do método **get**.

Além das propriedades acima, a resposta de um comando pode conter:
- **status** - Indica o resultado do processamento do comando, sendo obrigatório nas respostas. Os valores válidos são:
  * **success** - O comando foi processado com sucesso. No caso de comandos com o método **get**, o valor de **resource** deve estar presente.
  * **failure** - Um problema ocorreu durante o processamento do comando. Neste caso, a propriedade **reason** da resposta deve estar presente.
- **reason** - Indica o motivo da falha do processamento do comando. Contém as seguintes propriedades:
  * **code** - Código numérico da falha. Este valor é obrigatório.
  * **description** - Mensagem de descrição da falha.
  
Abaixo uma representação JSON de um comando para criação de uma lista de distribuição:

```json
{
  "id":  "1",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "uri": "/lists",
  "type": "application/vnd.iris.distribution-list+json",
  "resource": {
    "identity":  "list@broadcast.msging.net"
  }
} 
```
No caso de uma resposta de sucesso:
```json
{
  "id": "1",
  "from": "postmaster@broadcast.msging.net/#hmgirismsging2",
  "to": "my-contact@msging.net/default",
  "method": "set",
  "status": "success"
} 
```
E no caso de uma falha:
```json
{
  "id": "1",
  "from": "postmaster@broadcast.msging.net/#hmgirismsging2",
  "to": "my-contact@msging.net/default",
  "method": "set",
  "status": "failure",
  "reason": {
   "code": 60,
   "description": "Invalid list identifier"
  }
} 
```  
  
Para mais detalhes, consulte a especificação do [protocolo LIME](http://limeprotocol.org/index.html#command).
