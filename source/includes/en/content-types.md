# Content Types

```csharp
If you want to see all content-types working clone our SDK sample project:
github.com/takenet/blip-sdk-csharp/tree/master/src/Samples/MessageTypes
```

The **BLiP** uses message content types defined by LIME protocol and performs the conversion of these types to the most adequate format on each destination channel. For more details, check the [LIME protocol content types](http://limeprotocol.org/content-types.html) specification.

Besides that, its possible send **native contents** to some channels - like Messenger - which allows the usage of the channel capabilities without restrictions. See more details on **Native contents** item on left menu.

#### Metadata

Messages received from some channels may have unique **metadata** information coming from the channel. This information is included in the `metadata` property of the BLiP messages.

An example of a message received from Messenger:

```http
{ 
  "id": "9dc08447-8b23-4bc2-8673-664dca202ee2",
  "from": "128271320123982@messenger.gw.msging.net",
  "to": "mybot@msging.net",
  "type": "text/plain",
  "content": "Hello",
  "metadata": {
      "messenger.mdi": "mid.$cAAAu_n30PEFiJQdYSlb8785KMO5E",
      "messenger.seq": "19062"
  }    
}
```

The properties `messenger.mdi` and `messenger.seq` are specific to Messenger, but they are delivered together with incoming messages. In Messenger specifically, several different metadata properties can be delivered, being one of the most important the `messenger.ref` which is the referral generated when a client clicks on a` m.me/bot-name?ref=value` link from your chatbot or when it scans a [code](https://developers.facebook.com/docs/messenger-platform/messenger-code) for the bot.

```http
{ 
  "id": "2dc05467-4b23-1bc2-8673-664dca202ee2",
  "from": "128271320123982@messenger.gw.msging.net",
  "to": "mybot@msging.net",
  "type": "text/plain",
  "content": "Get started",
  "metadata": {
      "messenger.ref": "website",
      "messenger.source": "SHORTLINK",
      "messenger.type": "OPEN_THREAD"
  }    
}
```
