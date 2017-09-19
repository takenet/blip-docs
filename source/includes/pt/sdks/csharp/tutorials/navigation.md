### Tutorial: Navegação

Neste tutorial, será demonstrado uma forma de construir um chatbot que responde automaticamente comandos de texto enviados pelos usuários.

O primeiro passo é, na linha de comando, criar um novo projeto utilizando o template `blip-console`, através do comando:

```
dotnet new blip-console
```
  
Desta forma, é adicionado ao projeto entre outras dependências, o arquivo `application.json`, onde ficam registrados os *receivers* de mensagens e notificações. Os **receivers** são as entidades responsáveis por processar as mensagens e notificações recebidas realizando ações específicas (invocando APIs, salvando informações no banco de dados, etc.) e, se necessário, enviar uma resposta ao usuário.

Um detalhe importante e bastante útil é que é possível registrar *receivers* definindo **filtros** de mensagens e notificações que o mesmo deve processar. Os filtros podem combinar várias propriedades, como o originador e conteúdo das mensagens, por exemplo. Além disso, são **expressões regulares** que permitem uma maior flexibilidade em sua definição.

Abaixo um exemplo do arquivo `application.json` criado em um novo projeto:

```json
{
  "identifier": "",
  "accessKey": "",
  "messageReceivers": [
    {
      "type": "PlainTextMessageReceiver",
      "mediaType": "text/plain"
    }
  ],
  "settings": {
    "setting1": "value1"
  },
  "startupType": "Startup",
  "schemaVersion": 2
}
```
> Para obter um `identifier` e `accessKey`, acesse o portal https://portal.blip.ai e registre seu chatbot, utilizando a opção Chat Bot SDK

Neste caso, existe apenas um **receiver** de mensagem registrado, com um filtro do tipo de conteúdo `text/plain` sendo que seu processamento é feito pela classe `PlainTextMessageReceiver` que deve existir no projeto.

Imagine que nosso chatbot deva responder a comando com o texto `ajuda` com uma mensagem estática de auxílio ao usuário. Desta forma, precisamos:
- Registrar um novo receiver de mensagem
- Incluir um filtro de tipo *texto* e conteúdo *ajuda*
- Retornar a mensagem de ajuda ao originador

Para facilitar, o SDK inclui alguns *receivers* para ações comuns, como mensagens estáticas, não sendo necessário neste primeiro caso de uso implementar o *receiver* para envio da mensagem de resposta. Para isso, basta utilizar a propriedade `response` e incluir a mensagem de resposta ao cliente. Neste caso, a sessão `messageReceivers` ficaria da seguinte forma:

```json
  "messageReceivers": [
    {
      "mediaType": "text/plain",
      "content": "ajuda",
      "response": {
        "mediaType": "text/plain",
        "plainContent": "Olá, seja bem-vindo ao serviço de ajuda do Messaging Hub."
      }
    }
  ]
```
Desta forma, se o cliente enviar a palavra `ajuda`, ele receberá uma mensagem do tipo `text/plain` com conteúdo `Olá, seja bem-vindo ao serviço de ajuda do Messaging Hub.`. Se quisermos incluir outras palavras para a ativação do comando, basta alterar a propriedade `content` e incluir outras palavras na expressão regular de filtro, como a seguir:

```json
  "messageReceivers": [
    {
      "mediaType": "text/plain",
      "content": "^(inicio|iniciar|começar|ajuda)$",
      "response": {
        "mediaType": "text/plain",
        "plainContent": "Olá, seja bem-vindo ao serviço de ajuda do Messaging Hub."
      }
    }
  ]
```
Podemos retornar, ao invés de um texto simples, uma tipo de mensagem complexa como um **Select**, que mostra um menu de opções ao usuário. Para isso, basta utilizarmos a propriedade `jsonContent` ao invés de `plainContent`, como abaixo:

