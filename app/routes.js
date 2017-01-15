// Dependencies
  // mongoose
  // User from model.js
// Open App Routes
  // GET Routes to return all users in the database - use mongoose schema to run the search
    // instantiate query to store find method of User
    // use .exec method of query to check for errors
      // if error
        // send error
      // else
        // respond with JSON of users
  // Post Routes to save new users in the database - uses mongoose schema to create a new user and post to dom
    // instantiate new user based on mongoose schema
    // save method on new user checking for errors
      // if error
        // send error
      // else
        // respond by placing json into body

var mongoose = require('mongoose');
var User = require('./model.js');

module.exports = function(app){
  app.get('/users', function(req, res){
    var query = User.find({});
    query.exec(function(err, users){
      if(err){
        res.send(err);
      } else {
        res.json(users);
      }
    });
  });
  app.post('/users', function(req, res){
    var newuser = new User(req.body);
    newuser.save(function(err){
      if(err){
        res.send(err);
      } else {
        res.json(req.body);
      }
    });
  });
};