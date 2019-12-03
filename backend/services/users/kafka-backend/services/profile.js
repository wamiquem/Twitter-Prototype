const queries = require('../utils/queries');

exports.profileService = function profileService(info, callback) {
  console.log("Inside Kafka Backend profile service === ", info);
  switch (info.type) {
    case "getUserDetails":
        getUserDetails(info.message, callback);
        break;
    case "getUserProfilePic":
        getUserProfilePic(info.message, callback);
        break;
    case "getUsername":
        getUsername(info.message, callback);
        break;
    case "updateUserProfile":
        updateUserProfile(info.message, callback);
        break;
    case "updateUserImage":
        updateUserImage(info.message, callback);
        break;
    case "getAllMatchingUsers":
        getAllMatchingUsers(info.message, callback);
        break;
    case "getSpecificUser":
        getSpecificUser(info.message, callback);
        break;
    case "followUser":
        followUser(info.message, callback);
        break;
    case "unfollowUser":
        unfollowUser(info.message, callback);
        break;
  }
};

function getUserDetails(id, callback) {
    console.log("Inside Kafka Backend Get User Details service");
  
    queries.getUserDetailsById(id, result => {
      callback(null, result);
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, message: `Something wrong when getting user details. ${err}` };
          callback(errorDetails, null);
    });
}

function getUserProfilePic(id, callback) {
    console.log("Inside Kafka Backend Get User Profile Pic service");

    queries.getUserImageNameById(id, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when getting user image name. ${err}`};
        callback(errorDetails, null);
    });
}

function getUsername(id, callback) {
    console.log("Inside Kafka Backend Get Username service");

    queries.getUsernameById(id, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something wrong when reading user first name. ${err}` };
        callback(errorDetails, null);
    });
}

function updateUserProfile(user, callback) {
    console.log("Inside Kafka Backend User Profile Update service");
  
    queries.updateUserProfile(user, result => {
      console.log("User profile updated succesfully");
      callback(null, result);   
      }, err => {
        let errorDetails = {};
        if(err.code === 'ER_DUP_ENTRY'){
            errorDetails.statusCode = 400;
            errorDetails.info = {success: false, message: 'Username already taken. Plz try with a different one'};
        } else{
            errorDetails.statusCode = 500;
            errorDetails.info = {success: false, message: `Something wrong when updating user profile. ${err}`};
        }
    });
}

function updateUserImage(user, callback) {
    console.log("Inside Kafka Backend Update User Image service");

    queries.updateUserImage({id: user.id, image: user.image}, result => {
        console.log("User image updated succesfully");
        callback(null, result);  
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when updating user image in the table. ${err}`};
        callback(errorDetails, null);
    });
}

function getAllMatchingUsers(username, callback) {
    console.log("Inside Kafka Backend Get All Matching Users service");
  
    queries.getAllMatchingUsers(username, result => {
      callback(null, result);
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, message: `Something wrong when getting users from the table. ${err}` };
          callback(errorDetails, null);
    });
}

function getSpecificUser(id, callback) {
    console.log("Inside Kafka Backend Get Specific User service");
  
    queries.getSpecificUser(id, result => {
      callback(null, result);
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, message: `Something wrong when getting user from the table. ${err}` };
          callback(errorDetails, null);
    });
}

function followUser(users, callback) {
    console.log("Inside Kafka Backend Follow User service");
  
    queries.addFollower(users, result => {
      console.log("Successfully added follower and leader");
      callback(null, result);
      }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Unable to add follower and leader in the table. ${err}` };
        callback(errorDetails, null);
    });
}

function unfollowUser(users, callback) {
    console.log("Inside Kafka Backend Unfollow User service");
  
    queries.removeFollower(users, result => {
      console.log("Successfully removed follower and leader");
      callback(null, result);
      }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Unable to remove follower and leader in the table. ${err}` };
        callback(errorDetails, null);
    });
}