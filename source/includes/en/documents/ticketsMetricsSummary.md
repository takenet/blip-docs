## TicketsMetricsSummary

Represents summary of tickets metrics.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.tickets-metrics-summary+json|

| Name                 | Description                                  | Type                        |
|----------------------|----------------------------------------------|-----------------------------|
| maxQueueTime         | the max queue time                           | TimeSpan                    |
| maxFirstResponseTime | the max first response time                  | TimeSpan                    |
| avgQueueTime         | the average queue time                       | TimeSpan                    |
| avgWaitTime          | the average wait time                        | TimeSpan                    |
| avgResponseTime      | the average response time                    | TimeSpan                    |
| avgAttendanceTime    | the attendance time                          | TimeSpan                    |
| ticketsPerAttendant  | tickets per attendant                        | string                      |