var _ = require('lodash');
var User = require('../models/user');
var Invite = require('../models/invite');
var Team = require('../models/team');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var validations = require('../controllers/validationRules');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");


/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';
 
/**
 * Encrypt password
 */
exports.encryptPassword = function(req, res, next){

  var password = req.body.password.trim();

  if(password.length >= 6){

      bcrypt.genSalt(5, function (err, salt) {

        if (!err){
          bcrypt.hash(password, salt, null, function (err, hash) {
            if (!err){
              req.body.real_password = req.body.password;
              req.body.password = hash;
              next();
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
    req.body.password = '';
    next();
  }
}

/**
 * Check login status
 */
exports.checkLogin = function(req, res, next){
  if(req.user) {
    next();
  }else{
    res.json({'status':false,'message':'Session expired.!'});
    res.end();
  }
}

/**
 * Login
 */
exports.postLogin = function(req, res, next) {
    // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
      response.message   = info.message;
      res.send(response);
      res.end();
      return;
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return next(err);
      response.status    =   true;
      response.message   =   'Success! You are logged in';
      response.user      =   user;
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
      // console.log('Error in first query');
    }
  });
};

/**
 * Get a User
 */
exports.getUserInfo = function(req, res) {

  console.log(req.user);
  var condition = { '_id': new ObjectId(req.user._id) };
  User.findOne(condition,function(err, lists) {
    if(!err) {
      response = {};
      response.status = true;
      response.message = 'success';
      response.data = { 'fname': '', 'lname': '', 'email': '', 'language': '', 'reportfrequency': '', 'password': '', 'companyname': '', 'mymanager': '', 'industry': '', 'continent': '', 'country': '', 'state': '', 'city': '', 'address': '', 'website': '', 'companysize': ''};
      if(req.query.type == 'company' ){
            if(lists.company_info[0] != undefined){
               response.data = lists.company_info[0];
            }

      }else{

          if(lists.mymanager[0] == undefined){
              lists.mymanager[0] = { 'email': '' };
          }
          response.data = { 'fname': lists.firstname, 'lname': lists.lastname, 'email': lists.email, 'language': lists.language, 'reportfrequency': lists.report_frequency, 'password': '', 'mymanager': lists.mymanager[0].email };
      }
      res.json(response);
    } else {
      res.json(response);
    }
  });
};

/**
 * Get test
 */
exports.test = function(req, res) {
	res.send(req);
};

/**
 * Logout
 */
exports.getLogout = function(req, res, next) {
  req.session.destroy();
  req.logout();
  next();
};

/**
 * First step of signup.
 *
 * Accept : -  @email
 */
exports.postSignupStep1 = function(req, res, next) {

  var email = req.body.email;
  var type = req.body.type;

  if (type == 'forgotpassword') {
	console.log('------'+type);
    next();
    return;
  }

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
		user.save(function(err,newuser) {
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
				
				// if 'hash' params is exist, then add this user into the a team based on the team id in the Invite collections
				console.log('--req.body.hash----'+req.body.hash);
				if(req.body.hash != ''){
					
					var invite =  new Invite({
					email: email,
					type: 'Team',
					link: req.body.hash
					});
					

					Invite.findOne({email: email}, function(err, existingInvite) {
						if(existingInvite) {
							
							var team_id = existingInvite.data[0].team._id;

							var where = { _id: new ObjectId(team_id) }
							// console.log(member_email);
							// check the team is exist or not
							Team.findOne(where, function(err, existingTeam) {
								if(existingTeam) {

									// User not exist in this group, Insert this user into this team
									Team.update({ "_id" : existingTeam._id },{$push: {member_ids: { _id: newuser._id }}},function(err){
										if(err){
											response.status = false;
											response.messages = ['Error when adding a new member'];
											res.send(response);
											res.end();
										}else{
											response.status = true;
											response.messages = ['Member added'];
											res.send(response);
											res.end();
										}
									});
									
								}else{
									response.status = false;
									response.messages = ['Team not exist'];
									res.send(response);
									res.end();
								}
							});
						}else{
							response.status = true;
							response.messages = ['Error when processing your invitation'];
							res.send(response);
							res.end();
						}
					});
				}else {
					res.send(response);
					res.end();
				}
			
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
exports.postSignupStep2 = function(req, res, next) {

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

    if(document){
      User.update(conditions, update, options, function(err) {
        if(!err){

          response.status = true;
          response.message = 'Password created';
          req.body.email = document.email;
          req.body.password = req.body.real_password;
          next();
        }else{

          response.status = false;
          response.message = 'Something went wrong..';
        }
        res.send(response);
        res.end();
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

/**
 * Save user details
 *
 * Accept :
 * @fname:
 * @lname,
 * @email,
 * @language,
 * @reportfrequency,
 * @password
 * 
 */
exports.postSaveUserInfo = function(req, res, next) {

  var model = req.body;

  if(model.password != '' && model.password.length<= 6){

    validation         =    false;
    response.status    =    false;
    response.message   =    'Password length should be at least 7 characters';
    res.send(response);
    res.end();
  }else{

    if(model.password == ''){
      // To delete password object, since has no value
      delete model.password;
    }

    var conditions = { '_id': new ObjectId(req.user._id) }
    , update = model
    , options = { multi: false };

    User.update(conditions, update, options, function(err) {
      if(!err){

        response.status    =   true;
        response.message   =   'User details saved';
      }else{

        response.status    =   false;
        response.message   =   'Something went wrong..';
      }
      res.send(response);
      res.end();
    });
  }
};

/**
 * Save user details
 *
 * Accept :
 * @email : Email id of the manager
 * 
 */
exports.postSaveManagerInfo = function(req, res) {

  var model = req.body;

    if(model.email == '') {

        validation         =    false;
        response.status    =    false;
        response.message   =    'Invalid email id';
        res.send(response);
        res.end();
    }else {

    var conditions         =   { '_id': new ObjectId(req.user._id) }
    , update               =   { 'mymanager': [ { '_id': req.body.searchData._id, 'email': req.body.searchData.email } ]}
    , options              =   { multi: false };

    User.update(conditions, update, options, function(err) {
      if(!err){

        response.status    =   true;
        response.message   =   'User details saved';
      }else{

        response.status    =   false;
        response.message   =   'Something went wrong..';
      }
      res.send(response);
      res.end();
    });
  }
};


/**
 * Save company details
 *
 * Accept :
 * @companyname
 * @industry
 * @continent
 * @country
 * @state
 * @city
 * @address
 * @website
 * @companysize
 * 
 */
exports.postSaveCompanyInfo = function(req, res) {

  var model = req.body;

  var model = { 'company_info': [model] };

  var conditions = { '_id': new ObjectId(req.user._id) }
  , update = model
  , options = { multi: false };

  User.update(conditions, update, options, function(err) {
    if(!err){

      response.status = true;
      response.message = 'Company details saved';
    }else{

      response.status = false;
      response.message = 'Something went wrong..';
    }
    res.send(response);
    res.end();
  });
};

/**
 * Forgot password
 *
 * Accept : -  @email
 */
exports.postForgotPassword = function(req, res) {

  var email = req.body.email;
  var verifystring = email + Date.now();
  verifystring = crypto.createHash('md5').update(verifystring).digest("hex");
  var user =  new User({
    email: req.body.email,
    verifylink: verifystring
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
  if(existingUser) {
  var conditions = { email: email }
    , update = { verifylink: verifystring }
    , options = { multi: false };
    
		User.update(conditions, update, options, function(err) {
		    if(!err){

			var transporter = nodemailer.createTransport();
			transporter.sendMail({
				from: 'admin@moodewonder.com',
				to: email,
				subject: 'Reset password',
				html: "<b>Click here :</b>"+ 'http://'+req.get('host') +'/createpassword/'+verifystring
			});
				response.status = true;
				response.message = 'We have sent you an email with reset password link';
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});

    }else{
		response.status = false;
		response.message = 'Your e-mail id is not exist in our database';
		res.send(response);
		res.end();
	}
  });
};

/**
 * Find user by e-mail id
 */
exports.findUserByEmailId = function(req, res, next) {

  var user =  new User({
    email: req.body.email
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
        req.body.searchData = existingUser;
        next();
    }else{
        response.status = false;
        response.message = 'E-mail id not exist in the system';
        res.send(response);
        res.end();
    }
  });
};

/**
 * Update current user collection
 *
 * Working with next() method
 * 
 */
exports.updateUser = function(req, res) {

  if(req.user && req.body.update){

    var conditions = { '_id': req.user._id }
    , update = req.body.update
    , options = { multi: false };


    User.update(conditions, update, options, function(err) {
        if(!err){

            response.status = true;
            response.message = req.body.resmessage;
        }else{

            response.status = false;
            response.message = 'Something went wrong..';
        }
        res.send(response);
        res.end();
    });

  }else{

    response.status = false;
    response.message = 'Something went wrong..';
    res.send(response);
    res.end();
  }
};

/**
 * Get users in each team
 */
exports.usersInTeams = function(req, res) {

    var team_users_result = [];
    var teamlength = req.body.resdata.length;

    // Checking number of teams
    if(teamlength > 0){
        response.status = true;
        response.message = 'Success';

        // Looping through each team
        req.body.resdata.map(function(data, key) {

            // Taking all user ids from `member_ids` property
            var ids = [];
            data.member_ids.map(function(member, key) {
                ids[key] = member._id;
            });

            // Where condition to fetch users from `User` collection
            var where = { '_id': { $in: ids } };

            // Trying to fetch users
            User.find(where).exec(function(err, lists) {

                if(!err) {
                    // Filtering required data such as _id,full name, usertype
                    var userData = [];
                    lists.map(function(users, key) {
                        userData[key] = { '_id': users._id, 'member_name': users.firstname + ' ' + users.lastname, 'usertype': users.usertype }
                    });
                    // Assigning team name and members data into final result
                    team_users_result = team_users_result.concat([{ "_id": data._id, "name": data.teamname, "members": userData }]);
                } else {
                    // Handling error case 
                    team_users_result = team_users_result.concat([{ "_id": data._id, "name": data.teamname, "members": {} }]);
                }

                if(teamlength == (key+1)){
                    // Exiting from the Callback function
                    response.data = team_users_result;
                    res.send(response);
                    res.end();
                }
            });
        });
    }else {
        response.status = false;
        response.message = 'No teams';
        response.data = {};
    }
};

