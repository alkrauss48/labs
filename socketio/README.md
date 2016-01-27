# [WebSocket Demo](http://websockets.thesocietea.org)
A small little node project to show the power of WebSockets with [socket.io](http://socket.io).

## Installation
```shell
npm install
node index # navigate to localhost:7070
```

## Deploy

To run the node process as a daemon, I recommend using the [forever](https://www.npmjs.com/package/forever) npm
package.

If you put nginx in front of this project (or any other project using WebSockets),
make sure your virtual host is configured properly to accept the Upgrade
header (you need this to "upgrade" your communication to use the WebSockets protocol). Here's a basic config example.

```
server {

  listen       80;
  server_name example.com;

  location / {
    proxy_pass  http://localhost:7070/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
}
```

You would do something similar for Apache as well.
