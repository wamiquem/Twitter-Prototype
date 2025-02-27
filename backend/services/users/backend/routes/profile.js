var express = require('express');
var router = express.Router();
const path = require('path');
var passport = require("passport");
var kafka = require('../kafka/client');

router.get('/username',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Username Get Request");
    console.log("Req Query : ",req.query.id);

    kafka.make_request("profile", {type: "getUsername", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, firstName: result.fname});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/update',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside User Update Profile Post Request");
    console.log("Req Body : ",req.body);
    console.log("Req Query : ",req.query);

    let user = req.body;
    user.id = req.query.id;
    kafka.make_request("profile", {type: "updateUserProfile", message: user},
        function(err, result) {
              if(result){
                res.status(200).json({success:true, message:'User profile updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/details',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside User Details Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getUserDetails", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, user: result, message:""});
            }else if(err){
                res.status(err.statusCode).json(err.info);
            } else {
                res.status(401).json({success: true, message:"User Does not Exists"});
            }
    });
});

router.get('/profilePic',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside User profile pic Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getUserProfilePic", message: req.query.id},
        function(err, result) {
            if(result){
                res.sendFile(path.join(__dirname, `../uploads/${result.image}`));
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/getAllMatchingUsers',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Find All Matching User Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getAllMatchingUsers", message: req.query.username},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, users: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/getSpecificUser',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Get Specific User Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getSpecificUser", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, user: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/follow',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside User Follow Post Request");
    console.log("Req Body : ",req.body);

    kafka.make_request("profile", {type: "followUser", message: req.body},
        function(err, result) {
              if(result){
                res.status(200).json({success:true, message:'Successfully added follower and leader'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/unfollow',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside User Unfollow Post Request");
    console.log("Req Body : ",req.body);

    kafka.make_request("profile", {type: "unfollowUser", message: req.body},
        function(err, result) {
              if(result){
                res.status(200).json({success:true, message:'Successfully removed follower and leader'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/delete',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Profile Delete Request");
    console.log("Req Query : ",req.query);

    kafka.make_request("profile", {type: "deleteProfile", message: req.query.id},
        function(err, result) {
              if(result){
                res.status(200).json({success:true, message:'Profile Deleted successfully'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

module.exports = router;