### Enviar

O envio de mensagens e notificações só é possível após o estabelecimento da sessão.

Abaixo um exemplo da realização da conexão e posteriormente o envio de uma mensagem:

```javascript
client.connect()
    .then(function(session) {
      // O cliente está conectado, portanto é possível realizar envios a partir daqui
      var msg = { type: "text/plain", content: "Hello, world", to: "553199990000@0mn.io" };
      client.sendMessage(msg);
    });
```

Neste exemplo, o cliente foi conectado com uma chave de acesso e após a realização da conexão, o foi realizado o envio de uma mensagem através do método `sendMessage`. Para enviar uma notificação, utilize o método `sendNotification`, como no exemplo abaixo:

```javascript
client.connect()
    .then(function(session) {
      // Enviando uma notificação "received"
      var notification = { id: "ef16284d-09b2-4d91-8220-74008f3a5788", to: "553199990000@0mn.io", event: Lime.NotificationEvent.RECEIVED };
      client.sendNotification(notification);
    });
```
