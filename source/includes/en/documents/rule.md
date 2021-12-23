## Rule

Represents an forward rule for agent messages.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.rule+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| id                       | the rule id                                    | string                       |
| ownerIdentity            | the identity of the rule owner                 | Identity                     |
| title                    | the title of the rule                          | string                       |
| isActive                 | set if rule is active or not                   | bool                         |
| Conditions               | Conditions to meet object.                     | Condition                    |
| Priority                 | The priority rule create order.                | int                          |

