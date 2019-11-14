const queries = require('../utils/queries');

exports.passportService = function passportService(info, callback) {
  console.log("Inside Kafka Backend passport service === ", info);
  
  queries.authenticateUser(id, result => {
    callback(null, result);
    }, err => {
        callback(err, null);
  });
};