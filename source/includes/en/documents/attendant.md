## Attendant

Represents an agent attendant profile.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.attendant+json |

| Name                     | Description                                     | Type                       |
|--------------------------|-------------------------------------------------|----------------------------|
| identity                 | the identity of the team’s owner                | Identity                   |
| fullName                 | the name of the agent                           | string                     |
| email                    | the email of the agent                          | string                     |
| teams                    | the list of teams the agent is in               | string array               |
| status                   | the agent status                                | AttendantStatusEnum*       |
| lastServiceDate          | the date of the agent last ticket               | DateTimeOffset             |
| agentSlots               | the number of attendance slot for an agent      | int                        |
| ticketsInService         | the number of open tickets with an agent        | int                        |

\* **AttendantStatusEnum:**  
- Offline = 0  
- Pause = 1  
- Online = 2  
- Invisible = 3  