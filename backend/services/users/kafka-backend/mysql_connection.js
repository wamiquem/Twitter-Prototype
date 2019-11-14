'use strict';
var mysql = require('mysql');
const {host, user, password, database} = require('./config/mysql_config');

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