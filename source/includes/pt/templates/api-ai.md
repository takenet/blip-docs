### Atendimento automatizado

O modelo **Atendimento Automatizado** consiste em um serviço que irá responder os clientes através de um fluxo criado no [api.ai](https://api.ai/).

Se você não conhece o **api.ai**, você pode consultar esse [guia rápido](https://docs.api.ai/v17/docs/apiai-in-2-minutes-1).

Para cada fluxo criado no api.ai você pode gerar uma chave de integração que será necessária na configuração do seu chatbot. Consulte a documentação de [autenticação](https://docs.api.ai/docs/authentication) do api.ai para mais informações. Você irá precisar do *Access Token*.

### Configuração

| Nome                | Descrição                                                                               |
|---------------------|-----------------------------------------------------------------------------------------|
| Url                 | Endereço da api do serviço api.ai                                                       |
| Chave de acesso     | Chave(AccessToken) gerada pelo api.ai para o fluxo criado                               |
| Idioma              | Idioma que será usado na comunicação com os seus clientes                               |
| Resposta Padrão     | Texto que é enviado quando a mensagem do cliente não corresponder a nenhum [Intent](https://docs.api.ai/docs/concept-intents)     |
