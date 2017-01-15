// Require mongoose and mongoose.schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create user schema
var UserSchema = newSchema({
  username: {type: String, required: true},
  locationType: {type: String, required: true},
  appreciationTime: {type: Number, required: true},
  favfeature: {type: String, required: true},
  location: {type: [Number], required: true},
  htmlverified: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

// Set created_at to current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Index this schema in 2dsphere for running proximity searches
UserSchema.index({location: '2dsphere'});

// Export UserSchema set MongoDB collection as map-users
module.exports = mongoose.model('meanmap-user', UserSchema);