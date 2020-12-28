## Using SDK CSharp

Besides Builder is possible to create a bot using only code.
Blip **C\# SDK** is a set of Nuget packages based on [.NET Core](https://dot.net/core), which allows the creation of multiplatform chatbots.
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

<aside class="notice"> From April 2020, an SDK bot may have a <u>limit of 100* simultaneous connections</u> to the platform. <b>We recommend using 5 maximum instances</b>. <br><br><i>*This value may be revised in the future.</i></aside>

### 1. Starting your bot

After installed and created the project template, open the `MyBot.csproj` file and build the project. Note that all the necessary files for your bot are already created.

You will need an `identifier` and an `access key` to be able to connect to the Blip. To get them:

![imagem](images/csharp1.png)

* Access the [Blip Portal](https://portal.blip.ai).
* Click in **Create chatbot** button and choose **Create from scratch** mode. *If you already have your bot created just access them*.
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
<br/>
`Application started. Press any key to stop.`

### 2. Receiving a message

The configuration of your chatbot is made on `application.json` file. Basically this file define all **receivers** and others control properties.

> Check an example of how to minimally set your application.json file:

```
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

Through of `application.json` file the developer can realize a tranparent run of the application. All the other tasks are managed by the .NET Core template package installed before.

Looking for the right side sample the client was configured to use a chatbot with `xpto` identifier with `cXkzT1Rp` accessKey. Besides that was registered a **MessageReceiver** with name **PlainTextMessageReceiver** and a filter for messages with `text/plain` media type. It means that the `PlainTextMessageReceiver` class you be called when a `text/plain` message is received by your bot. If you want to be able to receive other messages content types you must add more receivers in `application.json` file. To see any other advanced settings about `application.json` [click here](https://github.com/takenet/blip-sdk-csharp/blob/master/docs/configuring.md).

The receipt of messages is done using the interaces **IMessageReceiver**.

> A IMessageReceiver can be defined as follow:

```csharp
public class PlainTextMessageReceiver : IMessageReceiver
{
    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        // Write the received message to the console
        Console.WriteLine(message.Content.ToString());
    }
}
```

<aside class="notice">
Some important notes:
</aside>

- Before the **ReceiveAsync** method be executed, a notification of *Event.Received* type is automatically sent to originator of message.
- After **ReceiveAsync** method be executed, if no one exception occur, a notification of type *Event.Consumed* is automatically sent to originator of message.
- If some exception occur on **ReceiveAsync** method, a notificação of type *Event.Failed* is automatically sent to originator of message.

*Optional*

Optionally is also possible handle **Notifications**. The proccess is very similar to receiving message.
The notifcations are fire-and-forget and if occur some exception on ReceiveAsync, this fail will be ignored.

Create a class that implements `INotificationReceiver` and remember to add its name into `application.json` file. For more informations click here.

> An INotificationReceiver can be defined as follow:

```csharp
public class ConsumedNotificationReceiver : INotificationReceiver
{
    public async Task ReceiveAsync(Notification notification, CancellationToken cancellationToken)
    {
        // Write the received notification to the console
        Console.WriteLine(notification.ToString());
    }
}
```

> An `application.json` file sample using a NotificationReceiver

```
{
  "identifier": "xpto",
  "accessKey": "cXkzT1Rp",
  "messageReceivers": [
    {
      "type": "PlainTextMessageReceiver",
      "mediaType": "text/plain"
    }
  ],
  "notificationReceivers": [
    {
      "type": "ConsumedNotificationReceiver",
    }
  ]
}
```

### 3. Sending a message

In order to send messages and notifications use an instance of `ISender`, wich is automaticaly injected on constructors of registered receivers defined on project and on Startup class.

> The sample below show how to reply a received message with a text:

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

The process of send message is asynchronous and the status of sent messages is delivered to application by **notifications**.
If you need to send any other message content type [click here](#content-types)

### 4. Sending a command

A **command** allows querying and manipulation of server resources and the consumption of **Blip** extensions and integrations. To see more details about what are the commands [click here](#commands).

There are two possibilities to send commands. Using the method **SendCommand** of `ISender` interface or using one of the available `IExtension` extensions.

<aside class="notice">
Try aways as possible use the `IExtension` interfaces insted of `ISender`.
</aside>

One of the most common extension is **[Event Analysis](#event-analysis)** that allows to register chatbot's events to create analytics reports in portal.

Let see some samples of how to send commands:

> Using `IExtension` interface

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.EventTracker;

namespace Extensions
{
    public class PlainTextMessageReceiver : IMessageReceiver
    {
        private readonly IEventTrackExtension _eventTrackExtension;

        public PlainTextMessageReceiver(IEventTrackExtension eventTrackExtension)
        {
            _eventTrackExtension = eventTrackExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            await _eventTrackExtension.AddAsync("payments", "success-order");
        }
    }
}
```

> Using `ISender` interface

```csharp
// For this case, the command response is received on a synchronous way.

public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;
    private readonly Settings _settings;

    public PlainTextMessageReceiver(ISender sender, Settings settings)
    {
        _sender = sender;
        _settings = settings;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        var command = new Command {
            Id = 1,
            Method = CommandMethod.Set,
            Uri = new LimeUri("/event-track"),
            Resource = new EventTrack
            {
                Category = "payments",
                Action = "success-order",
            }
        };

        var response = await _sender.ProcessCommandAsync(command, cancellationToken);
    }
}
```

Go to [Extensions](#extensions) or [Integrations](#integrations) sections to see all commands available to be used.

### 5. Samples using CSharp

[Click here](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Samples) to see same bots sample created using SDK C#.