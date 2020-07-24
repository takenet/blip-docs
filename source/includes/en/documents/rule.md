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
| property                 | the envelope property that will be analysed    | string                       |
| relation                 | the relation between property and value        | RuleRelationEnum*            |
| isActive                 | set if rule is active or not                   | bool                         |
| values                   | value to be analysed for forwarding            | string array                 |

\* **RuleRelationEnum**:  
- Contains = 0  
- NotContains = 1  
- Equals = 2  
- NotEquals = 3  
