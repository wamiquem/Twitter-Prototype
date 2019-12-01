//Libraries
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");
var config = require("../config/settings");

// Set up middleware
var jwt = require("jsonwebtoken");
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });

//insert a new tweet
// router.route("/tweet").post(function(req, res) {
  router.post('/tweet',function(req,res){
  console.log("Inside tweet post backend request")
  var tweetData = null;
  if (req.body.retweeted_from_id) {
    //retweeted tweet insert data
    tweetData = {
      user_id: req.body.user_id,
      user_username: req.body.user_username,
      user_image: req.body.user_image,
      content: req.body.content,
      retweeted_from_id: req.body.retweeted_from_id,
      created_date_time: req.body.created_date_time,
      images_path: req.body.images_path
    };
  } else {
    //original tweet insert data
    tweetData = {
      user_id: req.body.user_id,
      user_username: req.body.user_username,
      user_image: req.body.user_image,
      content: req.body.content,
      created_date_time: req.body.created_date_time,
      images_path: req.body.images_path
    };
  }

  kafka.make_request(
    "tweet_topics",
    { path: "tweet", tweetData: tweetData },
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Unable to insert the tweet" });
      } else {
        res.status(200).json({ tweet: result.tweet });
      }
    }
  );
});
//get tweets using the user id
router.route("/tweetsByUserId").get(function(req, res) {
  var user_id = req.body.userId;
  kafka.make_request(
    "tweet_topics",
    { path: "tweetsByUserId", user_id: user_id },
    function(err, result) {
      if (result) {
        res.status(200).json(result.tweets);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//get all tweets using an array of user ids - follows [userid] and user's userid
router.route("/tweetsForFeed").get(function(req, res) {
  var users = JSON.parse(req.query.users);
  kafka.make_request(
    "tweet_topics",
    { path: "tweetsByUsers", users: users },
    function(err, result) {
      if (result) {
        res.status(200).json(result.tweets);
      } else {
        res.status(400).json({message: err.msg});
      }
    }
  );
});

//post a like. Update the existing tweet with the user id of the liked person
router.route("/likeTweet").post(function(req, res) {
  console.log("In update like tweet post" + req);
  var likeData = {
    likedUserId: req.body.liked_user_id,
    tweetId: req.body.tweet_id
  };
  kafka.make_request(
    "tweet_topics",
    {
      path: "likeTweet",
      likeData: likeData
    },
    function(err, result) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ message: "unable to update database" });
      } else {
        console.log(result);
        res.status(200).json({ message: "tweet updated successfully" });
      }
    }
  );
});

//post a bookmark. Update the existing tweet with the user id of the bookmarked person
router.route("/bookmarkTweet").post(function(req, res) {
  console.log("In update bookmark tweet post" + req);
  var bookmarkData = {
    bookmarkUserId: req.body.bookmark_user_id,
    tweetId: req.body.tweet_id
  };
  kafka.make_request(
    "tweet_topics",
    {
      path: "bookmarkTweet",
      bookmarkData: bookmarkData
    },
    function(err, result) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ message: "unable to update database" });
      } else {
        console.log(result);
        res.status(200).json({ message: "tweet updated successfully" });
      }
    }
  );
});

//get liked_by array of a tweet by tweet id
router.route("/likes").get(function(req, res) {
  var tweet_id = req.body.tweet_id;
  console.log("tweetidis" + tweet_id);
  kafka.make_request(
    "tweet_topics",
    { path: "likesByTweetId", tweet_id: tweet_id },
    function(err, result) {
      if (result) {
        res.status(200).json(result.tweet);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//get bookmark_by array of a tweet by tweet id
router.route("/bookmarks").get(function(req, res) {
  var tweet_id = req.body.tweet_id;
  kafka.make_request(
    "tweet_topics",
    { path: "bookmarksByTweetId", tweet_id: tweet_id },
    function(err, result) {
      if (result) {
        res.status(200).json(result.tweet);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//Delete a tweet by tweet id
router.route("/delete").post(function(req, res) {
  var tweet_id = req.query.id;
  kafka.make_request(
    "tweet_topics",
    { path: "deleteTweet", tweet_id: tweet_id },
    function(err, result) {
      if (result) {
        res.status(200).json({message: result.message});
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

module.exports = router;
