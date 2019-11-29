var hashtag = require("../models/hashtag");
var mongoose = require("mongoose");
function handle_request(info, callback) {
  console.log("Inside Kafka Backend profile service === ", info);
  switch (info.type) {
    case "inserthashtag":
      inserthashtag(info.message, callback);
      break;
    case "updatehashtag":
      updatehashtag(info.message, callback);
      break;
    case "searchhashtag":
      searchhashtag(info.message, callback);
      break;
  }
}

exports.handle_request = handle_request;
function inserthashtag(id, callback) {
  console.log("Inside Kafka Backend Get Inserthashtag service");
  hashtag.count({
    hashtag: id.hashtag,
    
    tweetby: { $in : [id.tweetby]} }).then(function(value, err){
      console.log(value,"value")
      if (value != 0){
        console.log("Inside wrong")
        return callback(null,{status:200,statusMessage:"Hashtag and and tweetid already exists"});
       } 

    })



  hashtag.findOne({
      hashtag: id.hashtag
    }).then(function(hashdata, err) {
      console.log("BEFORE IF hashdata", hashdata);
      if (hashdata == null) {
        console.log("Findone hashdata", hashdata);
        const newhashtag = new hashtag({
          _id: mongoose.Types.ObjectId(),
          hashtag: id.hashtag,
          tweetby: [id.tweetby]
        });
        newhashtag.save().then(
          rows => {
            console.log("Success", rows);
            return callback(null,{status:200, success: true, rows: rows });
           
          },
          err => {
            console.log("Error Creating hashtags");
            return callback(err, "Error Creating hashtags");
          }
        );
      } else {
        console.log("Inside else hashtag:", id);
        return hashtag.findOneAndUpdate(
          { hashtag: id.hashtag },
          { $push: { tweetby: id.tweetby } },
          function(err, resulthashtag) {
            // console.log("result",result);
            if (err) {
              console.log(err);
              console.log("unable to insert update hashtag");
              return callback(err, "Database Error");
            } else {
              console.log("Hashtag updated",resulthashtag);
              return callback(null, {resulthashtag,s: "truexy"} );
            }
          }
        );
      }
    })
    ;

  // const newhashtag = new hashtag({
  //     _id: mongoose.Types.ObjectId(),
  //     hashtag: "#check",
  //     tweetby: ["0001"],
  // })
  // newhashtag.save().then((rows)=> {
  //     callback(null,{status:200, success: true, rows: rows });
  // }, (err) => {
  //            console.log("Error Creating hashtags");
  //            let errorDetails = {};
  //            errorDetails.statusCode = 500;
  //            errorDetails.info = { success: false, mesage: `Error Creating hashtags. ${err}` };
  //            callback(errorDetails, null);

  //          })
}

function updatehashtag(id, callback) {
  console.log("Inside Kafka Backend Get updatehashtag service");
}
function searchhashtag(id, callback) {
  console.log("Inside Kafka Backend Get searchhashtag service");

  hashtag.findOne({
    hashtag: id.hashtag
  }).then(function(rows, err) {
    console.log("BEFORE IF hashdata", rows);
    if (rows != null) {
      return callback(null,{status:200, success: true, rows: rows });

    }else{
      callback(null,{status:200,statusMessage:"Hashtag is not found"});
    }
})};
