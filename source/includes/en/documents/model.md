## Model

Represents the complete AI model.

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| id                       | the model id                                   | string            |
| culture                  | the model culture code                         | string            |
| provider                 | the provider name                              | string            |
| externalId               | the id of the model in the provider            | string            |
| intentions               | the model intentions                           | Intention array   |
| entities                 | the model associated entities                  | Entity array      |
| JsonModel                | the json representation of the model           | string            |
| storageDate              | the storage date                               | DateTimeOffset    |
| publishDate              | the publish date                               | DateTimeOffset    |
| trainingDate             | the training date                              | DateTimeOffset    |
| apiUri                   | the provider api uri                           | Uri               |
| status                   | the model train status                         | ModelStatus* enum  |
| WorkspaceId              | the workspace identifier                       | string            |
| Version                  | the model version for the workspace            | double            |

\* **ModelStatus**:  
- None = 0  
- Training = 1  
- Trained = 2  
- Published = 3  
- Deleted = 4  
