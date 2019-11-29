const queries = require('../queries');

exports.messagingService = function messagingService(info, callback) {
  console.log("Inside Kafka Backend messaging service === ", info);

  switch (info.type) {
    case "addConversation":
      addConversation(info.message, callback);
      break;
    case "getConversations":
      getConversations(info.message, callback);
      break;
    case "updateConversation":
      updateConversation(info.message, callback);
      break;
  }
}

function addConversation(conversation, callback) {
  console.log("Inside Kafka Backend Add Conversation Service");

  queries.addConversation(conversation, result => {
    callback(null, result._id);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something failed when adding conversation. ${err}` };
        callback(errorDetails, null);
  });
}

function getConversations(userId, callback) {
  console.log("Inside Kafka Backend Get Conversations service");

  queries.getConversations(userId, result => {
    callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something failed when getting conversations from the collection. ${err}` };
        callback(errorDetails, null);
  });
}

function updateConversation(conversation, callback) {
  console.log("Inside Kafka Backend Update Conversation Service");

  queries.updateConversation(conversation, result => {
    callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something failed when updating conversation. ${err}` };
        callback(errorDetails, null);
  });
}