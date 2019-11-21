## WalletTransaction

Represents a billing transaction.

| MIME type                                 |
|-------------------------------------------|
| application/vnd.iris.billing.wallet-transaction+json |

| Name               | Description                                  | Type                                    |
|--------------------|----------------------------------------------|-----------------------------------------|
| ownerIdentity      | the Identity of the account’s transaction    | Identity                                |
| id                 | the transaction id                           | string                                  |
| walletId           | the wallet id                                | string                                  |
| date               | the transaction date                         | DateTimeOffset                          |
| description        | description provided with transaction        | string                                  |
| type               | the type of the transaction                  | TransactionType (credit, debit, refund) |
| productId          | the product id                               | string                                  |
| refundTransationId | the id of the refund transaction             | string                                  |
| value              | the value of the transaction                 | double                                  |
| extras             | additional information about the transaction | IDictionary\<string, string>             |