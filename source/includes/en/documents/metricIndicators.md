## MetricIndicators

Represents the number of events in a range.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.analytics.metric-indicators+json|

| Name                     | Description                                    | Type              |
|--------------------------|------------------------------------------------|-------------------|
| intervalStart            | the initial date of the interval               | DateTimeOffset    |
| intervalEnd              | the end date of the interval                   | DateTimeOffset    |
| count                    | the number of events in the range              | int               |
| domain                   | the destination domain                         | string            |