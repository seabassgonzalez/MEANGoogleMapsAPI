// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// Express Config setting connection to MongoDB
mongoose.connect("mongodb://localhost/MEANGoogleMapsAPI");

// Logging and Parsing
// set static files location to public
// specify use of bower components
// log with morgan
// parse application/json
// parse application urlencoded
// allow bodyParser to access raw texdt
// parse application/vnd.api+json
// specify use of override

// Routes
// require app routes.js

// Listen
// app listen(port)
// console.log listening message