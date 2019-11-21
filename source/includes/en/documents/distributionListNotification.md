## DistributionListNotification

Represents a distribution list notification.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.distribution-list-notification+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| recipient                | the identity of the recipient                  | Identity                     |
| event                    | the event                                      | Event                        |
| reasonCode               | the reason code                                | int                          |
| reasonDescription        | the reason description                         | string                       |
| storageDate              | the storage date                               | DateTimeOffset               |