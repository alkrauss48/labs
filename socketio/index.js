var http = require('http');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// Routing
app.use(express.static(__dirname + '/public'));

var io = require('socket.io')(server);
io.on('connection', function(socket){

  socket.on('message', function (data) {
    console.log(data);

    // we tell the client to execute 'message'
    socket.broadcast.emit('message', {
      message: data
    });
  });
});

server.listen(3000);
