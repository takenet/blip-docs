## Builder

| Address               |
|-----------------------|
| postmaster@msging.net |

**Builder** is a visual tool for create any type of bots with no code. Behind the scenes Builder is a state machine fully integrated with the others Blip's components.

**The Builder** extension allows change some Builder's behaviors programmaticaly. You can **change, get or reset a user state** with a command. In addition, the extension can be used to manage the whole bot flow.

### Change user state

In order to change a user state, send a command with the following properties:

| Name     | Description                                                 |
|----------|-------------------------------------------------------------|
| id       | Unique identifier of the command.                           |
| method   | **set**                                                     |
| uri      | **/contexts/{{user-identity}}/stateid@{{flow-identifier}}** |
| to       | **postmaster@msging.net** (not required)                    |
| type     | **text/plain**                                              |
| resource | **{{state-id}}**                                            |

Access the portal, go to Builder and click on the block contextual menu to get its ID (as picture below).

![image](state_id.png)

To get the flow identifier, click in Builder's settings and go to Flow Identifier section (as picture below).

![image](flow_id.png)

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to reset (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io</b>) and the variable {{flow-identifier}} with the target flow identifier. You must also define what is the new state you want to send the user, replacing the {{state-id}} variable (for instance: <b>state-one</b>).
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
  await client.sendCommand({  
      id: Lime.Guid(),
      to: 'postmaster@msging.net',
      method: Lime.CommandMethod.SET,
      uri: '/contexts/{{user-identity}}/stateid@{{flow-identifier}}',
      type: 'text/plain',
      resource: '{{state-id}}'
  });
});
```

```python
result = await client.process_command_async(
  Command.from_json(
     {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'set',
      'uri': '/contexts/{{user-identity}}/stateid@{{flow-identifier}}',
      'type': 'text/plain',
      'resource': '{{state-id}}'
    }
  )
)
```

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "set",
  "uri": "/contexts/{{user-identity}}/stateid@{{flow-identifier}}",
  "type": "text/plain",
  "resource": "{{state-id}}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "1294447a-2581-4597-be6a-a5dff33af156",
    "from": "postmaster@msging.net/#az-iris3",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/contexts/{{user-identity}}/stateid@{{flow-identifier}}"
    }
}
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Session;

namespace Extensions
{
    public class ChangeUserStateReceiver : IMessageReceiver
    {
        private readonly IStateManager _stateManager;

        public ChangeUserStateReceiver(IStateManager stateManager)
        {
            _stateManager = stateManager;
        }
        
        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            await _stateManager.SetStateAsync(message.From, "{{state-id}}", cancellationToken);
        }
    }
}
```

### Create a context variable

Create a specific context variable for a specific user.

Replace `{identity}` with the user identity you want to create the context variable for.  
Replace `{variableName}` with the variable name you want to create.  
Replace `{type}` with the variable [Mime Type](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Basico_sobre_HTTP/MIME_types)  
Replace `{resource}` with the value to the variable.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "set",
  "uri": "/contexts/{identity}/{variableName}",
  "type": "{type}",
  "resource": "{resource}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "plain/text",
    "resource": "really cool",
    "method": "get",
    "status": "success",
    "id": "3da135e5-7743-48d6-adad-d74ac38ba6ca",
    "from": "postmaster@msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'set',
      'uri': '/contexts/{identity}/{variableName}',
      'type': '{type}',
      'resource': '{resource}'
    }
  )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "set",
    uri: "/contexts/{identity}/{variableName}",
    type: "{type}",
    resource: "{resource}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Set,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/contexts/{identity}/{variableName}"),
    Type = "{type}",
    Resource = "{resource}"
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Change Builder flow

In order to change the JSON file of your flow, send a command with the following properties:

| Name     | Description                                   |
|----------|-----------------------------------------------|
| id       | Unique identifier of the command.             |
| method   | **set**                                       |
| uri      | **/buckets/blip_portal:builder_working_flow** |
| type     | **application/json**                          |
| resource | **Your JSON**                                 |
|          |                                               |

