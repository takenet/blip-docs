## AttendanceQueue

Represents an forward attendance queue for agent messages.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.attendancequeue+json |

| Name              | Description                                                      | Type                         |
|-------------------|------------------------------------------------------------------|------------------------------|
| id                | the rule id                                                      | string                       |
| ownerIdentity     | the identity of the queue owner                                  | Identity                     |
| name              | the name of the queu                                             | string                       |
| isActive          | set if queu is active or not                                     | bool                         |
| storageDate       | set input storage date                                           | DateTimeOffset               |
| Priority          | set  queue priority (the lower the number, the higher priority)  | int                          |

