### Túnel
| Endereço                     | URI base      | Permissões requeridas   | C#              |
|------------------------------|---------------|-------------------------|-----------------|
| postmaster@tunnel.msging.net | N/A | Nenhuma | [TunnelExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Tunnel/TunnelExtension.cs) |

A extensão **túnel** permite o encaminhamento, troca de mensagens e notificações entre diferentes *chatbots* da plataforma BLiP. Desta forma, um bot **emissor** consegue encaminhar mensagens recebidas para um bot **receptor** de maneira transparente, sendo que a mecânica de recebimento para este é exatamente a mesma das mensagens vindas dos canais externos (Messenger, Telegram, SMS, BLiP Chat, etc.). Portanto, o bot receptor **não precisa ser implementado de maneira específica** para receber mensagens encaminhadas, sendo que as notificações e mensagens de respostas geradas pelos receptores são encaminhadas automaticamente para o emissor.

Este recurso é útil para o **isolamento de diferentes partes da navegação em bots independentes** com apenas uma publicação no canal. Por exemplo, imagine que você queira ter, em uma mesma página do Facebook, um chatbot que tenha uma navegação parte automática (respostas estáticas), parte peguntas e respostas e parte atendendimento feito por um atendente. Você precisaria então de um bot **principal** (SDK/Webhook) que agirá como um *switcher* e três **sub-bots** - o primeiro com template do tipo SDK/Webhook, o segundo FAQ e o último Atendimento Manual. Estes três últimos **não seriam publicados diretamente nos canais**, mas apenas receberiam as mensagens do bot principal, este sim - publicado no Facebook e em outros canais. O bot principal seria o **emissor** e os demais os **receptores** do túnel.

*Observação: O portal BLiP oferece o [modelo **master**](https://portal.blip.ai/#/docs/templates/master) que utiliza a extensão túnel e funciona como um switcher para os sub-bots, não sendo necessário a implementação para a maior parte dos casos.*

Para criar um tunel entre dois *chatbots*, basta o **emissor** enviar uma mensagem para um endereço utilizando a seguinte regra:

```
[identifier-do-receptor]@tunnel.msging.net/[endereco-do-originador]
```
Onde:
- **identifier-do-receptor** - O identificador do bot que deve receber a mensagem encaminhada
- **endereco-do-originador** - Endereço original da mensagem externa utilizando codificação *URL encode* (ex: substituindo o '@' por '%40')

O receptor recebe mensagens, envia notificações e mensagens de resposta a um endereço no seguinte formato:

```
[id-do-tunnel]@tunnel.msging.net
```
Onde:
- **id-do-tunnel** - Um identificador único do túnel, composto pela tríade **emissor**, **receptor** e **originador** (endereço original de quem enviou a mensagem).

#### Exemplos

1 - Imagine um cenário onde existam dois bots: **flow** e **operator**, sendo o primeiro responsável por apresentar uma navegação automática e o segundo receber o transbordo de um eventual atendimento manual. Somente o bot **flow** está publicado no *Messenger* e este, em determinado ponto do seu fluxo, precisa encaminhar as mensagens ao bot **operator** que faz o controle do atendimento manual.

O caminho completo de uma mensagem desde o canal externo até o bot de atendimento é o seguinte:

a) O bot principal recebe uma mensagem de um usuário do Messenger.
```json
{
    "id": "1",
    "from": "1654804277843415@messenger.gw.msging.net",
    "to": "flow@msging.net/instance",
    "type": "text/plain",
    "content": "Olá, gostaria de ser atendido."
}
```

b) De acordo com suas regras internas, o bot principal decide encaminhar esta mensagem ao bot de atendimento. Para isso, ele troca o destinatário da mensagem e realiza o envio.

```json
{
    "id": "1",
    "from": "flow@msging.net/instance",
    "to": "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    "type": "text/plain",
    "content": "Olá, gostaria de ser atendido."
}
```

c) Internamente, o servidor cria um **id** para o tunel e encaminha a mensagem ao bot **operator**, que a recebe da seguinte forma:

```json
{
    "id": "1",
    "from": "ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net",
    "to": "operator@msging.net",    
    "type": "text/plain",
    "content": "Olá, gostaria de ser atendido."
}
```

d) O bot operator gera uma resposta para a mensagem e a encaminha para o endereço de origem, **sem diferenciação de uma mensagem recebida diretamente de um canal** (o mesmo vale para notificações de entrega/leitura):

```json
{
    "id": "2",
    "from": "operator@msging.net/instance",
    "to": "ecb99cf5-fb5c-4376-8acd-4b478091de15@tunnel.msging.net",    
    "type": "text/plain",
    "content": "Olá, meu nome é André. Como posso te ajudar?"
}
```

e) O servidor, a partir do **id** do túnel, troca o endereço da mensagem de resposta e a encaminha para o bot **flow**:

```json
{
    "id": "2",
    "from": "operator@tunnel.msging.net/1654804277843415%40messenger.gw.msging.net",
    "to": "flow@msging.net/instance",    
    "type": "text/plain",
    "content": "Olá, meu nome é André. Como posso te ajudar?"
}
```
f) O bot flow identifica a mensagem recebida de um **receptor**, descodifica o endereço original que está na **instância** e envia a mensagem ao destinatário final:

```json
{
    "id": "2",
    "from": "flow@msging.net/instance",
    "to": "1654804277843415@messenger.gw.msging.net",    
    "type": "text/plain",
    "content": "Olá, meu nome é André. Como posso te ajudar?"
}
```

2 - A extensão **túnel** também permite a consulta a informações do originador da mensagem no **diretório**, desde que as informações estejam armazenadas na agenda de contatos do bot **emissor**. Para isso, basta utilizar a mesma mecânica definida nesta extensão:

Enviando um comando para a consulta no diretório utilizando o **id** do túnel:

```json
{
    "id": "3",
    "from": "operator@msging.net/instance",
    "to": "postmaster@tunnel.msging.net",    
    "method":"get",
    "uri": "lime://tunnel.msging.net/accounts/ecb99cf5-fb5c-4376-8acd-4b478091de15"
}
```

O servidor identifica que a consulta é para um usuário do túnel e realiza a consulta **em nome do emissor** diretamente em sua agenda de contatos e retorna a informação:

```json
{
    "id": "3",
    "from": "postmaster@tunnel.msging.net",    
    "to": "operator@msging.net/instance",
    "method":"get",
    "status": "success",
    "type": "application/vnd.lime.account+json",
    "resource": {
        "fullName": "João da Silva",
        "gender": "male"
    }    
}
```
Para maiores informações sobre a agenda de contatos, consulte a [documentação desta extensão](https://portal.blip.ai/#/docs/extensions/contacts).
