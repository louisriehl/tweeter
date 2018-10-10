/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement (tweet) {

  // Wrapping variables in a <div> and extracting html to avoid XSS attacks
  let $tweet = $("<article>")
    .addClass("tweet")
    .append(`<p>${$("<div>").text(tweet.content.text).html()}</p>`);
  let $header = $("<header>")
    .append(`<img src="${$("<div>").text(tweet.user.avatars.regular).html()}">`)
    .append(`<span class="username">${$("<div>").text(tweet.user.name).html()}</span>`)
    .append(`<span class="handle">${$("<div>").text(tweet.user.handle).html()}</span>`);
  let $footer = $("<footer>")
    .text(`${$("<div>").text(tweet.created_at).html()}`);

  $($tweet).prepend($header).append($footer);
  $(".show-tweets").append($tweet);
}

function renderTweets(tweets) {
  tweets.forEach( (element) => {
    createTweetElement(element);
  });
}

function loadTweets() {
  $.ajax("/tweets", {method: 'GET'})
    .then(function(result) {
      console.log("Fetched!");
      result.forEach( element => {
        console.log(element);
      });
      renderTweets(result);
    });
}



$(document).ready(function () {
  loadTweets();

  $(".new-tweet input[type=submit]").on("click", function(event) {
    let $form = $(this).siblings("textarea");
    event.preventDefault();
    if (!$form.val()) {
      alert("Oops, you need to tweet something!");
      return;
    } else if ($form.val().length > 140) {
      alert("Sorry, your tweet is over the character limit!");
      return;
    }
    $.ajax("/tweets", {method: 'POST', data: {"text": $form.val() }}) // jQuery automatically turns this obj. into query
      .then(function(result) {
        console.log("Success!",result);});
  });
});













