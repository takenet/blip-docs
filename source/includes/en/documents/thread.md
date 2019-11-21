## Thread

Represents a conversation thread.

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