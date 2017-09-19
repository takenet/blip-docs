### Enviar

Para o envio de mensagens e notificações, deve-se utilizar uma instância de `ISender`, que é injetada automaticamente nos construtores dos `receivers` registrados no projeto, além da classe `Startup`.

Abaixo um exemplo de como responder a uma mensagem recebida:

```csharp
public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly ISender _sender;

    public PlainTextMessageReceiver(ISender sender)
    {
        _sender = sender;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        // Write the received message to the console
        Console.WriteLine(message.Content.ToString());
        // Responds to the received message
        await _sender.SendMessageAsync("Hi. I just received your message!", message.From, cancellationToken);
    }
}
```

O envio ocorre de forma assíncrona, sendo que atualizações de status da mensagem são entregues à aplicação através de **notificações**.

Esta classe também permite o envio de **comandos** ao servidor, de maneira semelhante:

```csharp
var command = new Command {
    Method = CommandMethod.Get,
    Uri = new LimeUri("/account")
};

var response = await _sender.ProcessCommandAsync(command, cancellationToken);
```
Neste caso, a resposta do comando é recebida de forma síncrona, na resposta da chamada do método `ProcessCommandAsync`.
