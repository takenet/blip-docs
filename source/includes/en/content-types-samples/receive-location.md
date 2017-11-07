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

You can send location request by using [input](/#user-input) content-type

Sending a location request:


| Messenger                         | BLiPChat                                           |
|-----------------------------------|----------------------------------------------------|
| ![imagem](images/location_request_mssngr.png) | ![imagem](sendLocationBLipChat.png)    |