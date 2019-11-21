## Comment

Represents a comment for an account.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.crm.comment+json |

| Name                     | Description                                                           | Type                       |
|--------------------------|-----------------------------------------------------------------------|----------------------------|
| id                       | the comment id                                                        | string                     |
| authorIdentity           | the identity of the agent / author                                    | Identity                   |
| storageDate              | the comment creation date                                             | DateTimeOffset             |
| content                  | the content of the comment                                            | string                     |