(function(){
  var socket = io();

  $('.submit-message').submit(function(event){
    event.preventDefault();

    $('.messages').append('<tr><td>' + $('#my-message').val() + '</td></tr>');
    socket.emit('message', $('#my-message').val());
    $('#my-message').val('');
  });

  socket.on('message', function (data) {
    $('.messages').append('<tr><td>' + data.message + '</td></tr>');
  });
})();
