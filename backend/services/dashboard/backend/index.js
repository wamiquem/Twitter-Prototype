var express = require("express");
var app = express();
var cors = require("cors");
var passport = require("passport");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { frontendURL } = require("./config/config");
var config = require("./config/settings");
// Set up Database connection
var mongoose = require("mongoose");
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
var basePath = "/dashboard";
var dashboard = require("./routes/dashboard");
//var upload = require("./routes/upload");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: `${frontendURL}`, credentials: true }));
app.use(cookieParser());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `${frontendURL}`);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(bodyParser.json());

app.use(basePath, dashboard);
//app.use("/upload", upload);

app.use(passport.initialize());
require("./config/passport")(passport);

//start your server on port 3101
app.listen(3104);
console.log("Server Listening on port 3104.");

module.exports = app;
