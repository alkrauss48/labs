var http = require('http');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var sanitizeHtml = require('sanitize-html');

var rate = 15;
var per  = 8;
var allowance = rate;
var last_check = new Date();

// Routing
app.use(express.static(__dirname + '/public'));

var io = require('socket.io')(server);
io.on('connection', function(socket){

  socket.on('message', function (data) {
    // Implement rate limiting
    var current = new Date();
    var time_passed = Math.floor((current- last_check) / 1000);
    last_check = current;
    allowance += time_passed * (rate / per);
    if (allowance > rate){
      allowance = rate; // throttle
    }

    if(!(allowance < 1.0)){
      console.log(data);

      // we tell the client to execute 'message'
      socket.broadcast.emit('message', {
        message: sanitizeHtml(data)
      });
      allowance -= 1.0;
    }

  });
});

server.listen(7070);
