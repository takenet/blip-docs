### FAQ

O modelo FAQ (*Frequently Asked Questions* ou Perguntas frequentes) permite a criação de um chatbot simples que consegue responder perguntas feitas pelos clientes através de um modelo de **inteligência artificial**. 

#### Criando um chatbot FAQ

Para utilizar o FAQ, primeiramente é necessário criar um novo chatbot com este modelo. Para isso, vá até a [listagem de chatbots](http://portal.blip.ai/#/application) e escolha a opção **Criar chatbot** e escolha a opção **FAQ**.

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/pt/templates/faq1.png" />

Depois disso, é necessário configurar a sensibilidade do chatbot em relação as perguntas recebidas, definindo o valor mínimo de *score* (relação de aderência entre a pergunta e uma intenção) para uma intenção encontrada pelo provedor de IA. Na prática, isso significa que quanto menor este valor, **mais o chatbot tentará utilizar uma intenção cadastrada no seu modelo para responder as perguntas**, mesmo que as mesmas não sejam totalmente relacionadas a pergunta realizada. E quanto maior este valor, as perguntas diferentes poderão receber a resposta associada a intenção padrão (ex: *"Não entendi o que você quis dizer"*). 

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/pt/templates/faq2.png" />

Role a barra para definir o desejado e clique em **Salvar**. 

O próximo passo é definir as configurações de **feedback**. O feedback permite que os usuários do chatbot informem se cada resposta recebida foi útil ou não, sendo que esta informação pode ser utilizada no **aprimoramento do modelo**.

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/pt/templates/faq3.png" />

Desta forma, toda resposta que tenha uma correspondência com uma intenção do modelo terá os botões de feedback:

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/pt/templates/faq4.png" />

A partir daí, é necessário definir e treinar o modelo de inteligência artificial para começar a receber as respostas dos clientes. Veja o [post no blog do BLiP](http://blog.blip.ai/2017/07/20/novidades-plataforma.html) para saber melhor como configurar seu modelo. Por fim, basta publicar o chatbot no canal de preferência para começar a receber as mensagens dos seus clientes.
