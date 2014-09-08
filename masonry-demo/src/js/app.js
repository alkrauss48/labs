// Make this the only JS file you include in the body
// Include external libs with 'require' calls

require('jquery');
require('underscore');

// Gives 'console' polyfills to browsers that don't use 'console'
require('./lib/console-support.js');

// Tracks outbound-link activity through Google Analytics
require('./lib/outbound.js');

$(document).ready(function(){

  var transitionProp = getStyleProperty('transition');
  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'otransitionend',
    transition: 'transitionend'
  }[ transitionProp ];

  $container = $('.wrapper').masonry({
    columnWidth: ".grid-sizer",
    itemSelector: ".item"
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
