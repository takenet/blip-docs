## Subscription (resource)

Represents a subscription to a resource.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.subscription+json |

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| subscriber               | the subscriber                                 | Node                         |
| resourceUri              | the resource uri                               | LimeUri                      |
| persistent               | define if persistent                           | bool                         |
| local                    | define if local                                | bool                         |