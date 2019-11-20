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
router.route("/tweet").post(function(req, res) {
  var today = new Date();
  var tweetData = null;
  if (req.body.retweetedBy) {
    //retweeted tweet insert data
    tweetData = {
      user_id: req.body.userId,
      content: req.body.content,
      retweeted_by: req.body.retweetedBy,
      created_date_time: today
    };
  } else {
    //original tweet insert data
    tweetData = {
      user_id: req.body.userId,
      content: req.body.content,
      created_date_time: today
    };
  }

  kafka.make_request(
    "tweet_topics",
    { path: "tweet", tweetData: tweetData },
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ responseMessage: "Unable to insert the tweet" });
      } else {
        res.writeHead(200, {
          "content-type": "application/json"
        });
        res.end(JSON.stringify(result.tweet));
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
module.exports = router;
