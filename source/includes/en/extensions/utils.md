<!-- ## Utils

The **utils** extension...  --- provide some information ---

### Delete a configuration

Delete a specific configuration.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "7bb68670-4eda-4423-bc69-08add0ea7cbe",
  "to": "postmaster@msging.net",
  "method": "delete",
  "uri": "/configuration",
  "type": "application/json",
  "resource": {
    "SomeConfig": "True"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "7bb68670-4eda-4423-bc69-08add0ea7cbe",
    "from": "postmaster@msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "delete",
    uri: "/configuration/",
    type: "application/json",
    resource: {
        SomeConfig: "True"
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/configuration"),
    Type = "application/json",
    Resource = {
        SomeConfig = "True"
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a configuration

Get a specific configuration.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "393acd24-02f0-44fc-88c7-96bfce036cc2",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/configuration"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 1,
        "itemType": "text/plain",
        "items": [
            "admin@msging.net"
        ]
    },
    "method": "get",
    "status": "success",
    "id": "393acd24-02f0-44fc-88c7-96bfce036cc2",
    "from": "postmaster@msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "get",
    uri: "/configuration/"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/configuration")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all configurations of an identity

Get all [configurations](/#configuration) of an identity (your bot).

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "393acd24-02f0-44fc-88c7-96bfce036cc2",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/configuration"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 6,
        "itemType": "application/vnd.iris.configuration+json",
        "items": [
            {
                "owner": "postmaster@ai.msging.net",
                "caller": "demobot@msging.net",
                "name": "Luis.IsActive",
                "value": "False"
            },
            {
                "owner": "postmaster@ai.msging.net",
                "caller": "demobot@msging.net",
                "name": "Luis.Region",
                "value": "westus"
            },
            {
                "owner": "postmaster@ai.msging.net",
                "caller": "demobot@msging.net",
                "name": "Watson.IsActive",
                "value": "True"
            },
            {
                "owner": "postmaster@desk.msging.net",
                "caller": "demobot@msging.net",
                "name": "DefaultProvider",
                "value": "Lime"
            },
            {
                "owner": "postmaster@desk.msging.net",
                "caller": "demobot@msging.net",
                "name": "Lime.IsActive",
                "value": "True"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "90904df8-5acd-4565-bf93-72271d319ef5",
    "from": "postmaster@msging.net/#az-iris1",
    "to": "demobot@msging.net",
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "get",
    uri: "/configuration/caller"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/configuration/caller")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Set a configuration

Set a specific configuration.

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "147d3afa-dfbe-4de2-9202-f47548bb2067",
  "to": "postmaster@msging.net",
  "method": "set",
  "uri": "/configuration",
  "type": "application/json",
  "resource": {
    "SomeConfig": "True"
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "147d3afa-dfbe-4de2-9202-f47548bb2067",
    "from": "postmaster@msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "set",
    uri: "/configuration/",
    type: "application/json",
    resource: {
        SomeConfig: "True"
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/configuration"),
    Type = "application/json",
    Resource = {
        SomeConfig = "True"
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
``` -->