## Contact

Represents an contact saved in Blip.

| MIME type                         |
| --------------------------------- |
| application/vnd.lime.contact+json |

| Name             | Description                                                                                                                                                                                                                              | Type    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| identity         | The identity of the contact, in the name@domain forma                                                                                                                                                                                    | string  |
| name             | The name of the contact.                                                                                                                                                                                                                 | string  |
| address          | The contact address.                                                                                                                                                                                                                     | string  |
| city             | The contact city name.                                                                                                                                                                                                                   | string  |
| email            | The contact e-mail address.                                                                                                                                                                                                              | string  |
| phoneNumber      | The contact phone number.                                                                                                                                                                                                                | string  |
| photoUri         | The contact photo URI.                                                                                                                                                                                                                   | string  |
| cellPhoneNumber  | The contact cellphone number.                                                                                                                                                                                                            | string  |
| gender           | The contact gender (male/female).                                                                                                                                                                                                        | string  |
| timezone         | The contact timezone relative to GMT.                                                                                                                                                                                                    | integer |
| culture          | The contact culture info, in the IETF language tag format.                                                                                                                                                                               | string  |
| extras           | A generic JSON property to store any key/value strings.                                                                                                                                                                                  | object  |
| source           | The contact source (channel). Check [here](/#channels).                                                                                                                                                                                  | string  |
| isPending        | Determines if the contact is pending for acceptance by the roster owner.                                                                                                                                                                 | boolean |
| sharePresence    | Indicates if the roster owner wants to share presence information with the contact. If true, the server provides a get delegation permission to the contact identity into the roster owner presence resource. The default value is true. | boolean |
| shareAccountInfo | Indicates if the roster owner wants to share account information with the contact. If true, the server provides a get delegation permission to the contact identity into the roster owner account resource. The default value is true.   | boolean |
| group            | Indicate the contact group name.                                                                                                                                                                                                         | boolean |
| lastMessageDate  | The contact last interaction.                                                                                                                                                                                                            | string  |
| taxDocument      | The contact identification document code.                                                                                                                                                                                                          | string  |
