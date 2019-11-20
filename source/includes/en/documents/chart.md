## Chart

Represents an analytics chart.

| Name                     | Description                                     | Type                       |
|--------------------------|-------------------------------------------------|----------------------------|
| id                       | the chart unique id                             | string                     |
| name                     | the chart name                                  | string                     |
| chartType                | the chart type                                  | ChartTypeEnum*             |
| dimension                | the chart data dimensions                       | Dimension**                |
| category                 | the chart data category                         | string                     |
| order                    | the chart order                                 | int                        |


\* **ChartTypeEnum**:  
- list = 0  
- table = 1  
- line = 2  
- bar = 3  
- column = 4  
- pie = 5  
- counter = 6  

\*\* **DimensionEnum**:  
- users = 0    
- messages = 1  
- events = 2  
