### Configuração

A configuração da sua aplicação deve ser realizada através do arquivo `application.json` criado no seu projeto, que define o funcionamento do seu chatbot, além dos `receiver` e suas configurações.

Veja um exemplo de como definir configurações neste arquivo:

```json
{
  "identifier": "xpto",
  "accessKey": "cXkzT1Rp",
  "messageReceivers": [
    {
      "type": "PlainTextMessageReceiver",
      "mediaType": "text/plain"
    }
  ]
}
```

Neste caso, o cliente está sendo configurado utilizando a aplicação `xpto` e access key `cXkzT1Rp`, além de estar registrando um **MessageReceiver** do tipo `PlainTextMessageReceiver`, com um filtro pelo **media type** `text/plain`.

Através do arquivo `application.json`, o desenvolvedor pode realizar a inicialização de forma transparente dos tipos utilizados pela aplicação. Isso significa que não é necessário se preocupar como a aplicação será construída para funcionar, já que isso é tratado pelo utilitário `mhh.exe` instalado junto ao pacote.

Todas as propriedades que podem ser definidas através deste arquivo:

| Propriedade | Descrição                                                                        | Exemplo                 | Valor padrão |
|-------------|----------------------------------------------------------------------------------|-------------------------|--------------|
| identifier     | O identificador da aplicação no Messaging Hub, gerado através do [Painel BLiP](https://portal.blip.ai). | myapplication           | null |
| domain      | O domínio **lime** para conexão. Atualmente o único valor suportado é `msging.net`.| msging.net              | msging.net |
| hostName    | O endereço do host para conexão com o servidor.                                  | msging.net              | msging.net |
| accessKey   | A chave de acesso da aplicação para autenticação, no formato **base64**.         | MTIzNDU2                 |null |
| password    | A senha da aplicação para autenticação, no formato **base64**.                   | MTIzNDU2                 | null |
| sendTimeout | O timeout para envio de mensagens, em milissegundos.                              | 30000                   | 20000 |
| sessionEncryption | Modo de encriptação a ser usado.                              | None/TLS                   | TLS |
| sessionCompression | Modo de compressão a ser usado.                              | None                   | None |
| startupType | Nome do tipo .NET que deve ser ativado quando o cliente foi inicializado. O mesmo deve implementar a interface `IStartable`. Pode ser o nome simples do tipo (se estiver na mesma **assembly** do arquivo `application.json`) ou o nome qualificado com **assembly**.    | Startup     | null |
| serviceProviderType | Um tipo a ser usado como provedor de serviços para injeção de dependências. Deve ser uma implementação de `IServiceProvider`. | ServiceProvider | null |
| settings    | Configurações gerais da aplicação, no formato chave-valor. Este valor é injetado nos tipos criados, sejam **receivers** ou o **startupType**. Para receber os valores, os tipos devem esperar uma instância do tipo `IDictionary<string, object>` no construtor dos mesmos. | { "myApiKey": "abcd1234" }   | null |
| settingsType | Nome do tipo .NET que será usado para deserializar as configurações. Pode ser o nome simples do tipo (se estiver na mesma **assembly** do arquivo `application.json`) ou o nome qualificado com **assembly**.    | ApplicationSettings     | null |
| messageReceivers | Array de **message receivers**, que são tipos especializados para recebimento de mensagens. | *Veja abaixo* | null |
| notificationReceivers | Array de **notification receivers**, que são tipos especializados para recebimento de notificações. | *Veja abaixo* | null |
| throughput | Limite de envelopes processados por segundo. | 20 | 10 |
| maxConnectionRetries | Limite de tentativas para reconexão com o host (De 1-5). | 3 | 5 |
| routingRule | Regra para roteamento de mensagem | Instance | Identity |
| disableNotify | Desabilita a geração automatica de notificações de recebimento e consumidas geradas pelo bot | false | false |
| channelCount | Quantidade de conexões que o bot vai criar para se connectar ao servidor | 1 | 5 | 
| receiptEvents | Define os tipos de eventos que o servidor vai encaminhar para o bot | [ Accepted, Dispatched, Received, Consumed, Failed ] | [ Received ] |

Cada **message receiver** pode possuir as seguintes propriedades:

| Propriedade | Descrição                                                                        | Exemplo                 |
|-------------|----------------------------------------------------------------------------------|-------------------------|
| type        | Nome do tipo .NET para recebimento de mensagens. O mesmo deve implementar a interface `IMessageReceiver`. Pode ser o nome simples do tipo (se estiver na mesma **assembly** do arquivo `application.json`) ou o nome qualificado com **assembly**. | PlainTextMessageReceiver |
| mediaType   | Define um filtro de tipo de mensagens que o **receiver** pode processar. Apenas mensagens do tipo especificado serão entregues a instância criada. | text/plain |
| content     | Define uma expressão regular para filtrar os conteúdos de mensagens que o **receiver** pode processar. Apenas mensagens que satisfaçam a expressão serão entregues a instância criada. | Olá mundo |
| sender     | Define uma expressão regular para filtrar os originadores de mensagens que o **receiver** pode processar. Apenas mensagens que satisfaçam a expressão serão entregues a instância criada. | sender@domain.com |
| destination     | Define uma expressão regular para filtrar os destinatários de mensagens que o **receiver** pode processar. Apenas mensagens que satisfaçam a expressão serão entregues a instância criada. | destination@domain.com |
| settings    | Configurações gerais do receiver, no formato chave-valor. Este valor é injetado na instância criada. Para receber os valores, a implementação deve esperar uma instância do tipo `IDictionary<string, object>` no construtor. | { "mySetting": "xyzabcd" }   |
| settingsType | Nome do tipo .NET que será usado para deserializar as configurações. Pode ser o nome simples do tipo (se estiver na mesma **assembly** do arquivo `application.json`) ou o nome qualificado com **assembly**.    | PlainTextMessageReceiverSettings     |
| priority | Prioridade em relação aos outros receivers, valores menores tem mais prioridade. | 0 |
| state | Estado necessário do originador para o recebimento de mensagem.  | default |
| outState | Define um estado para o originador depois que a mensagem for processada | default |
| response | **Definição de Documento** de resposta que deve ser enviado ao originador. Ao informar esta propriedade, o valor de `type` pode ser ignorado. | *Veja abaixo* |

Uma **definição de documento** possui as seguintes propriedades:

| Propriedade  | Descrição                                                                        | Exemplo                 |
|--------------|----------------------------------------------------------------------------------|-------------------------|
| mediaType    | Tipo MIME do documento para retorno ao cliente. Pode ser um tipo plano (texto) ou com sufixo `json`. | text/plain            |
| plainContent | Texto do documento de resposta no caso de `mediaType` ser do tipo plano. Esta propriedade é exclusiva com a `jsonContent`. | Olá, tudo bem? |
| jsonContent  | JSON documento de resposta no caso de `mediaType` ser do tipo JSON. Esta propriedade é exclusiva com a `plainContent`. | `{"uri":"https://server.com/logo.jpg","type":"image/jpeg","text":"Olá, seja bem vindo"}` |
| resourceKey  | Chave do recurso para resposta, definido através da extensão **recursos** ou da aba **recursos** do portal. Se este valor for fornecido, o valor de `mediaType` e de `plainContent` ou `jsonContent` são ignorados | welcome-message |

Cada **notification receiver** pode possuir as seguintes propriedades:

| Propriedade | Descrição                                                                        | Exemplo                 |
|-------------|----------------------------------------------------------------------------------|-------------------------|
| type        | Nome do tipo .NET para recebimento de notificações. O mesmo deve implementar a interface `INotificationReceiver`. Pode ser o nome simples do tipo (se estiver na mesma **assembly** do arquivo `application.json`) ou o nome qualificado com **assembly**. | NotificationReceiver |
| settings    | Configurações gerais do receiver, no formato chave-valor. Este valor é  injetado na instância criada. Para receber os valores, a implementação deve esperar uma instância do tipo `IDictionary<string, object>` no construtor. | { "mySetting": "xyzabcd" }   |
| eventType   | Define um filtro de tipo de eventos que o **receiver** pode processar. Apenas notificações do evento especificado serão entregues a instância criada. | received |
| settingsType | Nome do tipo .NET que será usado para deserializar as configurações. Pode ser o nome simples do tipo (se estiver na mesma **assembly** do arquivo `application.json`) ou o nome qualificado com **assembly**.    | NotificationReceiverSettings     |
| sender     | Define uma expressão regular para filtrar os originadores da notificação que o **receiver** pode processar. Apenas notificações que satisfaçam a expressão serão entregues a instância criada. | sender@domain.com |
| destination     | Define uma expressão regular para filtrar os destinatários da notificação que o **receiver** pode processar. Apenas notificações que satisfaçam a expressão serão entregues a instância criada. | destination@domain.com |
| state | Estado necessário do originador para o recebimento de mensagem.  | default |
| outState | Define um estado para o originador depois que a mensagem for processada | default |
