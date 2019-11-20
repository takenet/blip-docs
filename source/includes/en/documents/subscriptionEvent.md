## SubscriptionEvent

Represents an event that occurred in a subscription.

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| id                       | the event id                                   | string                       |
| subscriptionId           | the subscription id                            | string                       |
| date                     | the subscription id                            | DateTimeOffset               |
| eventType                | the event type                                 | SubscriptionEventType*        |


\* **SubscriptionEventType**:   
- Activated  
- Canceled  
- setPending  
- unsetPending  