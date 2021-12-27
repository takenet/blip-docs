## Contact

Represents an contact saved in Blip.

| MIME type                                 |
|-------------------------------------------|
|      application/vnd.lime.contact+json |


| Name             | Description                                                                                                                                                                                                                                  | Type    |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| identity         | The contact's identity, in the  name@domain forma                                                                                                                                                                                       | string  |
| name             | The contact's name.                                                                                                                                                                                                                     | string  |
| address          | The contact's address.                                                                                                                                                                                                                         | string  |
| city             | The contact's city name.                                                                                                                                                                                                                       | string  |
| email            | The contact's e-mail address.                                                                                                                                                                                                                  | string  |
| phoneNumber      | The contact's phone number.                                                                                                                                                                                                                    | string  |
| photoUri         | The contact's photo URI.                                                                                                                                                                                                                       | string  |
| cellPhoneNumber  | The contact's cellphone number.                                                                                                                                                                                                                | string  |
| gender           | The contact's gender (male/female).                                                                                                                                                                                                            | string  |
| timezone         | The contact's timezone relative to GMT.                                                                                                                                                                                                        | integer |
| culture          | The contact's culture info, in the IETF language tag format.                                                                                                                                                                                   | string  |
| extras           | A generic JSON property to store any key/value strings.                                                                                                                                                                                      | object  |
| isPending        | Determines if the contact is pending for acceptance by the roster owner.                                                                                                                                                                     | boolean |
| sharePresence    | Indicates if the roster owner wants to share presence information with the contact. If  true, the server provides a  get delegation permission to the contact identity into the roster owner  presence resource. The default value is  true. | boolean |
| shareAccountInfo | Indicates if the roster owner wants to share account information with the contact. If  true, the server provides a  get delegation permission to the contact identity into the roster owner  account resource. The default value is  true.   | boolean |
| group            | The contact's group name.                                                                                                                                                                                                             | boolean |
| lastMessageDate            | The contact's last interaction.                                                                                                                                                                                                             | datetimeoffset |
| taxDocument | The contact's identification document number. | string |
| source           | The contact's source (channel). Check [here](/#channels).                                                                                                                                                                                  | string  |
