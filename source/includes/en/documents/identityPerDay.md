## IdentityPerDay

Represents identities in a specific date.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.analytics.identity-day+json |

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| owner                    | owner that was hit in this day                 | Identity          |
| storageDate              | storage date                                   | DateTimeOffset    |
| account                  | Identity that hit owner in this day            | Identity          |