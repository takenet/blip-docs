**Domains** are message networks connected to the BLiP where **applications** can receive and send messages. Each domain has an identifier, which is normally a [FQDN](https://pt.wikipedia.org/wiki/FQDN).

In order to traffic envelopes (messages, commands and notifications) in a domain, an application must be published to it, being the publication done through the [portal](http://messaginghub.io). At the time of the publication, specific settings of the application may be required. These settings can be used in the translation of the application address (*myapplication@msging.net*), in case of the domain doesn't support federation.

## OMNI

The Omni domain is used on BLiP Chat (the BLiP's channel).

## Tangram

The Tangram domain, developed and maintained by [Take.net](http://take.net), allow your application to use *SMS* to send and receive messages. In order to configure your application to use this domain, access the [BLiP Portal](http://portal.blip.ai), select you application, click in *Details* and then in the *Activate* button for the Tangram domain. After activated, your *SMS* number will be displayed in the *Application Id* field.

## Facebook

To publish your application in the *Facebook Messenger*, go to the [Facebook for Developers](http://developers.facebook.com) page, create your application and take note of the parameters *VerifyToken*, *PageId* and *PageAccessToken*. Now access the [BLiP Portal](http://portal.blip.ai), select you application, click in *Details* and then in the *Activate* button for the Facebook domain. After activated, your *Facebook* identifier will be displayed in the *Application Id* field. To finish the activation of your *application*, go to [Facebook for Developers](http://developers.facebook.com) again and inform the webhook address of your application. Such address will be: [http://msginig.net:8089/webhook/YOUR_APPLICATION_ID](http://msginig.net:8089/webhook/YOUR_APPLICATION_ID).
