## Account

Represents an user account information. An account is an interaction with BLiP. Builder saves all account that sends a message as a [Contact](#contact) automatically.

| MIME type                                 |
|-------------------------------------------|
|   application/vnd.lime.account+json |


| Name                  | Description                                                                                                                                      | Type    |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| fullName              | the user full name                                                                                                                               | string  |
| address               | the user address                                                                                                                                 | string  |
| city                  | the number of opened tickets                                                                                                                     | string  |
| email                 | The user e-mail address                                                                                                                          | string  |
| phoneNumber           | The user phone number.                                                                                                                           | string  |
| photoUri              | The user photo URI.                                                                                                                              | string  |
| cellPhoneNumber       | The user cellphone number.                                                                                                                       | string  |
| gender                | The user gender (male/female).                                                                                                                   | string  |
| timezone              | The user timezone relative to GMT.                                                                                                               | integer |
| culture               | The user culture info, in the IETF language tag format.                                                                                          | string  |
| extras                | A generic JSON property to store any key/value strings.                                                                                          | object  |
| isTemporary           | Indicates that the account is temporary is valid only in the current session.                                                                    | boolean |
| password              | Base64 representation of the account password. Only valid on set commands during the account creation or update.                                 | string  |
| oldPassword           | Base64 representation of the account password. Only valid on set commands during the account password update.                                    | string  |
| inboxSize             | Size of account inbox for storing offline messages. The default value is 0.                                                                      | integer |
| allowGuestSender      | Indicates if this account allows receive messages from users with guest sessions.                                                                | boolean |
| allowUnknownSender    | Indicates if this account allows receive messages from users that are not in the account contact list.                                           | boolean |
| storeMessageContent   | Indicates if the content of messages from this account should be stored in the server. Note that for offline messages, this will always happens. | boolean |
| encryptMessageContent | Indicates if the content of messages from this account should be encrypted in the server.                                                        | boolean |