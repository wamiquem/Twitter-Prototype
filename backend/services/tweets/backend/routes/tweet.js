//Libraries
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");
var config = require("../config/settings");
var fs = require("fs");
// Set up middleware
var jwt = require("jsonwebtoken");
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });

//insert a new tweet
// router.route("/tweet").post(function(req, res) {
router.post("/tweet", function(req, res) {
  console.log("Inside tweet post backend request");
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
      images_path: req.body.images_path,
      hashtag: req.body.hashtag
    };
  } else {
    //original tweet insert data
    tweetData = {
      user_id: req.body.user_id,
      user_username: req.body.user_username,
      user_image: req.body.user_image,
      content: req.body.content,
      created_date_time: req.body.created_date_time,
      images_path: req.body.images_path,
      hashtag: req.body.hashtag
    };
  }
  logDetails = {
    message: "Tweet creation API called",
    tweetData: tweetData
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "tweet", tweetData: tweetData },
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Unable to insert the tweet" });
      } else {
        logDetails = {
          message: "Tweet inserted successfully",
          response: result.tweet
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json({ tweet: result.tweet });
      }
    }
  );
});
//get tweets using the user id
router.route("/tweetsByUserId").get(function(req, res) {
  var user_id = req.query.userId;
  logDetails = {
    message: "get tweets using the user id"
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "tweetsByUserId", user_id: user_id },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "response for getting tweets by userid",
          tweets: result.tweets
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json(result.tweets);
      } else {
        res.status(400).json({ message: err.msg });
      }
    }
  );
});

//get all tweets using an array of user ids - follows [userid] and user's userid
router.route("/tweetsForFeed").get(function(req, res) {
  var users = JSON.parse(req.query.users);
  logDetails = {
    message:
      "get all tweets using an array of user ids - follows [userid] and user's userid"
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "tweetsByUsers", users: users },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "fetched all the tweets using an array of userids",
          twts: result.tweets
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json(result.tweets);
      } else {
        res.status(400).json({ message: err.msg });
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
  logDetails = {
    message:
      "get all tweets using an array of user ids - follows [userid] and user's userid",
    likeData: likeData
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
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
        logDetails = {
          message: "tweet updated successfully"
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
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
  logDetails = {
    message:
      "post a bookmark. Update the existing tweet with the user id of the bookmarked person",
    bookmarkData: bookmarkData
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
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
        logDetails = {
          message: "tweet updated successfully"
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        console.log(result);
        res.status(200).json({ message: "tweet updated successfully" });
      }
    }
  );
});

//update retweet tweet
router.route("/retweetTweet").post(function(req, res) {
  console.log("In update retweet tweet post" + req);
  var retweetData = {
    retweetUserId: req.body.retweet_user_id,
    tweetId: req.body.tweet_id
  };
  logDetails = {
    message: "update retweet tweet",
    retweetData: retweetData
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    {
      path: "retweetTweet",
      retweetData: retweetData
    },
    function(err, result) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ message: "unable to update database" });
      } else {
        logDetails = {
          message: "tweet updated successfully"
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        console.log(result);
        res.status(200).json({ message: "tweet updated successfully" });
      }
    }
  );
});

//Update the views count by tweet_id
router.route("/views").post(function(req, res) {
  console.log("In update views tweet post" + req);
  var viewData = {
    tweetId: req.body.tweet_id
  };
  logDetails = {
    message: "Update the views count by tweet_id",
    viewData: viewData
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    {
      path: "updateView",
      viewData: viewData
    },
    function(err, result) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ message: "unable to update database" });
      } else {
        logDetails = {
          message: "updated tweet view count successfully"
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        console.log(result);
        res
          .status(200)
          .json({ message: "updated tweet view count successfully" });
      }
    }
  );
});

