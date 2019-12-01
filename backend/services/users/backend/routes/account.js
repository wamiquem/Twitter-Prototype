var express = require('express');
var router = express.Router();
const {secret} = require('../config/config');
var jwt = require("jsonwebtoken");
var kafka = require('../kafka/client');

router.post('/signup',function(req,res){
    console.log("Inside signup Post Request");
    console.log("Req Body : ",req.body);

    kafka.make_request("signup", {message: req.body},
        function(err, result) {
            console.log("result!!!!==  ",result);
            if(result){
                res.status(200).json({success: true, message:'User created'});
            }else{
                console.log("errrr");
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/login',function(req,res){
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);

    kafka.make_request("login", {message: req.body},
        function(err, result) {
            if(result){
                let user = {
                    email: req.body.email,
                    id: result.id,
                }
                var token = jwt.sign(user, secret, {
                    expiresIn: 10080 // in seconds
                });
                res.status(200).json({success: true, message: "User Login successful", result, token:token});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

module.exports = router;