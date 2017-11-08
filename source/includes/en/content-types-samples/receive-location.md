## Receive Location

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Lime.Messaging.Contents;
using Lime.Protocol;
using Take.Blip.Client;

namespace MessageTypes
{
    public class OptionLocationMessageReceiver : IMessageReceiver
    {
        private readonly ISender _sender;

        public OptionLocationMessageReceiver(ISender sender)
        {
            _sender = sender;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            Document document = new Location
            {
                Latitude = -19.919715,
                Longitude = -43.959753,
                Altitude = 853,
                Text = "Take's place"
            };;

            await _sender.SendMessageAsync(document, message.From, cancellationToken);
        }
    }
}
```
```javascript 
client.sendMessage({
      id: Lime.Guid(),
      type: "application/vnd.lime.location+json",
      to: "128271320123982@messenger.gw.msging.net",
      content: {
        latitude: -19.919715,
        longitude: -43.959753,
        altitude: 853,
        text: "Take's place"
      }
    });
```

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
    "id": "1",
    "to": "1042221589186385@messenger.gw.msging.net",
    "type": "application/vnd.lime.location+json",
    "content": {
        "latitude": -19.918899,
        "longitude": -43.959275,
        "altitude": 853,
        "text": "Take's place"
    }
}
```


You can send location request by using [input](/#user-input) content-type

Sending a location request:


| Messenger                         | BLiPChat                                           |
|-----------------------------------|----------------------------------------------------|
| ![imagem](images/location_request_mssngr.png) | ![imagem](sendLocationBLipChat.png)    |