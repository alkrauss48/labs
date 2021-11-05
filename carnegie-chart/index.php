<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimal-ui">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="description" content="A 30-day chart to help you practice the principles discussed in Dale Carnegie's 'How to Win Friends and Influence People.'">
  <meta property="og:description" content="A 30-day chart to help you practice the principles discussed in Dale Carnegie's 'How to Win Friends and Influence People.'">
  <meta property="og:image" content="https://labs.thecodeboss.dev/carnegie-chart/images/carnegie-og-image.jpg">
  <meta property="og:url" content="https://labs.thecodeboss.dev/carnegie-chart/">
  <meta property="og:title" content="Dale Carnegie 30-Day Chart">
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@thecodeboss" />
  <meta name="twitter:creator" content="@thecodeboss" />

  <base href="/carnegie-chart/" target="" />
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/foundation/4.3.2/css/foundation.min.css" type="text/css" />
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css" type="text/css" />
  <link rel="stylesheet" href="styles/custom.css" type="text/css" />
  <link rel="shortcut icon" href="images/favicon.ico" />
  <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.min.js"></script>

  <title>Carnegie 30-Day Chart</title>

</head>
<body>
  <div class="row">
    <div class="large-12 columns">
      <h1 class="center">Carnegie 30-Day Chart</h1>
      <h4 class="center">By <a href="https://thecodeboss.dev" target="blank">Aaron Krauss</a></h4>
      <p class="center italic">The Guide to Practicing
        <span class="underline">
          <a target="blank" href="http://www.amazon.com/How-Win-Friends-Influence-People/dp/0671723650">
            How to Win Friends and Influence People</a></span></p>
      <div class="section-container auto" data-section>
        <section class="active">
          <p class="title" data-section-title><a href="#chart">Chart</a></p>
          <div class="content" data-slug="chart" data-section-content>
            <?php include 'includes/chart.php'; ?>
          </div>
        </section>
        <section>
          <p class="title" data-section-title><a id="description" href="#descriptions">Descriptions</a></p>
          <div class="content" data-slug="descriptions" data-section-content>
            <?php include 'includes/descriptions.php'; ?>
          </div>
        </section>
        <section>
          <p class="title" data-section-title><a href="#about">How It Works</a></p>
          <div class="content" data-slug="about" data-section-content>
            <?php include 'includes/about.php'; ?>
          </div>
        </section>
      </div>
    </div>
  </div>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/foundation/4.3.2/js/foundation.min.js"></script>
  <script src="scripts/chart.js"></script>
  <?php include '../analytics.php'; ?>
</body>
</html>
