var express = require('express');
var router = express.Router();
var multer = require('multer');
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
var path = require('path');
var passport = require("passport");
var {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_S3_BUCKET_NAME, AWS_S3_BUCKET_REGION} = require('../config/config');

aws.config.update({
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId: AWS_ACCESS_KEY,
    region: AWS_S3_BUCKET_REGION
  });

const s3 = new aws.S3();

var storage = multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, "twitter:" + Date.now() + path.extname(file.originalname));
    }
  })
  
var upload = multer({ storage: storage }).single('image');

router.post('/user-profile-image', passport.authenticate("jwt", { session: false }),(req, res) => {
    console.log("Inside user profile image post Request");

    upload(req, res, function(err){
        if(err){
            res.status(500).json({message: `User Image upload failed due to internal issue. ${err}`});
            return;
        }
        res.status(200).json({message:'User image uploaded succesfully to S3.', imageUrl: req.file.location}); 
    });
});

module.exports = router;