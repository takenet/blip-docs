## BillingRule

Represents a rule for message billing.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.billing.rule+json |

| Name                     | Description                                                   | Type                       |
|--------------------------|---------------------------------------------------------------|----------------------------|
| id                       | the rule id                                                   | string                     |
| name                     | the rule name                                                 | string                     |
| value                    | the value that should be charged in case of applying the rule | double                     |
| messageKinds             | the message kinds of the rule                                 | MessageKind array          |
| contentTypes             | the message content type of the rule                          | MediaType array            |
| destinations             | the destinations                                              | string array               |