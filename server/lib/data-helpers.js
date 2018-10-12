"use strict";
module.exports = function makeDataHelpers(db, MongoHelper) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

      db.collection("tweets").insertOne(newTweet);
      callback(null,true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {

      db.collection("tweets").find().toArray( (err, results) => {
        if (err) throw err;
        callback(null, results);
      });
    },

    updateLike: function(tweetID) {
      const id = MongoHelper.ObjectID(tweetID);
      let increment = 0;
      db.collection("tweets").findOne({"_id": id}, {"likes": 1})
        .then(function(numberOfLikes) {
          if(numberOfLikes.likes === 1) {
            increment = -1;
          } else if (numberOfLikes.likes === 0) {
            increment = 1;
          }
        }).then(function () {
          db.collection("tweets").updateOne({"_id": id}, { $inc: { likes: increment}}, true);
        });
    }
  };
};