## Analysis

Represents an AI text analysis.

| Name                     | Description                                     | Type                       |
|--------------------------|-------------------------------------------------|----------------------------|
| id                       | the analysis id                                 | string                     |
| requestDateTime          | the analysis date                               | DateTimeOffset             |
| text                     | the text to be analyzed                         | string                     |
| intention                | the identified intention                        | string                     |
| score                    | the analysis score (confiability)               | double                     |
| feedback                 | the analysis feedback                           | AnalysisModelFeedback      |
| intentionSuggested       | the intention suggested                         | string                     |
| intentions               | the intetions response                          | IntentionResponse array    |
| entities                 | the entities response                           | EntitiyResponse array      |
| messageSource            | the source of the message                       | MessageSource              |
| userIdentity             | the user identity                               | Identity                   |
| messageId                | the message id                                  | string                     |
| modelId                  | the model id                                    | string                     |