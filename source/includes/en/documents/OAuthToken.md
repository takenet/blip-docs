## OAuthToken

Represents information about an OAuth token.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.oauth-token+json |

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| token_type               | the token type                                 | string            |
| expires_in               | the amount of minutes to the token expire      | int               |
| access_token             | the access token                               | string            |
| refresh_token            | the refresh token                              | string            |