<aside  class="notice">
Note 1: This command only changes JSON in the flow, but you still need to go to Builder and publish it manually.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        uri: '/buckets/blip_portal:builder_working_flow',
        type:'application/json',
        resource: '{"onboarding": {
    "$contentActions": [
      {
        "input": {
          "bypass": false,
          "$cardContent": {
            "document": {
              "id": "a5f855b2-7344-44ad-bf8b-75bccd63d288",
              "type": "text/plain",
              "content": "Entrada do usuário"
            },
            "editable": false,
            "deletable": false,
            "position": "right"
          },
          "$invalid": false
        },
        "$invalid": false,
        "$$hashKey": "object:9132"
      }
    ],
    "$conditionOutputs": [
      {
        "stateId": "646ede55-1579-481d-87a9-c48463d7d190",
        "$connId": "con_3",
        "conditions": [
          {
            "source": "input",
            "comparison": "exists",
            "values": [],
            "$$hashKey": "object:814"
          }
        ],
        "$invalid": false,
        "$$hashKey": "object:795"
      }
    ],
    "$enteringCustomActions": [],
    "$leavingCustomActions": [],
    "$inputSuggestions": [],
    "$defaultOutput": {
      "stateId": "fallback",
      "$invalid": false
    },
    "id": "onboarding",
    "root": true,
    "$position": {
      "top": "148px",
      "left": "1126px"
    },
    "$title": "Início",
    "$invalidContentActions": false,
    "$invalidOutputs": false,
    "$invalidCustomActions": false,
    "$invalid": false
  },
  "fallback": {
    "$contentActions": [
      {
        "input": {
          "bypass": true,
          "$cardContent": {
            "document": {
              "id": "95b10ba8-e351-4d16-9b10-ce14961cb1fd",
              "type": "text/plain",
              "content": "Entrada do usuário"
            },
            "editable": false,
            "deletable": true,
            "position": "right"
          },
          "$invalid": false
        },
        "$invalid": false,
        "$$hashKey": "object:8767"
      }
    ],
    "$conditionOutputs": [],
    "$enteringCustomActions": [],
    "$leavingCustomActions": [],
    "$inputSuggestions": [],
    "$defaultOutput": {
      "stateId": "onboarding",
      "$invalid": false
    },
    "id": "fallback",
    "$position": {
      "top": "787px",
      "left": "84px"
    },
    "$title": "Exceções",
    "$invalidContentActions": false,
    "$invalidOutputs": false,
    "$invalidCustomActions": false,
    "$invalid": false
  },
  "646ede55-1579-481d-87a9-c48463d7d190": {
    "$contentActions": [
      {
        "action": {
          "type": "SendMessage",
          "settings": {
            "id": "76d7a887-783d-4470-9636-59f4c0732f84",
            "type": "application/vnd.lime.chatstate+json",
            "content": {
              "state": "composing",
              "interval": 1000
            }
          },
          "$cardContent": {
            "document": {
              "id": "76d7a887-783d-4470-9636-59f4c0732f84",
              "type": "application/vnd.lime.chatstate+json",
              "content": {
                "state": "composing",
                "interval": 1000
              }
            },
            "editable": true,
            "deletable": true,
            "position": "left"
          }
        },
        "$invalid": false,
        "$$hashKey": "object:4839"
      },
      {
        "action": {
          "type": "SendMessage",
          "settings": {
            "id": "e66d9771-5303-453b-9446-410ee47ac15f",
            "type": "text/plain",
            "content": "Some text"
          },
          "$cardContent": {
            "document": {
              "id": "e66d9771-5303-453b-9446-410ee47ac15f",
              "type": "text/plain",
              "content": "Some text"
            },
            "editable": true,
            "deletable": true,
            "position": "left"
          }
        },
        "$invalid": false,
        "$$hashKey": "object:4840"
      },
      {
        "input": {
          "bypass": true,
          "$cardContent": {
            "document": {
              "id": "1cf3aaa9-6293-41a3-916f-c05a1a33ecbd",
              "type": "text/plain",
              "content": "name"
            },
            "editable": false,
            "deletable": true,
            "position": "right",
            "editing": false
          },
          "$invalid": false,
          "variable": "name"
        },
        "$$hashKey": "object:9806",
        "$invalid": false
      }
    ],
    "$conditionOutputs": [],
    "$enteringCustomActions": [],
    "$leavingCustomActions": [],
    "$inputSuggestions": [],
    "$defaultOutput": {
      "stateId": "fallback",
      "$invalid": false
    },
    "$tags": [],
    "id": "646ede55-1579-481d-87a9-c48463d7d190",
    "root": false,
    "$title": "Boas vindas",
    "$position": {
      "top": "299px",
      "left": "1127px"
    },
    "$invalidContentActions": false,
    "$invalidOutputs": false,
    "$invalidCustomActions": false,
    "$invalid": false
  }}'
    });
});
```

```python
result = await client.process_command_async(
  Command.from_json(
    {  
      "id": "{{$guid}}",
      "method": "set",
      "uri": "/buckets/blip_portal:builder_working_flow",
      "type": "application/json", 
      "resource":{
        "onboarding": {
          "$contentActions": [
            {
              "input": {
                "bypass": False,
                "$cardContent": {
                  "document": {
                    "id": "a5f855b2-7344-44ad-bf8b-75bccd63d288",
                    "type": "text/plain",
                    "content": "Entrada do usuário"
                  },
                  "editable": False,
                  "deletable": False,
                  "position": "right"
                },
                "$invalid": False
              },
              "$invalid": False,
              "$$hashKey": "object:9132"
            }
          ],
          "$conditionOutputs": [
            {
              "stateId": "646ede55-1579-481d-87a9-c48463d7d190",
              "$connId": "con_3",
              "conditions": [
                {
                  "source": "input",
                  "comparison": "exists",
                  "values": [],
                  "$$hashKey": "object:814"
                }
              ],
              "$invalid": False,
              "$$hashKey": "object:795"
            }
          ],
          "$enteringCustomActions": [],
          "$leavingCustomActions": [],
          "$inputSuggestions": [],
          "$defaultOutput": {
            "stateId": "fallback",
            "$invalid": False
          },
          "id": "onboarding",
          "root": true,
          "$position": {
            "top": "148px",
            "left": "1126px"
          },
          "$title": "Início",
          "$invalidContentActions": False,
          "$invalidOutputs": False,
          "$invalidCustomActions": False,
          "$invalid": False
        },
        "fallback": {
          "$contentActions": [
            {
              "input": {
                "bypass": True,
                "$cardContent": {
                  "document": {
                    "id": "95b10ba8-e351-4d16-9b10-ce14961cb1fd",
                    "type": "text/plain",
                    "content": "Entrada do usuário"
                  },
                  "editable": False,
                  "deletable": True,
                  "position": "right"
                },
                "$invalid": False
              },
              "$invalid": False,
              "$$hashKey": "object:8767"
            }
          ],
          "$conditionOutputs": [],
          "$enteringCustomActions": [],
          "$leavingCustomActions": [],
          "$inputSuggestions": [],
          "$defaultOutput": {
            "stateId": "onboarding",
            "$invalid": False
          },
          "id": "fallback",
          "$position": {
            "top": "787px",
            "left": "84px"
          },
          "$title": "Exceções",
          "$invalidContentActions": False,
          "$invalidOutputs": False,
          "$invalidCustomActions": False,
          "$invalid": False
        },
        "646ede55-1579-481d-87a9-c48463d7d190": {
          "$contentActions": [
            {
              "action": {
                "type": "SendMessage",
                "settings": {
                  "id": "76d7a887-783d-4470-9636-59f4c0732f84",
                  "type": "application/vnd.lime.chatstate+json",
                  "content": {
                    "state": "composing",
                    "interval": 1000
                  }
                },
                "$cardContent": {
                  "document": {
                    "id": "76d7a887-783d-4470-9636-59f4c0732f84",
                    "type": "application/vnd.lime.chatstate+json",
                    "content": {
                      "state": "composing",
                      "interval": 1000
                    }
                  },
                  "editable": True,
                  "deletable": True,
                  "position": "left"
                }
              },
              "$invalid": False,
              "$$hashKey": "object:4839"
            },
            {
              "action": {
                "type": "SendMessage",
                "settings": {
                  "id": "e66d9771-5303-453b-9446-410ee47ac15f",
                  "type": "text/plain",
                  "content": "Some text"
                },
                "$cardContent": {
                  "document": {
                    "id": "e66d9771-5303-453b-9446-410ee47ac15f",
                    "type": "text/plain",
                    "content": "Some text"
                  },
                  "editable": True,
                  "deletable": True,
                  "position": "left"
                }
              },
              "$invalid": False,
              "$$hashKey": "object:4840"
            },
            {
              "input": {
                "bypass": True,
                "$cardContent": {
                  "document": {
                    "id": "1cf3aaa9-6293-41a3-916f-c05a1a33ecbd",
                    "type": "text/plain",
                    "content": "name"
                  },
                  "editable": False,
                  "deletable": True,
                  "position": "right",
                  "editing": False
                },
                "$invalid": False,
                "variable": "name"
              },
              "$$hashKey": "object:9806",
              "$invalid": False
            }
          ],
          "$conditionOutputs": [],
          "$enteringCustomActions": [],
          "$leavingCustomActions": [],
          "$inputSuggestions": [],
          "$defaultOutput": {
            "stateId": "fallback",
            "$invalid": False
          },
          "$tags": [],
          "id": "646ede55-1579-481d-87a9-c48463d7d190",
          "root": False,
          "$title": "Boas vindas",
          "$position": {
            "top": "299px",
            "left": "1127px"
          },
          "$invalidContentActions": False,
          "$invalidOutputs": False,
          "$invalidCustomActions": False,
          "$invalid": False
        }
      }
    }
  )
)
```

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "set",
   "uri": "/buckets/blip_portal:builder_working_flow",
  "type": "application/json", 
  "resource":{
    "onboarding": {
      "$contentActions": [
        {
          "input": {
            "bypass": false,
            "$cardContent": {
              "document": {
                "id": "a5f855b2-7344-44ad-bf8b-75bccd63d288",
                "type": "text/plain",
                "content": "Entrada do usuário"
              },
              "editable": false,
              "deletable": false,
              "position": "right"
            },
            "$invalid": false
          },
          "$invalid": false,
          "$$hashKey": "object:9132"
        }
      ],
      "$conditionOutputs": [
        {
          "stateId": "646ede55-1579-481d-87a9-c48463d7d190",
          "$connId": "con_3",
          "conditions": [
            {
              "source": "input",
              "comparison": "exists",
              "values": [],
              "$$hashKey": "object:814"
            }
          ],
          "$invalid": false,
          "$$hashKey": "object:795"
        }
      ],
      "$enteringCustomActions": [],
      "$leavingCustomActions": [],
      "$inputSuggestions": [],
      "$defaultOutput": {
        "stateId": "fallback",
        "$invalid": false
      },
      "id": "onboarding",
      "root": true,
      "$position": {
        "top": "148px",
        "left": "1126px"
      },
      "$title": "Início",
      "$invalidContentActions": false,
      "$invalidOutputs": false,
      "$invalidCustomActions": false,
      "$invalid": false
    },
    "fallback": {
      "$contentActions": [
        {
          "input": {
            "bypass": true,
            "$cardContent": {
              "document": {
                "id": "95b10ba8-e351-4d16-9b10-ce14961cb1fd",
                "type": "text/plain",
                "content": "Entrada do usuário"
              },
              "editable": false,
              "deletable": true,
              "position": "right"
            },
            "$invalid": false
          },
          "$invalid": false,
          "$$hashKey": "object:8767"
        }
      ],
      "$conditionOutputs": [],
      "$enteringCustomActions": [],
      "$leavingCustomActions": [],
      "$inputSuggestions": [],
      "$defaultOutput": {
        "stateId": "onboarding",
        "$invalid": false
      },
      "id": "fallback",
      "$position": {
        "top": "787px",
        "left": "84px"
      },
      "$title": "Exceções",
      "$invalidContentActions": false,
      "$invalidOutputs": false,
      "$invalidCustomActions": false,
      "$invalid": false
    },
    "646ede55-1579-481d-87a9-c48463d7d190": {
      "$contentActions": [
        {
          "action": {
            "type": "SendMessage",
            "settings": {
              "id": "76d7a887-783d-4470-9636-59f4c0732f84",
              "type": "application/vnd.lime.chatstate+json",
              "content": {
                "state": "composing",
                "interval": 1000
              }
            },
            "$cardContent": {
              "document": {
                "id": "76d7a887-783d-4470-9636-59f4c0732f84",
                "type": "application/vnd.lime.chatstate+json",
                "content": {
                  "state": "composing",
                  "interval": 1000
                }
              },
              "editable": true,
              "deletable": true,
              "position": "left"
            }
          },
          "$invalid": false,
          "$$hashKey": "object:4839"
        },
        {
          "action": {
            "type": "SendMessage",
            "settings": {
              "id": "e66d9771-5303-453b-9446-410ee47ac15f",
              "type": "text/plain",
              "content": "Some text"
            },
            "$cardContent": {
              "document": {
                "id": "e66d9771-5303-453b-9446-410ee47ac15f",
                "type": "text/plain",
                "content": "Some text"
              },
              "editable": true,
              "deletable": true,
              "position": "left"
            }
          },
          "$invalid": false,
          "$$hashKey": "object:4840"
        },
        {
          "input": {
            "bypass": true,
            "$cardContent": {
              "document": {
                "id": "1cf3aaa9-6293-41a3-916f-c05a1a33ecbd",
                "type": "text/plain",
                "content": "name"
              },
              "editable": false,
              "deletable": true,
              "position": "right",
              "editing": false
            },
            "$invalid": false,
            "variable": "name"
          },
          "$$hashKey": "object:9806",
          "$invalid": false
        }
      ],
      "$conditionOutputs": [],
      "$enteringCustomActions": [],
      "$leavingCustomActions": [],
      "$inputSuggestions": [],
      "$defaultOutput": {
        "stateId": "fallback",
        "$invalid": false
      },
      "$tags": [],
      "id": "646ede55-1579-481d-87a9-c48463d7d190",
      "root": false,
      "$title": "Boas vindas",
      "$position": {
        "top": "299px",
        "left": "1127px"
      },
      "$invalidContentActions": false,
      "$invalidOutputs": false,
      "$invalidCustomActions": false,
      "$invalid": false
    }
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "set",
    "status": "success",
    "id": "afasdd-as9d8a7sd987",
    "from": "postmaster@msging.net/#az-iris6",
    "to": "bot@msging.net",
    "metadata": {
        "#command.uri": "lime://bot@msging.net/buckets/blip_portal:builder_working_flow",
        "x-datadog-trace-id": "7204348957486186726",
        "x-datadog-parent-id": "2265720854752050311",
        "x-datadog-sampling-priority": "1"
    }
}
```

