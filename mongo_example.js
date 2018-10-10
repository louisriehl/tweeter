"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // -- At this stage we have a connection to test-tweets db
  console.log(`Connected to: ${MONGODB_URI}`);

  // -- Any logic that needs to utilize the connection is placed here.
  // -- Then, we close the connection.

  db.close();
});