```json
  "messageReceivers": [
    {
      "mediaType": "text/plain",
      "content": "^(inicio|iniciar|começar|ajuda)$",
      "response": {
        "mediaType": "application/vnd.lime.select+json",
        "jsonContent": {
          "text": "Olá, seja bem-vindo ao serviço de ajuda do Messaging Hub. Escolha o que você deseja receber:",
          "options": [
            {
              "order": 1,
              "text": "Um TEXTO",
              "type": "text/plain",
              "value": "texto"
            },
            {
              "order": 2,
              "text": "Uma IMAGEM",
              "type": "text/plain",
              "value": "imagem"
            },
            {
              "order": 3,
              "text": "A DATA atual",
              "type": "text/plain",
              "value": "data"
            }
          ]
        }
      }
    }
  ]
```
Para cada uma das opções do `Select`, devemos incluir um *receiver* para a palavra defina em `value`, que é o valor esperado como resposta do cliente. Mas é importante também suportar o envio do número e o texto da opção, já que em canais não estruturados (como SMS) não há garantia que o cliente responderá com a opção esperada. Um receiver para a primeira opção (`texto`) seria:

```json
    {
      "mediaType": "text/plain",
      "content": "^(texto|um texto|1)$",
      "response": {
        "mediaType": "text/plain",
        "plainContent": "Este é um texto simples, sem nada de especial."
      }
    }
```    
Neste caso, retornarmos uma mensagem simples mas suportando diversos comandos diferentes para ativar o receiver. Para a segunda opção, temos:

```json
    {
      "mediaType": "text/plain",
      "content": "^(imagem|uma imagem|2)$",
      "response": {
        "mediaType": "application/vnd.lime.media-link+json",
        "jsonContent": {
          "type": "image/jpeg",
          "uri": "http://static.boredpanda.com/blog/wp-content/uploads/2015/09/Instagrams-most-famous-cat-Nala165604f5fc88e5f.jpg",
          "text": "Miau!"
        }
      }
    }
```    

Aqui retornamos um tipo complexo `MediaLink` com uma imagem. A terceira opção (`data`) inclui um conteúdo dinâmico e por este motivo, não podemos utilizar a propriedade `response`. Portanto, devemos criar uma classe para processar o texto e responder ao usuário, como a seguir:

```csharp
    public class DateMessageReceiver : IMessageReceiver
    {
        private readonly ISender _sender;
        private readonly CultureInfo _cultureInfo;
        private readonly string _messageTemplate;

        public DateMessageReceiver(ISender sender, IDictionary<string, object> settings)
        {
            _sender = sender;
            if (settings.ContainsKey("culture"))
            {            
                _cultureInfo = new CultureInfo((string)settings["culture"]);
            }
            else
            {
                _cultureInfo = CultureInfo.InvariantCulture;
            }

            _messageTemplate = (string)settings["message"];
        }

        public Task ReceiveAsync(Message envelope, CancellationToken cancellationToken)
        {
            return _sender.SendMessageAsync(string.Format(_messageTemplate, DateTime.Now.ToString("g", _cultureInfo)), envelope.From, cancellationToken);
        }
    }
```

Nossa classe recebe pelo construtor suas **configurações** que incluem o modelo do texto de resposta e de cultura, que são definidas no registro do *receiver* no arquivo `application.json`. É sempre uma boa idéia utilizar a propriedade `settings` para definir valores estáticos, o que permite modificações no comportamento do seu chatbot sem a necessidade de recompilar o código. O registro do mesmo ficaria da seguinte forma:

```json
    {
      "mediaType": "text/plain",
      "content": "^(data|a data atual|3)$",
      "type": "DateMessageReceiver",
      "settings": {
        "culture": "pt-BR",
        "message": "A data atual é {0}."
      }
    }
```
Por fim, imagine que seu chatbot deve retornar uma mensagem de erro estática no caso do cliente enviar algum comando desconhecido. Para isso, é necessário registrar um *receiver* sem filtros mas com **prioridade** menor que os demais *receivers* existentes. Por padrão, os *receivers* são registrados com a prioridade mais alta (**zero**) e basta incluir um *receiver* com prioridade menor para que receba as mensagens não tratadas pelos outros para responder o usuário. Ficaria da seguinte forma:

```json
    {
      "priority": "100",
      "response": {
        "mediaType": "text/plain",
        "plainContent": "Ops, não entendi o que você quis dizer. Envie a palavra AJUDA caso precise."
      }
    }
```    

O código completo deste tuturial pode ser encontrado no [Github](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Samples/Navigation).
