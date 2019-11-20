## AnalysisRequest

Represents an AI text analysis request.

| Name                     | Description                                           | Type                        |
|--------------------------|-------------------------------------------------------|-----------------------------|
| modelId                  | the model id used in the request                      | string                      |
| text                     | user input to be analyzed                             | string                      |
| providerContext          | provider's conversation context                       | IDictionary<string, object> |
| testingRequest           | defines if the request is a test one                  | bool                        |
| reportRequest            | defines if the request would be used to the report    | bool                        |
| extras                   | additional information                                | IDictionary \<string, string> |
| providerContext          | the conversation context from the configured provider | IDictionary \<string, object> |