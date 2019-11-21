## Plan

Represents a plan of the account.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.billing.plan+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| ownerIdentity            | the plan identity                              | Identity                     |
| id                       | the plan id                                    | string                       |
| name                     | the plan name                                  | string                       |
| extras                   | additional information about the plan          | IDictionary\<string, string> |