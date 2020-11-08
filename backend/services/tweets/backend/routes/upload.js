var express = require('express');
var router = express.Router();
var multer = require('multer');
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
var path = require('path');
var passport = require("passport");

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_S3_BUCKET_REGION
  });

const s3 = new aws.S3();

var storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, "twitter:" + Date.now() + path.extname(file.originalname));
    }
  })
  
var upload = multer({ storage: storage }).array('image');

// router.post('/tweet-images', passport.authenticate("jwt", { session: false }),(req, res) => {
  router.post('/tweet-images', (req, res) => {
    console.log("Inside tweet images post Request");

    upload(req, res, function(err){
        if(err){
            res.status(500).json({message: `Image upload failed due to internal issue. ${err}`});
            return;
        }
        var imagesUrl = req.files.map(file => file.location)
        res.status(200).json({imagesUrl: imagesUrl}); 
    });
});

module.exports = router;