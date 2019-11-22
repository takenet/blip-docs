## Capability

Represents the messaging capabilities of a node in a session.

| MIME type                                 |
|-------------------------------------------|
|    application/vnd.lime.capability+json |


| Name          | Description                                                                                                                                     | Type         |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| contentTypes  | Indicates the message content types that the session node is able to handle. By default, the server delivers all messages types to the nodes.   | string array |
| resourceTypes | Indicates the command resource types that the session node is able to handle. By default, the server blocks all command addressed to the nodes. | string array |