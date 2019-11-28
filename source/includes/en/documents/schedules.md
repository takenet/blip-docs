## Schedules

Represents a message schedule.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.schedule+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| name                     | the schedule name                              | string                       |
| when                     | the date the message should be sent            | DateTimeOffset               |
| message                  | the schedule message                           | Message                      |
| status                   | the schedule status                            | ScheduleStatus*              |

\* **ScheduleStatus**:  
- scheduled  
- executed  
- canceled