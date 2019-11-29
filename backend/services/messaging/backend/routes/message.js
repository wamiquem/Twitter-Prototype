var express = require('express');
var router = express.Router();
var passport = require("passport");
var kafka = require('../kafka/client');

router.post('/add',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Message add Post Request");
    console.log("Req Body : ",req.body);

    kafka.make_request("messaging", {type: "addConversation", message: req.body},
        function(err, result) {
            if(result){
                res.status(200).json({success:true, id:result, message:"Message Added Successfully"});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/get',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Get Message Request");
    console.log("Req Body : ",req.query);

    kafka.make_request("messaging", {type: "getConversations", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success:true, conversations:result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/update',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Get Message Request");
    console.log("Req Body : ",req.query);

    kafka.make_request("messaging", {type: "updateConversation", message: req.body},
        function(err, result) {
            if(result){
                res.status(200).json({success:true, message: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

module.exports = router;