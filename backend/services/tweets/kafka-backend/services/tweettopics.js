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
    case "tweetsByUsers":
      tweetsByUsers(msg, callback);
      break;
    case "likeTweet":
      likeTweet(msg, callback);
      break;
    case "bookmarkTweet":
      bookmarkTweet(msg, callback);
      break;
    case "retweetTweet":
      retweetTweet(msg, callback);
      break;
    case "likesByTweetId":
      likesByTweetId(msg, callback);
      break;
    case "bookmarksByTweetId":
      bookmarksByTweetId(msg, callback);
      break;
    case "deleteTweet":
      deleteTweet(msg, callback);
      break;
    case "replyTweet":
      replyTweet(msg, callback);
      break;
  }
};

function tweet(msg, callback) {
  console.log(msg.tweetData);
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
  var user_id = msg.user_id;
  Tweets.find({user_id:user_id}).sort({ created_date_time: -1 }).exec(function(err, tweets) {
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
function tweetsByUsers(msg, callback) {
  var users = [];
  users = msg.users;
  console.log("users" + users);
  Tweets.find({$or:[{ user_id: { $in: users }},{ retweeted_by: { $in: users }}]}).sort({ created_date_time: -1 }).exec(function(err, tweets) {
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
function likeTweet(msg, callback) {
  Tweets.findOne({ _id: msg.likeData.tweetId }).exec(function(err, tweet) {
    console.log("tweet" + tweet);
    if (tweet) {
      var count = 0;
      for (i = 0; i < tweet.liked_by.length; i++) {
        if (tweet.liked_by[i] == msg.likeData.likedUserId) {
          tweet.liked_by.splice(i, 1);
          count++;
          break;
        }
      }
      if (count === 0) {
        tweet.liked_by.push(msg.likeData.likedUserId);
      }
      tweet.save(function(err, tweet) {
        if (err) {
          console.log(err);
          console.log("unable to update database");
          callback(err, "unable to update database");
        } else {
          console.log("result:", tweet);
          console.log("Customer Profile save Successful");
          callback(null, { status: 200, tweet });
        }
      });
    } else {
      console.log(err);
      console.log("invalid tweet id");
      callback(err, "invalid tweet id");
    }
  });
}
function bookmarkTweet(msg, callback) {
  Tweets.findOne({ _id: msg.bookmarkData.tweetId }).exec(function(err, tweet) {
    if (tweet) {
      var count = 0;
      for (i = 0; i < tweet.bookmarked_by.length; i++) {
        if (tweet.bookmarked_by[i] == msg.bookmarkData.bookmarkUserId) {
          tweet.bookmarked_by.splice(i, 1);
          count++;
          break;
        }
      }
      if (count === 0) {
        tweet.bookmarked_by.push(msg.bookmarkData.bookmarkUserId);
      }

      tweet.save(function(err, tweet) {
        if (err) {
          console.log(err);
          console.log("unable to update database");
          callback(err, "unable to update database");
        } else {
          console.log("result:", tweet);
          console.log("Customer Profile save Successful");
          callback(null, { status: 200, tweet });
        }
      });
    } else {
      console.log(err);
      console.log("invalid tweet id");
      callback(err, "invalid tweet id");
    }
  });
}
function retweetTweet(msg, callback) {
  Tweets.findOne({ _id: msg.retweetData.tweetId }).exec(function(err, tweet) {
    if (tweet) {
      var count = 0;
      for (i = 0; i < tweet.retweeted_by.length; i++) {
        if (tweet.retweeted_by[i] == msg.retweetData.retweetUserId) {
          tweet.retweeted_by.splice(i, 1);
          count++;
          break;
        }
      }
      if (count === 0) {
        tweet.retweeted_by.push(msg.retweetData.retweetUserId);
      }

      tweet.save(function(err, tweet) {
        if (err) {
          console.log(err);
          console.log("unable to update database");
          callback(err, "unable to update database");
        } else {
          console.log("result:", tweet);
          console.log("Customer Profile save Successful");
          callback(null, { status: 200, tweet });
        }
      });
    } else {
      console.log(err);
      console.log("invalid tweet id");
      callback(err, "invalid tweet id");
    }
  });
}
function likesByTweetId(msg, callback) {
  console.log("the msg is" + JSON.stringify(msg));
  console.log("the msg is" + msg.tweet_id);
  Tweets.findOne({ _id: msg.tweet_id }, { liked_by: 1 }, function(err, tweet) {
    if (err) {
      console.log(err);
      console.log("unable to get like data for the tweet");
      callback(err, "Database Error");
    } else {
      console.log("Like data fetched" + tweet);
      callback(null, { status: 200, tweet });
    }
  });
}

function bookmarksByTweetId(msg, callback) {
  console.log("the msg is" + JSON.stringify(msg));
  console.log("the msg is" + msg.tweet_id);
  Tweets.findOne({ _id: msg.tweet_id }, { bookmarked_by: 1 }, function(
    err,
    tweet
  ) {
    if (err) {
      console.log(err);
      console.log("unable to get like data for the tweet");
      callback(err, "Database Error");
    } else {
      console.log("Bookmark data fetched" + tweet);
      callback(null, { status: 200, tweet });
    }
  });
}

function deleteTweet(msg, callback) {
  Tweets.remove({ _id: msg.tweet_id }, function(
    err,
    tweet
  ) {
    if (err) {
      console.log(err);
      console.log("unable to delete the tweet");
      callback(err, "Database Error");
    } else {
      console.log("Tweet deleted successfully");
      callback(null, { status: 200, message: "Tweet deleted successfully"});
    }
  });
}

function replyTweet(msg, callback) {
  Tweets.findOne({ _id: msg.tweetId }).exec(function(err, tweet) {
    if (tweet) {
     tweet.replies.push(msg.reply)

      tweet.save(function(err, tweet) {
        if (err) {
          console.log(err);
          console.log("unable to update database");
          callback(err, "unable to update database");
        } else {
          callback(null, { status: 200, message: "Reply added" });
        }
      });
    } else {
      console.log(err);
      console.log("invalid tweet id");
      callback(err, "invalid tweet id");
    }
  });
}