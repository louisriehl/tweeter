
$(document).ready(function () {
console.log("Char counter loaded!");

$(".new-tweet textarea").on("input", function () {
  let count = 140 - $(this).val().length;
  const counter = $(this).parent().children(".counter");
  if (count < 0) {
    $(counter).css("color", "red");
  } else {
    $(counter).css("color", "#c1c1c1");
  }
  $(counter).text(count);

});

});