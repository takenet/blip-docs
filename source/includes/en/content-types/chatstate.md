### Chat state
| MIME type                                 | C#                                        |
|-------------------------------------------|-------------------------------------------|
| application/vnd.lime.chatstate+json | [Lime.Messaging.Contents.ChatState](https://github.com/takenet/lime-csharp/blob/master/src/Lime.Messaging/Contents/ChatState.cs) |

Allows sending and receiving the information about the conversation current status. Possible status are:

| State        | Description                          |
|---------------|------------------------------------|
| *starting*    | Initiating new conversation |
| *composing*   | Typing/preparing a message  |
| *paused*      | New message typing interrupted, message not sent   |
| *deleting*    | Deleting message (which was being prepared) |
| *gone*        | Exit/Conversation finished  |

In general, there is no need to receive delivery notifications messages with this content, thus it is recommended to omit the *Id* in these messages. For more details,check the [LIME protocol](http://limeprotocol.org/content-types.html#chatstate) specification.

#### Example

Sending status *typing* to Telegram user:

```json
{
    "to":"104222@telegram.gw.msging.net",
    "type":"application/vnd.lime.chatstate+json",
    "content": {
        "state": "composing"
    }
}
```

#### Channel mapping

| Channel              | Type      | Supported states      | 
|----------------------|-----------|-------------------------|
| BLiP Chat            | Chat State | All |
| Messenger            | [Sender Actions](https://developers.facebook.com/docs/messenger-platform/send-api-reference/sender-actions) and [Referral](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral) | *composing* and *paused* (sending only)  and *starting* (referral of an existing thread)|
| SMS                | - | None |
| Skype              | - | None |
| Telegram           | [SendChatAction](https://core.telegram.org/bots/api#sendchataction) | *composing* (sending only) |
