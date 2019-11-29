const queries = require('../utils/queries');

exports.passportService = function passportService(id, callback) {
  console.log("Inside Kafka Backend passport service === ", id);
  
  queries.authenticateUser(id, result => {
    callback(null, result);
    }, err => {
        callback(err, null);
  });
};