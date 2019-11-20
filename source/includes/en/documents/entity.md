## Entity

Represents an entity in a model.

| Name                     | Description                                    | Type                         |
|--------------------------|------------------------------------------------|------------------------------|
| id                       | the entity id                                  | string                       |
| name                     | the entity name                                | string                       |
| storageDate              | the entity creation date                       | DateTimeOffset               |
| values                   | the entities examples                          | EntityValues array           |
| IsDeleted                | check if the entity was deleted                | bool                         |
| IsSystemEntity           | check if is an system entity                   | bool                         |