```csharp

```

<aside class="notice">
Note 2: Remember to replace the resource content with your flow.
</aside>

### Check connectivity

Allows the bot to test the network connectivity.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/ping"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.ping+json",
    "resource": {},
    "method": "get",
    "status": "success",
    "id": "54388b6a-deea-48a6-a817-bbeb31859629",
    "from": "postmaster@msging.net/#iris-hosted-2"
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'get',
      'uri': '/ping'
    }
  )
)
```

### Delete a context variable

Delete a specific context variable for a specific user.

Replace `{identity}` with the user identity you want to delete the context variables from.  
Replace `{variableName}` with the variable name you want to delete.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "delete",
  "uri": "/contexts/{identity}/{variableName}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "602fecc1-0339-419a-b5a9-080d2b6b816c",
    "from": "postmaster@msging.net/#az-iris3",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'delete',
      'uri': '/contexts/{identity}/{variableName}'
    }
  )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "delete",
    uri: "/contexts/{identity}/{variableName}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Delete,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/contexts/{identity}/{variableName}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all user's context variables

Get all user's context variables, like flow ids, state ids and other variables.

Replace `{identity}` with the user identity you want to get the contexts variables.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/contexts/{identity}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 4,
        "itemType": "text/plain",
        "items": [
            "name",
            "previous-stateid@6951a94a-9f02-48ac-b8ef-473287dc90d1",
            "stateid@6951a94a-9f02-48ac-b8ef-473287dc90d1",
            "tentativas"
        ]
    },
    "method": "get",
    "status": "success",
    "id": "ca446b5f-ecea-4334-8e2c-ce281d9d99df",
    "from": "postmaster@msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'get',
      'uri': '/contexts/{identity}'
    }
  )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "get",
    uri: "/contexts/{identity}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/contexts/{identity}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get all user's context variables with values

Get all user's context variables with their respective values.

Replace `{identity}` with the user identity you want to get the contexts variables.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/contexts/{identity}?withContextValues=true"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "application/vnd.lime.collection+json",
    "resource": {
        "total": 4,
        "itemType": "text/plain",
        "items": [
            {
                "name": "counterexceptionmenu",
                "type": "text/plain",
                "value": "0"
            },
            {
                "name": "name",
                "type": "text/plain",
                "value": "Gabriel"
            }
        ]
    },
    "method": "get",
    "status": "success",
    "id": "ca446b5f-ecea-4334-8e2c-ce281d9d99df",
    "from": "postmaster@msging.net/#az-iris7",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'get',
      'uri': '/contexts/{identity}?withContextValues=true'
    }
  )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "get",
    uri: "/contexts/{identity}?withContextValues=true"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/contexts/{identity}?withContextValues=true")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get a specific context variable

Get a specific user's context variable, retrieving all information about it.

Replace `{identity}` with the user identity you want to get the variable from.  
Replace `{variableName}` with the variable name you want to get.

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/contexts/{identity}/{variableName}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "type": "plain/text",
    "resource": "really cool",
    "method": "get",
    "status": "success",
    "id": "c7985e8b-23d7-4982-95d8-8516d6237cfd",
    "from": "postmaster@msging.net/#az-iris2",
    "to": "demobot@msging.net"
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'get',
      'uri': '/contexts/{identity}/{variableName}'
    }
  )
)
```

