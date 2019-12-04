var Tweets = require("../models/TweetsSchema");

exports.dashboardService = function dashboardService(msg, callback) {
  console.log("In dashboard operations service path:", msg.path);
  switch (msg.path) {
    case "tweetsByUserId":
      tweetsByUserId(msg, callback);
      break;
    case "likedTweetsByUserId":
      likedTweetsByUserId(msg, callback);
      break;
    case "bookmarkedTweetsByUserId":
      bookmarkedTweetsByUserId(msg, callback);
      break;
    case "tweetsAll":
      tweetsAll(msg, callback);
      break;
  }
};

function tweetsAll(msg, callback) {
  var users = [];
  users = msg.users;
  console.log("users" + users);
  Tweets.find().sort({ created_date_time: -1 }).exec(function(err, tweets) {
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

function tweetsByUserId(msg, callback) {
  Tweets.find({ user_id: msg.user_id }, function(err, tweets) {
    if (err) {
      console.log(err);
      console.log("unable to find tweets");
      callback(err, "Database Error");
    } else {
      console.log("Tweets fetched");
      callback(null, { status: 200, tweets });
    }
  });
}
function likedTweetsByUserId(msg, callback) {
  Tweets.find({}, function(err, tweets) {
    if (err) {
      console.log(err);
      console.log("unable to find liked tweets");
      callback(err, "Database Error");
    } else {
      var likedTweets = [];
      for (var i = 0; i < tweets.length; i++) {
        for (var j = 0; j < tweets[i].liked_by.length; j++) {
          if (tweets[i].liked_by[j] === msg.user_id) {
            likedTweets.push(tweets[i]);
            break;
          }
        }
      }
      console.log("Liked Tweets fetched: " + likedTweets);
      callback(null, { status: 200, likedTweets });
    }
  });
}
function bookmarkedTweetsByUserId(msg, callback) {
  Tweets.find({}, function(err, tweets) {
    if (err) {
      console.log(err);
      console.log("unable to find bookmarked tweets");
      callback(err, "Database Error");
    } else {
      var bookmarkedTweets = [];
      for (var i = 0; i < tweets.length; i++) {
        for (var j = 0; j < tweets[i].bookmarked_by.length; j++) {
          if (tweets[i].bookmarked_by[j] === msg.user_id) {
            bookmarkedTweets.push(tweets[i]);
            break;
          }
        }
      }
      console.log("Bookmarked Tweets fetched: " + bookmarkedTweets);
      callback(null, { status: 200, bookmarkedTweets });
    }
  });
}
