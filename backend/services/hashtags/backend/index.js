var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const multer = require('multer');
var cors = require("cors");
var jwt = require('jsonwebtoken');
var mongoose =require('mongoose');
const fs = require('fs');
var fileLocation="";
const path = require('path');
var imageName="";
let dir="";
var kafka = require("./kafka/client")

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose.connect("mongodb+srv://divjotdhody:Country@123@cluster0-d7s9r.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  
  //Allow Access Control
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
  });

  app.post('/inserthashtag', function (request, response) {

    kafka.make_request('hashtag_topic',{type:"inserthashtag",message: request.body}, function(err,results){
      console.log('in result');

      
      console.log(results);
      if (err){
          console.log("Inside err");
          console.log(err)
          response.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
          console.log("results from kafka",results)
          response.json({
                  dataFromKafka:results
              });
              response.end();
          } 
  });
  });
  app.post('/updatehashtag', function (request, response) {
      
    kafka.make_request('hashtag_topic',{type:"updatehashtag",message: request.body}, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          response.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
          console.log("results from kafka",results)
          response.json({
                  dataFromKafka:results
              });
              response.end();
          } 
  });
  });

  app.post('/searchhashtag', function (request, response) {
      
    kafka.make_request('hashtag_topic',{type:"searchhashtag",message: request.body}, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          response.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
          console.log("results from kafka",results)
          response.json({
                  dataFromKafka:results
              });
              response.end();
          } 
  });
  });
app.listen(3001);
console.log("Server Listening on port 3001");
  