//get liked_by array of a tweet by tweet id
router.route("/likes").get(function(req, res) {
  var tweet_id = req.body.tweet_id;
  logDetails = {
    message: "get liked_by array of a tweet by tweet id",
    tweet_id: tweet_id
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  console.log("tweetidis" + tweet_id);
  kafka.make_request(
    "tweet_topics",
    { path: "likesByTweetId", tweet_id: tweet_id },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "get liked_by array of a tweet by tweet id",
          tweet: result.tweet
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
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
  logDetails = {
    message: "get bookmark_by array of a tweet by tweet id",
    tweet_id: tweet_id
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "bookmarksByTweetId", tweet_id: tweet_id },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "get bookmark_by array of a tweet by tweet id",
          twt: result.tweet
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json(result.tweet);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//get tweets that are bookmarked by a user using his user_id
router.route("/bookmarksByUserId").get(function(req, res) {
  var user_id = req.query.userId;
  logDetails = {
    message: "get bookmark_by array of a tweet by tweet id",
    user_id: user_id
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "bookmarksByUserId", user_id: user_id },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "get tweets that are bookmarked by a user using his user_id",
          b_tweets: result.bookmarked_tweets
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json(result.tweets);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//Delete a tweet by tweet id
router.route("/delete").post(function(req, res) {
  var tweet_id = req.query.id;
  logDetails = {
    message: "Delete a tweet by tweet id",
    tweet_id: tweet_id
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "deleteTweet", tweet_id: tweet_id },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "deleted a tweet by tweet id"
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json({ message: result.message });
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

router.route("/reply").post(function(req, res) {
  var tweet_id = req.body.tweet_id;
  var reply = req.body.reply;
  logDetails = {
    message: "add a reply",
    tweet_id: tweet_id,
    reply: reply
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "replyTweet", tweetId: tweet_id, reply: reply },
    function(err, result) {
      if (result) {
        logDetails = {
          message: result.message
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json({ message: result.message });
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//get tweets by array of tweet ids
router.route("/tweetsByTweetIds").get(function(req, res) {
  var tweetIds = req.body.tweetIds;
  logDetails = {
    message: "get tweets by array of tweet ids",
    tweetIds: tweetIds
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  console.log("tweetIds");
  kafka.make_request(
    "tweet_topics",
    { path: "tweetsByTweetIds", tweetIds: tweetIds },
    function(err, result) {
      if (result) {
        logDetails = {
          ts: result.tweets
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json(result.tweets);
      } else {
        res.status(400).json({ message: err.msg });
      }
    }
  );
});

//Update hashtag in a tweet by tweet_id
router.route("/hashtag").post(function(req, res) {
  console.log("In update hashtag tweet post" + req);
  var hashtagData = {
    tweetId: req.body.tweet_id,
    hashtag: req.body.hashtag
  };
  logDetails = {
    message: "Update hashtag in a tweet by tweet_id",
    hashtagData: hashtagData
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    {
      path: "updateHashtag",
      hashtagData: hashtagData
    },
    function(err, result) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ message: "unable to update database" });
      } else {
        logDetails = {
          message: "Updated hashtag in tweet, successfully"
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        console.log(result);
        res
          .status(200)
          .json({ message: "Updated hashtag in tweet, successfully" });
      }
    }
  );
});
//get tweets by hashtag
router.route("/tweetsByHashtag").get(function(req, res) {
  var hashtag = req.query.hashtag;
  logDetails = {
    message: "get tweets by hashtag",
    hashtag: hashtag
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  console.log("hashtag====", hashtag);
  kafka.make_request(
    "tweet_topics",
    { path: "tweetsByHashtag", hashtag: hashtag },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "fetched tweets by hashtag"
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json(result.tweets);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});

//get all unique hashtags available as an array
router.route("/hashtags").get(function(req, res) {
  logDetails = {
    message: "get all unique hashtags available as an array"
  };
  fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(err) {
    if (err) {
      console.err("Unable to update the log file");
    }
  });
  kafka.make_request(
    "tweet_topics",
    { path: "getAllHashtags", hashtag: req.query.hashtag },
    function(err, result) {
      if (result) {
        logDetails = {
          message: "get all unique hashtags available as an array",
          hashtg: result.hashtags
        };
        fs.appendFile("logs.txt", JSON.stringify(logDetails) + "\r\n", function(
          err
        ) {
          if (err) {
            console.err("Unable to update the log file");
          }
        });
        res.status(200).json(result.hashtags);
      } else {
        res.status(400).json(err.info);
      }
    }
  );
});
module.exports = router;
