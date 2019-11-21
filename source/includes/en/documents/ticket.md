## Ticket

Represents an attendance ticket.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.ticket+json |

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| id                       | the id of the ticket                           | string            |
| sequentialId             | the ticket sequential id                       | int               |
| routingOwnerIdentity     | if present, used instead of ownerIdentity      | Identity          |
| customerDomain           | the domain of customer                         | string            |
| agentIdentity            | the agent identity                             | Identity          |
| provider                 | the name of the agent provider for ticket      | string            |
| status                   | the ticket status                              | TicketStatusEnum  |
| storageDate              | the ticket creation date                       | DateTimeOffset    |
| expirationDate           | the ticket expiration date                     | DateTimeOffset    |
| openDate                 | the ticket open date                           | DateTimeOffset    |
| closeDate                | the ticket close date                          | DateTimeOffset    |
| statusDate               | the date of the last status                    | DateTimeOffset    |
| externalId               | the providers ticket id                        | string            |
| rating                   | the ticket rating for the agent                | int               |
| team                     | the ticket team                                | string            |
| unreadMessages           | the number of unread messages                  | long              |
| queuePosition            | the position of the ticket in the queue        | int               |
| closed                   | define if the ticket is closed                 | boolean           |
| closedBy                 | the identity that closed the ticket            | Identity          |
| tags                     | the tags of the ticket                         | string array      |
| averageAgentResponseTime | average agent response time                    | double            |
| firstResponseDate        | time the agent take to send the first response | DateTimeOffset    |
| firstResponseDate        | time the agent take to send the first response | DateTimeOffset    |
| parentSequentialId       | the ticket sequential if when transfered       | int               |
| customerInput            | the customer input used to open the ticket     | DocumentContainer |