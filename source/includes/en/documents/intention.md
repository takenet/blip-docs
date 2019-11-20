## Intention

Represent an intent in a model.

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| id                       | the intention identifier                       | string            |
| name                     | the intention name                             | string            |
| questions                | examples of questions                          | Question array    |
| countQuestions           | the number of questions                        | int               |
| healthScore              | the health score                               | double            |
| answers                  | the answers                                    | Answer array      |
| storageDate              | the storage date                               | DateTimeOffset    |
| IsDeleted                | check if is deleted                            | bool              |