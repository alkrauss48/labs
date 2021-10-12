<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title>Word Up</title>
    <base href="/word-up/" target="" />
    <meta name="description" content="Word Up" />
    <meta name="author" content="Techlahoma" />

    <link rel="stylesheet" href="app.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:700"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Open overlay button -->
    <div class="openOverlayBtn" id="open">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>

    <!-- Navigation overlay container -->
    <div class="nav-overlay-container" id="overlay">
      <div class="closeBtn" id="close"></div>

      <form class="main-form" action="" id="form">
        <div class="label-message">
          <label>Input twitch message here and press 'Enter'</label>
        </div>
        <div>
          <input type="text" class="wordup" name="wordup" id="wordup" />
        </div>
      </form>
    </div>

    <h1><span></span></h1>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/jquery.textfill.js"></script>

    <script src="app.js"></script>
  </body>
</html>
