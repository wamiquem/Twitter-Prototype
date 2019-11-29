var connection = new require("./kafka/Connection");



var config = require("./config/settings");
var mongoose = require("mongoose");
var hashtag = require("./services/hashtag");
var connStr =
  config.database_type +
  "+srv://" +
  config.database_username +
  ":" +
  config.database_password +
  "@" +
  config.database_host +
  "/" +
  config.database_name;
console.log(connStr);
mongoose.connect(connStr, { useNewUrlParser: true, poolSize: 10 }, function(
  err
) {
  if (err) throw err;
  else {
    console.log("Successfully connected to MongoDB");
  }
});

console.log("Kafka server is running ");

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function(message) {
      console.log("message received for " + topic_name + " ", fname);
      console.log(JSON.stringify(message.value));
      var data = JSON.parse(message.value);
  
      fname.handle_request(data.data, function(err, res) {
        console.log("after handle" + res);
        var payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res
            }),
            partition: 0
          }
        ];

        try{
        producer.send(payloads, function(err, data) {
          console.log(data);
        });
        }
        catch(e){
            console.log(e);
        }
        return;
      });
    });
  }

  //first one: topic name we created on console
  //second: file imported in variable name
  handleTopicRequest("hashtag_topic", hashtag);
