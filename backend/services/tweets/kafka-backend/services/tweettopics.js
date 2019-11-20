var Tweets = require("../models/TweetsSchema");

exports.tweetsService = function tweetsService(msg, callback) {
  console.log("In customer item operation service path:", msg.path);
  switch (msg.path) {
    case "tweet":
      tweet(msg, callback);
      break;
    case "tweetsByUserId":
      tweetsByUserId(msg, callback);
      break;
  }
};

function tweet(msg, callback) {
  Tweets.create(msg.tweetData, function(err, tweet) {
    if (err) {
      console.log(err);
      console.log("unable to insert tweet");
      callback(err, "Database Error");
    } else {
      console.log("Tweet inserted");
      callback(null, { status: 200, tweet });
    }
  });
}

function tweetsByUserId(msg, callback) {
  Tweets.find(msg.user_id, function(err, tweets) {
    if (err) {
      console.log(err);
      console.log("unable to insert tweet");
      callback(err, "Database Error");
    } else {
      console.log("Tweet inserted");
      callback(null, { status: 200, tweets });
    }
  });
}
