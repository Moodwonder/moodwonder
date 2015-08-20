/**
 *Configuring local strategy to authenticate strategies
 */
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Admin = require('../../models/admin');

/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
module.exports = new LocalStrategy({
  usernameField : 'username'
}, function(username, password, done) {
  Admin.findOne({ username: username}, function(err, user) {
    if(!user) return done(null, false, { message: 'Username ' + username + ' not found'});
    user.comparePassword(password, function(err, isMatch) {
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid username or password'});
      }
    });
  });
});
