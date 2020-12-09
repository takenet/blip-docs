# Extensions

Extensions are **BLiP** connected services that provide developers with different features for their chatbots. The extensions can receive *commands* and *messages* from the chatbots and execute special tasks, e.g. schedule or send a message broadcast. Through **BLiP** extensions the bot's developer can reuse a lot of code and focus only on bot's logic.

As the other platform nodes, each extension has a unique address with `postmaster@[identifier].msging.net` format. The `identifier` value is the extension sub domain. Thus, to send *commands* and *messages*, use this address. If you don't know what is a command or how you can use this on BLiP, please go to [Concepts > Commands](#commands) section.

Some extensions can require permission to send messages in name of the chatbot. The command `delegation` is used to grant this permission and must be sent to server with `postmaster@msging.net` address. To learn more details, check the [**delegation** documentation](./#/docs/extensions/delegation).

<aside class="notice">
From <b>April 2020</b>, the BLiP HTTP endpoint will change from <b>https://msging.net</b> to <b>https://http.msging.net</b>. <br><br>We strongly advise users to start using the new endpoint as soon as possible.
</aside>

teste