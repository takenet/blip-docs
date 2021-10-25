## Rule

Represents an forward rule for agent messages.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.priority-rules+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|      
|Id                        |The priority rule unique id.                    |string                        |
|OwnerIdentity             |The identity of the priority rule owner.        |Identity                      |
|Title                     |The title of the priority rule.                 |string                        |
|QueueId                   |The team that ticket should be prioritized.     |string                        |
|IsActive                  |Set if rule is active or not.                   |bool                          |
|Conditions                |Conditions to meet object.                      |Condition                     |
|Priority                  |The priority rule create order.                 |int                           |
|Urgency                   |The priority rule degree urngency.              |int                           |

