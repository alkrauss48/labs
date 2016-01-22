(function(){
  var socket = io();

  $('.submit-message').submit(function(event){
    event.preventDefault();

    $('.messages').append('<p>' + $('#my-message').val() + '</p>');
    socket.emit('message', $('#my-message').val());
    $('#my-message').val('');
  });

  socket.on('message', function (data) {
    $('.messages').append('<p>' + data.message + '</p>');
  });
})();
