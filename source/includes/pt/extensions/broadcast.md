### Envio em massa
| Endereço                        | URI base     | Permissões requeridas   | C#                     |
|---------------------------------|--------------|-------------------------|------------------------|
| postmaster@broadcast.msging.net | /lists       | Envio de mensagens       | [BroadcastExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Broadcast/BroadcastExtension.cs) |

A extensão **envio em massa** permite a criação e gestão de listas de distribuição e seus membros para o envio de mensagem em massa. Desta forma, um chatbot que precisa enviar uma mesma mensagem para mais de um destinatário pode criar uma lista com os endereços dos destinatários e realizar o envio apenas uma vez, para o endereço da lista.

Cada lista de distribuição possui um endereço único no formato `nome-da-lista@broadcast.msging.net` além dos membros, que são os destinatários de mensagens enviadas a esta lista. Somente o chatbot que criou uma determinada lista tem permissões de enviar mensagens a mesma.

As notificações são encaminhadas ao chatbot quando recebidas pela extensão.

#### Listas padrão

O BLiP automaticamente cria uma lista de distribuição com todos os endereços que já entraram em contato com seu chatbot. O endereço da mesma é `[identifier]+senders@broadcast.msging.net`, sendo `identifier` o identificador do seu chatbot, que é utilizado junto com a chave de acesso para autenticação. 

Por exemplo, para um chatbot com identifier `mychatbot`, o endereço desta lista seria `mychatbot+senders@broadcast.msging.net`.

#### Variáveis de substituição

É possível utilizar variavéis de substituição de contatos nas mensagens enviadas. Neste caso, informe as variáveis no texto normalmente mas não envie o campo `#message.replaceVariables` no `metadata` da mensagem. Este campo é inserido pela própria extensão posteriormente no momento do envio.
Para maiores informações, consulte a documentação da [extensão **Contatos**](https://portal.blip.ai/#/docs/extensions/contacts).

#### Exemplos

1 - Criando uma nova lista de distribuição:
```json
{  
  "id": "1",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "type": "application/vnd.iris.distribution-list+json",
  "uri": "/lists",
  "resource": {  
    "identity": "noticias@broadcast.msging.net"
  }
}
```
Resposta em caso de sucesso:
```json
{
  "id": "1",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

2 - Adicionando um membro a lista de distribuição existente:
```json
{  
  "id": "2",
  "to": "postmaster@broadcast.msging.net",
  "method": "set",
  "uri": "/lists/noticias@broadcast.msging.net/recipients",
  "type": "application/vnd.lime.identity",
  "resource": "551100001111@0mn.io"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "2",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

3 - Removendo um membro a lista de distribuição existente:
```json
{  
  "id": "3",
  "to": "postmaster@broadcast.msging.net",
  "method": "delete",
  "uri": "/lists/noticias@broadcast.msging.net/recipients/551100001111@0mn.io"
}
```
Resposta em caso de sucesso:
```json
{
  "id": "3",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

4 - Enviando uma mensagem para a lista de distribuição:
```json
{  
  "id": "4",
  "to": "noticias@broadcast.msging.net",
  "type": "text/plain",
  "content": "Olá participantes desta lista!"
}
```

Notificações enviadas pela extensão **lista de distribuição**:
```json
{
  "id": "4",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "event": "received"
}
```
```json
{
  "id": "4",
  "from": "postmaster@broadcast.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "event": "consumed"
}
```
Notificações enviadas pelos membros da lista à lista de distribuição e encaminhadas ao proprietário da lista (o endereço do destinatário está codificado na instância do originador da notificação):

```json
{
  "id": "4",
  "from": "noticias@broadcast.msging.net/551100001111%400mn.io%2Fdefault",
  "to": "contact@msging.net/default",
  "event": "received"
}
```

5 - Enviando uma mensagem com uma variável de substituição:
```json
{  
  "id": "5",
  "to": "noticias@broadcast.msging.net",
  "type": "text/plain",
  "content": "Olá ${contact.name}, venha conferir nossas promoções!"
}
```

#### Disponibilidade

O serviço de Broadcast está disponível nos seguintes domínios:

|Domínio    |Disponível |Observação                                             |
|---	    |---	    |---                                                    |
|Messenger  |x          |Necessário interação prévia do usuário com o serviço   |
|BLiP App   |x          |Não precisa de interação do usuário                    |
|Skype      |x          |Necessário interação prévia do usuário com o serviço   |
|SMS        |x          |Não precisa de interação do usuário                    |
|Telegram   |x          |Necessário interação prévia do usuário com o serviço   |
