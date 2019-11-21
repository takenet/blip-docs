## AttendantTicketsSummary

Represents a summary for agent tickets.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.attendantticketssummary+json|

| Name          | Description                  | Type                 |
|---------------|------------------------------|----------------------|
| identity      | the agent identity           | string               |
| status        | the agent status             | AttendantStatusEnum* |
| openedTickets | the number of opened tickets | long                 |

\* **AttendantStatusEnum:**  
- Offline = 0  
- Pause = 1  
- Online = 2  
- Invisible = 3  