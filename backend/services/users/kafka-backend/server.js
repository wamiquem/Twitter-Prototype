var connection =  new require('./kafka/connection');
var SignUp = require('./services/signup');
var Login = require('./services/login');
var Profile = require('./services/profile');
var Passport = require('./services/passport');

function handleTopicRequest(topic_name,fname){
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        switch (topic_name) {
            case "signup":
              SignUp.signupService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "login":
              Login.loginService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "profile":
              Profile.profileService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "passport":
              Passport.passportService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
          }        
    });
}

function response(data, res, err, producer) {
    console.log("after handle", res);
    var payloads = [
      {
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: res,
          err: err
        }),
        partition: 0
      }
    ];
    producer.send(payloads, function(err, data) {
        if(err){
            console.log("error when producer sending data", err);
        } else {
            console.log("producer send", data);
        }
    });
    return;
  }

handleTopicRequest("signup", SignUp);
handleTopicRequest("login", Login);
handleTopicRequest("profile", Profile);
handleTopicRequest("passport", Passport);