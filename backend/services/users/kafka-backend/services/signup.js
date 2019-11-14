const encrypt = require('../utils/encrypt');
const queries = require('../utils/queries');

exports.signupService = function signupService(info, callback) {
  console.log("Inside Kafka Backend sign up service === ", info);
  
  let user = info.message;

  encrypt.generateHash(user.password, hash => {
    queries.createUser(user,hash, result => {
      console.log("User created with id: " + result._id);
      callback(null, result);
    }, err => {
      let errorDetails = {};
      if(err.code === 11000){
        errorDetails.statusCode = 401;
        errorDetails.info = {success: false, message: 'Email already exists. Plz sign up with a different email id'};
      } else{
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something failed when inserting record. ${err}`};
      }
      callback(errorDetails, null);
    });
  }, err => {
    let errorDetails = {};
    errorDetails.statusCode = 500;
    errorDetails.info = { success: false, message: `Something failed when generating hash. ${err}` };
    callback(errorDetails, null);
  });
};