var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//schema of tweets collection
TweetsSchema = new Schema({
  user_id: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  images_path: {
    type: Array,
    default: []
  },
  liked_by: {
    type: Array,
    default: ""
  },
  //list of all the users who have retweeted this tweet
  retweeted_by: {
    type: Array,
    default: []
  },
  //Tweet id from which this retweet was created.
  retweeted_from_id: {
    type: String,
    default: ""
  },
  bookmarked_by: {
    type: Array,
    default: []
  },
  created_date_time: {
    type: String,
    default: ""
  },
  //replies is an array of object of time {createdDateAndTime, content}
  replies: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("tweets", TweetsSchema);
