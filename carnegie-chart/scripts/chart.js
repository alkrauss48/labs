$(document).foundation();

$(document).ready(function (){

    $('a[id^=group]').click(function(event){
      var div_id = "#descriptions_" + this.id;
      $('#description').trigger('click')
      Foundation.lib_methods.scrollTo($(window), $(div_id).offset().top - 10, 400)
      $(div_id).addClass('flash')
      setTimeout(function(){
        $(div_id).removeClass('flash')
      }, 1000);
    });

});
