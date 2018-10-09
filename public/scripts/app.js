/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": `Johann von Goethe`,
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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

renderTweets(data);

$(document).ready(function () {
  $(".new-tweet button").on("click", () => {
    renderTweets(data);
  });

  $(".new-tweet input[type=submit]").on("click", function(event) {
    let $form = $(this).siblings("textarea");
    event.preventDefault();
    $.ajax("/tweets", {method: 'POST', data: {"text": { "content": $form.val(), "user": "some guy"}}}) // jQuery automatically turns this obj. into query
      .then(function(result) {
        console.log("Success!",result);});
    // let data = { "some": "thing", "text": "other thing"};
    // $.post( "/tweets", data, function( data ) {
    //   $( ".result" ).html( data );
    //   console.log(data);
    // });
      });

});













