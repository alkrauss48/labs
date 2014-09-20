<?php # Set the 'theme' cookie if given a theme param
  ob_start();
  if(preg_match('/\w/', $_GET["theme"])){ # theme given as param
    $month = 2592000 + time();
    setcookie("theme", $_GET["theme"], $month);
  }
?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Tea Steeping Chart</title>
    <base href="tea-chart/" target="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Tea Steeping Chart">
    <meta name="author" content="Aaron L. Krauss">
    <link rel="stylesheet" href="styles/cyborg_bootstrap.css">
    <style>
      body { padding-top: 60px; } /* 60px to make the container go all the way to the bottom of the topbar */
    </style>
    <link rel="shortcut icon" href="favicon.ico">
  </head>
  <body>
    <div class="form-horizontal custom_body">
      <a class="pull-left btn btn-small btn-inverse-blue" href="http://labs.thesocietea.org/tea-chart?theme=blue"><i class="icon-arrow-right icon-white"></i></a>
      <a class="pull-left btn btn-small btn-inverse-red" href="http://labs.thesocietea.org/tea-chart?theme=red"><i class="icon-arrow-right icon-white"></i></a>
      <a class="pull-left btn btn-small btn-inverse-color-coded" href="http://labs.thesocietea.org/tea-chart?theme=color-coded"><i class="icon-arrow-right icon-white"></i></a>
      <a style="margin-left: 2%;" class="pull-left btn btn-small btn-primary" href="http://labs.thesocietea.org/tea-timer/">Tea Timer</a><br />
    </div>
    <header class="jumbotron">
      <h1 style="text-align: center; text-style: italic">Tea Steeping Chart</h1>
      <h3 style="text-align: center; text-style: italic">-Western Style-</h3>
      <span class="" style="text-align: center;">
        <address>
        <a href="http://thesocietea.org" target="_blank">thesocietea.org</a><br />
        </address>
      </span>
    </header>
<?php
  # if the params have a theme, then we go with that. Otherwise, cookies.
  $color = preg_match('/\w/', $_GET["theme"]) ? $_GET["theme"] : $_COOKIE["theme"];
  alter_colors($color);
?>
    <div class="custom_body">
      <h6>Notes:</h6>
      <p> In general, most tea follows the rule that you should use 1 heaping tsp. of tea per
          8 oz. of water. However, you would want to use more if the tea is particularly leafy
          and takes up more volume.
      <p>* Tisanes, or herbal teas, are much less strict than normal teas
          with regard to water temperatures and steeping times, so
          feel free to experiment and see what times and temperatures work for you.</p>
      <p>** These recommendations for Yerba Mate are for brewing in a teapot
          like any other tea and not serving it via the traditional South American
          <a href="http://www.yerbamateteagourd.com/serving.php" target="_blank">gourd/bombilla method</a>.</p>
    </div>
    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-38589428-1']);
      _gaq.push(['_setDomainName', 'thesocietea.org']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>
  </body>
</html>

<?php

function alter_colors($color) {
  switch($color){
  case "red":
    $mono_array = array("#fbe8e7", "#f6c8c6", "#f0a7a4", "#ea8782",
    "#e56761", "#df463f", "#d42b23", "#b2241d", "#911d18");
    break;
  case "color-coded":
    $mono_array = array("#fffdd0", "#74ff74", "#ffff4e", "#e6a062",
    "#d96b6b", "#e08c40", "#ff5b5b", "#5bff5b", "#5b5bff");
    break;
  default:
    $mono_array = array("#e7fafb", "#c5f3f6", "#a3edf0", "#82e6eb",
    "#60dfe5", "#3ed8df", "#23ccd4", "#1dabb2", "#188b90");
  }

  echo '
    <div style="text-align: center; margin: 20px">
      <h3 style="text-style: italic">Tea</h3>
      <table class="table">
        <thead>
          <tr>
            <th class="span1">Tea</th>
            <th class="span1">Water Temperature</th>
            <th class="span1"># of Steepings</th>
            <th class="span1">Steeping 1</th>
            <th class="span1">Steeping 2</th>
            <th class="span1">Steeping 3</th>
          </tr>
        </thead>
        <tbody>
          <tr style="color: #000000; background-color: ' . $mono_array[0] .';">
            <td class="span1">White</td>
            <td class="span1">160 - 170 F</td>
            <td class="span1">2-3</td>
            <td class="span1">2:00</td>
            <td class="span1">2:30</td>
            <td class="span1">3:00</td>
          </tr>
          <tr style="color: #000000; background-color: ' . $mono_array[1] .';">
            <td class="span1">Green</td>
            <td class="span1">170 - 180 F</td>
            <td class="span1">2-3</td>
            <td class="span1">2:00</td>
            <td class="span1">2:30</td>
            <td class="span1">3:00</td>
          </tr>
          <tr style="color: #000000; background-color: ' . $mono_array[2] .';">
            <td class="span1">Yellow</td>
            <td class="span1">170 - 180 F</td>
            <td class="span1">2-3</td>
            <td class="span1">2:00</td>
            <td class="span1">2:30</td>
            <td class="span1">3:00</td>
          </tr>
          <tr style="color: #000000; background-color: ' . $mono_array[3] .';">
            <td class="span1">Oolong</td>
            <td class="span1">180 - 195 F</td>
            <td class="span1">3+</td>
            <td class="span1">2:00</td>
            <td class="span1">2:30</td>
            <td class="span1">3:00</td>
          </tr>
          <tr style="color: #000000; background-color: ' . $mono_array[4] .';">
            <td class="span1">Black</td>
            <td class="span1">190 - 205 F</td>
            <td class="span1">1-2</td>
            <td class="span1">3:00</td>
            <td class="span1">5:00</td>
            <td class="span1">n/a</td>
          </tr>
          <tr style="color: #000000; background-color: ' . $mono_array[5] .';">
            <td class="span1">Pu-erh</td>
            <td class="span1">205 - 210 F</td>
            <td class="span1">3+</td>
            <td class="span1">3:00</td>
            <td class="span1">4:00</td>
            <td class="span1">5:00</td>
          </tr>
        </tbody>
      </table>
      <h3 style="text-style: italic">Tisanes*</h3>
      <table class="table" align="center">
        <thead>
          <tr>
            <th class="span1">Tea</th>
            <th class="span1">Water Temperature</th>
            <th class="span1"># of Steepings</th>
            <th class="span1">Steeping 1</th>
            <th class="span1">Steeping 2</th>
            <th class="span1">Steeping 3</th>
          </tr>
        </thead>
        <tbody>
          <tr class="rooibos">
          <tr style="color: #ffffff; background-color: ' . $mono_array[6] .';">
            <td class="span1">Rooibos</td>
            <td class="span1">200 - 212 F</td>
            <td class="span1">1-2</td>
            <td class="span1">4:00</td>
            <td class="span1">7:00</td>
            <td class="span1">n/a</td>
          </tr>
          <tr style="color: #ffffff; background-color: ' . $mono_array[7] .';">
            <td class="span1">Yerba Mate**</td>
            <td class="span1">200 - 212 F</td>
            <td class="span1">2-3</td>
            <td class="span1">3:30</td>
            <td class="span1">4:30</td>
            <td class="span1">7:00</td>
          </tr>
          <tr style="color: #ffffff; background-color: ' . $mono_array[8] .';">
            <td class="span1">Other Herbal</td>
            <td class="span1">200 - 212 F</td>
            <td class="span1">1-2</td>
            <td class="span1">4:00</td>
            <td class="span1">7:00</td>
            <td class="span1">n/a</td>
          </tr>
        </tbody>
      </table>
    </div>';
}

?>
