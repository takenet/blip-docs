## Subscription (plan)

Represents the account's subscription of a plan.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.billing.subscription+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| ownerIdentity            | the subscription owner identity                | Identity                     |
| subscriber               | the identity of the subscriber                 | Identity                     |
| planId                   | the plan id                                    | string                       |
| startDate                | the subscription start date                    | DateTimeOffset               |
| endDate                  | the subscription end date                      | DateTimeOffset               |
| lastChangeDate           | the date of the last change                    | DateTimeOffset               |
| isPending                | define if is currently pending                 | boolean                      |
| isActive                 | define if is currently active                  | boolean                      |
| extras                   | additional information about the subscription  | IDicitionary\<string,string> |