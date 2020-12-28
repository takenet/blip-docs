## Postman Collection

[Postman](https://www.getpostman.com/) is a popular tool to help test APIs. To make it more convenient for developers who are integrating with the Blip APIs, we've developed a Postman collection that contains the full set of APIs.

* [Setup](): How to install Postman and setup Blip's collection
* [Configure](): How to setup all required variable
* [Test](): Testing any Blip APIs

### Setup

To get started, [download](https://www.getpostman.com/apps) and install Postman.

After installed click on the `Run in Postman` button download and import the collection into your app.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5677f06a16cfdabf5a34)

### Configure

Postman offers a configurable variable map which is essentially a set of key-value pairs. It allows you to create commonly used variables that can be reference across multiple requests. You can read more about it [here](https://www.getpostman.com/docs/v5/postman/environments_and_globals/variables). Before to start using Blip's Postman Collection you need to add the `Authorization` variable.

* Go to **Edit** menu option and access the collection's variables.

![imagem](images/configure-postman1.png)  

* Update the `Authorization` variable value with your chatbot API key (for instance `Key xa123sad123`).

![imagem](images/configure-postman2.png)

### Testing

In order to test the collection access the `Resource` folder click in `Store a resource` request and than click in `Send` button. This request add a sample resource in your bot. Go to Blip portal access `Resources` module and check the content.

![imagem](images/configure-postman3.png)

<aside class="notice">
<b>Note:</b> In some requests you may need to add some not static values.
</aside>
