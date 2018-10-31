## Using SDK CSharp 

Besides Builder is possible to create a bot using only code.

BLiP **C\# SDK** is a set of Nuget packages based on [.NET Core](https://dot.net/core), which allows the creation of multiplatform chatbots.
You can check the SDK source code in [Github](https://github.com/takenet/blip-sdk-csharp/) and the documentation on our [Wiki](https://github.com/takenet/blip-sdk-csharp/wiki)

**Requirements**

* Check if you already have .NET Core 2.0 or above (download the SDK [here](https://dot.net/core))

**Before start**

The easiest way to get started is using one of our `dotnet` templates. 

> To install the templates, run the execute command in the shell:

```
dotnet new -i "Take.Blip.Client.Templates::*"
```

> After installing the templates, just create a directory for your chatbot and create a new project using a template:

```
mkdir MyBot
cd MyBot
dotnet new blip-console
```

There are available the following templates:

- `blip-console` - Run as a console application
- `blip-web` - Run as a ASP.NET Core application (experimental)

### 1. Starting your bot

After installed and created the project template, open the `MyBot.csproj` file and build the project. Note that all the necessary files for your bot are already created. 

You will need an `identifier` and an `access key` to be able to connect to the BLiP. To get them:

![imagem](images/csharp1.png)

* Access the [BLiP Portal](https://portal.blip.ai).
* Click in **Create chatbot** button and choose **Create from scratch** mode.
* After your chatbot has been created click in **Configurations** and choose **Conection information** option in left side menu.
* Enable the SDK connection and get the `identifier` and `access key` informations.
* The identifier and the access key must be inserted in the `application.json` file of your project.

> Your application.json file must looks like:

```
{
  "identifier": "your-identifier",
  "accessKey": "your-access-key",
  
  // other stuffs
}
```

* After setted connection informations run your project. The console should show the following messages:

`Starting application...`  
`Application started. Press any key to stop.`

### 2. Reciving a message



### 3. Sending a message

In order to send messages and notifications use an instance of `ISender`, wich is automaticaly injected on constructors of registered receivers defined on project and on Startup class.

> The sample bellow show how to reply a received message with a text:

```csharp
public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;

    public PlainTextMessageReceiver(IMessagingHubSender sender)
    {
        _sender = sender;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        // Write the received message to the console
        Console.WriteLine(message.Content.ToString());
        // Responds to the received message
        _sender.SendMessageAsync("Hi. I just received your message!", message.From, cancellationToken);
    }
}
```
If you need to send any other message content type [click here](#content-types)  
The process of send message is asynchronous and the status of sent messages is delivered to application by **notifications**.