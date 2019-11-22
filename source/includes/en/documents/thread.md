## Thread

Represents a conversation thread. A conversation thread could be a conversation, a message or a message group.

Every thread must have an associated [Account](#account) or [Contact](#contact).

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.thread+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| ownerIdentity            | the owner identity                             | Identity                     |
| identity                 | the thread identity                            | Identity                     |
| lastMessages             | the last message                               | ThreadMessage                |
| unreadMessages           | the number of unread messages                  | long                         |
| serviceIdentity          | the identity of the service                    | Identity                     |