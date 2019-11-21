## UsersRequest

Represents the user request for Analytics.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.analytics.users-request+json |

| Name               | Description                                  | Type                                    |
|--------------------|----------------------------------------------|-----------------------------------------|
| beginDate          | the begin date of the request                | DateTimeOffset                          |
| endDate            | the end date of the request                  | DateTimeOffset                          |
| users              | the user request                             | UserRequest                             |
| events             | the analyzed events                          | IEnumerable\<EventRequest>              |