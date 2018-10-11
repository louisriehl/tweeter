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
      db.collection("tweets").updateOne({"_id": id}, { $inc: { "likes": 1}}, true);
    }

  };
};
