$(document).ready(function readySetGo() {
  var selects = $('select[id^=tea], select[id^=steeping]');

  // Uses howler.js to make the sounds
  // Made by our very own local Goldfire Studios
  var sound = new Howl({
    urls: ['assets/sounds/bell.wav', 'assets/sounds/bell.mp3'],
  });

  var teas = {
    white:    { one:    2,  two:  2.5,  three:  3,     temp:   "160 - 170 F°" },
    yellow:   { one:    2,  two:  2.5,  three:  3,     temp:   "170 - 180 F°" },
    green:    { one:    2,  two:  2.5,  three:  3,     temp:   "170 - 180 F°" },
    oolong:   { one:    2,  two:  2.5,  three:  3,     temp:   "180 - 195 F°" },
    black:    { one:    3,  two:    5,  three:  null,  temp:   "190 - 205 F°" },
    puerh:    { one:    3,  two:    4,  three:  5,     temp:   "205 - 210 F°" },
    rooibos:  { one:    4,  two:    7,  three:  null,  temp:   "200 - 212 F°" },
    mate:     { one:  3.5,  two:  4.5,  three:  7,     temp:   "200 - 212 F°" },
    herbal:   { one:    5,  two:    7,  three:  null,  temp:   "200 - 212 F°" }
  };

  selects.on('change', changedValue);
  $('button[id^=start]').on('click', countdown);
  $('button[id^=clear]').on('click', clearAll);
  $('div[id^=time]').on('decrement', decrement); // Custom callback

  // Preliminary cookie loading
  selects.each(function set_cookies(){
    if(getCookie($(this).attr('id')) != null)
      $(this).val(getCookie($(this).attr('id')));
    $(this).trigger('change');
  });

  // Function definitions

  function countdown(){
    var $d        = $(this).closest('div[id^=main]');
    var $tea      = $d.find('select[id^=tea]');
    var $steeping = $d.find('select[id^=steeping]');
    var $timer    = $d.find('div[id^=time]');

    // wipe everything then start anew
    $d.find('button[id^=clear]').trigger('click');

    // Set the cookies so the users preferences will be saved
    setCookie($tea.attr('id'), $tea.val(), 30);
    setCookie($steeping.attr('id'), $steeping.val(), 30);
    $timer.data('time',
        teas[$tea.find('option:selected').val()]
            [$steeping.find('option:selected').val()] * 60);
    $timer.data('timeout_id',
        setTimeout(function initialTimeout() { $timer.trigger('decrement') }, 1000));
  }

  function clearAll(){
    $time = $(this).closest('div[id^=main]').find("div[id^=time]");
    $time.css('color', '#999999');
    clearTimeout($time.data('timeout_id'));
    $time.text("0 : 00");
  }

  function changedValue(){
    var $d         = $(this).closest('div[id^=main]');
    var tea        = $d.find('select[id^=tea]').find('option:selected').val();
    var steeping   = $d.find('select[id^=steeping]').find('option:selected').val();
    var $btnStart  = $d.find('button[id^=start]');
    var $span      = $d.find('span[id^=spnX]');

    $d.find('span[id^=temp]').text(tea == 'tea' ? '' : teas[tea].temp);

    if(tea == 'tea' || steeping == 'steeping'){
      $span.text("Please make a valid selection");
      $btnStart.attr('disabled', 'disabled');
    }else{
      if(teas[tea][steeping] == null){
        $span.text("No third steeping for " + tea + " tea");
        $btnStart.attr('disabled', 'disabled');
      }else{
        $span.text("");
        $btnStart.removeAttr('disabled');
      }
    }
  }

  function decrement() {
    var secs = $(this).data('time');
    $(this).text(sprintf("%01d : %02d", getMinutes(secs), getSeconds(secs)));

    if($(this).data('time') == 0){
      clearTimeout($(this).data('timeout_id'));
      sound.play();
      $(this).css('color', '#ff0000');
    }else{
      $(this).data('time', $(this).data('time') - 1);
      $(this).data('timeout_id',
          setTimeout(function repeatingTimeout() {
            $(this).trigger('decrement')
          }.bind(this), 1000));
    }
  }

  function getMinutes(secs) { return Math.floor(secs / 60); }
  function getSeconds(secs) { return secs % 60; }
});
