## ThreadMessage

Represents a thread message.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.thread-message+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| id                       | the unique id                                  | string                       |
| peerIdentity             | the peer identity                              | Identity                     |
| direction                | the direction of the message in the thread     | ThreadMessageDirection       |
| type                     | the type of the message                        | MediaType                    |
| content                  | the content of the message                     | Document                     |
| date                     | the last update                                | DateTimeOffset               |
| status                   | the ticket message status                      | Event                        |
| reason                   | the ticket message reason                      | Reason                       |
| metadata                 | metadata of the message                        | IDicitionary\<string,string> |