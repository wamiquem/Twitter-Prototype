const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    users: [Number],
    updated: { 
        type: String
    },
    messages: [
        {   
            senderName: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            sentDate: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Conversations', conversationSchema);