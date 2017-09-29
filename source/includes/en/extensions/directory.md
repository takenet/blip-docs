## Directory

The **directory** extension allows quering information about the customers of your bot, like name, photo and other personal information. BLiP will get this informations on the client's channel. Because of this the command should be sent directly to the server node responsable for the channel (`postmaster@<FQDN of the channel>`), using an special **URI** (`lime://<FQDN of the channel>/accounts/<Client identity>`).

If the information is available, an [Account](http://limeprotocol.org/resources.html#account) document is returned. The availability and the detail level of the informations depents of the channel and the application should handle the differences appropriately.

The result of directory queries are automatically stored in the **chatbot's roster**, except when there's already an entry with the same identifier in the contacts. For more information about the roster, please refer to the [extension documentation](https://portal.blip.ai/#/docs/extensions/contacts).

To get informations about the customer send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | **GET**  |
| uri    | **/lime://<FQDN of the channel>/accounts/<Client identity>**   |
| to     | **postmaster@<FQDN of the channel>** |

### Get client info (on **Messenger**)

* Messenger FQDN: `messenger.gw.msging.net`

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        'id': '3',
        'method': 'get',
        'uri': '/buckets/xyz1234'
    });
});
```

```http
POST /commands HTTP/1.1
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


###Get client info (**Telegram**)

* Telegram FQDN: `telegram.gw.msging.net`

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        'id': '2',
        'to': 'postmaster@telegram.gw.msging.net',
        'method': 'get',
        'uri': 'lime://telegram.gw.msging.net/accounts/255600202'
    });
});
```

```http
POST /commands HTTP/1.1
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