```javascript
client.sendCommand({
    id: Lime.Guid(),
    to: "postmaster@msging.net",
    method: "get",
    uri: "/contexts/{identity}/{variableName}"
})
```

```csharp
var command = new Command(){
    Id = EnvelopeId.NewId(),
    Method = CommandMethod.Get,
    To = "postmaster@msging.net",
    Uri = new LimeUri("/contexts/{identity}/{variableName}")
};
var result = await _sender.ProcessCommandAsync(command, cancellationToken);
}
```

### Get user state

In order to get a user state, send a command with the following properties:

| Name   | Description                                                   |
|--------|---------------------------------------------------------------|
| id     | Unique identifier of the command.                             |
| to     | **postmaster@msging.net** (not required)                      |
| method | **get**                                                       |
| uri    | **/contexts/{{user-identity}}/stateid%40{{flow-identifier}}** |

To get the flow identifier, click in Builder's settings and go to Flow Identifier section (as picture below).

![image](flow_id.png)

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to get (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io</b>) and the variable {{flow-identifier}} with the target flow identifier.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        to: 'postmaster@msging.net',
        method: Lime.CommandMethod.GET,
        uri: '/contexts/{{user-identity}}/stateid@{{flow-identifier}}'        
    });
});
```

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "{{$guid}}",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/contexts/{{user-identity}}/stateid@{{flow-identifier}}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{    
    "type": "text/plain",
    "resource": "950dbc23-124a-41ac-8014-37dc6a7909d6",
    "method": "get",
    "status": "success",
    "id": "1294447a-2581-4597-be6a-a5dff33af156",
    "from": "postmaster@msging.net/#az-iris4",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/contexts/{{user-identity}}/stateid@{{flow-identifier}}"
    }
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {
      'id': '{{$guid}}',
      'to': 'postmaster@msging.net',
      'method': 'get',
      'uri': '/contexts/{{user-identity}}/stateid@{{flow-identifier}}'
    }
  )
)
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Session;

namespace Extensions
{
    public class GetUserStateReceiver : IMessageReceiver
    {
        private readonly IStateManager _stateManager;

        public GetUserStateReceiver(IStateManager stateManager)
        {
            _stateManager = stateManager;
        }
        
        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            var state = await _stateManager.GetStateAsync(message.From, cancellationToken);
        }
    }
}
```

