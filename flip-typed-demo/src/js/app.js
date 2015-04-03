// Make this the only JS file you include in the body
// Include external libs with 'require' calls

require('jquery');
require('./lib/typed.js');

$(document).ready(function(){
  $('.flip-button').click(function(event){
    event.preventDefault();
    $('body').toggleClass('scale-out');
    setTimeout(function(){ $('#card').toggleClass('flipped') }, 300);
    setTimeout(function(){
      $('body').toggleClass('scale-out')
      var time = 0;
      $.each($('.back p'), function(i, p){
        setTimeout(function(){
          $(p).typed({
            strings: [$(p).data('text')],
            typeSpeed: -50
          });
        }, time)
        time += 150;
      });
    }, 800);
  });

});
