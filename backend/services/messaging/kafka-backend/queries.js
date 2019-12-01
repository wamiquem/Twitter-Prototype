const Conversation = require('./models/conversation');
const con = require('../kafka-backend/mysql_connection');

var queries = {}

queries.getConversations = (userId, successcb, failurecb) => {
    Conversation.find({users: userId}).sort({ updated: -1 })
    .then(conversations => successcb(conversations))
    .catch(err => failurecb(err))
}

queries.authenticateUser = (id, successcb, failurecb) => {
    let sql = 'SELECT id, email FROM users WHERE id = ?';
    con.query(sql, [id], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.addConversation = (conversation, successcb, failurecb) => {
    const doc = new Conversation({
        users: conversation.users,
        messages: [conversation.message],
        updated: conversation.message.sentDate
    });
    doc.save()
    .then(conversation => successcb(conversation))
    .catch(err => failurecb(err))
}

queries.updateConversation = (conversation, successcb, failurecb) => {
    Conversation.findOne({_id: conversation._id})
    .then(conversationToUpdate => {
        conversationToUpdate.messages.push(conversation.message);
        conversationToUpdate["updated"] = conversation.message.sentDate
        conversationToUpdate.save()
        .then(doc => {
            successcb("Message added successfully")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

module.exports = queries;