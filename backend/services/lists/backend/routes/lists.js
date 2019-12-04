var express = require('express');
var router = express.Router();
const path = require('path');
var kafka = require('../kafka/client');
var passport = require("passport");
var jwt = require("jsonwebtoken");

router.post('/createList', function(req, res){
    console.log("Inside create list POST request");
    console.log("Req Body : ", req.body);

    const list = req.body;

    kafka.make_request("lists", {type: "createList", message : list},
        function(err, result) {
            if(result) {
                res.status(200).json({success: true, message:'List created', list: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/addMemberToList', function(req, res){
    console.log("Inside add member to list POST Request");
    console.log("Req Body : ", req.body);

    const list = req.body;

    kafka.make_request("lists", {type: "addMemberToList", message : list},
        function(err, result) {
            if(result) {
                res.status(200).json({success: true, message:'Member Added to List', list: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/deleteMemberFromList', function(req, res){
    console.log("Inside delete member from list POST Request");
    console.log("Req Body : ", req.body);

    const list = req.body;

    kafka.make_request("lists", {type: "deleteMemberFromList", message : list},
        function(err, result) {
            if(result) {
                res.status(200).json({success: true, message:'Member Deleted from List', list: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/subscribeToList', function(req, res){
    console.log("Inside subscribe to list POST Request");
    console.log("Req Body : ", req.body);

    const list = req.body;

    kafka.make_request("lists", {type: "subscribeToList", message : list},
        function(err, result) {
            if(result) {
                res.status(200).json({success: true, message:'Subscribed to List', list: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/unSubscribeFromList', function(req, res){
    console.log("Inside unsubscribe from list POST Request");
    console.log("Req Body : ", req.body);

    const list = req.body;

    kafka.make_request("lists", {type: "unSubscribeFromList", message : list},
        function(err, result) {
            if(result) {
                res.status(200).json({success: true, message:'Unsubscribed from List', list: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/UserLists', function(req, res){
    console.log("Inside Get User Lists GET Request");
    console.log("Req Query : ", req.query);

    kafka.make_request("lists", {type: "getUserLists", message: req.query.ownerId},
        function(err, result) {
            if(result){
                let lists = result.lists.map(list => {
                    return {
                        listId: list.listId,
                        listName: list.listName
                    }
                });
                res.status(200).json({success: true, lists : lists});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/UserSubscribedLists', function(req, res){
    console.log("Inside Get User Subscribed Lists GET Request");
    console.log("Req Query : ", req.query);

    kafka.make_request("lists", {type: "getUserSubscribedLists", message: req.query.userId},
        function(err, result) {
            if(result){
                let lists = result.lists.map(list => {
                    return {
                        listId: list.listId,
                        listName: list.listName
                    }
                });
                res.status(200).json({success: true, lists : lists});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/UserMemberLists', function(req, res){
    console.log("Inside Get User Member Lists GET Request");
    console.log("Req Query : ", req.query);

    kafka.make_request("lists", {type: "getUserMemberLists", message: req.query.userId},
        function(err, result) {
            if(result){
                let lists = result.lists.map(list => {
                    return {
                        listId: list.listId,
                        listName: list.listName
                    }
                });
                res.status(200).json({success: true, lists : lists});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/ListMembers', function(req, res){
    console.log("Inside Get List Members GET Request");
    console.log("Req Query : ", req.query);

    kafka.make_request("lists", {type: "getListMembers", message: req.query.listId},
        function(err, result) {
            if(result){
                let members = result.lists.listMembers.map(listMember => {
                    return {
                        listMemberId: listMember.memberId,
                        listMemberName: listMember.memberName
                    }
                });
                res.status(200).json({success: true, members : members});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/ListSubscribers', function(req, res){
    console.log("Inside Get List Subscribers GET Request");
    console.log("Req Query : ", req.query);

    kafka.make_request("lists", {type: "getListSubscribers", message: req.query.listId},
        function(err, result) {
            if(result){
                let subscribers = result.lists.listSubscribers.map(listSubscriber => {
                    return {
                        listSubscriberId: listSubscriber.subscriberId,
                        listSubscriberName: listSubscriber.subscriberName
                    }
                });
                res.status(200).json({success: true, subscribers : subscribers});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

module.exports  = router;