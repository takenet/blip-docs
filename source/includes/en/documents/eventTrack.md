## EventTrack

Represents an event track.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.eventTrack+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| identity                 | user identity                                  | Identity                     |
| contact                  | the event track contact                        | EventContact                 |
| messageId                | the message id                                 | string                       |
| storageDate              | the event track storage date                   | DateTimeOffset               |
| value                    | the value of the event track                   | decimal                      |
| category                 | the category of the event track                | string                       |
| action                   | the action of the event track                  | string                       |
| label                    | the label of the event track                   | string                       |
| extras                   | additional information about event track       | IDictionary \<string,string> |
| count                    | the event track counter                        | int                          |