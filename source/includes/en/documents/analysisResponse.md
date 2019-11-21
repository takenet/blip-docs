## AnalysisResponse

Represents the result of an analysis request.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.ai.analysis-response+json |

| Name                     | Description                                           | Type                        |
|--------------------------|-------------------------------------------------------|-----------------------------|
| id                       | the analysis id                                       | string                      |
| text                     | Text used to process                                  | string                      |
| intentions               | The intentions found in the text                      | IntentionResponse array     |
| entities                 | The entities found in the text                        | EntityResponse array        |
| provider                 | the name of the provider used in the analysis         | string                      |
| modelId                  | the id of the model used in the analysis              | string                      |
| providerContext          | the conversation context from the configured provider | IDictionary \<string, object> |