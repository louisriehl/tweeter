
$(document).ready(function () {
// console.log("Char counter loaded!");

  $(".new-tweet textarea").on("input", function () {
    let count = 140 - $(this).val().length;
    const counter = $(this).parent().children(".counter");
    const button = $(this).parent().children("input[type=submit]");

    if (count < 0) {
      $(counter).css("color", "red");
      $(button).attr("disabled", "disabled");
    } else if (count >= 0) {
      $(counter).css("color", "#c1c1c1");
      $(button).removeAttr("disabled", "disabled");
    }

    $(counter).text(count);

  });

  $(".new-tweet").on("submit", function () {
    console.log("submitted!");
  });

});