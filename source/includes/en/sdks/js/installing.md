### Installing

#### Node.js

If you are using `node.js` (or `webpack`), it's necessary install `messaginghub-client` package (via npm) to access the Blip MessagingHub server.

    npm install --save messaginghub-client lime-transport-websocket

#### Browser

If you are using a web application (on browser) with "pure" Javascript is possible install the package via `npm` using the `<script>` tag. For this case beyond `messaginghub-client` package it's necessary install others dependences as the `lime-js` and `lime-transport-websocket` packages:

```html
<script src="./node_modules/lime-js/dist/lime.js" type="text/javascript"></script>
<script src="./node_modules/lime-transport-websocket/dist/WebSocketTransport.js" type="text/javascript"></script>
<script src="./node_modules/messaginghub-client/dist/messaginghub-client.js" type="text/javascript"></script>
```

You can also use [unpkg](https://unpkg.com) to get the packages if you are not using `npm` on development:
```html
<script src="https://unpkg.com/lime-js" type="text/javascript"></script>
<script src="https://unpkg.com/lime-transport-websocket" type="text/javascript"></script>
<script src="https://unpkg.com/messaginghub-client" type="text/javascript"></script>
```

