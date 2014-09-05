<div id="map_canvas" style="display: block; height: 100%;"></div>

<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script>
  // Set basic map attributes
  var mapOptions = {
    zoom:   5,
    center: new google.maps.LatLng(38.16,-98.72),
    mapTypeControlOptions: {
      mapTypeIds: ['map_style']
    }
  };

  // Set styles from ./styles.json to a styles var
  <?php echo('var styles = ' . file_get_contents("./styles.json") . ';'); ?>

  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  // create the map object, and set it to be styled
  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
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
  var star = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: .75,
    scale: .15,
    strokeWeight: 0
  };

  // Create a marker
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(35.4822, -97.5350),
    icon:     star,
    map:      map
  });
</script>
