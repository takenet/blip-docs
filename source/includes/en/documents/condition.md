## Condition

Conditions to meet rule or priority rule

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| Property                 | The envelope property that will be analysed.   | string                       |   
| Relation                 | Relation between property and value.           | RuleRelationEnum*             |   
| Values                   | Value to be analysed for forwarding.           | string array                 |

\* **RuleRelationEnum**:  
- Contains = 0  
- NotContains = 1  
- Equals = 2  
- NotEquals = 3 