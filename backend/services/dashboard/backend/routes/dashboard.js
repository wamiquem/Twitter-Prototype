//Libraries
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

// Set up middleware
var passport = require("passport");

//get tweets using the user_id for dashboard
router.route("/dashboard/tweets").get(function(req, res) {
  var user_id = req.body.userId;
  kafka.make_request(
    "dashboard_topics",
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

//get tweets liked by a user using user_id for dashboard
router.route("/dashboard/likedTweets").get(function(req, res) {
  var user_id = req.body.userId;
  kafka.make_request(
    "dashboard_topics",
    { path: "likedTweetsByUserId", user_id: user_id },
    function(err, result) {
      if (result) {
        res.status(200).json(result.likedTweets);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//get tweets bookmarked by a user using the user_id for dashboard
router.route("/dashboard/bookmarkedTweets").get(function(req, res) {
  var user_id = req.body.userId;
  kafka.make_request(
    "dashboard_topics",
    { path: "bookmarkedTweetsByUserId", user_id: user_id },
    function(err, result) {
      if (result) {
        res.status(200).json(result.bookmarkedTweets);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

module.exports = router;
