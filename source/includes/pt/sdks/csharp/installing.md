### Instalação

O SDK C# do BLiP permite a construção de chatbots escaláveis de maneira simples e ágil. O seu código está [aberto no Github](https://github.com/takenet/blip-sdk-csharp) e utiliza como base o **.NET Core**, que suporta diversas plataformas, como **Windows**, **Linux** e **Mac**. 

A versão requerida do SDK do .NET Core é a 2.0 ou superior, que está disponível para instalação [aqui](https://dot.net/core).

Para verificar a versão do .NET Core instalada, execute o seguinte comando no interpretador de linha de comandos do seu sistema operacional (`Powershell`, `cmd`, `bash`, `terminal`, etc.):

```
dotnet --version
```

O resultado deve ser `2.0.0` ou uma versão mais recente.

#### Utilizando o template de projeto

O BLiP disponibiliza [templates do `dotnet`](https://github.com/dotnet/templating) para acelerar a criação dos chatbots com o SDK C#. Os templates servem para criar a estrutura básica de projetos, incluindo pacotes e arquivos necessários para utilização da aplicação. Por exemplo, o comando `dotnet new mvc` cria um projeto utilizando o template `mvc`, que já vem pré-instalado no SDK do .NET Core, e serve para criar aplicações *ASP.NET Core MVC*. Se quiser ver quais templates estão instalado no seu computador, execute o comando `dotnet new --list`.

Para utilizar os templates do BLiP é necessário, antes de tudo, **instalá-los em seu computador**. Para isso, execute o seguinte comando:

```
dotnet new -i Take.Blip.Client.Templates::*
```

A instalação dos templates do BLiP precisa ser feita *apenas uma vez*, mas pode ser repetido caso queira atualizá-lo para versões mais novas. A partir daí, é possível criar projetos utilizando os templates. 

Os templates do BLiP disponíveis atualmente são:

- `blip-console` - Cria o chatbot como um *Console Application*. É o template que **deve ser utilizado para a maioria dos casos**.
- `blip-web` - Cria o chatbot como um *ASP.NET Core application* (experimental). Para utilizar este template, seu chatbot precisa de ser do tipo **Webhook**.

O próximo passo é criar o diretório para seu chatbot e criar um novo projeto a partir do template:

```
mkdir MeuBot
cd MeuBot
dotnet new blip-console
```

Desta forma, é criado um projeto `MeuBot.csproj` e todos os arquivos necessários para o funcionamento da sua aplicação. Os editores sugeridos para trabalhar com o SDK do BLiP são:

- **Visual Studio 2017** (Atualização 3) - IDE para Windows. Baixe a versão Community (gratuita) [aqui](https://www.visualstudio.com/vs/community/).
- **Visual Studio Code** - Editor de código *open-source*, disponível para Windows, Linux e Mac. Baixe [aqui](https://code.visualstudio.com/). É recomendado instalar a extensão C#.
- **Visual Studio for Mac** - IDE para Mac. Baixe gratis [aqui](https://www.visualstudio.com/vs/visual-studio-mac/).

Você precisará de um identificador e uma chave de acesso para poder se conectar ao BLiP. Para obtê-los:
- Acesse o [Painel BLiP](https://portal.blip.ai).
- Na aba `Chatbots` clique em `Criar chatbot`.
- Escolha a opção `SDK` (para desenvolvedores) e preencha as informações solicitadas
- Pronto, seu chatbot foi criado e o identificador e chave de acesso serão exibidos na opção `Configurações` do menu lateral.

O identificador e a chave de acesso devem ser definidos no arquivo `application.json` do seu projeto.

Para compilar o projeto, execute os seguinte comando no diretório da aplicação:

```
dotnet build
```

Para executar a partir do código-fonte:

```
dotnet run
```

E se quiser executar a partir dos binários compilados, execute:

```
dotnet ./bin/Release/MeuBot.dll
```

#### Utilizando programaticamente

Você pode optar em não utilizar o template do BLiP e programaticamente criar e configurar seu chatbot, utilizando o cliente apenas para recebimento e envio de mensagens, notificações e comandos. Neste caso, basta instalar o [pacote](https://www.nuget.org/packages/Take.Blip.Client) do cliente, utilizando o seguinte comando:

```
dotnet add package Take.Blip.Client
```

> Observação: Todo o restante da documentação do SDK considera que o desenvolvedor está utilizando o template de projeto

Para construir uma instância do cliente, utilize a classe `BlipClientBuilder`, informando as configurações do seu chatbot nos métodos desta classe e por fim, chamando o método `Build()` para receber uma instância de `IBlipClient`, que representa a conexão com a plataforma.

```csharp
// Constroi um novo cliente com o identifier e access key
var client = new BlipClientBuilder()
    .UsingAccessKey("mybot", "V01WNEJtVDBvRVRod1Bycm11Umw=")
    .Build();

// Inicializa o cliente, registrando handlers para recebimento dos envelopes
await client.StartAsync(
    m =>
    {
        Console.WriteLine("Message '{0}' received from '{1}': {2}", m.Id, m.From, m.Content);
        return client.SendMessageAsync("Pong!", message.From, cancellationToken);
    },
    n =>
    {
        Console.WriteLine("Notification '{0}' received from '{1}': {2}", n.Id, n.From, n.Event);
        return TaskUtil.TrueCompletedTask;
    },
    c =>
    {
        Console.WriteLine("Command '{0}' received from '{1}': {2} {3}", c.Id, c.From, c.Method, c.Uri);
        return TaskUtil.TrueCompletedTask;
    },
    cancellationToken);

Console.WriteLine("Client started. Press enter to stop.");
Console.ReadLine();

// Finaliza a conexão
await client.StopAsync(cancellationToken);

Console.WriteLine("Client stopped. Press enter to exit.");
Console.ReadLine();
```
