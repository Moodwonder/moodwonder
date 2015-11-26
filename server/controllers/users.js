var express = require('express');
var _ = require('lodash');
var User = require('../models/user');
var Invite = require('../models/invite');
var Team = require('../models/team');
var Vote = require('../models/vote');
var EOTM = require('../models/employeeOfTheMonth');
var Company = require('../models/company');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var validations = require('../controllers/validationRules');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var path = require('path');


PRO_PIC_PATH = '/images/profilepics/';
BANNER_PIC_PATH = '/images/bannerpics/';

function dateByNumber(num) {
    // 1 for January
    num = num-1;
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    return month[num];
}

var hasValue = function(val){
    if(val !== undefined && val !== ''){
        return true;
    }else{
        return false;
    }
}

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * Encrypt password
 */
exports.encryptPassword = function (req, res, next) {

    try{
        var password = req.body.password.trim();

        if (password.length >= 6) {

            bcrypt.genSalt(5, function (err, salt) {

                if (!err) {
                    bcrypt.hash(password, salt, null, function (err, hash) {
                        if (!err) {
                            req.body.real_password = req.body.password;
                            req.body.password = hash;
                            next();
                        }
                        else {
                            // bcrypt.hash Error
                            response.status = false;
                            response.message = 'Something went wrong..';
                            res.send(response);
                            res.end();
                        }
                    });
                } else {
                    // bcrypt.genSalt Error
                    response.status = false;
                    response.message = 'Something went wrong..';
                    res.send(response);
                    res.end();
                }
            });
        } else {
            req.body.real_password = req.body.password;
            req.body.password = '';
            next();
        }
    } catch(err) {
        req.body.password = '';
        next();
    }
}

/**
 * Check login status
 */
exports.checkLogin = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
        res.end();
    }
}



/**
 * Login
 */
exports.postLogin = function (req, res, next) {
    
    passport.use('local-user', new LocalStrategy({
        usernameField: 'email'
    }, function (email, password, done) {
        User.findOne({email: email}, function (err, user) {
            if (!user)
                return done(null, false, {message: 'Email ' + email + ' not found'});
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch) {
                    // No need to send password data to the browser
                    user.password = '';
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid email or password'});
                }
            });
        });
    }));


    // Do email and password validation for the server
    passport.authenticate('local-user', function (err, user, info) {
        //console.log(user);
        if (err)
            return next(err);
        if (!user) {
            response.status = false;
            response.message = info.message;
            res.send(response);
            res.end();
            return;
        }
        // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
        req.logIn(user, function (err) {
            if (err)
                return next(err);
            response.status = true;
            response.message = 'Success! You are logged in';
            response.user = user;
            res.send(response);
            res.end();
        });
    })(req, res, next);
};


/**
 * Get all Users for admin only
 */
exports.getallusers = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var condition = {};
    if(req.body.type !== undefined && req.body.type === 'admin'){
        //condition = { 'usertype': 'admin' };
    }

    User.find(condition).exec(function (err, lists) {
        if (!err) {
            response.status = true;
            response.message = 'success';

            // formatting user data for table
            var data = {};
            data.header = ['Id','Name', 'Email', 'Type', 'Verify Status', 'Country', 'Company name', 'Company size', 'Language'];
            data.rows   = [];
            data.class = "table";
            if(lists !== null){
                lists.map(function(user, key){
                    var hasComp = (user.company_info.length > 0);
                    var Comp    = (hasComp)? user.company_info[0]:{};
                    data.rows[key] =  [
                      {
                          column: user._id,
                          display:false
                      }
                     ,{column: (user.firstname+' '+user.lastname) }
                     ,{column:user.email}
                     ,{column:user.usertype}
                     ,{column: (user.verifylink === "1") ? true : false }
                     ,{column: (hasComp && Comp.country !== undefined )? Comp.country: '' }
                     ,{column: (hasComp && Comp.companyname !== undefined )? Comp.companyname: '' }
                     ,{column: (hasComp && Comp.companysize !== undefined )? Comp.companysize: '' }
                     ,{column:user.language}
                    ];
                });
                
            }
            response.data = data;
            res.json(response);
        } else {
            res.json(response);
        }
    });
};

/**
 * Get a User
 */
