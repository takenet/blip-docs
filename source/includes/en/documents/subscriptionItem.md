## SubscriptionItem

Represents an item associated to a subscription.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.billing.subscription-item+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| ownerIdentity            | the item’s owner identity                      | Identity                     |
| id                       | the item id                                    | string                       |
| subscriptionId           | the subscription id                            | string                       |
| startDate                | the start date                                 | DateTimeOffset               |