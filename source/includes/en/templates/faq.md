### FAQ

The FAQ template (*Frequently Asked Questions*) allows the creation of a simple chatbot that can answer questions asked by customers through an **artificial intelligence** model.

#### Creating a FAQ chatbot 

To use the FAQ, you first need to create a new chatbot with this template. To do this, go to the [chatbots list](http://portal.blip.ai/#/application) and choose the option **Create chatbot** and choose **FAQ**.

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/en/templates/faq1.png" />

After that, it is required to configure the chatbot sensitivity in relation to the questions received, setting the minimum *score* value  for the intentions found by the AI provider. In practice, this means that the lower this value, **the more chatbot will try to use an intention registered in your model to answer the questions**, even if they are not totally related to the asked question.

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/en/templates/faq2.png" />

Scroll the bar to set the wanted value and press **Save**.

The next step is define the **feedack** settings. The feedback allows that the chatbot users 

The next step is to configure the **feedback** settings. Feedback allows chatbot users to report whether each response received was useful or not, and this information can be used in **model enhancement**.

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/en/templates/faq3.png" />

In this way, any response that has a correspondence with an intention of the model will have the feedback buttons:

<img width="600px" src="https://github.com/takenet/messaginghub-docs/raw/develop/docs/en/templates/faq4.png" />

From there, you need to define and train the artificial intelligence model to begin receiving customer responses. See this [Blip blog post](https://translate.google.com.br/translate?sl=pt&tl=en&js=y&prev=_t&hl=pt-BR&ie=UTF-8&u=http%3A%2F%2Fblog.blip.ai%2F2017%2F07%2F20%2Fnovidades-plataforma.html&edit-text=&act=url) to learn more about setting up your model. Finally, just publish the chatbot on the preference channel to start receiving messages from your customers.
