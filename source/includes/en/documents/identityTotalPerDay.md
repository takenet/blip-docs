## IdentityTotalPerDay

Represents the total of identities in a specific date.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.analytics.identity-total-day+json |

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| owner                    | owner of this total per day                    | Identity          |
| storageDate              | the storage date                               | DateTimeOffset    |
| total                    | total amount of this metric                    | int               |
| domain                   | the domain identity                            | Identity          |