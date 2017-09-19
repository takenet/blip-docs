### Tipos de conteúdo

O **BLiP Messaging Hub** utiliza tipos de conteúdo de mensagem definidos pelo protocolo LIME e realiza a conversão destes tipos para o formato mais adequado em cada canal. Para mais detalhes, consulte a especificação de tipos de conteúdo do [protocolo LIME](http://limeprotocol.org/content-types.html).

Além disso, é possível enviar **conteúdos nativos** para alguns canais - como Messenger - o que torna possível a utilização de todos os recursos do canal sem restrições. Procure pelo item no menu ao lado para mais detalhes.

#### Metadados

As mensagens recebidas de alguns canais possuem **metadados** específicos de informações exclusivas provenientes do canal. Estas informações são incluídas na propriedade `metadata` das mensagens do BLiP.

Um exemplo de uma mensagem recebida do Messenger:

```json
{ 
  "id": "9dc08447-8b23-4bc2-8673-664dca202ee2",
  "from": "128271320123982@messenger.gw.msging.net",
  "to": "mybot@msging.net",
  "type": "text/plain",
  "content": "Oi",
  "metadata": {
      "messenger.mdi": "mid.$cAAAu_n30PEFiJQdYSlb8785KMO5E",
      "messenger.seq": "19062"
  }    
}
```
As propriedades `messenger.mdi` e `messenger.seq` são especificas do Messenger, mas são entregues junto as mensagens recebidas. No Messenger especificamente, poderão ser entregues diversos metadados diferentes, sendo um dos mais importantes o `messenger.ref` que é o referral gerado quando um cliente clica em um link `m.me/bot-name?ref=value` do seu chatbot ou quando ele escaneia um [código](https://developers.facebook.com/docs/messenger-platform/messenger-code) para o bot. 

```json
{ 
  "id": "2dc05467-4b23-1bc2-8673-664dca202ee2",
  "from": "128271320123982@messenger.gw.msging.net",
  "to": "mybot@msging.net",
  "type": "text/plain",
  "content": "Começar",
  "metadata": {
      "messenger.ref": "website",
      "messenger.source": "SHORTLINK",
      "messenger.type": "OPEN_THREAD"
  }    
}
```
