<div id="map_canvas" style="display: block; height: 100%;"></div>

<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script>
  // Set basic map attributes
  var map, polys = [];
  var mapOptions = {
    zoom:   5,
    center: new google.maps.LatLng(39.16,-100.72),
    mapTypeControlOptions: {
      mapTypeIds: ['map_style']
    }
  };

  // Set styles from ./styles.json to a styles var
  <?php echo('var styles = ' . file_get_contents("./styles.json") . ';'); ?>

  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  // create the map object, and set it to be styled
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  // Run through all .geo.json files in ./geojson/, and load them into the map
  // Check out a lot of GeoJSON files at https://github.com/johan/world.geo.json
  <?php
    $dir = new DirectoryIterator('glob://' . dirname(__FILE__) . '/geojson/*.geo.json');
    foreach ($dir as $fileinfo) {
      if (!$fileinfo->isDot()) {
        echo('map.data.loadGeoJson("./geojson/' . $fileinfo->getFilename() . '");');
      }
    }
  ?>

  // Overlay Styles
  map.data.setStyle({
    fillColor: '#2687bf',
    fillOpacity: .3,
    strokeWeight: 0
  });

  // Custom marker using SVG-like paths
  var flag = {
    path: 'M101.833,27.216c-23.822,9.851-52.008-8.612-62.597-16.627l0.109-5.358' +
      ' c-1.326-0.429-2.797-0.653-4.363-0.513C28.79,5.275,22.566,2.792,22.566,2.792s0.008-0.002,0.021-0.007' +
      ' c1.781,0.307,4.271,0.496,7.026,0.496c5.413,0,9.804-0.734,9.804-1.642c0-0.906-4.391-1.64-9.804-1.64' +
      ' c-5.414,0-9.804,0.733-9.804,1.64l4,197.411c-5.598,0.188-10.609,0.643-14.539,1.287c-2.624,0.432-4.762,0.939-6.328,1.545' +
      ' c-0.783,0.307-1.428,0.629-1.951,1.043c-0.505,0.402-0.984,0.992-0.992,1.805c0.008,0.812,0.487,1.402,0.992,1.803' +
      ' c0.912,0.715,2.211,1.207,3.949,1.686c5.183,1.393,14.258,2.281,24.66,2.287c7.92,0,15.087-0.525,20.332-1.383' +
      ' c2.621-0.432,4.76-0.939,6.325-1.545c0.786-0.307,1.43-0.631,1.952-1.045c0.504-0.4,0.984-0.99,0.992-1.803' +
      ' c-0.008-0.812-0.488-1.402-0.992-1.805c-0.912-0.713-2.211-1.205-3.949-1.684c-3.615-0.973-9.127-1.699-15.66-2.051' +
      ' c-0.357,0.738-0.619,1.482-0.807,2.172c4.519,0.223,8.557,0.627,11.779,1.154c2.531,0.414,4.566,0.91,5.886,1.424' +
      ' c0.658,0.254,1.134,0.516,1.37,0.711c0.037,0.027,0.066,0.055,0.092,0.076c-0.098,0.092-0.271,0.227-0.525,0.363' +
      ' c-1.445,0.82-5.021,1.693-9.729,2.268c-4.723,0.586-10.646,0.938-17.066,0.938c-7.82,0-14.9-0.521-19.973-1.354' +
      ' c-2.531-0.414-4.566-0.912-5.887-1.424c-0.656-0.254-1.133-0.516-1.369-0.709c-0.035-0.029-0.066-0.057-0.091-0.08' +
      ' c0.097-0.09,0.271-0.227,0.524-0.361c1.445-0.822,5.021-1.693,9.729-2.268c3.274-0.406,7.126-0.699,11.319-0.842l0.029,1.463' +
      ' c0,0.848,2.565,1.533,5.729,1.533s5.728-0.686,5.728-1.533L38.256,58.98c0.846,17.425,2.574,39.959,6.055,51.787' +
      ' c17.931,3.277,55.956,6.828,63.455-19.925c9.887-35.271,56.027-41.777,68.551-44.14C167.088,32.531,131.824,14.815,101.833,27.216z',
    fillColor: '#6EC829',
    fillOpacity: 1,
    scale: .15,
    strokeWeight: 0
  };

  // Create a flag marker
  var marker = new google.maps.Marker({
    position: map.getCenter(),
    icon:     flag,
    map:      map
  });
</script>
