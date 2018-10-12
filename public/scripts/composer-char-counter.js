$(document).ready(function () {

  // Update on blur to help with when user has finished posting
  $(".new-tweet textarea").on("input blur", function () {
    let count = 140 - $(this).val().length;
    const counter = $(this).parent().children(".counter");

    if (count < 0) {
      $(counter).css("color", "red");
    } else if (count >= 0) {
      $(counter).css("color", "#c1c1c1");
    }

    $(counter).text(count);

  });

  // Toggles the composer when compose button is clicked
  $("#nav-bar button").on("click", function () {
    $(".new-tweet").slideToggle(600, function() {
      $(".new-tweet textarea").focus();
    });
  });

});