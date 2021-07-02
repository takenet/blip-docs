## Using SDK Python

If you are a Python developer and want to create a chatbot with **BLiP**, you must use the BLiP Python SDK. It was developed to help sending and receiving of BLiP messages using Python through persistent WebSocket connections.

Go to [Github](https://github.com/takenet/blip-sdk-python) to see the source code and the full documentation.

**Requirements**

* Python version 3.7 or above (download [here](https://python.org/downloads)).

**Before start**

Create a empty Python project, we recomend the usage of [pipenv](https://pypi.org/project/pipenv/) to better handle your enviroments

```
mkdir my-bot
cd my-bot

# if you use pipenv
pipenv --python 3.9
```

Install `blip-sdk`, `lime-python` and `lime-transport-websocket` package (via pipenv/pip) as a dependecy of your project in order to access the BLiP server.

```
pipenv install blip-sdk lime-python lime-transport-websocket

# or with pip
pip install blip-sdk lime-python lime-transport-websocket
```

<aside class="notice"> From April 2020, an SDK bot may have a <u>limit of 100* simultaneous connections</u> to the platform. <b>We recommend using 5 maximum instances</b>. <br><br><i>*This value may be revised in the future.</i></aside>

### 1. Starting the bot (python)

You will need an `identifier` and an `access key` to be able to connect to the BLiP. To get them:

![imagem](images/csharp1.png)

* Access the [BLiP Portal](https://portal.blip.ai).
* Click in **Create chatbot** button and choose **Create from scratch** mode. *If you already have your bot created just access them*.
* After your chatbot has been created click in **Configurations** and choose **Conection information** option in left side menu.
* Enable the SDK connection and get the `identifier` and `access key` informations.

> Create a `main.py` file, add the code below and replace the variables IDENTIFIER and ACCESS_KEY with informations of your bot.

You can start the client asynchronously or synchronously

> Asynchronously (the recommended way)

```python
import asyncio

from lime_transport_websocket import WebSocketTransport
from blip_sdk import ClientBuilder


async def main_async() -> None:
    # Create a client instance passing the identifier and access key of your chatbot
    client = ClientBuilder() \
        .with_identifier(IDENTIFIER) \
        .with_access_key(ACCESS_KEY) \
        .with_transport_factory(lambda: WebSocketTransport()) \
        .build()

    # Connect with the server asynchronously
    # Connection will occurr via websocket on the 8081 port
    await client.connect_async()
    print('Application started. Press Ctrl + c to stop.')

loop = asyncio.get_event_loop()
loop.run_until_complete(main_async())
loop.run_forever()
```

> Or the sync version (we only recommend for scripts)

```python
from time import sleep
from lime_transport_websocket import WebSocketTransport
from blip_sdk import ClientBuilder


def main() -> None:
    # Create a client instance passing the identifier and access key of your chatbot
    client = ClientBuilder() \
        .with_identifier(IDENTIFIER) \
        .with_access_key(ACCESS_KEY) \
        .with_transport_factory(lambda: WebSocketTransport()) \
        .build()

    # Connect with the server asynchronously
    # Connection will occurr via websocket on the 8081 port
    client.connect()
    print('Application started. Press Ctrl + c to stop.')

main()

while True:
    sleep(1)
```

* After setted connection informations run your project (`pipenv run python main.py` or `python main.py`). The console should show the following messages:

`Application started. Press Ctrl + c to stop.`

### 2. Receiving a message (python)

In order to receive and handle messages you need to use `add_message_receiver` method in `client` object.
All messages sent to the chatbot are redirected to defined **messages** (or **notifications**) `Receivers`. You also can define filters to each receiver. The `callback` function passed to a `Receiver` can be `async` or `sync`.

> The following example show how to add a simple message receiver:

```python
from blip_sdk import ClientBuilder, Receiver
# ...

client.add_message_receiver(Receiver(True, lambda m: print(m)))
```

> It's also possible use a custom function as receiver filter. The sample above shows a message receiver with filter of originator:

```python
from lime_python import Message
from blip_sdk import ClientBuilder, Receiver
# ...

def filter_originator(message: Message) -> bool:
    return message.from_n == '553199990000@0mn.io'

def message_processor(message: Message) -> None:
    # Process received message
    pass

client.add_message_receiver(Receiver(filter_originator, message_processor))
```

> Each registration of a receiver returns a `handler` that can be used to cancel the registration:

```python
from lime_python import Message
from blip_sdk import ClientBuilder, Receiver
# ...

def json_filter(message: Message) -> bool:
    return message.type_n == 'application/json'

def message_processor(message: Message) -> None:
    # Process received message
    pass

remove_receiver = client.add_message_receiver(Receiver(json_filter, message_processor))

# ...
remove_receiver()
```

*Optional*

Optionally is also possible handle **notifications** adding a notification receiver. The proccess is very similar to receiving message.
The notifcations are fire-and-forget and if occur some exception on receiver, this fail will be ignored.

> The next sample show how to add notification receiver with filter to received event type:

```python
from lime_python import Notification, NotificationEvent
from blip_sdk import ClientBuilder, Receiver
# ...

def notifications_filter(notification: Notification) -> bool:
    return notification.event == NotificationEvent.RECEIVED

async def notification_processor_async(notification: Notification) -> None:
    # Process received notifications
    pass

client.add_notification_receiver(
    Receiver(
        notification_filter,
        notification_processor_async
    )
)
```

> Adding notification receiver with a filter using lambda expression

```python
client.add_notification_receiver(
    Receiver(
        lambda n: n.event == NotificationEvent.CONSUMED,
        lambda m: print(m)
    )
)
```
### 3. Sending a message (python)

In order to send messages and notifications use the `send_message` (or `send_notification`) method  in `client` object.

<aside class="notice">
It's possible send notifications and messages only after sessions has been stablished.
</aside>

> The following sample show how to send a message after connection has been stablished:

```python
import asyncio

from lime_python import Message
from blip_sdk import ClientBuilder
# ...

async def main_async() -> None:
    # ...
    await client.connect_async()

    msg = Message(
        'text/plain',
        'Hello, world!',
        to='553199990000@0mn.io'
    )
    client.send_message(message)

# ...
```

> The following sample show how to send a notification after connection has been stablished:

```python
import asyncio

from lime_python import Notification, NotificationEvent
from blip_sdk import ClientBuilder
# ...

async def main_async() -> None:
    # ...
    await client.connect_async()

    notification = Notification(
        NotificationEvent.RECEIVED,
        to='553199990000@0mn.io'
    )
    client.send_notification(notification)

# ...
```

The process of send message is asynchronous and the status of sent messages is delivered to application by notifications.
If you need to send any other message content type [click here](#content-types)

### 4. Sending a command (python)

A **command** allows querying and manipulation of server resources and the consumption of **BLiP** extensions and integrations. To see more details about what are the commands [click here](#commands).

> Using `send_command` method (fire and forget, i.e. no result is returned)

```python
from lime_python import Command
from blip_sdk import ClientBuilder
# ...

resource = {
    'category': 'payments', 
    'action': 'success-order'
}

client.send_command(
    Command(
        CommandMethod.SET,
        '/event-track',
        'application/vnd.iris.eventTrack+json',
        resource
    )
)
```

> Using `process_command` method


> In order to use process command sync you can't have a event loop runnning, this means that this method can only be used in scripts where the connection where made synchronously

```python
from lime_python import Command
from blip_sdk import ClientBuilder
# ...

resource = {
    'category': 'payments', 
    'action': 'success-order'
}

# In order to use process command sync you can't have a event loop runnning
# This method should only be used in scripts where the connection where made synchronously
result = client.process_command(
    Command(
        CommandMethod.SET,
        '/event-track',
        'application/vnd.iris.eventTrack+json',
        resource
    )
)

print(result)
```

> Using `process_command_async` method (Recommended)

```python
import asyncio

from lime_python import Notification, NotificationEvent
from blip_sdk import ClientBuilder
# ...

async def main_async() -> None:
    # ...
    await client.connect_async()

    resource = {
        'category': 'payments', 
        'action': 'success-order'
    }
    client.send_notification(notification)
 
    result = await client.process_command_async(
        Command(
            CommandMethod.SET,
            '/event-track',
            'application/vnd.iris.eventTrack+json',
            resource
       )
    )

# ...
```

One of the most common extension is **[Event Analysis](#event-analysis)** that allows to register chatbot's events to create analytics reports in portal.

Let see some samples of how to send commands:

Go to [Extensions](#extensions) or [Integrations](#integrations) sections to see all commands available to be used.

### 5. Samples using Python

[Click here](https://github.com/takenet/blip-sdk-python/tree/master/examples) to see same bots sample created using SDK Python.
