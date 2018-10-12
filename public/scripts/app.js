/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement (tweet) {
  let heartClass = "";
  let $tweet = $("<article>")
    .addClass("tweet")
    .data("likes", tweet.likes)
    .data("id", tweet._id)
    .append(`<p>${$("<div>").text(tweet.content.text).html()}</p>`);
  let $header = $("<header>")
    .append(`<img src="${$("<div>").text(tweet.user.avatars.regular).html()}">`)
    .append(`<span class="username">${$("<div>").text(tweet.user.name).html()}</span>`)
    .append(`<span class="handle">${$("<div>").text(tweet.user.handle).html()}</span>`);
  let $footer = $("<footer>")
    .text(`${$("<div>").text(tweet.created_at).html()}`);
  if (tweet.likes === 1) {
    heartClass = "fas fa-heart";
  } else if(tweet.likes === 0) {
    heartClass = "far fa-heart";
  }
  let $icons =  $(`<span class="icon-container">`)
    .append(`<i class="fab fa-font-awesome-flag"></i>`)
    .append(`<i class="fas fa-retweet"></i>`)
    .append(`<i class="${heartClass}"></i>`)
    .append(`<p>${$($tweet).data("likes")}</p>`);
  $($footer).append($icons);

  $($tweet).prepend($header).append($footer);
  $(".show-tweets").prepend($tweet);
}

function renderTweets(tweets) {
  tweets.forEach( (element) => {
    createTweetElement(element);
  });
}

function loadTweets(update) {
  $.ajax("/tweets", {method: 'GET'})
    .then(function(result) {
      result.forEach( element => {
      });
      if (update) {
        let last = result.length - 1;
        createTweetElement(result[last]);
      } else {
        renderTweets(result);
      }
    });
}

function showLikes() {

}

$(document).ready(function () {

  loadTweets();

  // Validate a new tweet, and load it on the page and database
  $(".new-tweet input[type=submit]").on("click", function(event) {
    let $form = $(this).siblings("textarea");
    event.preventDefault();
    if (!$form.val()) {
      if ($(".new-tweet .error-message").css("display") === "block") {
        $(".new-tweet .error-message").text("❗ Text field cannot be empty");
        return;
      } else {
        $(".new-tweet .error-message").text("❗ Text field cannot be empty").slideToggle(200);
        return;
      }
    } else if ($form.val().length > 140) {
      if ($(".new-tweet .error-message").css("display") === "block") {
        $(".new-tweet .error-message").text("❗ Tweet exceeds character limit");
        return;
      } else {
        $(".new-tweet .error-message").text("❗ Tweet exceeds character limit").slideToggle(200);
        return;
      }
    }
    $.ajax("/tweets", {method: 'POST', data: {"text": $form.val()}}) // jQuery automatically turns this obj. into query
      .then(function(result) {
        if ($(".new-tweet .error-message").css("display") === "block") {
          $(".new-tweet .error-message").slideToggle(200);
        }
        $form.val("").blur();
        loadTweets(1);
      });
  });

  $("body").on("click", "i.fa-heart", function (event) {
    const $heart = $(this);
    const counter = $(this).next();
    const $article = $(this).closest("article");
    const tweetID = $($article).data("id");
    let likes = $($article).data("likes");
    console.log(`Current element is: ${$(this).attr("class")}`);

    $.ajax(`/tweets/${tweetID}`, {method: "POST"})
      .then( function () {
        if (likes === 1){
          $(counter).text(--likes);
          $($heart).addClass(`far`).removeClass(`fas`);
          console.log(`Like removed, current element is: ${$($heart).attr("class")}`);
        } else if (likes === 0){
          $(counter).text(++likes);
          $($heart).addClass(`fas`).removeClass(`far`);
          console.log(`Like added, current element is: ${$($heart).attr("class")}`);
        }
        $($article).data("likes", likes);
      });
  });
});













