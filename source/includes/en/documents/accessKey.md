## AccessKey

Represents an access key.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.accessKey+json |


| Name                     | Description                                               | Type                       |
|--------------------------|-----------------------------------------------------------|----------------------------|
| id                       | the key id                                                | string                     |
| account                  | the account identity                                      | Identity                   |
| key                      | the base64 representation of the actual key               | string                     |
| purpose                  | the descriptive purpose                                   | string                     |
| expiration               | the key expiration date                                   | DateTimeOffset             |
| requirer                 | the account that required the access key                  | Node                       |
| temporary                | indicates if the access key must be removed after 1st use | bool                       |