<!-- ## Portal

The **portal** extension...  --- provide some information ---

### Delete a tenant

Delete a specific [tenant](/#tenant) of a user.

Replace `{tenantId}` with the tenant id you want to delete.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "delete",
  "uri": "/tenants/{tenantId}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "delete",
    uri: "/tenants/{tenantId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/tenants/{tenantId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Delete a permission for an user in an application

Delete a specific [permission](/#userpermission) for a specific user.

Replace `{applicationIdentity}` with the application id you want to delete the permission from.  
Replace `{userIdentity}` with the user identity you want to delete the permission of.  
Replace `{permissionId}` with the permission id you want to delete.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "delete",
  "uri": "/applications/{applicationIdentity}/users/{userIdentity}/permissions/{permissionId}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "delete",
    uri: "/applications/{applicationIdentity}/users/{userIdentity}/permissions/{permissionId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/{userIdentity}/permissions/{permissionId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Delete an user in a tenant

Delete a specific user in a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to delete the user from.  
Replace `{userIdentity}` with the user identity you want to delete.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "delete",
  "uri": "/tenants/{tenantId}/users/{userIdentity}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "delete",
    uri: "/tenants/{tenantId}/users/{userIdentity}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/tenants/{tenantId}/users/{userIdentity}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Delete an user in an application

Delete a specific user in an application.

Replace `{applicationIdentity}` with the application id you want to delete the user from.  
Replace `{userIdentity}` with the user identity you want to delete.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "delete",
  "uri": "/applications/{applicationIdentity}/users/{userIdentity}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "delete",
    uri: "/applications/{applicationIdentity}/users/{userIdentity}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/{userIdentity}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a permission for an user in an application

Get a specific [permission](/#userpermission) for a specific user.

Replace `{applicationIdentity}` with the application id you want to get the permission from.  
Replace `{userIdentity}` with the user identity you want to get the permission of.  
Replace `{permissionId}` with the permission id you want to get.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/applications/{applicationIdentity}/users/{userIdentity}/permissions/{permissionId}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/users/{userIdentity}/permissions/{permissionId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/{userIdentity}/permissions/{permissionId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a tenant

Get a [tenant](/#tenant) of a user.

Replace `{tenantId}` with the tenant id you want to get.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/tenants/{tenantId}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/tenants/{tenantId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/tenants/{tenantId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a tenant name

Get a [tenant](/#tenant) name by id.

Replace `{tenantId}` with the tenant id you want to get.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/existing-tenant/{tenantId}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/existing-tenant/{tenantId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/existing-tenant/{tenantId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get active messages metrics for a tenant

Get active messages metrics for a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the metrics for.  

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/metrics/{tenantId}/active-messages/{interval}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/metrics/{tenantId}/active-messages/{interval}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/metrics/{tenantId}/active-messages/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

### Get active users metrics for a tenant

Get active users metrics for a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the metrics for.  

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/metrics/{tenantId}/active-users/{interval}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/metrics/{tenantId}/active-users/{interval}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/metrics/{tenantId}/active-users/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

### Get all applications in a tenant

Get all applications for a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/tenants/{tenantId}/applications"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/tenants/{tenantId}/applications"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/tenants/{tenantId}/applications")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all permissions of an user in an application

Get all [permissions of a user](/#userpermission) in an application.

Replace `{applicationIdentity}` with the application id you want to get the user permissions from.  
Replace `{userIdentity}` with the user identity you want to get the permissions.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/applications/{applicationIdentity}/users/{userIdentity}/permissions"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/users/{userIdentity}/permissions"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/{userIdentity}/permissions")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all tenants of a user

Get all [tenants](/#tenant) of a user.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/tenants"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/tenants"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/tenants")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all users accounts in an application

Get all users accounts in an application.

Replace `{applicationIdentity}` with the application id you want to get the users accounts from.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/applications/{applicationIdentity}/users/accounts"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/users/accounts"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/accounts")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all users in an application

Get all users in an application.

Replace `{applicationIdentity}` with the application id you want to get the users from.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/applications/{applicationIdentity}/users"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/users"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all users permissions in an application

Get all [users permissions](/#userpermission) in an application.

Replace `{applicationIdentity}` with the application id you want to get the users permissions from.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/applications/{applicationIdentity}/permissions"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/permissions"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/permissions")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get an user in an tenant

Get a specific user in a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the user from.  
Replace `{userIdentity}` with the user identity you want to get. 

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/tenants/{tenantId}/users/{userIdentity}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/tenants/{tenantId}/users/{userIdentity}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/tenants/{tenantId}/users/{userIdentity}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get an user in an application

Get a specific user in an application.

Replace `{applicationIdentity}` with the application id you want to get the user accounts from.  
Replace `{userIdentity}` with the user identity you want to get.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/applications/{applicationIdentity}/users/{userIdentity}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/users/{userIdentity}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/{userIdentity}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get engaged users metrics for a tenant

Get engaged users metrics for a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the metrics for.  

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/metrics/{tenantId}/engaged-users/{interval}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/metrics/{tenantId}/engaged-users/{interval}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/metrics/{tenantId}/engaged-users/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

### Get information about users in a tenant

Get [information about users](/#tenantuserinformation) in a specific [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the information about.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/existing-tenant/{tenantId}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/existing-tenant/{tenantId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/existing-tenant/{tenantId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get received messages metrics for a tenant

Get received messages metrics for a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the metrics for.  

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/metrics/{tenantId}/received-messages/{interval}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/metrics/{tenantId}/received-messages/{interval}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/metrics/{tenantId}/received-messages/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

### Get sent messages metrics for a tenant

Get sent messages metrics for a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the metrics for.  

Replace `{interval}` with the date interval you want to get the metrics.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/metrics/{tenantId}/sent-messages/{interval}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/metrics/{tenantId}/sent-messages/{interval}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/metrics/{tenantId}/sent-messages/{interval}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

Your interval must have one of this statistics interval:

| Interval   | Description                           | QueryString                                       |
|------------|---------------------------------------|---------------------------------------------------|
| Daily      | Statistics collected at each day      | D?startDate=**DATE**&endDate=**DATE**           |
| Monthly    | Statistics collected at each month    | M?startDate=**DATE**&endDate=**DATE**           |
| NoInterval | Statistics collected with no interval | NI?startDate=**DATE**&endDate=**DATE**          |

### Get the payment account in an application

Get the payment account of an application.

Replace `{applicationIdentity}` with the application id you want to get the payment account.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "get",
  "uri": "/applications/{applicationIdentity}/users/payment-account"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/users/payment-account"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/payment-account")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Set a permission to an user in an application

Set a single [permission for a user](/#userpermission) in an application.

Replace `{applicationIdentity}` with the application id you want to set the user permissions for.  
Replace `{userIdentity}` with the user identity you want to set the permission.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "set",
  "uri": "/applications/{applicationIdentity}/users/{userIdentity}/permissions",
  "type": "application/vnd.iris.portal.user-permission+json",
  "resource": {
        "userIdentity": "{userIdentity}",
        "permissionId": "{permissionId}",
        "actions": "{actions}"
  }
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "set",
    uri: "/applications/{applicationIdentity}/users/{userIdentity}/permissions",
    type: "application/vnd.iris.portal.user-permission+json",
    resource: {
        userIdentity: "{userIdentity}",
        permissionId: "{permissionId}",
        actions: "{actions}"
    }
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/users/{userIdentity}/permissions"),
    Type = "application/vnd.iris.portal.user-permission+json",
    Resource = {
        userIdentity = "{userIdentity}",
        permissionId = "{permissionId}",
        actions = "{actions}"
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Set user into a tenant

Set a user into a [tenant](/#tenant).

Replace `{tenantId}` with the tenant id you want to get the information about.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "set",
  "uri": "/existing-tenant/{tenantId}"
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "set",
    uri: "/existing-tenant/{tenantId}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/existing-tenant/{tenantId}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Set user permissions in an application

Set a collection of [user permissions](/#userpermission) in an application.

Replace `{applicationIdentity}` with the application id you want to set the permissions in.

```http
POST https://blip.ai/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "asdasd9as7d-ab4asa89b8w21a",
  "to": "postmaster@portal.blip.ai",
  "method": "set",
  "uri": "/applications/{applicationIdentity}/permissions",
  "type": "application/vnd.lime.collection+json",
  "resource":{
    "itemType": "application/vnd.iris.portal.user-permission+json",
    "items": [
        {
          "userIdentity": "{userIdentity}",
          "permissionId": "{permissionId}",
          "actions": "{actions}"
        }
    ]
}
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@portal.blip.ai",
    method: "get",
    uri: "/applications/{applicationIdentity}/permissions",
    type: "application/vnd.lime.collection+json",
    resource:{
        itemType: "application/vnd.iris.portal.user-permission+json",
        items: [
            {
                userIdentity: "{userIdentity}",
                permissionId: "{permissionId}",
                actions: "{actions}"
        }
    ]
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@portal.blip.ai",
    Uri = new LimeUri("/applications/{applicationIdentity}/permissions"),
    Type: "application/vnd.lime.collection+json",
    Resource = {
        itemType: "application/vnd.iris.portal.user-permission+json"
        items: [
            {
                userIdentity = "{userIdentity}",
                permissionId = "{permissionId}",
                actions = "{actions}"
            }
        ]
    }
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
``` -->