exports.getUserInfo = function (req, res) {

    response.status = false;
    response.message = 'Error';

    var condition = {'_id': new ObjectId(req.user._id)};
    User.findOne(condition, function (err, lists) {
        if (!err && !null) {
            response = {};
            response.status = true;
            response.message = 'success';
            response.data = {'fname': '', 'lname': '', 'email': '', 'language': '', 'reportfrequency': '', 'password': '', 'companyname': '', 'mymanager': '', 'industry': '', 'continent': '', 'country': '', 'state': '', 'city': '', 'address': '', 'website': '', 'companysize': '', 'summary': '', 'usertype' : ''};
            if (req.query.type == 'company') {
                if (lists.company_info[0] != undefined) {
                    response.data = lists.company_info[0];
                }

            } else {

                if (lists.mymanager[0] == undefined) {
                    lists.mymanager[0] = {'email': ''};
                }
                
                var profileimage = (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : '';
                var cover_image = (lists.cover_image !== '') ? BANNER_PIC_PATH+lists.cover_image : '';
                response.data = {'fname': lists.firstname, 'lname': lists.lastname, 'email': lists.email, 'language': lists.language, 'reportfrequency': lists.report_frequency, 'password': '', 'mymanager': lists.mymanager[0].email, 'profile_image': profileimage, 'cover_image': cover_image, 'summary': lists.summary, 'usertype' : lists.usertype };
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
exports.test = function (req, res) {
    var body = "Hi,<br><br> To complete your registration and verify your email please use the following link" +
            "<br><b>Click here :</b>" + 'http://' + req.get('host') + "/createpassword/sdfdsfsdfsdfsdf" +
            "<br> Best wishes" +
            "<br> Moodwonder Team";
    body = emailTemplate.general(body);
    var transporter = nodemailer.createTransport();
    transporter.sendMail({
        from: 'admin@moodewonder.com',
        to: 'sijo.vijayan@titechnologies.in',
        subject: 'Test mail',
        html: body
    });
    res.send({});
};

/**
 * Logout
 */
exports.getLogout = function (req, res, next) {
    console.log('loggedout');
    console.log(req.user);
    req.logout();
    //req.logOut();
    req.session.destroy();
    next();
};

/**
 * First step of signup.
 *
 * Accept : -  @email
 */
exports.postSignupStep1 = function (req, res, next) {

    var response = {};
    req.body.email = req.body.email.toLowerCase();
    var email = req.body.email;
    var type = req.body.type;

    if (type == 'forgotpassword') {
        // console.log('------'+type);
        next();
        return;
    }

    var verifystring = email + Date.now();
    verifystring = crypto.createHash('md5').update(verifystring).digest("hex");
    var user = new User({
        email: req.body.email,
        verifylink: verifystring
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {

        if (existingUser !== null && existingUser) {

            response.status = false;
            response.message = 'The email address you have entered is already registered';
            res.send(response);
            res.end();
        } else {

            user.save(function (err, newuser) {
                if (!err) {

                    // Get domian name without extension
                    // 'test@example.com' converting into 'exampel'
                    var email  = req.body.email;
                    var domain = email.substring(email.lastIndexOf("@")+1);
                    domain = domain.substring(0,domain.lastIndexOf("."));
                    
                    var company = { name: domain};
                    Company.update(company,company,{upsert: true},function(err,newcompany){});
                    
                    var transporter = nodemailer.createTransport();
                    var body = "Hi,<br><br> To complete your registration and verify your email please use the following link <br>" +
                            "<b>Click here :</b>" + 'http://' + req.get('host') + '/createpassword/' + verifystring +
                            "<br><br> Best wishes" +
                            "<br> Moodwonder Team";
                    body = emailTemplate.general(body);
                    transporter.sendMail({
                        from: 'admin@moodewonder.com',
                        to: email,
                        subject: 'Create password',
                        html: body
                    });

                    response.status = true;
                    response.message = 'We have sent you an email, Please follow the instructions in the email to complete the sign up process';

                    // if 'hash' params is exist, then add this user into the a team based on the team id in the Invite collections
                    console.log('--req.body.hash----' + req.body.hash);
                    if (req.body.hash !== undefined && req.body.hash !== '') {

                        console.log('has hash');
                        var invite = new Invite({
                            email: email,
                            type: 'Team',
                            link: req.body.hash
                        });

                        Invite.findOne({email: email}, function (err, existingInvite) {
                            if (existingInvite) {

                                var team_id = existingInvite.data[0].team._id;

                                var where = {_id: new ObjectId(team_id)}
                                // console.log(member_email);
                                // check the team is exist or not
                                Team.findOne(where, function (err, existingTeam) {
                                    if (existingTeam) {

                                        // User not exist in this group, Insert this user into this team
                                        Team.update({"_id": existingTeam._id}, {$push: {member_ids: {_id: newuser._id}}}, function (err) {
                                            if (err) {
                                                response.status = false;
                                                response.messages = ['Error when adding a new member'];
                                                res.send(response);
                                                res.end();
                                            } else {
                                                // Find e-mail id of the user who invited this user
                                                User.findOne({_id: new ObjectId(existingTeam.manager_id)}, function (err, existingUser) {
                                                    if (existingUser) {
                                                        // console.log('has user');
                                                        var conditions = {'_id': new ObjectId(newuser._id)}
                                                        , update = {'mymanager': [{'_id': existingUser._id, 'email': existingUser.email}]}
                                                        , options = {multi: false};

                                                        // Set manager info
                                                        User.update(conditions, update, options, function (err) {
                                                            if (!err) {
                                                                // console.log('updated manager');
                                                            } else {
                                                                // console.log('not updated manager');
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        // console.log('has no user');
                                                    }
                                                });

                                                response.status = true;
                                                response.messages = ['Member added'];
                                                res.send(response);
                                                res.end();
                                            }
                                        });

                                    } else {
                                        response.status = false;
                                        response.messages = ['Team not exist'];
                                        res.send(response);
                                        res.end();
                                    }
                                });
                            } else {
                                response.status = true;
                                response.messages = ['Error when processing your invitation'];
                                res.send(response);
                                res.end();
                            }
                        });
                    } else {
                        res.send(response);
                        res.end();
                    }

                } else {
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
exports.postSignupStep2 = function (req, res, next) {

    var verifyString = req.body.hash.trim();
    var password = req.body.password.trim();

    if (verifyString == '') {

        response.status = false;
        response.message = 'Invalid verification link';
        res.send(response);
        res.end();
    } else if (password.length <= 6) {

        response.status = false;
        response.message = 'Password length should be at least 7 characters';
        res.send(response);
        res.end();
    } else {

        var conditions = {verifylink: verifyString}
        , update = {verifylink: 1, password: password}
        , options = {multi: false};

        /**
         * Checking the verifylink is exist in the user collections
         */
        User.findOne(conditions, function (err, document) {

            if (document) {
                User.update(conditions, update, options, function (err) {
                    if (!err) {

                        response.status = true;
                        response.message = 'Password created';
                        req.body.email = document.email;
                        req.body.password = req.body.real_password;
                        next();
                    } else {

                        response.status = false;
                        response.message = 'Something went wrong..';
                        res.send(response);
                        res.end();
                    }
                });
            } else {

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
exports.postSignUp = function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            req.flash('errors', {msg: 'Account with that email address already exists'});
        }
        user.save(function (err) {
            if (err)
                return next(err);
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
                res.end('Success');
            });
        });
    });
};


/**
 * Signup
 */
exports.postUserSignUp = function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            req.flash('errors', {msg: 'Account with that email address already exists'});
        }
        user.save(function (err) {
            if (err)
                return next(err);
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
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
 * @summary
 * 
 */
exports.postSaveUserInfo = function (req, res, next) {

    var response = {};
    var saveUserInfo = function(update){
        var conditions = {'_id': new ObjectId(req.user._id)},
        options = {multi: false};
        User.update(conditions, update, options, function (err) {
            if (!err) {

                response.status = true;
                response.message = 'User details saved';
            } else {

                response.status = false;
                response.message = 'Something went wrong..';
            }
            res.send(response);
            res.end();
        });
    }

    var model = req.body;
    console.log(model);

    if(model !== undefined && hasValue(model.type)){

        var validation = true;
        var update     = {};

        if( model.type === 'summary' ){
            var summary = model.summary;
            if(hasValue(summary)){
                response.type = 'summary';
                update = { summary: summary };
            }else{
                response.message = 'Summary cannot be empty';
            }
        }else if( model.type === 'personalinfo' ){

            var firstname =  model.fname;
            var lastname  =  model.lname;
            // password  encrypted at `encryptPassword` route
            var password  =  model.password;
            var real_pass =  model.real_password;
            var cpassword =  model.cpassword;
    
            if( hasValue(firstname) && hasValue(lastname) ){
                response.type = 'personalinfo';
                var update = { firstname: firstname, lastname: lastname };

                console.log(real_pass);
                if ( hasValue(real_pass) && hasValue(cpassword) ) {

                    if( real_pass !== cpassword ){
                        validation       =  false;
                        response.message =  'New Password and Confirm Password are not equal.';
                    }else if(real_pass.length <=6 ){
                        validation       =  false;
                        response.message = 'Password length should be at least 7 characters';
                    }else{
                        update = { firstname: firstname, lastname: lastname, password: real_pass };
                    }
                }
            }else{
                validation = false;
                response.message = 'Please fill the required fields';
            }
        }else if( model.type === 'generalinfo' ){

            var email             =  model.email;
            var report_frequency   =  model.report_frequency;
            var language          =  model.language;
    
            if( hasValue(email) && hasValue(report_frequency) && hasValue(language) ){
                response.type = 'generalinfo';
                var update = { email: email, report_frequency: report_frequency, language: language };
            }else{
                validation = false;
                response.message = 'Please fill the required fields';
            }
        }

        // If validation error
        if(validation){
            saveUserInfo(update);
        }else{
            response.status = false;
            res.send(response);
            res.end();
        }

    }else{
        response.status = false;
        response.message = 'Something went wrong..';
        res.send(response);
        res.end();
    }

};

/**
 * Update user photo
 *
 * Accept :
 * @profilephoto:
 * 
 */
exports.UpdateUserPhoto = function (req, res) {

    var ext=path.extname(req.files.profilephoto.name);
    console.log(req.files);
    console.log(typeof req.files.profilephoto);
    if(typeof req.files.profilephoto != 'undefined')
    {
        if((ext!=".jpg")&&(ext!=".png")&&(ext!=".jpeg")&&(ext!=".gif"))
        {

            response.image=false;
            res.send(response);
            res.end();
            return;
        }else{

            imagename     = new Date().getTime() +req.files.profilephoto.originalname;
            var oldPath   =   req.files.profilephoto.path;
            var newPath   =   path.join(__dirname,'..','..')+"/public/images/profilepics/" + imagename;
            var source    =   fs.createReadStream(oldPath);
            var dest      =   fs.createWriteStream(newPath);
            source.pipe(dest);
            source.on('end', function () {

                var conditions = {'_id': new ObjectId(req.user._id)}
                      ,update  = {'profile_image': imagename }
                     , options = {multi: false};

                // Set manager info
                User.update(conditions, update, options, function (err) {
                    if (!err) {
                        response.status  = true;
                        response.message = 'Profile picture updated.';
                        response.image   = PRO_PIC_PATH + imagename;
                    } else {
                        response.status  = false;
                        response.message = 'Something went wrong..';
                    }
                    res.send(response);
                    res.end();
                });
                
            });
            source.on('error', function (err) {
                response.status  = false;
                response.message = 'Something went wrong..';
                res.send(response);
                res.end();
            });
        }
    }
};

/**
 * Save user details
 *
 * Accept :
 * @email : Email id of the manager
 * 
 */
exports.postSaveManagerInfo = function (req, res) {

    var model = req.body;

    if (model.email == '') {

        validation = false;
        response.status = false;
        response.message = 'Invalid email id';
        res.send(response);
        res.end();
    } else {

        var conditions = {'_id': new ObjectId(req.user._id)}
        , update = {'mymanager': [{'_id': req.body.searchData._id, 'email': req.body.searchData.email}]}
        , options = {multi: false};

        User.update(conditions, update, options, function (err) {
            if (!err) {

                response.status = true;
                response.message = 'Manager info updated';
            } else {

                response.status = false;
                response.message = 'Something went wrong..';
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
exports.postSaveCompanyInfo = function (req, res) {

    var model = req.body;

    var response = {};
    var hasError = false;
    var messages = [];
    for (var key in model) {

      if(key === 'companyname' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Company name cannot be empty..');
      }
      if(key === 'industry' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Industry name cannot be empty');
      }
      if(key === 'continent' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Continent name cannot be empty');
      }
      if(key === 'country' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Country name cannot be empty');
      }
      if(key === 'state' && model[key].trim() === '' ){
        hasError = true;
        messages.push('State name cannot be empty');
      }
      if(key === 'city' && model[key].trim() === '' ){
        hasError = true;
        messages.push('City name cannot be empty');
      }
      if(key === 'address' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Address name cannot be empty');
      }
      if(key === 'website' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Website name cannot be empty');
      }
      if(key === 'companysize' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Companysize name cannot be empty');
      }
    }

    if(hasError){
        response.status = false;
        response.messages = messages;
        res.send(response);
        res.end();
    }else{


    var model = {'company_info': [model]};

    var conditions = {'_id': new ObjectId(req.user._id)}
    , update = model
            , options = {multi: false};

    User.update(conditions, update, options, function (err) {
        if (!err) {

            response.status = true;
            response.messages = ['Company details saved'];
        } else {

            response.status = false;
            response.messages = ['Something went wrong..'];
        }
        res.send(response);
        res.end();
    });
    }
};

/**
 * Forgot password
 *
 * Accept : -  @email
 */
exports.postForgotPassword = function (req, res) {

    var email = req.body.email;
    var verifystring = email + Date.now();
    verifystring = crypto.createHash('md5').update(verifystring).digest("hex");
    var user = new User({
        email: req.body.email,
        verifylink: verifystring
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            var conditions = {email: email}
            , update = {verifylink: verifystring}
            , options = {multi: false};

            User.update(conditions, update, options, function (err) {
                if (!err) {

                    var transporter = nodemailer.createTransport();
                    var body = "Hi,<br><br> To reset your password please use the following link <br>" +
                            "<b>Click here :</b>" + 'http://' + req.get('host') + '/createpassword/' + verifystring +
                            "<br><br> Best wishes" +
                            "<br> Moodwonder Team";
                    body = emailTemplate.general(body);

                    transporter.sendMail({
                        from: 'admin@moodewonder.com',
                        to: email,
                        subject: 'Reset password',
                        html: body
                    });
                    response.status = true;
                    response.message = 'We have sent you an email with instructions how to reset your password';
                    res.send(response);
                    res.end();
                } else {
                    res.send(response);
                    res.end();
                }
            });

        } else {
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
exports.findUserByEmailId = function (req, res, next) {

    var user = new User({
        email: req.body.email
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            req.body.searchData = existingUser;
            next();
        } else if (req.url === '/savemanagerdetails') {
            var searchData = {'_id': '0', 'email': req.body.email};
            req.body.searchData = searchData;
            next();
        } else {
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
exports.updateUser = function (req, res) {

    var callback = req.body.callback;
    var response = {};
    response.callback = callback;
    if (req.user && req.body.update) {

        var conditions = { '_id': new ObjectId(req.user._id) }
        , update = req.body.update
                , options = {multi: false};


        User.update(conditions, update, options, function (err) {
            if (!err) {

                response.status = true;
                response.message = req.body.resmessage;
            } else {

                response.status = false;
                response.message = 'Something went wrong..';
            }
            res.send(response);
            res.end();
        });

    } else {

        response.status = false;
        response.message = 'Something went wrong..';
        res.send(response);
        res.end();
    }
};

/**
 * Get users in each team
 */
exports.usersInTeams = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var team_users_result = [];
    var teamlength = req.body.resdata.length;
    //console.log(req.body.resdata);

    // Checking number of teams
    if (teamlength > 0) {
        response.status = true;
        response.message = 'Success';

        // Looping through each team
        var callBackExit = 0;

        // Looping through each team
        req.body.resdata.map(function (data, key) {

            // Taking all user ids from `member_ids` property
            var ids = [];
            var teamid = data._id;

            // looping through each members in a team
            data.member_ids.map(function (member, key) {
                ids[key] = member._id;
            });

            // Where condition to fetch users from `User` collection
            var where = {'_id': {$in: ids}};

            // Trying to fetch users
            User.find(where).exec(function (err, lists) {

                var userData = [];
                var team = {};
                if (!err) {
                    // Filtering required data such as _id,full name, usertype

                    lists.map(function (users, key) {
                        userData[key] = {'_id': users._id, 'member_email': users.email, 'member_name': users.firstname + ' ' + users.lastname, 'usertype': users.usertype}
                    });
                    // Assigning team name and members data into final result
                    team = {"_id": data._id, "name": data.teamname, "members": userData};
                } else {
                    // Handling error case 
                    team = {"_id": data._id, "name": data.teamname, "members": {}};
                }

                // Fetching user details from Invitations
                var elemMatch = {"team": teamid};
                where = {type: "Team", reference: {$elemMatch: elemMatch}};
                Invite.find(where).exec(function (err, lists) {
                    callBackExit++;
                    if (!err) {
                        // Filtering required data such as _id,full name, usertype
                        lists.map(function (invities, key) {
                            userData.push({'_id': invities._id, 'member_email': invities.email, 'member_name': 'Invited', 'usertype': 'invited'});
                        });
                        team = {"_id": data._id, "name": data.teamname, "members": userData};
                    }

                    team_users_result = team_users_result.concat(team);

                    if (teamlength == callBackExit) {
                        // Exiting from the Callback function
                        response.data = team_users_result;
                        res.send(response);
                        res.end();
                    }
                });
            });
        });
    } else {
        response.status = false;
        response.message = 'No teams';
        response.data = {};
    }
};

/**
 * Get get all employees by company name
 */
exports.getAllEmployees = function (req, res) {

    var mycompany = '';
    try {
        mycompany = req.user.company_info[0].companyname;
    } catch (ex) {
        mycompany = false;
    }

    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    var yearmonth = cdate.substring(0, 7);

    if(mycompany){
        var elmatch = { companyname: mycompany };
        User.find({ company_info: { $elemMatch: elmatch } }).exec(function (err, lists) {
            if (!err) {

                Vote.aggregate([
                    {
                        $match: {
                            postdate:
                            {
                                $regex : new RegExp(yearmonth,'i')
                            },
                            company: mycompany
                        }
                    },
                    {
                        $group : {
                            _id : "$votefor_userid",
                            total : { $sum : 1 },
                            user_ids: {
                                $push: "$user_id"
                             }
                        }
                    }
                ],
                function (err, result) {

                    var emp_meta = {};
                    if (err) {
                        console.log(err);
                    }else{
                        result.map(function (data, key) {
                            emp_meta[data._id] = data;
                        });
                    }

                    EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company: mycompany }, function(err, emp){

                        var employees = [];
                        // var mytotalvotes = 0;
                        lists.map(function (data, key) {

                            var votes         =   0;
                            var myvote        =   false;
                            var empofthemonth =   false;
                            if(emp_meta[data._id] !== undefined){
                                var cemp      =   emp_meta[data._id];
                                var userids   =   emp_meta[data._id].user_ids;
                                var user_ids  =   [];

                                // set employee of the month status
                                try {
                                    if(emp.emp_id === data._id){
                                        empofthemonth =   true;
                                    }
                                } catch (ex) {}
                                userids.map(function (id, key) { user_ids[key] = id.toString(); });
                                votes         =  cemp.total;
                                if((user_ids.indexOf(req.user._id.toString())) !== -1 ){
                                    myvote    =  true;
                                    // mytotalvotes++;
                                }
                            }
                            var profileimage  = (data.profile_image !== '') ? PRO_PIC_PATH+data.profile_image : PRO_PIC_PATH+'no-profile-img.gif';
                            employees[key]    = { _id: data._id, photo: profileimage, name: (data.firstname+' '+data.lastname), votes: votes, myvote: myvote, empofthemonth: empofthemonth };
                        });

                        // Current user - my voting status
                        Vote.find({ postdate: { $regex : new RegExp(yearmonth,'i') }, user_id: new ObjectId(req.user._id) }, function(err, votes){

                            var mytotalvotes = 0;
                            console.log(votes);
                            if(!err && votes !== null){
                                votes.map(function (data, key) {
                                    mytotalvotes++;
                                });
                            }
                            console.log(mytotalvotes);

                            response.status = true;
                            response.message = 'success';
                            response.data = {};
                            response.data.employees = employees;
                            response.data.mytotalvotes = mytotalvotes;
                            res.send(response);
                        });
                        

                    });
                }
            );

            } else {
                response.status = false;
                response.message = 'Something went wrong';
                response.data = employees;
                res.send(response);
            }
        });
    }else{
        response.status = false;
        response.message = 'Please select your company first.';
        res.send(response);
    }
};

/**
 * Get get all employees by company name
 */
exports.isAdmin = function (req, res, next) {
    if(req.user.usertype === 'admin'){
        // redirect to next route
        next();
    }else{
        response.status = false;
        response.message = "You need administrator permission to perform this action.";
        res.send(response);
    }

};

/**
 * Wanning !!!!!! : Cron job function
 *
 * Function to loop through all employees in the users collection and sending e-mail
 * with `employee of the month` statistics , showing how many votes he got and who got the most votes in the company
 *
 * Send employee of the month statistics
 */
exports.sendEOTMstats = function (req, res) {

};

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '10 30 06 22 * 1-5',
  onTick: function() {

    var transporter = nodemailer.createTransport();
    function company(mycompany,EOTMdate){
        var elmatch = { companyname: mycompany };
        User.find({ company_info: { $elemMatch: elmatch } }).exec(function (err, lists) {
            if (!err) {

                Vote.aggregate([
                    {
                        $match: {
                            postdate:
                            {
                                $regex : new RegExp(EOTMdate,'i')
                            },
                            company: mycompany
                        }
                    },
                    {
                        $group : {
                            _id : "$votefor_userid",
                            total : { $sum : 1 },
                            user_ids: {
                                $push: "$user_id"
                             }
                        }
                    }
                ],
                function (err, result) {
                    var emp_meta = {};
                    if (err) {
                        console.log(err);
                    }else{
                        result.map(function (data, key) {
                            emp_meta[data._id] = data;
                        });
                    }

                    EOTM.findOne({ date: { $regex : new RegExp(EOTMdate,'i') }, company: mycompany }, function(err, emp){
                        var mailDate = [];
                        lists.map(function (data, key) {

                            var empofthemonth =   false;
                            if(emp !== null){
                                empofthemonth =   emp.emp_details[0].firstname +' '+emp.emp_details[0].lastname;
                            }
                            var votes         =   0;
                            if(emp_meta[data._id] !== undefined){
                                var cemp      =   emp_meta[data._id];
                                var userids   =   emp_meta[data._id].user_ids;
                                var user_ids  =   [];
                                userids.map(function (id, key) { user_ids[key] = id.toString(); });
                                votes         =  cemp.total;
                            }
                            mailDate[key]  = { _id: data._id, email: data.email,name: (data.firstname+' '+data.lastname), votes: votes, empofthemonth: empofthemonth };
                        });


                        var monthNum  =  EOTMdate.split("-");
                        monthNum      =  monthNum[1];
                        mailDate.map(function (data, key) {
                            var body = "Hi there,<br><br> Vote summary <br>" +
                                    "<b> "+data.name+"</b> is the Employee of the Month for <b>"+dateByNumber(monthNum)+"</b>"+
                                    "<br>"+
                                    "<br>Number of votes you got : <b>"+data.votes+"</b>"+
                                    "<br><br> Best wishes" +
                                    "<br> Moodwonder Team";
                            body = emailTemplate.general(body);
                            transporter.sendMail({
                                from: 'admin@moodewonder.com',
                                to: data.email,
                                subject: 'Vote Summary',
                                html: body
                            });
                        });

                    });
                });

            } else {
                console.log('Cron job error');
            }
        });
    }

    User.aggregate(
    [
      { $group : { _id : "$_id", comp : { $first : "$company_info" } } },
      { $group : { _id : "$comp.companyname" } }
    ],
    function (err, lists) {
        var d = new Date();
        // It will return previous month number
        // Since it is start from 0
        var m = d.getMonth();
        var y = d.getFullYear();
        m = (m < 10) ? ("0" + m) : m;
        var ym = y+'-'+m;
        if (!err) {
            var totalCompanies = lists.length;
            var i = 0;
            lists.map(function (data, key) {
                i++;
                if(data._id[0]!==undefined && data._id[0]!==''){
                    //console.log(data._id[0] +'====='+ ym);
                    company(data._id[0],ym);
                }
            });
            if(totalCompanies === i){
                console.log('Cron job completed');
            }
        } else {
            console.log('Cron job error');
            console.log(err);
        }
    });
  },
  start: true
});
job.start();

/**
 * Get a User By Id
 */
exports.getUserInfoById = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    var _id = req.body._id;
    if( _id !== undefined && _id !== ''){
        var condition = {'_id': new ObjectId(_id)};
        User.findOne(condition, function (err, lists) {
            if (!err && !null) {
                response = {};
                response.status = true;
                response.message = 'success';
                response.data = {'fname': '', 'lname': '', 'email': '', 'language': '', 'reportfrequency': '', 'password': '', 'companyname': '', 'mymanager': '', 'industry': '', 'continent': '', 'country': '', 'state': '', 'city': '', 'address': '', 'website': '', 'companysize': '', 'userstatus': false };
                if (req.query.type == 'company') {
                    if (lists.company_info[0] != undefined) {
                        response.data = lists.company_info[0];
                    }

                } else {

                    if (lists.mymanager[0] == undefined) {
                        lists.mymanager[0] = {'email': ''};
                    }
                    
                    var profileimage = (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : '';
                    response.data = {'fname': lists.firstname, 'lname': lists.lastname, 'email': lists.email, 'language': lists.language, 'reportfrequency': lists.report_frequency, 'password': '', 'mymanager': lists.mymanager[0].email, 'profile_image': profileimage, 'userstatus': lists.userstatus };
                }
                res.json(response);
            } else {
                res.json(response);
            }
        });
    }else{
        response.message = 'Invalid user Id';
        res.json(response);
    }
};

/**
 * Get a User Details By Id
 */
exports.updateUserByAdmin = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Unknown error';
    //console.log(req.body);

    var model = req.body;
    var hasBody = (req.body !== undefined);
    var hasUserId = ( hasBody && model._id !== undefined && model._id !== '' );

    if( hasBody && hasUserId){
        var updateQuery = {};
        var conditionQuery = { _id : new ObjectId(model._id) };
        var options = { multi: false };
        if(model.userstatus !== undefined){
            updateQuery.userstatus = (model.userstatus) ? 'Active':'Inactive';
        }else if(model.usertype !== undefined){
            updateQuery.usertype = (model.usertype) ? 'admin':'user';
        }
        console.log((model.usertype));
        console.log(model.usertype);

        User.update(conditionQuery, updateQuery, options, function (err) {

            if (!err) {

                response.status = true;
                response.message = 'User details updated..';
            } else {

                response.status = false;
                response.message = 'Something went wrong..';
            }
            res.send(response);
            res.end();
        });

    }else{
        res.json(response);
    }

};

/**
 * Get list of all companies
**/
exports.getAllCompanies = function(req, res){

    var response = {};
    response.status = false;
    response.message = 'Error';
    //console.log(req.body);
    Company.find({}).exec(function(err, doc){
        if(!err){
            response.status  = true;
            response.message = 'success';
            response.data    = doc;
            res.json(response);
        }else{
            res.json(response);
        }
    });
};

/**
* Get TeamsByCompany
* This function currently not using, But don't delete this
**/
exports.getTeamsByCompany = function(req, res){

    var companyTeams = [];
    var companyTeamsLength = 0;
    var teamIndex = 0;
    function usersInTeams(Teamlist,name){

        var team_users_result = [];
        var teamlength = Teamlist.length;
        //console.log(lists);

        // Checking number of teams
        if (teamlength > 0) {
            response.status = true;
            response.message = 'Success';

            // Looping through each team
            var callBackExit = 0;

            // Looping through each team
            Teamlist.map(function (data, key) {

                console.log('Team '+data.teamname);
                // Taking all user ids from `member_ids` property
                var ids = [];
                var teamid = data._id;

                // looping through each members in a team
                data.member_ids.map(function (member, key) {
                    ids[key] = member._id;
                });

                // Where condition to fetch users from `User` collection
                var where = {'_id': {$in: ids}};

                // Trying to fetch users
                User.find(where).exec(function (err, lists) {

                    var userData = [];
                    var team = {};
                    if (!err) {
                        // Filtering required data such as _id,full name, usertype

                        lists.map(function (users, key) {
                            userData[key] = {'_id': users._id, 'member_email': users.email, 'member_name': users.firstname + ' ' + users.lastname, 'usertype': users.usertype}
                        });
                        // Assigning team name and members data into final result
                        team = {"_id": data._id, "name": data.teamname, "members": userData};
                    } else {
                        // Handling error case 
                        team = {"_id": data._id, "name": data.teamname, "members": {}};
                    }

                    // Fetching user details from Invitations
                    var elemMatch = {"team": teamid};
                    where = {type: "Team", reference: {$elemMatch: elemMatch}};
                    Invite.find(where).exec(function (err, lists) {
                        callBackExit++;
                        if (!err) {
                            // Filtering required data such as _id,full name, usertype
                            lists.map(function (invities, key) {
                                userData.push({'_id': invities._id, 'member_email': invities.email, 'member_name': 'Invited', 'usertype': 'invited'});
                            });
                            team = {"_id": data._id, "name": data.teamname, "members": userData};
                        }

                        team_users_result = team_users_result.concat(team);

                        if (teamlength == callBackExit) {
                            // Exiting from the Callback function
                            companyTeams[teamIndex] = { name: name, teams: team_users_result };
                            teamIndex++;
                            console.log('companyTeamsLength'+companyTeamsLength);
                            console.log('companyTeams teamlength'+teamlength);
                            console.log(companyTeams);
                        }
                        if (companyTeamsLength == teamIndex) {
                            response.status = true;
                            response.message = 'success';
                            response.data = companyTeams;
                            console.log(companyTeams);
                            res.send(response);
                            res.end();
                        }
                        
                    });
                });
            });
        } else {
            response.status = false;
            response.message = 'No teams';
            response.data = {};
        }
    }

    function getTeamByManagerId(_id,name){
        var where = { manager_id: new ObjectId(_id) };
        Team.find(where).exec(function(err, lists) {
            if(!err) {
                // console.log(lists);
                usersInTeams(lists,name);
            }
        });
    }

    var response = {};
    response.status = false;
    response.message = 'Error';
    
    var companyname = req.body.companyname;
    var where = { usertype : "manager" };

    User.find(where).exec(function(err, lists) {
        if(!err) {

            console.log(lists);
            lists.map(function(data, key){
                companyTeamsLength = lists.length;
                // get teams by manager id
                getTeamByManagerId(data._id,(data.firstname+' '+data.lastname));
            });

        } else {
            response.status   = false;
            response.message  = 'Something went wrong..';
            res.send(response);
            res.end();
        }
    });
};

/**
* Get all teams from a company
**/
exports.getAllTeamsFromCompany = function(req, res){

    var response = {};
    response.status = false;
    response.message = 'Error';

    var numberOfManagers = 0;
    var ManagersCounter = 0;
    var companyTeamsIndex = 0;
    var teamData = {};
    teamData.header = ['Id','Team Names', ''];
    teamData.rows   = [];
    
    function getTeamByManagerId(_id,name){
        var where = { manager_id: new ObjectId(_id) };
        Team.find(where).exec(function(err, lists) {
            if(!err) {
                lists.map(function(data, key){
                    var currentRow = [];
                    currentRow[0] = { column: data._id, display : false  };
                    currentRow[1] = { column: data.teamname  };
                    currentRow[2] = { column: 'Show team members', popup: true  };
                    teamData.rows[companyTeamsIndex] = currentRow;
                    companyTeamsIndex++;
                });

                ManagersCounter++;
                if(numberOfManagers == ManagersCounter){
                    response.status   = true;
                    response.message  = 'success';
                    response.data     = teamData;
                    res.send(response);
                    res.end();
                }
            }
        });
    }

    var companyname = req.body.companyname;
    var where = { usertype : "manager" };

    User.find(where).exec(function(err, lists) {
        if(!err) {

            numberOfManagers = lists.length;
            lists.map(function(data, key){
                // get teams by manager id
                getTeamByManagerId(data._id);
            });

        } else {
            response.status   = false;
            response.message  = 'Something went wrong..';
            res.send(response);
            res.end();
        }
    });
};

/**
* Get All Teams Members By _id
**/
exports.getAllTeamsMembers = function(req, res, next){

    var response = {};
    response.status = false;
    response.message = 'Error';

    var _id = req.body._id;
    if(_id !== undefined && _id !== ''){

        // get team members _id from Teams collection
        var where = { _id: new ObjectId(_id) };
        Team.find(where).exec(function(err, lists){
            if(!err){
                // console.log(lists);
                req.body.resdata = lists;
                next();
            }else{
                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }
};

/**
*  search Team By key word
**/

exports.searchTeam = function (req, res){
    var response = {};
    response.status = false;
    response.message = 'Error';

    var joinCompany = function(list){
        var teamCounter = 0;
        var data = {};
        data.header = ['Id','Company name', 'Team name', ''];
        data.rows   = [];
        data.class = "table";
        list.map(function(team, key){

            Company.findOne({ _id: new ObjectId(team.company_id)}).exec(function(err, company){

                var companyname = 'No company name';
                if(!err && company !== null){
                    companyname = company.name;
                }
                data.rows[key] = [
                    { column: team._id, display : false },
                    { column: companyname},
                    { column: team.teamname},
                    { column: 'Show team members', popup: true  }
                 ];
                 teamCounter++;

                // Exit condition
                if(list.length === teamCounter){
                    response.status = true;
                    response.message = 'Success';
                    response.data = data;
                    res.send(response);
                    res.end();
                }
            });

        });
    }

    var teamname = req.body.teamname;
    if(teamname !== undefined && teamname !== ''){
        Team.find({ teamname: { $regex : new RegExp(teamname,'i') } }).exec(function(err, list){
            if(!err){
                // join company name
                // console.log(list);
                if(list.length >0){
                    joinCompany(list);
                }else{
                    response.status = false;
                    response.message = 'No result';
                    res.send(response);
                    res.end();
                }
            }else{
                res.send(response);
                res.end();
            }
        });
    }else{
        response.message = 'Please enter a team name';
        res.send(response);
        res.end();
    }
}

/**
 * Update user profile banner
 *
 * Accept :
 * @bannerimage:
 * 
 */
exports.UpdateProfileBanner = function (req, res) {

    var ext=path.extname(req.files.bannerimage.name);
    if(typeof req.files.bannerimage != 'undefined')
    {
        if((ext!=".jpg")&&(ext!=".png")&&(ext!=".jpeg")&&(ext!=".gif"))
        {

            response.image=false;
            res.send(response);
            res.end();
            return;
        }else{

            imagename     = new Date().getTime() +req.files.bannerimage.originalname;
            var oldPath   =   req.files.bannerimage.path;
            var newPath   =   path.join(__dirname,'..','..')+"/public/images/bannerpics/" + imagename;
            var source    =   fs.createReadStream(oldPath);
            var dest      =   fs.createWriteStream(newPath);
            source.pipe(dest);
            source.on('end', function () {

                var conditions = {'_id': new ObjectId(req.user._id)}
                      ,update  = {'cover_image': imagename }
                     , options = {multi: false};

                // Set manager info
                User.update(conditions, update, options, function (err) {
                    if (!err) {
                        response.status  = true;
                        response.message = 'Banner image updated.';
                        response.image   = BANNER_PIC_PATH + imagename;
                    } else {
                        response.status  = false;
                        response.message = 'Something went wrong..';
                    }
                    res.send(response);
                    res.end();
                });
                
            });
            source.on('error', function (err) {
                response.status  = false;
                response.message = 'Something went wrong..';
                res.send(response);
                res.end();
            });
        }
    }
};

function isValid(id) {

    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if(id == null) return false;

    if(typeof id == 'number')
        return true;
    if(typeof id == 'string') {
        return id.length == 12 || (id.length == 24 && checkForHexRegExp.test(id));
    }
    return false;
};

/**
 * Get get all employees by company name
 */
exports.getAllEmployeesInCompany = function (req, res) {

    var response = {};
    var mycompany = '';
    var last_id = req.body.last_id;
    var keyword = req.body.keyword;
    var limit = 2;
    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    var yearmonth = cdate.substring(0, 7);

    try {
        mycompany = req.user.company_info[0].companyname;
    } catch (ex) {
        mycompany = false;
    }

    if(mycompany){

        var elmatch = { companyname: mycompany };
        var condition = { company_info: { "$elemMatch": elmatch } };
        
        if(isValid(last_id)){
            condition._id = { "$gt": new ObjectId(last_id) };
        }
        if(keyword !== undefined && keyword.trim() !== ''){
            condition.$or =  [ { firstname: new RegExp(keyword,'i') }, { lastname: new RegExp(keyword,'i') } ];
        }
        // console.log(condition);
        
        User.find(condition).limit(limit).sort({_id: 1}).exec(function (err, lists) {
            if (!err) {
                Vote.aggregate([
                    {
                        $match: {
                            postdate:
                            {
                                $regex : new RegExp(yearmonth,'i')
                            },
                            company: mycompany
                        }
                    },
                    {
                        $group : {
                            _id : "$votefor_userid",
                            total : { $sum : 1 },
                            user_ids: {
                                $push: "$user_id"
                             }
                        }
                    }
                ],
                function (err, result) {

                    var emp_meta = {};
                    if (err) {
                        console.log(err);
                    }else{
                        result.map(function (data, key) {
                            emp_meta[data._id] = data;
                        });
                    }

                    EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company: mycompany }, function(err, emp){

                        var employees = [];
                        // var mytotalvotes = 0;
                        lists.map(function (data, key) {

                            var votes         =   0;
                            var myvote        =   false;
                            var empofthemonth =   false;
                            if(emp_meta[data._id] !== undefined){
                                var cemp      =   emp_meta[data._id];
                                var userids   =   emp_meta[data._id].user_ids;
                                var user_ids  =   [];

                                // set employee of the month status
                                try {
                                    if(emp.emp_id === data._id){
                                        empofthemonth =   true;
                                    }
                                } catch (ex) {}
                                userids.map(function (id, key) { user_ids[key] = id.toString(); });
                                votes         =  cemp.total;
                                if((user_ids.indexOf(req.user._id.toString())) !== -1 ){
                                    myvote    =  true;
                                    // mytotalvotes++;
                                }
                            }
                            var profileimage  = (data.profile_image !== '') ? PRO_PIC_PATH+data.profile_image : PRO_PIC_PATH+'no-profile-img.gif';
                            employees[key]    = { _id: data._id, photo: profileimage, name: (data.firstname+' '+data.lastname), votes: votes, myvote: myvote, empofthemonth: empofthemonth };
                        });


                        // Current user - my voting status
                        Vote.find({ postdate: { $regex : new RegExp(yearmonth,'i') }, user_id: new ObjectId(req.user._id) }, function(err, votes){

                            var mytotalvotes = 0;
                            if(!err && votes !== null){
                                votes.map(function (data, key) {
                                    mytotalvotes++;
                                });
                            }

                            response.status = true;
                            response.message = 'success';
                            response.data = {};
                            response.data.employees = employees;
                            response.data.mytotalvotes = mytotalvotes;
                            res.send(response);
                        });
                    });
                });
            }else{
                response.status = false;
                response.message = 'Something went wrong';
                response.data = [];
                res.send(response);
            }
        });
    }else{
        response.status = false;
        response.message = 'Please select your company first.';
        res.send(response);
    }
};

/**
 * Get public profile details
 * 
 **/
exports.getPublicProfile = function (req, res, next) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

    var existCondition = function(){
        if(response.data.teams !== undefined && response.data.manager !== undefined && response.data.vote !== undefined && response.data.currentuservotes !== undefined && response.data.currentusereom !== undefined){
            req.body.response = response;
            next();
        }
    }

    var ordinalSuffix = function(d) {
      if(d>3 && d<21) return 'TH';
      switch (d % 10) {
            case 1:  return "ST";
            case 2:  return "ND";
            case 3:  return "RD";
            default: return "TH";
        }
    }

    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    var yearmonth = cdate.substring(0, 7);

    var _id = req.params.hash;
    if( _id !== undefined && _id !== ''){
        var condition = {'_id': new ObjectId(_id)};
        User.findOne(condition, function (err, lists) {
            if (!err && !null) {
                response = {};
                response.status = true;
                response.message = 'success';
                lists.password = '';
                lists.cover_image = (lists.cover_image !== '') ? BANNER_PIC_PATH+lists.cover_image : BANNER_PIC_PATH+'nocover.jpg';
                lists.profile_image = (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : PRO_PIC_PATH+'no-profile-img.gif';
                response.data = {};
                response.data.profile = lists;

                // get all teams created by this user
                var where = { manager_id: new ObjectId(_id) };
                Team.find(where).exec(function(err, lists) {
                    if(!err) {
                        // console.log(lists);
                        response.data.teams = {
                            status: true,
                            message: "success",
                            data: lists
                        };
                    } else {
                        response.data.teams = {
                            status: false,
                            message: "something went wrong..",
                            data: []
                        };
                    }
                    existCondition();
                });

                // get manager's name of this user
                if(req.user !== undefined && req.user.mymanager !== undefined && req.user.mymanager[0] !== undefined &&  req.user.mymanager[0].email !== undefined)
                {
                    var where = { email: req.user.mymanager[0].email };
                    User.findOne(where).exec(function(err, lists) {
                        if(!err) {
                            // console.log(lists);
                            var propic =  (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : PRO_PIC_PATH+'no-profile-img.gif';
                            response.data.manager = {
                                status: true,
                                message: "success",
                                data: { _id: lists._id, name: lists.firstname+' '+lists.lastname, propic: propic }
                            };
                        } else {
                            response.data.manager = {
                                status: false,
                                message: "something went wrong..",
                                data: []
                            };
                        }
                        existCondition();
                    });
                }else{
                    // if no email is set as the my manager
                    response.data.manager = {
                        status: false,
                        message: "Manager not defined..",
                        data: []
                    };
                    existCondition();
                }

                // Current user - my voting status
                Vote.find({ postdate: { $regex : new RegExp(yearmonth,'i') }, user_id: new ObjectId(req.user._id) }, function(err, votes){

                    var mytotalvotes = 0;
                    var myvote       =   false;
                    response.data.vote = {
                        mytotalvotes: mytotalvotes,
                        myvote: myvote
                    };
                    if(!err && votes !== null){
                        votes.map(function (data, key) {
                            mytotalvotes++;
                            // console.log(_id.toString());
                            // console.log(data.votefor_userid);

                            if((data.votefor_userid.toString().indexOf(_id.toString())) !== -1 ){
                                myvote = true;
                            }
                        });
                        response.data.vote = {
                            mytotalvotes: mytotalvotes,
                            myvote: myvote
                        };
                    }
                    existCondition();
                });

                // Current user total votes
                Vote.find({ postdate: { $regex : new RegExp(yearmonth,'i') }, votefor_userid: new ObjectId(_id) }, function(err, votes){

                    response.data.currentuservotes = 0;
                    if(!err && votes !== null){
                        votes.map(function (data, key) {
                            response.data.currentuservotes++;
                        });
                    }
                    existCondition();
                });

                // Current user employee of the month status
                EOTM.find({ emp_id: new ObjectId(_id) }, function(err, eoms){

                    response.data.currentusereom = '';
                    var currentusereom = 0;
                    if(!err && eoms !== null){
                        eoms.map(function (data, key) {
                            currentusereom++;
                        });
                        if(currentusereom > 0){
                            response.data.currentusereom = currentusereom + ordinalSuffix(currentusereom);
                        }
                    }
                    existCondition();
                });


            } else {
                req.body.response = response;
                next();
            }
        });
    }else{
        response.message = 'Invalid user Id';
        req.body.response = response;
        next();
    }
};
