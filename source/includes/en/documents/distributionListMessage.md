## DistributionListMessage

Represents information about a distribution list message.

| Name                     | Description                                    | Type                           |
|--------------------------|------------------------------------------------|--------------------------------|
| id                       | the distribution list message id               | string                         |
| recipients               | the number of recipients                       | long                           |
| sent                     | the number of messages sent                    | int                            |
| received                 | the number of messages received                | int                            |
| consumed                 | the number of messages consumed                | int                            |
| failed                   | the number of messages failed                  | int                            |
| status                   | the status of the messages                     | DistributionListMessageStatus* |
| statusDate               | the status date                                | DateTimeOffset                 |

\* **DistributionListMessageStatus:**  
- processing  
- processed  
- failed  