### Reset user state

In order to reset a user state, send a command with the following properties:

| Name   | Description                                                   |
|--------|---------------------------------------------------------------|
| id     | Unique identifier of the command.                             |
| method | **delete**                                                    |
| uri    | **/contexts/{{user-identity}}/stateid%40{{flow-identifier}}** |
| to     | **postmaster@msging.net** (not required)                      |

To get the flow identifier, click in Builder's settings and go to Flow Identifier section (as picture below).

![image](flow_id.png)

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to reset (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest@0mn.io</b>) and the variable {{flow-identifier}} with the target flow identifier.
</aside>

```javascript
client.addMessageReceiver('text/plain', async (message) => {
    await client.sendCommand({  
        id: Lime.Guid(),
        method: Lime.CommandMethod.DELETE,
        uri: '/contexts/{{user-identity}}/stateid@{{flow-identifier}}'
    });
});
```

```http
POST https://{{contract_id}}.http.msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "{{$guid}}",
  "method": "delete",
  "uri": "/contexts/{{user-identity}}/stateid@{{flow-identifier}}"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "0094447a-2581-4597-be6a-a5dff33af156",
    "from": "postmaster@msging.net/#az-iris1",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/contexts/{{user-identity}}/stateid@{{flow-identifier}}"
    }
}
```

```python
result = await client.process_command_async(
  Command.from_json(
    {  
      'id': '{{$guid}}',
      'method': 'delete',
      'uri': '/contexts/{{user-identity}}/stateid@{{flow-identifier}}'
    }
  )
)
```

```csharp
using System.Threading;
using System.Threading.Tasks;
using Lime.Protocol;
using Take.Blip.Client;
using Take.Blip.Client.Session;

namespace Extensions
{
    public class ResetUserStateReceiver : IMessageReceiver
    {
        private readonly IStateManager _stateManager;

        public ResetUserStateReceiver(IStateManager stateManager)
        {
            _stateManager = stateManager;
        }

        public async Task ReceiveAsync(Message message, CancellationToken cancellationToken)
        {
            await _stateManager.ResetStateAsync(message.From, cancellationToken);
        }
    }
}
```
