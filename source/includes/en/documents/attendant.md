## Attendant

Represents an agent attendant profile.

| Name                     | Description                                     | Type                       |
|--------------------------|-------------------------------------------------|----------------------------|
| identity                 | the identity of the team’s owner                | Identity                   |
| fullName                 | the name of the agent                           | string                     |
| email                    | the email of the agent                          | string                     |
| teams                    | the list of teams the agent is in               | string array               |
| status                   | the agent status                                | AttendanceStatusEnum       |
| lastServiceDate          | the date of the agent last ticket               | DateTimeOffset             |
| agentSlots               | the number of attendance slot for an agent      | int                        |
| ticketsInService         | the number of open tickets with an agent        | int                        |