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

    $container = $('.wrapper').isotope({
      masonry: {
        columnWidth: ".grid-sizer",
      },
      itemSelector: ".item"
    });

    _.each(['red', 'green', 'blue', 'yellow', 'all'], function(val){
      $('a.sort-' + val).click(function(event){
        event.preventDefault();
        var filter = val === 'all' ? '*' : '.' + val + '-container';
        $container.isotope({filter: filter});
      });
    });

    $('a.more-boxes').click(function(event){
      event.preventDefault();
      for(var x = 0; x < 4; x++){
        var div = jQuery('<div/>', { class: 'item ' + color[x] + '-container' });
        div.append('<div class="item-content ' + color[x] + '"></div>');
        $container.append(div);
        $container.isotope( 'addItems', $('.item:last') )
      }
      $container.isotope()
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

      $container.isotope();

    });
  });
});
