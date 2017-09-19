### Master

O modelo **Master** permite que **múltiplos chatbots sejam encapsulados em um único bot**, sendo que em um dado momento, apenas um deles está ativo para cada cliente. Cada sub-bot é registrado com um **serviço** - por exemplo, *navegação* ou *atendimento* - e o chatbot ativo no momento consegue realizar o transbordo para um outro serviço. Neste caso, **somente o chatbot master precisa ser publicado nos canais externos**, sendo que os bots de serviço (ou *bots filhos*) conversam apenas com o master. Apesar disso, não há restrições de publicações em separado dos bots de serviço.

Este modelo facilita a realização do atendimento de **forma híbrida**, que é algo bastante útil para prover um serviço de qualidade aos clientes de um chatbot. Por exemplo, um chatbot do tipo SDK que utiliza uma navegação estruturada pode decidir em um dado momento que o cliente atual deve receber atendimento de um operador humano. 

O proprietário deve sempre definir um chatbot como **principal**, de forma que a primeira mensagem de cada usuário deve ser entregue ao mesmo. O mais comum é que este seja do tipo **SDK/Webhook**, já que a tendência é que os atendimentos começem de maneira automatizada e, se necessário, sejam transferidos para um atendente manual ou FAQ. As **regras de transição são de responsabilidade do chatbot ativo no momento**, mas o caso mais comum é quando um chatbot automatizado não esteja compreendendo as entradas do cliente, ou mesmo o cliente tenha solicitado o atendimento. Neste momento, o chatbot ativo deve enviar uma mensagem com o tipo de conteúdo [**redirecionamento**](https://portal.blip.ai/#/docs/content-types/redirect) informando em `address` o nome do serviço que deverá assumir o controle da conversa a partir deste momento. No caso de chatbots do modelo **atendimento manual**, a transição é realizada através do [**BLiP Web**](https://web.blip.ai), no botão **finalizar atendimento**. Para realizar a transição para o chatbot principal, basta enviar uma mensagem de redirecionamento **sem informar a propriedade `address`**.

A comunicação entre o master e os bots de serviço é feita utilizando a [extensão túnel](https://portal.blip.ai/#/docs/extensions/tunnel). Por este motivo, os bots de serviço não respondem diretamente ao endereço do cliente, mas sim ao endereço do túnel (`<id-do-tunel>@tunnel.msging.net`), mas estes recebem permissão de realizar consultas nos **recursos** do bot master, como *contatos* e *conversas*.

#### Criando um chatbot master

Para criar um novo chatbot master, no [portal BLiP](https://portal.blip.ai) vá em **Chatbots** -> **Criar chatbot** e escolha a opção de modelo pré-definido **master**:

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/master/docs/pt/templates/master1.png" />

Depois disso, é necessário configurar os sub-bots de serviço. Para isso, em  **Configurações** -> **Master** clique no botão **Adicionar serviço**:

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/master/docs/pt/templates/master2.png" />

Desta forma, são listados os chatbots que o usuário tem acesso para escolha. Informe o nome do serviço que cada bot oferece (ex: atendimento, automatizado) e escolha um como principal, marcando a opção **É meu chatbot principal**.

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/master/docs/pt/templates/master3.png" />
