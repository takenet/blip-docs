### Agendamento
| Endereço                        | URI base     | Permissões requeridas   | C#               |
|---------------------------------|--------------|-------------------------|------------------|
| postmaster@scheduler.msging.net | /schedules   | Envio de mensagens  | [SchedulerExtension](https://github.com/takenet/blip-sdk-csharp/tree/master/src/Take.Blip.Client/Extensions/Scheduler/SchedulerExtension.cs) |

A extensão **agendamento** permite o agendamento do envio de mensagens em nome dos chatbots para uma data e horário específico. Qualquer tipo de mensagem pode ser agendada, inclusive mensagens de **envio em massa** (para uma lista de distribuição). O horário do agendamento deve ser realizado no fuso GMT 0.

As notificações são encaminhadas ao chatbot quando recebidas pela extensão.

#### Exemplos
1 - Agendando uma nova mensagem para o dia 25/07/2016 às 17:50h (GMT 0):

```json
{  
  "id": "1",
  "to": "postmaster@scheduler.msging.net",
  "method": "set",
  "uri": "/schedules",
  "type": "application/vnd.iris.schedule+json",
  "resource": {  
    "message": {  
      "id": "ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67",
      "to": "destination@msging.net",
      "type": "text/plain",
      "content": "Teste agendamento"
    },
    "when": "2016-07-25T17:50:00.000Z"
  }
}
```

Resposta em caso de sucesso:

```json
{ 
  "id": "1",
  "from": "postmaster@scheduler.msging.net/#irismsging1",
  "to": "contact@msging.net/default",
  "method": "set",
  "status": "success"
}
```

2 - Consultando um agendamento já realizado (supondo que foi utilizado o exemplo anterior):

```json
{  
  "id": "75c1621e-350c-4e85-8854-3e2cf3abbc3a",
  "to": "postmaster@scheduler.msging.net",
  "method": "get",
  "uri": "/schedules/ad19adf8-f5ec-4fff-8aeb-2e7ebe9f7a67"
}
```

Resposta em caso de sucesso:

```json
{
  "from": "postmaster@scheduler.msging.net/#hmgirismsging2",
  "to": "rssreader@msging.net/default",
  "id": "75c1621e-350c-4e85-8854-3e2cf3abbc3a",
  "method": "get",
  "status": "success",
  "type": "application/vnd.iris.schedule+json",
  "resource": {
    "when": "2016-07-25T17:50:00.000Z",
    "message": {
      "id": "9abfd060-f05b-4ccb-944c-ec9f13525fe0",
      "type": "text/plain",
      "content": "Teste agendamento",
      "from": "contact@msging.net",
      "pp": "postmaster@scheduler.msging.net/contact%40msging.net",
      "to": "destination@msging.net",
    },
    "status": "scheduled"
  }
}
```
Os `status` possíveis são `scheduled`, `executed` e `canceled`. 

#### Delegação
Esta extensão já possui permissões de envio em nome dos chatbots, portanto não é necessário a realização de delegação.
