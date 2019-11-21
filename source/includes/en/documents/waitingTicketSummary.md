## WaitingTicketSummary

Represents the summary about waiting tickets.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.waiting-ticket-summary+json|

| Name               | Description                                  | Type                                    |
|--------------------|----------------------------------------------|-----------------------------------------|
| id                 | the waiting ticket id                        | string                                  |
| sequentialId       | the sequential identifier                    | int                                     |
| customerIdentity   | the customer identifier                      | string                                  |
| team               | the team name                                | string                                  |
| queueTime          | the queue time                               | TimeSpan                                |