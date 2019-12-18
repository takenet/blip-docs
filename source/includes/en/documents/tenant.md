## Tenant

Represents a tenant in Portal.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.portal.tenant+json|


| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| id                       | The id of the tenant                           | string                       |
| name                     | the name of the tenant                         | string                       |
| photoUri                 | the uri of the image of the tenant             | string                       |
| ownerIdentity            | The tenant's owner identity                    | Identity                     |
| paymentAccount           | The tenant's payment account                   | Identity                     |
| creationDate             | The tenant's creation date                     | DateTimeOffset               |
