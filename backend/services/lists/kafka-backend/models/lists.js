const mongoose = require('mongoose')

const listsSchema = mongoose.Schema({
    listName: {
        type: String,
        required: true
    },
    listDescription: {
        type: String
    },
    listOwnerId: {
        type: String,
        required: true
    },
    listOwnerName: {
        type : String,
        required : true
    },
    listOwnerUserName: {
        type : String,
        require : true 
    },
    listOwnerImage: {
        type: String
    },
    listMembers: [
        {
            memberId : {
                type : String
            },
            memberName : {
                type : String
            },
            memberImage : {
                type : String
            }
        }
    ],
    listSubscribers: [
        {
            subscriberId : {
                type : String
            },
            subscriberName : {
                type : String
            }
        }
    ]
});

module.exports = mongoose.model('Lists', listsSchema);