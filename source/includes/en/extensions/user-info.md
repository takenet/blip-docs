## User info

The **directory** (or **User info**) extension allows querying information about customers of your bot, like name, photo and other personal information. BLiP will get this information on the client's channel. Because of this, the command should be sent directly to the server node responsable for the channel (`postmaster@<FQDN of the channel>`), using a special **URI** (`lime://<FQDN of the channel>/accounts/<Client identity>`). [Click here](#channels) to see all channels identifiers.

If the information is available, an [Account](http://limeprotocol.org/resources.html#account) document is returned. The availability and detail level of the information depend on the channel, and the application should handle differences appropriately.

The result of directory queries are automatically stored in the **chatbot's roster**, except when there's already an entry with the same identifier in the contacts. For more information about the roster, please refer to the [extension documentation](https://docs.blip.ai/#contacts).

To get information about a customer, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | **GET**  |
| uri    | **/lime://&lt;FQDN of the channel&gt;/accounts/&lt;Client identity&gt;**   |
| to     | **postmaster@&lt;FQDN of the channel&gt;** |

### Get client info (on Messenger)

* Messenger FQDN: `messenger.gw.msging.net`

```javascript
client.addMessageReceiver('text/plain', async (message) => {
        await client.sendCommand({  
            id: Lime.Guid(),
            method: Lime.CommandMethod.GET,
            to: 'postmaster@messenger.gw.msging.net',
            uri: 'lime://messenger.gw.msging.net/accounts/1042221589186385'
        });
    });
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "1",
  "to": "postmaster@messenger.gw.msging.net",
  "method": "get",
  "uri": "lime://messenger.gw.msging.net/accounts/1042221589186385"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "1",
  "from": "postmaster@messenger.gw.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "type": "application/vnd.lime.account+json",
  "method": "get",
  "status": "success",
  "resource": {
    "fullName": "Astraugésilo de Athayde",
    "photoUri": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtf1/v/t1.0-1/p200x200/14429_1013121325123122924983_n.jpg",
    "gender": "male",
    "culture": "pt-BR",
    "timezone": -3
  }
}
```

```csharp
using Lime.Protocol;
using System.Threading;
using System.Threading.Tasks;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Directory;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private IDirectoryExtension _directoryExtension;

        public SampleMessageReceiver(IDirectoryExtension directoryExtension)
        {
            _directoryExtension = directoryExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var identity = Identity.Parse("1042221589186385@messenger.gw.msging.net");
            var account =
                await _directoryExtension
                        .GetDirectoryAccountAsync(identity, cancellationToken);
        }
    }
}
```

###Get client info (**Telegram**)

* Telegram FQDN: `telegram.gw.msging.net`

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.GET,
        to: 'postmaster@telegram.gw.msging.net',
        uri: 'lime://telegram.gw.msging.net/accounts/255600202'
    });
});
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "2",
  "to": "postmaster@telegram.gw.msging.net",
  "method": "get",
  "uri": "lime://telegram.gw.msging.net/accounts/255600202"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "2",
  "from": "postmaster@telegram.gw.msging.net/#irismsging2",
  "to": "contact@msging.net/default",
  "method": "get",
  "status": "success",
  "type": "application/vnd.lime.account+json",
  "resource": {
    "fullName": "João da Silva Sauro"
  }
}
```

```csharp
using Lime.Protocol;
using System.Threading;
using System.Threading.Tasks;
using Take.Blip.Client;
using Take.Blip.Client.Receivers;
using Take.Blip.Client.Extensions.Directory;

namespace Extensions
{
    public class SampleMessageReceiver : IMessageReceiver
    {
        private IDirectoryExtension _directoryExtension;

        public SampleMessageReceiver(IDirectoryExtension directoryExtension)
        {
            _directoryExtension = directoryExtension;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var identity = Identity.Parse("255600202@telegram.gw.msging.net");
            var account =
                await _directoryExtension
                        .GetDirectoryAccountAsync(identity, cancellationToken);
        }
    }
}
```

### Create an alternative address
To create an accessKey for an alternative address, using an [AccountKeyRequest](/#accountkeyrequest) document, send a command to the Uri `lime://<FQDN of the channel>/accounts/<Client identity>/key`.


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "8765464213",
  "to": "postmaster@msging.net",
  "method": "set",
  "uri": "lime://<FQDN of the channel>/accounts/<Client identity>/key",
  "type": "application/vnd.iris.keyRequest+json",
  "resource": {
  	"alternativeAddress": "<alternative Client Identity>",
  	"purpose": "<Purpose>",
  	"temporary": "<true/false>"
  }
}
```