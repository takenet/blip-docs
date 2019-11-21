## HttpContentDocument

Represents a http content.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.httpContent+json |

| Name                     | Description                                    | Type                          |
|--------------------------|------------------------------------------------|-------------------------------|
| uri                      | the uri of the http content                    | Uri                           |
| method                   | the method of the http content                 | string                        |
| headers                  | the headers of the http content                | IDictionary \<string, string> |
| queryString              | the query string                               | IDictionary \<string, string> |
| content                  | the http content                               | string                        |