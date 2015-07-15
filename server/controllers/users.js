var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');
var sess = {};


/**
 * Login
 */
exports.postLogin = function(req, res, next) { 
    // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
      req.flash('errors', {msg: info.message});
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return next(err);
      console.log(user);
      sess = req.session;
      sess._id = user._id;
      sess.name = user.name;
      sess.email = user.email;
      req.flash('success', { msg: 'Success! You are logged in'});
      var response = {};
      response.user = user;
      response.status = 'success';
      res.send(response);
      res.end();
      
    });
  })(req, res, next);
};


/**
 * Get all Users
 */
exports.getUsers = function(req, res) {
  User.find({}).exec(function(err, lists) {
    if(!err) {
      res.json(lists);
    } else {
      console.log('Error in first query');
    }
  });
};


/**
 * Logout
 */
exports.getLogout = function(req, res, next) {
  sess._id = null;
  sess.email = null;
  sess.name = null;
  delete sess._id;
  delete sess.email;
  delete sess.name;
  req.session.destroy();
  req.logout();
  next();
};


/**
 * For testing Signup functionality.
 */
exports.postSignUp = function(req, res, next) {
  var user =  new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists' });
    }
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return next(err);
        console.log('Successfully created');
        res.end('Success');
      });
    });
  });
};


/**
 * Signup
 */
exports.postUserSignUp = function(req, res, next) { 
  var user =  new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists' });
    }
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return next(err);
        console.log('Successfully created');
        res.end('Success');
      });
    });
  });
};





