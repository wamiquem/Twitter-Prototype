var hashtag = require("../models/hashtag");
var mongoose = require("mongoose");
function handle_request(info, callback) {
  console.log("Inside Kafka Backend profile service === ", info);
  switch (info.type) {
    case "inserthashtag":
      inserthashtag(info.message, callback);
      break;
    case "searchtweetfromhashtag":
      searchtweetfromhashtag(info.message, callback);
      break;
    case "searchhashtag":
      searchhashtag(info.message, callback);
      break;
  }
}

exports.handle_request = handle_request;
function inserthashtag(id, callback) {
  var hash ;
  // for (hash in id.hashtag)
console.log(id ,"  id")
console.log(id.hashtag , " id.hashtag")

arr = Array.from(id)
  for (var i = 0;i< arr.length;i++)
  { var strhash = "";
  strhash = arr[i].hashtag;
    // for (item in arr[i]){
      console.log("item.hashtag",arr[i].hashtag);
      console.log("item.tweetby",arr[i].tweetby);
      console.log("i",i)
      // tweetby: { $in : [arr[i].tweetby]} 
   
  console.log("Inside Kafka Backend Get Inserthashtag service");

  
  hashtag.find({ hashtag: "#postman"
    
    }).then(function(value, err){
      console.log(value,"value");
      if (value != 0){
        console.log("Inside wrong");
        continue;
        // return callback(null,{status:200,statusMessage:"Hashtag and and tweetid already exists"});
       } 
    if(err){
      console.log("errrr==",err)
    }
    }
    )
    console.log("item.hashtagsecod",arr[i].hashtag)
//uNCOMMENT

  hashtag.findOne({
      hashtag: arr[i].hashtag
    }).then(function(hashdata, err) {
      console.log("BEFORE IF hashdata", hashdata);
      if (hashdata == null) {
        console.log("Findone hashdata", hashdata);
        // console.log("item.hashtag",arr[i].hashtag)
        // console.log("item.tweetby",arr[i].tweetby)
        const newhashtag = new hashtag({
          _id: mongoose.Types.ObjectId(),
          hashtag: arr[i].hashtag,
          tweetby: [arr[i].tweetby]
        });
        newhashtag.save().then(
          rows => {
            console.log("Success", rows);
            // return callback(null,{status:200, success: true, rows: rows });
           
          },
          err => {
            console.log("Error Creating hashtags");
            continue;
            // return callback(err, "Error Creating hashtags");
          }
        );
      } else {
        console.log("Inside else hashtag:", id);
        return hashtag.findOneAndUpdate(
          { hashtag: arr[i].hashtag },
          { $push: { tweetby: arr[i].tweetby } },
          function(err, resulthashtag) {
            // console.log("result",result);
            if (err) {
              console.log(err);
              console.log("unable to insert update hashtag");
              continue;
              return callback(err, "Database Error");
            } else {
              console.log("Hashtag updated",resulthashtag);
              continue;
              // return callback(null, {resulthashtag,s: "truexy"} );
            }
          }
        );
      }
    },err =>{

    }
    
    )
    ;
//uNCOMMENT
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
}
// function inserthashtag(id, callback) {
//   console.log("Inside Kafka Backend Get Inserthashtag service");
//   hashtag.count({
//     hashtag: id.hashtag,
    
//     tweetby: { $in : [id.tweetby]} }).then(function(value, err){
//       console.log(value,"value")
//       if (value != 0){
//         console.log("Inside wrong")
//         return callback(null,{status:200,statusMessage:"Hashtag and and tweetid already exists"});
//        } 

//     })



//   hashtag.findOne({
//       hashtag: id.hashtag
//     }).then(function(hashdata, err) {
//       console.log("BEFORE IF hashdata", hashdata);
//       if (hashdata == null) {
//         console.log("Findone hashdata", hashdata);
//         const newhashtag = new hashtag({
//           _id: mongoose.Types.ObjectId(),
//           hashtag: id.hashtag,
//           tweetby: [id.tweetby]
//         });
//         newhashtag.save().then(
//           rows => {
//             console.log("Success", rows);
//             return callback(null,{status:200, success: true, rows: rows });
           
//           },
//           err => {
//             console.log("Error Creating hashtags");
//             return callback(err, "Error Creating hashtags");
//           }
//         );
//       } else {
//         console.log("Inside else hashtag:", id);
//         return hashtag.findOneAndUpdate(
//           { hashtag: id.hashtag },
//           { $push: { tweetby: id.tweetby } },
//           function(err, resulthashtag) {
//             // console.log("result",result);
//             if (err) {
//               console.log(err);
//               console.log("unable to insert update hashtag");
//               return callback(err, "Database Error");
//             } else {
//               console.log("Hashtag updated",resulthashtag);
//               return callback(null, {resulthashtag,s: "truexy"} );
//             }
//           }
//         );
//       }
//     })
//     ;

//   // const newhashtag = new hashtag({
//   //     _id: mongoose.Types.ObjectId(),
//   //     hashtag: "#check",
//   //     tweetby: ["0001"],
//   // })
//   // newhashtag.save().then((rows)=> {
//   //     callback(null,{status:200, success: true, rows: rows });
//   // }, (err) => {
//   //            console.log("Error Creating hashtags");
//   //            let errorDetails = {};
//   //            errorDetails.statusCode = 500;
//   //            errorDetails.info = { success: false, mesage: `Error Creating hashtags. ${err}` };
//   //            callback(errorDetails, null);

//   //          })
// }


function searchtweetfromhashtag(id, callback) {
  console.log("Inside Kafka Backend Get updatehashtag service");
  console.log(id.hashtag)
  hashtag.findOne({
    hashtag: id.hashtag
  }).then(function(rows, err) {
    console.log("BEFORE IF hashdata", rows);
    if (rows != null) {
      return callback(null,{status:200, success: true, rows: rows });
    }else{
      callback(null,{status:200,statusMessage:"Hashtag is not found"});
    }
})
}
// Restaurant.find({"sections.menus.name": {$regex: menuItem, $options: 'i'}})
//     .select('cuisine id name street city state owner_id')
//     .then(result => successcb(result))
//     .catch(err => failurecb(err))
// }
function searchhashtag(id, callback) {
  console.log("Inside searchhashtag service");
  hashtag.find({hashtag: {$regex: id.hashtag, $options: 'i'}})
    .then(function(rows, err) {
      console.log("Inside search distinct data ", rows);
      if (rows != null) {
        return callback(null,{status:200, success: true, rows: rows });
      }else{
        callback(null,{status:200,statusMessage:"Hashtag is not found"});
      }
    })



  
  // hashtag.find({ hashtag: /id.hashtag/ } ).then(function(rows, err) {
  //   console.log("Inside search distinct data ", rows);
  //   if (rows != null) {
  //     return callback(null,{status:200, success: true, rows: rows });
  //   }else{
  //     callback(null,{status:200,statusMessage:"Hashtag is not found"});
  //   }

  // })

  // hashtag.distinct("hashtag").then(function(rows, err) {
  //   console.log("Inside search distinct data ", rows);
  //   if (rows != null) {
  //     return callback(null,{status:200, success: true, rows: rows });
  //   }else{
  //     callback(null,{status:200,statusMessage:"Hashtag is not found"});
  //   }


  // });

//   hashtag.findOne({
//     hashtag: id.hashtag
//   }).then(function(rows, err) {
//     console.log("BEFORE IF hashdata", rows);
//     if (rows != null) {
//       return callback(null,{status:200, success: true, rows: rows });

//     }else{
//       callback(null,{status:200,statusMessage:"Hashtag is not found"});
//     }
// })
};

