"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Importing database from mongodb
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
// const database = { tweets: []};

MongoClient.connect( MONGODB_URI, (err, db) => {
  // Lazy, fix later!
  if(err) throw err;

const DataHelpers = require("./lib/data-helpers.js")(db);


const tweetsRoutes = require("./routes/tweets")(DataHelpers);


app.use("/tweets", tweetsRoutes);

  // db.collection("tweets").find().toArray( (err, tweets) => {
  //   if (err) throw err;
  //   tweets.forEach( tweet => {
  //    database.tweets.push(tweet);
  //   });


});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
