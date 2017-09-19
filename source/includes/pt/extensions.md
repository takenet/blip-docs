### Extensões

Extensões são serviços conectados ao **BLiP Messaging Hub** que provêm funcionalidades para facilitar a construção de chatbots pelos desenvolvedores. Elas são clientes especiais conectados à plataforma que podem receber *comandos* e *mensagens* dos chatbots e realizar ações específicas, como por exemplo, agendar ou realizar o envio em massa de mensagens.

Assim como os demais clientes da plataforma, cada extensão possui um endereço único, normalmente no formato `postmaster@[identificador].msging.net`, sendo `identificador` o sub-domínio da extensão. Desta forma, *comandos* e *mensagens* que devem ser tratados pela extensão devem ser endereçados à mesma.

Algumas extensões requerem que o chatbot conceda permissões da mesma enviar mensagem em nome do chatbot, através de um comando `delegation` que deve ser enviado ao servidor no endereço `postmaster@msging.net`. Para maiores detalhes, consulte [a documentação da extensão **delegação**.](./#/docs/extensions/delegation)
