const encrypt = require('../utils/encrypt');
const queries = require('../utils/queries');

exports.loginService = function loginService(info, callback) {
  console.log("Inside Kafka Backend login service === ", info);
  
  let user = info.message;

  queries.getUserPasswordByEmail(user.email, row => {
    if(row){
        encrypt.confirmPassword(user.password,row.password, result => {
            if (result){
                // callback(null, {id: row.id, username: row.username, image: row.image});
                queries.getAllLeaders(row.id, leaders=> {
                    var tweetUsers = []
                    var tweetUsersDetails = {}
                    if(leaders.length>0){
                        tweetUsers = leaders.map(leader=> {
                            tweetUsersDetails[leader.leader] = leader.leader_username;
                            return leader.leader
                        });
                    }
                    tweetUsers.push((row.id).toString());
                    callback(null, {id: row.id, username: row.username, image: row.image, tweetUsers: tweetUsers,
                        tweetUsersDetails: tweetUsersDetails});
                }, err=> {
                    let errorDetails = {};
                    errorDetails.statusCode = 500;
                    errorDetails.info = {success: false, message: `Something wrong when getting follow details from db. ${err}`};
                    callback(errorDetails, null);
                });
            }else{
                let errorDetails = {};
                errorDetails.statusCode = 401;
                errorDetails.info = {success: false, message: 'Incorrect Password'};
                callback(errorDetails, null);
            }
            }, err => {
                let errorDetails = {};
                errorDetails.statusCode = 500;
                errorDetails.info = {success: false, message: `Something wrong with bcrypt. ${err}`};
                callback(errorDetails, null);
            });
        }else{
            let errorDetails = {};
            errorDetails.statusCode = 401;
            errorDetails.info = {success: false, message: 'Email does not exists. Please try again'};
            callback(errorDetails, null);
        }
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when reading the record. ${err}`};
        callback(errorDetails, null);
    });
};