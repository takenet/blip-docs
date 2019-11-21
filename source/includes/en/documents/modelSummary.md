## ModelSummary

Represents a model summary.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.ai.model-summary+json |

| Name                     | Description                                          | Type                  |
|--------------------------|------------------------------------------------------|-----------------------|
| intentionsCount          | the intentions count                                 | int                   |
| intetionMinQuestions     | the amount of intentions with less than 10 questions | int                   |
| intentionsSummary        | the intentions summary                               | IntentionSummary list |
| median                   | the current median                                   | double                |
