var http = require('http');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var sanitizeHtml = require('sanitize-html');

// Routing
app.use(express.static(__dirname + '/public'));

var io = require('socket.io')(server);
io.on('connection', function(socket){

  socket.on('message', function (data) {
    console.log(data);

    // we tell the client to execute 'message'
    socket.broadcast.emit('message', {
      message: sanitizeHtml(data)
    });
  });
});

server.listen(7070);
