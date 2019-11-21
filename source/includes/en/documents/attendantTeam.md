## AttendantTeam

Represents an agent team.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.attendant-team+json |

| Name                     | Description                                     | Type                       |
|--------------------------|-------------------------------------------------|----------------------------|
| ownerIdentity            | the identity of the owner                       | string                     |
| identity                 | the identity of the agent                       | string                     |
| teams                    | the teams of the agent                          | string                     |
| lastServiceDate          | the date of the agent last ticket               | MessageKind array          |
| agentSlots               | the number of the agent slots for an agent      | int                        |