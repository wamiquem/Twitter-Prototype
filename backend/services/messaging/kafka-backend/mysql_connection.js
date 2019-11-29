'use strict';
var mysql = require('mysql');
// const {host, user, password, database} = require('./config/config');

var host = "twitter.ck7kusphws8r.us-west-1.rds.amazonaws.com";
var user =  "admin";
var password = "password";
var database = 'twitter_db'

var con = mysql.createPool({
    connectionLimit: 100,
    host: host,
    user: user,
    password: password,
    database : database,
  });

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected Pooling!");
});

module.exports = con;