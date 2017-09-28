# Extensions

Extensions are **BLiP** connected services to make easy for any developer build chatbots. The extensions can receive *commands* and *messages* from the chatbots and execute special tasks, e.g. schedule or send a message broadcast. Through **BLiP** extensions the bot's developer can reuse a lot of code and focus only on bot's logic.

As the others plataform nodes, each extension has a unique address with `postmaster@[identifier].msging.net` format. The `identifier` value is the extension sub domain. Thus, to send *commands* and *messages* use this address. If you don't know what is a command or how can you use this on BLiP, please go to [Concepts > Commands](#commands) section.

Some extensions can require permission to send messages in name of the chatbot. The command `delegation` is used to grant this permission and mus be send to server with `postmaster@msging.net` address. To know more details see [**delegation** documentation](./#/docs/extensions/delegation).
