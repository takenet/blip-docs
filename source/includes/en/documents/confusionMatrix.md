## ConfusionMatrix

Represents a confusion matrix model.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.ai.confusion-matrix+json |

| Name                     | Description                                                           | Type                       |
|--------------------------|-----------------------------------------------------------------------|----------------------------|
| ownerIdentity            | the owner identifier                                                  | string                     |
| id                       | the matrix identifier                                                 | string                     |
| modelId                  | the model identifier                                                  | string                     |
| version                  | the version name                                                      | string                     |
| score                    | matrix score to be used when predicting the score for a true positive | double                     |
| sampleSize               | the amount of samples for each intention                              | int                        |
| createdDate              | the matrix creation date                                              | DateTimeOffset             |
| accuracy                 | the matrix accuracy                                                   | double                     |
| avgScore                 | the model average score                                               | double                     |
| precision                | the model precision                                                   | double                     |
| recall                   | the model recall                                                      | double                     |
| f1Score                  | the model F1 Score                                                    | double                     |
| numberOfSamples          | the number of samples                                                 | int                        |
| matrix                   | The matrix                                                            | int matrix                 |
| perClasses               | Per class summary of the matrix                                       | ConfusionMatrixClass array |
| source                   | external source containing the analysis content                       | string                     |