var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
  secret: 'SecretSecretsAreNoFun,SecretSecretsHurtSomeone',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

const flash = require('express-flash');
app.use(flash());



//now angular ponts to this for static files directory
app.use(express.static( __dirname + '/public/dist/public' ));


//brings everything necessary over to routes.js
require('./server/config/routes')(app);



app.listen(8000, function() {
    console.log("listening on port 8000");
   });