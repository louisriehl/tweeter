"use strict";

const userHelper    = require("../lib/util/user-helper");
const tweetTime     = require("../lib/util/timeDifference");
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  /* -- Get Request Handler Returns Tweets and Updates Time */
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {

        tweets.forEach( element => {
          element.created_at = tweetTime(element.created_at);
        });

        res.json(tweets);
      }
    });
  });

  /* -- Post Handler creates new random Tweet and pushes it to the server */
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      likes: 0,
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  /* -- Post Handler updates likes */
  tweetsRoutes.post("/:id", function (req, res) {
    DataHelpers.updateLike(req.params.id);
    res.status(201).send();
  });

  return tweetsRoutes;

}
