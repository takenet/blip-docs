### Transferência de Atendimento 

Em situações em que uma intervenção humana for necessária, como por exemplo em serviços de atendimento ao usuário, existe a possibilidade de utilizar
o aplicativo [BLiP Mensagens](https://play.google.com/store/apps/details?id=net.take.omni) ou o [BLiP Web](https://web.blip.ai/) para receber e responder mensagens de usuários interagindo com seu chatbot.
Todas as mensagens respondidas a partir do aplicativo ou website serão entregues para os usuários como se tivessem sido geradas pelo seu chatbot, de forma transparente. 
Obviamente, é necessário que a pessoa que receberá e responderá as mensagens, que será chamada de atendente daqui em diante, instale o aplicativo (se optar por usar o BLiP Mensagens) e esteja online (tanto aplicativo quanto website).

Para encaminhar uma mensagem recebida para o atendente, utilize a extensão [AttendanceExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/AttendanceForwarding/IAttendanceExtension.cs).

Basta fazer uma chamada ao método `ForwardMessageToAttendantAsync` informando o número de celular do atendente (configurado ao instalar o aplicativo BLiP Mensagens, ou na tela de cadastro do BLiP Web).
Observe que o número deve ser informado com o código internacional (55) e DDD. 

Veja abaixo um exemplo de utilização:

```csharp
public class PlainTextMessageReceiver : IMessageReceiver
{
    private readonly IAttendanceExtension _attendance;

    public PlainTextMessageReceiver(IAttendanceExtension attendanceExtension)
    {
        _attendance = attendanceExtension;
    }

    public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
    {
        // (...)
        // Alguma lógica do fluxo da conversa, determinando que 
        // deve encaminhar a mensagem para o atendente
        await _attendance.ForwardMessageToAttendantAsync(message, "5511XXXXXXXXX", cancellationToken);
    }
}
```

É **obrigatório** registrar no `application.json` um `MessageReceiver` adicional, já implementado pelo próprio SDK.
Este `MessageReceiver` é responsável por repassar automaticamente as mensagens respondidas pelo atendente (que são entregues novamente para seu chatbot)
 para o usuário. 

Veja abaixo como deve ficar:

```json
{
  "messageReceivers": [
    {
      "mediaType": "application/vnd.omni.attendance\\+json",
      "type": "AttendanceReplyMessageReceiver",
      "settings": {
          "attendantIdentity": "5511XXXXXXXXX"
      }
    }
  ]
}
```

Observe que é necessário definir a chave **attendantIdentity**, dentro da propriedade `settings` deste `MessageReceiver`, com o mesmo número de celular utilizado no 
encaminhamento para o atendente. 
