var connection =  new require('./kafka/connection');
const {database} = require('./config/config');
var mongoose = require('mongoose');
var Messaging = require('./services/messaging');
var Passport = require('./services/passport');

const connectDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 100
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
  }
};
connectDB();

function handleTopicRequest(topic_name,fname){
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        switch (topic_name) {
            case "passport":
              Passport.passportService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "messaging":
              Messaging.messagingService(data.data, function(err, res) {
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

handleTopicRequest("messaging", Messaging);
handleTopicRequest("passport", Passport);