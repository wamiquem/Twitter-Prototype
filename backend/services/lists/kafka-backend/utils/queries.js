// const con = require('../../backend/dbconnection_pool');

const Lists = require("../models/lists");
const Counter = require('../models/counter');
//const con = require('../../kafka-backend/mysql_connection');

var queries = {};

queries.createList = (list, successcb, failurecb) => {
    console.log("Inside POST create list.");
    console.log("Input List : ", list);
    const doc = new Lists({
        listName : list.listName,
        listDescription : list.listDescription,
        listOwnerId : list.listOwnerId,
        listOwnerName: list.listOwnerName,
        listOwnerUserName: list.listOwnerUserName,
        listOwnerImage: list.listOwnerImage
    });
    doc.save()
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.addMemberToList = (list, successcb, failurecb) => {
    console.log("Inside POST add member to list.");
    Lists.findOne({_id : list.listId})
    .then(listResult => {
        let memberExists = listResult.listMembers.find(existingMember => existingMember.memberId == list.userId);
        if(memberExists){
            var error =  new Error('Member already exists.');
            error.code = "DUPLICATE_MEMBER";
            throw error;
        }
        let newMember = {
            memberId: list.userId,
            memberName : list.userName,
            memberImage : list.userImage
        };
        listResult.listMembers.push(newMember);
        listResult.save()
        .then(result => successcb(result))
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.deleteMemberFromList = (list, successcb, failurecb) => {
    console.log("Inside POST delete member from list.");
    Lists.findOne({_id : list.listId})
    .then(listResult => {
        let memberExists = listResult.listMembers.find(existingMember => existingMember.memberId == list.userId);
        if(memberExists){
            listResult.listMembers.pull({memberId : list.userId});
            listResult.save()
            .then(doc => {
                successcb("Member deleted");
            })
            .catch(err => failurecb(err))
        }
    })
    .catch(err => failurecb(err))
}

queries.subscribeToList = (list, successcb, failurecb) => {
    console.log("Inside POST subscribe to list.");

    Lists.findOne({listId : list.listId})
    .then(listResult => {
        let newSubscriber = {
            subscriberId : list.userId,
            subscriberName : list.userName
        };
        listResult.listSubscribers.push(newSubscriber);
        listResult.save()
        .then(result => successcb(result))
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.unSubscribeFromList = (list, successcb, failurecb) => {
    console.log("Inside POST unsubscribe to list.");

    Lists.findOne({listId : list.listId})
    .then(listResult => {
        let subscriberExists = listResult.listSubscribers.findOne(existingSubscriber => existingSubscriber.subscriberId = list.userId);

        if(subscriberExists){
            listResult.listSubscribers.pull({subscriberId : list.userId});
            listResult.save()
            .then(doc =>{
                successcb()
            })
            .catch(err => failurecb(err))
        }
    })
    .catch(err => failurecb(err))
}

queries.getUserLists = (userId, successcb, failurecb) => {
    console.log("Inside Get User's Lists.");
    Lists.find({listOwnerId : userId})
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.getUserSubscribedLists = (userId, successcb, failurecb) => {
    console.log("Inside Get User's subscribed Lists.");
    Lists.listSubscribers.find({subscriberId : userId})
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.getUserMemberLists = (userId, successcb, failurecb) => {
    console.log("Inside Get User's Member Lists.");
    Lists.listMembers.find({memberId : userId})
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.getListMembers = (listId, successcb, failurecb) => {
    console.log("Inside Get List Members.");
    console.log("list id==",listId)
    Lists.findOne({_id : listId})
    .then(result => {
        console.log("result****", result);
                successcb(result)})
    .catch(err => failurecb(err))
}

queries.getListSubscribers = (listId, successcb, failurecb) => {
    console.log("Inside Get List Subscribers.");
    console.log("list id==",listId)
    Lists.find({_id : listId})
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

// queries.getAllMatchingUsers = (username, successcb, failurecb) => {
//     let sql = `SELECT id, username, image
//     FROM users WHERE username like '%${username}%'`;
//     let values = [username];
    
//     con.query(sql, values, function (err, result){
//         if (err){
//             failurecb(err);
//             return;
//         }
//         successcb(result);
//     });
// }

module.exports = queries;