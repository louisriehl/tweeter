
$(document).ready(function () {

  $(".new-tweet textarea").on("input", function () {
    let count = 140 - $(this).val().length;
    const counter = $(this).parent().children(".counter");

    if (count < 0) {
      $(counter).css("color", "red");
    } else if (count >= 0) {
      $(counter).css("color", "#c1c1c1");
    }

    $(counter).text(count);

  });

  $(".new-tweet").on("submit", function () {
    console.log("submitted!");
  });

});