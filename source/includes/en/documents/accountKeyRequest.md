## AccountKeyRequest

Represents an account key request model.

| Name                     | Description                                                     | Type                       |
|--------------------------|-----------------------------------------------------------------|----------------------------|
| alternativeAddress       | the account alternative address (email, phone)                  | Identity                   |
| purpose                  | the key descriptive purpose                                     | string                     |
| Temporary                | indicates if the access key must be removed after the first use | bool                       |
| ttl                      | the key time to live, in milliseconds                           | long                       |