"use strict";
require('dotenv').config();
// Basic express setup:

// const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Importing database from mongodb
const MongoClient = require("mongodb");
const MONGODB_URI = process.env.MONGODB_URI;
// const database = { tweets: []};

MongoClient.connect( MONGODB_URI, (err, db) => {
  // Lazy, fix later!
  if(err) throw err;

  // Pass the mongodb database directly into DataHelpers, the functions there can parse it correctly!
  // It also means that all the following functions can access the database without needing to reopen connections
  const DataHelpers = require("./lib/data-helpers.js")(db, MongoClient);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Example app listening on port " + process.env.PORT || 5000);
});
