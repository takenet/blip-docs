## Report

Represents an analytics report.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.report+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| id                       | the unique report id                           | string                       |
| name                     | the report name                                | string                       |
| isPrivate                | defines if the report is private               | bool                         |
| modifiedAt               | the report modified at                         | long                         |
| ownerUserIdentity        | the report owner user identity                 | Identity                     |