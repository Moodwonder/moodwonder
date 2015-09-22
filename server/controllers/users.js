var express = require('express');
var _ = require('lodash');
var User = require('../models/user');
var Invite = require('../models/invite');
var Team = require('../models/team');
var Vote = require('../models/vote');
var EOTM = require('../models/employeeOfTheMonth');
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
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid email or password'});
                }
            });
        });
    }));


    // Do email and password validation for the server
    passport.authenticate('local-user', function (err, user, info) {
        console.log(user);
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
 * Get all Users
 */
exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, lists) {
        if (!err) {
            res.json(lists);
        } else {
            // console.log('Error in first query');
        }
    });
};

/**
 * Get a User
 */
exports.getUserInfo = function (req, res) {

    // console.log(req.user);
    var condition = {'_id': new ObjectId(req.user._id)};
    User.findOne(condition, function (err, lists) {
        if (!err) {
            response = {};
            response.status = true;
            response.message = 'success';
            response.data = {'fname': '', 'lname': '', 'email': '', 'language': '', 'reportfrequency': '', 'password': '', 'companyname': '', 'mymanager': '', 'industry': '', 'continent': '', 'country': '', 'state': '', 'city': '', 'address': '', 'website': '', 'companysize': ''};
            if (req.query.type == 'company') {
                if (lists.company_info[0] != undefined) {
                    response.data = lists.company_info[0];
                }

            } else {

                if (lists.mymanager[0] == undefined) {
                    lists.mymanager[0] = {'email': ''};
                }
                
                var profileimage = (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : '';
                response.data = {'fname': lists.firstname, 'lname': lists.lastname, 'email': lists.email, 'language': lists.language, 'reportfrequency': lists.report_frequency, 'password': '', 'mymanager': lists.mymanager[0].email, 'profile_image': profileimage};
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
        if (existingUser) {
            response.status = false;
            response.message = 'The email address you have entered is already registered';
            res.send(response);
            res.end();
        } else {
            user.save(function (err, newuser) {
                if (!err) {

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
                    if (req.body.hash != '') {

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
 * 
 */
exports.postSaveUserInfo = function (req, res, next) {

    var model = req.body;

    if (model.password != '' && model.password.length <= 6) {

        validation = false;
        response.status = false;
        response.message = 'Password length should be at least 7 characters';
        res.send(response);
        res.end();
    } else {

        if (model.password == '') {
            // To delete password object, since has no value
            delete model.password;
        }

        var conditions = {'_id': new ObjectId(req.user._id)}
        , update = model
                , options = {multi: false};

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

    var model = {'company_info': [model]};

    var conditions = {'_id': new ObjectId(req.user._id)}
    , update = model
            , options = {multi: false};

    User.update(conditions, update, options, function (err) {
        if (!err) {

            response.status = true;
            response.message = 'Company details saved';
        } else {

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
                    response.message = 'Please check  your email for resetting password"';
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

    var team_users_result = [];
    var teamlength = req.body.resdata.length;

    // Checking number of teams
    if (teamlength > 0) {
        response.status = true;
        response.message = 'Success';

        // Looping through each team
        req.body.resdata.map(function (data, key) {

            // Taking all user ids from `member_ids` property
            var ids = [];
            var teamid = data._id;
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

                    if (!err) {
                        // Filtering required data such as _id,full name, usertype
                        lists.map(function (invities, key) {
                            userData.push({'_id': invities._id, 'member_email': invities.email, 'member_name': 'Invited', 'usertype': 'invited'});
                        });
                        team = {"_id": data._id, "name": data.teamname, "members": userData};
                    }

                    team_users_result = team_users_result.concat(team);

                    if (teamlength == (key + 1)) {
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
                        var mytotalvotes = 0;
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
                                    mytotalvotes++;
                                }
                            }
                            var profileimage  = (data.profile_image !== '') ? PRO_PIC_PATH+data.profile_image : PRO_PIC_PATH+'no-profile-img.gif';
                            employees[key]    = { _id: data._id, photo: profileimage, name: (data.firstname+' '+data.lastname), votes: votes, myvote: myvote, empofthemonth: empofthemonth };
                        });
                        response.status = true;
                        response.message = 'success';
                        response.data = {};
                        response.data.employees = employees;
                        response.data.mytotalvotes = mytotalvotes;
                        res.send(response);
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
