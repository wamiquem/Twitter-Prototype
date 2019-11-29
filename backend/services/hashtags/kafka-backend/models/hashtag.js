var mongoose = require('mongoose');

var hashtag = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        tweetby:[{
                    type : String
                }],
        hashtag:{
            type : String
        },
    })

    

        
module.exports = mongoose.model('hashtag', hashtag);
