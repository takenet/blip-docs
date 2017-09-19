### Receber

O recebimento de mensagens e notificações é feito através das interfaces de `IMessageReceiver` e `INotificationReceiver` respectivamente.

Um `IMessageReceiver` pode ser definido da seguinte forma:

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

Alguns pontos importantes:

- Antes de o método `ReceiveAsync` ser executado, uma notificação do tipo `Event.Received` é automaticamente enviada a quem lhe enviou a mensagem.
- Após o método `ReceiveAsync` ser executado, caso nenhuma exceção tenha ocorrido, uma notificação do tipo `Event.Consumed` é automaticamente enviada a quem lhe enviou a mensagem.
- Caso uma exceção tenha ocorrido no método `ReceiveAsync`, uma notificação do tipo `Event.Failed` é automaticamente enviada a quem lhe enviou a mensagem.

Um `INotificationReceiver` pode ser definido da seguinte forma:

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

As notificações são *fire-and-forget* e caso haja alguma falha durante a execução do método `ReceiveAsync`, esta será ignorada.

O registro das implementações destas interfaces deve ser feito no arquivo `application.json` do projeto. Para mais detalhes, consulte a seção **Configuração**.
