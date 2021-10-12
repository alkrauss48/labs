$(document).ready(function() {
  // Opening overlay
  $("#open").click(function() {
    $("#overlay").css("left", "0px");
  });
  // Closing overlay
  $("#close").click(function() {
    $("#overlay").css("left", "-400px");
  });

  // Submitting text input value to the h1 container
  $("#form").submit(function(e) {
    e.preventDefault();
    let inputValue = $("#wordup").val();

    //closes the overlay bar with enter submit
    $("#overlay").css("left", "-400px");

    // appends text and makes text responsive in h1 container
    $("span").text(inputValue);
    $("h1").textfill({
      maxFontPixels: 1000
    });
  });
});
