## AgentProductivitySummary

Represents a summary about agent productivity.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.desk.agentproductivitysummary+json |

| Name                     | Description                                     | Type                       |
|--------------------------|-------------------------------------------------|----------------------------|
| identity                 | the agent identity                              | Identity                   |
| online                   | the amount of time the agent was online         | TimeSpan                   |
| paused                   | the amount of time the agent was in pause       | TimeSpan                   |
| invisible                | the amount of time the agent was invisible      | TimeSpan                   |
| offline                  | the amount of time the agent was offline        | TimeSpan                   |
| total                    | the total amount of time                        | TimeSpan                   |