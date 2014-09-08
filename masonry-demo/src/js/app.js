// Make this the only JS file you include in the body
// Include external libs with 'require' calls

require('jquery');
require('underscore');

// Gives 'console' polyfills to browsers that don't use 'console'
require('./lib/console-support.js');

// Tracks outbound-link activity through Google Analytics
require('./lib/outbound.js');

$(document).ready(function(){
  $container = $('.wrapper');
  $container.masonry(function(){
    columnWidth: ".grid-sizer",
    itemSelector: 'div'
  });

  $container.find('div').click(function(){
    $(this).siblings().removeClass('giant');
    $(this).toggleClass('giant');
    $container.masonry(function(){
      itemSelector: 'div'
    });
  });

  $('#red').click(function(){ $container.masonry({ filter: '.red' }) });
  $('#green').click(function(){ $container.masonry({ filter: '.green' }) });
  $('#blue').click(function(){ $container.masonry({ filter: '.blue' }) });
  $('#yellow').click(function(){ $container.masonry({ filter: '.yellow' }) });
  $('#all').click(function(){ $container.masonry({ filter: '*' }) });
});
