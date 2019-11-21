## OpenTicketSummary

Represents summary about open tickets.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.open-ticket-summary+json |

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| id                       | the open ticket id                             | string            |
| sequentialId             | the sequential id of a ticket                  | int               |
| agentIdentity            | the agent identifier                           | string            |
| customerIdentity         | the customer identifier                        | string            |
| ownerUserIdentity        | the report owner user identity                 | Identity          |
| team                     | the team name                                  | string            |
| queueTime                | the queue time                                 | TimeSpan          |
| firstResponseTime        | the first time response                        | TimeSpan          |
| attendanceTime           | the attendance time                            | TimeSpan          |