## TicketsSummary

Represents the summary of tickets values.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.ticketssummary+json |

| Name            | Description                                  | Type                        |
|-----------------|----------------------------------------------|-----------------------------|
| date            | the ticket date                              | DateTimeOffset              |
| waiting         | the amount of waiting tickets                | long                        |
| open            | the amount of open tickets                   | long                        |
| closed          | the amount of closed tickets                 | long                        |
| closedAttendant | the amount of closed by Attendant tickets    | long                        |
| closedClient    | the amount of closed by client tcikets       | long                        |
| transferred     | the amount of transferred tickets            | long                        |
| missed          | the amount of missed tickets                 | long                        |