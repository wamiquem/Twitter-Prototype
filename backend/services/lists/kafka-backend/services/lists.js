const queries = require('../utils/queries');

exports.listsService = function listsService(info, callback) {
    console.log("Inside Kafka Backend List Service ===", info);

    switch (info.type) {
        case "createList" :
            createList(info.message, callback);
            break;
        case "addMemberToList" :
            addMemberToList(info.message, callback);
            break;
        case "deleteMemberFromList" :
            deleteMemberFromList(info.message, callback);
            break;
        case "subscribeToList" :
            subscribeToList(info.message, callback);
            break;
        case "unSubscribeFromList" :
            unSubscribeFromList(info.message, callback);
            break;
        case "getUserLists" :
            getUserLists(info.message, callback);
            break;
        case "getUserSubscribedLists" :
            getUserSubscribedLists(info.message, callback);
            break;
        case "getUserMemberLists" :
            getUserMemberLists(info.message, callback);
            break;
        case "getListMembers" :
            getListMembers(info.message, callback);
            break;
        case "getListSubscribers" :
            getListSubscribers(info.message, callback);
            break;
    }
};

function createList(list, callback) {
    console.log("Inside Kafka Backend Create List service");
  
    queries.createList(list, result => {
        console.log("List created with list: " + result);
        callback(null, result);
    }, err=>{
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when creating list. ${err.message}` };
        callback(errorDetails, null);
    });
}

function addMemberToList(list, callback) {
    console.log("Inside Kafka Backend Add Member to List service");

    queries.addMemberToList(list, result => {
        console.log("Member Added to List: " + result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when adding member to list. ${err.message}` };
        callback(errorDetails, null);
    })
}

function deleteMemberFromList(list, callback) {
    console.log("Inside Kafka Backend Delete Member from List service");

    queries.deleteMemberFromList(list, result => {
        console.log("Member deleted from List: " + result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when deleting member from list. ${err.message}` };
        callback(errorDetails, null);
    })
}

function subscribeToList(list, callback) {
    console.log("Inside Kafka Backend Subscribe to List service");

    queries.subscribeToList(list, result => {
        console.log("User subscribed to List: " + result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when subscribe to list. ${err.message}` };
        callback(errorDetails, null);
    })
}

function unSubscribeFromList(list, callback) {
    console.log("Inside Kafka Backend Unsubscribe from List service");

    queries.unSubscribeFromList(list, result => {
        console.log("User unsubscribed from List: " + result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when unsubscribe from list. ${err.message}` };
        callback(errorDetails, null);
    })
}

function getUserLists(userId, callback) {
    console.log("Inside Kafka Backend Get User Lists service");

    queries.getUserLists(userId, result => {
        console.log("User Lists: "+ result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when getting User lists. ${err.message}` };
        callback(errorDetails, null);
    })
}

function getUserSubscribedLists(userId, callback) {
    console.log("Inside Kafka Backend Get User Subscribed Lists service");

    queries.getUserSubscribedLists(userId, result => {
        console.log("User Subscribed Lists: "+ result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when getting User subscribed lists. ${err.message}` };
        callback(errorDetails, null);
    })
}

function getUserMemberLists(userId, callback) {
    console.log("Inside Kafka Backend Get User Member Lists service");

    queries.getUserMemberLists(userId, result => {
        console.log("User Member Lists: "+ result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when getting User member lists. ${err.message}` };
        callback(errorDetails, null);
    })
}

function getListMembers(listId, callback) {
    console.log("Inside Kafka Backend Get List Members service");

    queries.getListMembers(listId, result => {
        console.log("List Members: "+ result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when getting members from list. ${err.message}` };
        callback(errorDetails, null);
    })
}

function getListSubscribers(listId, callback) {
    console.log("Inside Kafka Backend Get List Subscribers service");

    queries.getListSubscribers(listId, result => {
        console.log("List Subscribers: "+ result);
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when getting subscribers from list. ${err.message}` };
        callback(errorDetails, null);
    })
}