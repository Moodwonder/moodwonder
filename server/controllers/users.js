var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");

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
    console.log(user);
    if(!user) {
      req.flash('errors', {msg: info.message});
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
		console.log(' passport.authenticate ==='+err);
      if(err) return next(err);
      console.log('after return');
      sess = req.session;
      sess._id = user._id;
      sess.name = user.firstname+' '+user.lastname;
      sess.email = user.email;
      req.flash('success', { msg: 'Success! You are logged in'});
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
 * Get test
 */
exports.test = function(req, res) {
	res.send(sess._id);
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

			var transporter = nodemailer.createTransport();
			transporter.sendMail({
				from: 'admin@moodewonder.com',
				to: email,
				subject: 'Create password',
				html: "<b>Click here :</b>"+ 'http://'+req.get('host') +'/createpassword/'+verifystring
			});
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

  var verifyString = req.body.hash.trim();
  var password = req.body.password.trim();

  if(verifyString == ''){

      response.status = false;
      response.message = 'Invalid verification link';
      res.send(response);
      res.end();
  }else if(password.length<= 6){

      response.status = false;
      response.message = 'Password length should be at least 7 characters';
      res.send(response);
      res.end();
  }else{

  var conditions = { verifylink: verifyString }
    , update = { verifylink: 1 , password: password }
    , options = { multi: false };

  /**
   * Checking the verifylink is exist in the user collections
  */
  User.findOne(conditions, function(err, document) {

    if(document) {

    bcrypt.genSalt(5, function (err, salt) {
        if (!err){
        bcrypt.hash(update.password, salt, null, function (err, hash) {
            if (!err){
			  update.password = hash;
			  console.log(update.password);
			  User.update(conditions, update, options, function(err) {
				if(!err){

				   response.status = true;
				   response.message = 'Password created';
				   sess = req.session;
				   sess._id = document._id.valueOf();
				   console.log('saveed');
				}else{

				   response.status = false;
				   response.message = 'Something went wrong..';
				}
				res.send(response);
				res.end();
			  });
			}
			else{
				// bcrypt.hash Error
				response.status = false;
				response.message = 'Something went wrong..';
				res.send(response);
				res.end();
			}
        });
		}else{
			// bcrypt.genSalt Error
			response.status = false;
			response.message = 'Something went wrong..';
			res.send(response);
			res.end();
		}

    });
    

      
    }else{

      response.status = false;
      response.message = 'Invalid verification link';
      res.send(response);
      res.end();
    }
  });

  }

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
        res.end('Success');
      });
    });
  });
};





