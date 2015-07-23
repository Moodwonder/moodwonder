var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');
var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId; 
var sess = {};


/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';
 
 
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
 * First step of signup.
 *
 * Accept : -  @email
 */
exports.postSignupStep1 = function(req, res) {

  var email = req.body.email;
  var verifystring = email + Date.now();
  verifystring = crypto.createHash('md5').update(verifystring).digest("hex");
  var user =  new User({
    email: req.body.email,
    verifylink: verifystring
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
		response.status = false;
		response.message = 'The email address you have entered is already registered';
		res.send(response);
		res.end();
    }else{
		user.save(function(err) {
		    if(!err){
				response.status = true;
				response.message = 'We have sent you an email, Please follow the instructions in the email to complete the sign up process';
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}
  });
};

/**
 * Second step of signup.
 *
 * Accept : -  @password
 */
exports.postSignupStep2 = function(req, res) {

    var password = req.body.password.trim();
    if(password.length<= 6){
        response.status = false;
        response.message = 'Password length should be at least 7 characters';
        res.send(response);
        res.end();
	}else{
       var user_id = '55af2a066d59aedf18dc89f1';
       user_id = new ObjectId(user_id);
       var conditions = { _id: user_id }
         , update = { password: password }
         , options = { multi: false };
      User.update(conditions, update, options, function(err) {
        if(err){
          response.status = false;
          response.message = 'Something went wrong...';
        }else{
          response.status = true;
          response.message = 'Password created';
        }
        res.send(response);
        res.end();
      });
    }
};

/**
 *  Email ID verification
 */

exports.getVerify = function(req,res){

    var verifyString = req.params.hash;
    var conditions = { verifylink: verifyString }
      , update = { verifylink: 1 }
      , options = { multi: false };

    /**
     * Checking the hash is exist in the user collections
    */
  User.findOne({verifylink: verifyString}, function(err, document) {

    if(document) {
      User.update(conditions, update, options, function(err) {
        if(err){
          res.send('Something went wrong...');
          res.end();
        }else{
          res.send("Email verified");
          res.end();
        }
      });
    }else{
      res.send('Invalid verification link');
      res.end();
    }

  });
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





