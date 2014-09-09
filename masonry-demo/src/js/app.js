// Make this the only JS file you include in the body
// Include external libs with 'require' calls

require('jquery');
require('underscore');

// Gives 'console' polyfills to browsers that don't use 'console'
require('./lib/console-support.js');

// Tracks outbound-link activity through Google Analytics
require('./lib/outbound.js');
// add columnWidth function to Masonry

$(function() {
  $(document).ready(function(){

    var transitionProp = getStyleProperty('transition');
    var transitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'otransitionend',
      transition: 'transitionend'
    }[ transitionProp ];

    var color = { 0: 'red', 1: 'blue', 2: 'yellow', 3: 'green' }

    $container = $('.wrapper').masonry({
      columnWidth: ".grid-sizer",
      itemSelector: ".item"
    });

    $('a.more-boxes').click(function(event){
      event.preventDefault();
      for(var x = 0; x < 4; x++){
        var div = jQuery('<div/>', { class: 'item' });
        div.append('<div class="item-content ' + color[x] + '"></div>');
        $container.append(div);
        $container.masonry( 'addItems', $('.item:last') )
      }
      $container.masonry()
    });


    $container.on( 'click', '.item-content', function( event ) {
      var $this = $(this);
      var previousContentSize = getSize( this );
      // disable transition
      this.style[ transitionProp ] = 'none';
      // set current size
      $this.css({
        width: previousContentSize.width,
        height: previousContentSize.height
      });

      // $(this).parent().siblings().removeClass('giant');
      var $itemElem = $this.parent().toggleClass('giant');

      // force redraw
      var redraw = this.offsetWidth;

      // renable default transition
      this.style[ transitionProp ] = '';

      // reset 100%/100% sizing after transition end
      if ( transitionProp ) {
        var _this = this;
        var onTransitionEnd = function() {
          _this.style.width = '';
          _this.style.height = '';
        };
        $this.one( transitionEndEvent, onTransitionEnd );
      }

      // set new size
      var size = getSize( $itemElem[0] );
      $this.css({
        width: size.width,
        height: size.height
      });

      $container.masonry();

    });
  });
});
