## Builder

| Address                         |
|---------------------------------|
| postmaster@msging.net           |

**Builder** is a visual tool for create any type of bots with no code. Behind the scenes Builder is a state machine fully integrated with the others BLiP's components.

**The Builder** extension allows change some Builder's behaviors programmaticaly. You can **change or reset a user state** with a command. In addition, the extension can be used to manage the whole bot flow.

### Reset user state

In order to reset a user state, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | **delete**  |
| uri    | **/contexts/{{user-identity}}/stateid%400**   |
| to     | **postmaster@msging.net** (not required) |

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to reset (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io</b>)
</aside>

```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{  
  "id": "0094447a-2581-4597-be6a-a5dff33af156",
  "method": "delete",
  "uri": "/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io/stateid%400"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "method": "delete",
    "status": "success",
    "id": "a32de42c-fb36-49ef-85aa-02384a3733d6",
    "from": "postmaster@msging.net/#az-iris2",
    "to": "docstest@msging.net",
    "metadata": {
        "#command.uri": "lime://docstest@msging.net/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io/stateid%400"
    }
}
```

### Change user state

In order to change a user state, send a command with the following properties:

| Name | Description |
|---------------------------------|--------------|
| id    | Unique identifier of the command.   |
| method    | **set**  |
| uri    | **/contexts/{{user-identity}}/stateid%400**   |
| to     | **postmaster@msging.net** (not required) |
| type   | **text/plain** |
| resource | **{{state-id}}** |

You need access the portal, go to Builder and click on the block contextual menu to get its ID (as picture below).

![image](state_id.png)

<aside class="notice">
Note: Remember to replace the variable {{user-identity}} for the user identity you want to reset (for instance: <b>30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io</b>). You must also define what is the new state you want to send the user, replacing the {{state-id}} variable.
</aside>


```http
POST https://msging.net/commands HTTP/1.1
Content-Type: application/json
Authorization: Key {YOUR_TOKEN}

{
  "id": "1294447a-2581-4597-be6a-a5dff33af156",
  "to": "postmaster@msging.net",
  "method": "set",
  "uri": "/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io/stateid%400",
  "type": "text/plain",
  "resource": "state"
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
        "#command.uri": "lime://docstest@msging.net/contexts/30e26f51-25e5-4dfc-b2bf-6c0ba80027a8.docstest%400mn.io/stateid%400"
    }
}
```

