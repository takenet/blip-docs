## TenantUserInformation

Represents a information reguarding a single tenant user.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.portal.tenant-user-information+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| tenantId                 | the id of the tenant                           | string                       |
| userIdentity             | the identity of the user                       | Identity                     |
| fullName                 | the name of the user                           | string                       |
| creationDate             | the creation date                              | DateTimeOffset               |
| updateDate               | the update date                                | DateTimeOffset               |
| userStatus               | the status of the user                         | TenantUserPossibleStatus\*     |
| roleId                   | the role identifier                            | string                       |

\* **TenantUserPossibleStatus**:   
      - PendingTenant  
      - PendingUser  
      - Accepted  
      - Rejected  