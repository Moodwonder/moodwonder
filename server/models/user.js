/**
 * Defining a User Model in mongoose
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');


/**
 *User Schema
 */
var UserSchema = new mongoose.Schema({
  firstname: {type: String, default: ''},
  lastname: {type: String, default: ''},
  email: {type: String, unique: true, lowercase: true},
  language: {type: String, default: 'EN'},
  report_frequency: {type: String, default: 'Weekly'},
  password: String,
  profile_image: {type: String, default: ''},
  usertype: String,
  teamname: String,
  company_info :
    [{
      companyname : String,
      industry : String,
      continent : String,
      country : String,
      state : String,
      city : String,
      address : String,
      website : String,
      companysize : String
    }],
  verifylink: {type: String, default: ''}
});


/**
 * Password hash middleware.
 */
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(5, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 *Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword: function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    })
  }
};


/**
 * Statics
 */
UserSchema.statics = {}


module.exports = mongoose.model('Users', UserSchema);
