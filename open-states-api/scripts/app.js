
function validateForm(callback){
  var $form = $('form.petition');
  if($form.find('#name').val() == ''){
    callback('Please enter a valid Name');
  }else if($form.find('#zip').val() == ''){
    callback('Please enter a valid Zip Code');
  }else{
    callback(null);
  }
}

function getLatLongFromZip(callback){
  $.ajax({
    type: "GET",
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22' + $('#zip').val() + '%22&format=json&diagnostics=true',
    dataType: "jsonp",
    cache: false,
    contentType: "application/json",
    success: function(data){
      var result = data.query.results.Result;
      localStorage.setItem('coordinates', JSON.stringify({
        'latitude':  result.latitude,
        'longitude': result.longitude
      }));
      callback(null, result.latitude, result.longitude); //Gets sent to next function
    }
  });
}

function getLegislatorInfo(latitude, longitude, callback){
  $.ajax({
    type: "GET",
    url: 'http://openstates.org/api/v1/legislators/geo?lat=' + latitude + '&long=' + longitude + '&apikey=5b2bde2ed23447da867d9b05dad86425',
    dataType: "jsonp",
    cache: false,
    contentType: "application/json",
    success: function(data){
      $('.tweet-legislators').empty();
      for(key in data){
        var rep = data[key];
        $('.tweet-legislators').append('<div id="' + rep.id + '"></div>');
        $('#' + rep.id).append(
          // '<a target="twitter" href="https://twitter.com/intent/tweet?text=I found you with the OpenStates API!">' + rep.full_name + '</a>'
          '<a>' + rep.full_name + '</a>'
          );
        console.log(data);
      }
    }
  });
}

$(document).ready( function() {
  if(localStorage.getItem('coordinates')){
    coords = JSON.parse(localStorage.getItem('coordinates'));
    getLegislatorInfo(coords.latitude, coords.longitude, null);
  }

  $('form.petition').on('submit', function(event){
    event.preventDefault();
    async.waterfall([
      validateForm,
      getLatLongFromZip,
      getLegislatorInfo
    ],
    function(err, result){
      alert(err);
    });
  });
});

