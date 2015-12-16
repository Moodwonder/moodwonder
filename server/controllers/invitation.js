var _ = require('lodash');
var Team = require('../models/team');
var User = require('../models/user');
var Invite = require('../models/invite');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var validations = require('../controllers/validationRules');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * Invite a user
 *
 * Accept : -  @teamname
 */
exports.sendInvitation = function(req, res, next) {

    var type         =    req.body.invitetype;
    var data         =    req.body.data;
    var emails       =    [];
    var feedback     =    ( typeof req.body.data !== 'undefined' ) ? req.body.data.feedback : [];
    var total_emails =    0;
    var response     =    {};

    if(req.body.type){
        response.type = req.body.type;
    }
    //function for exiting from the callback function
    function checkExitCondition(key){
        if(total_emails == (key+1)){
            response.status = true;
            response.message = '';
            response.messages = feedback;
            response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
            res.send(response);
            res.end();
        }
    }

    if(data !== undefined){
        emails    =     data.email;
    }


    if( type == 'Team' ) {
        total_emails = emails.length;
        emails.map(function(email, key) {
            var inviteString = email + Date.now();
            inviteString = crypto.createHash('md5').update(inviteString).digest("hex");

            // reference is used to check this invitation is already sent or not
            var reference = {};
            if( data !== undefined && data.team !== undefined && data.team._id !== undefined ) {
                reference = { "team": data.team._id, "manager_id": data.team.manager_id, "email": email };
            }
            
            var invite =  new Invite({
            email: email,
            type: type,
            link: inviteString,
            reference: reference,
            data: data
            });

            var where = { email: email, type : "Team", reference: { $elemMatch: reference } };
            Invite.findOne(where, function(err, existingInvite) {
                if(existingInvite) {
                    feedback.push(email+': Waiting to accept invitation');
                    // Exiting from the Callback function
                    checkExitCondition(key);
                }else{
                    invite.save(function(err) {
                        if(!err){
                            var transporter = nodemailer.createTransport();
                            var body = "Hi,<br><br> Welcome to moodwonder. <br>"+
                            "<b>Click here to join :</b>"+ 'http://'+req.get('host') +'/invitesignup/'+inviteString+
                            "<br><br> Best wishes"+
                            "<br> Moodwonder Team";
                            body = emailTemplate.general(body);
                            transporter.sendMail({
                                from: 'admin@moodewonder.com',
                                to: email,
                                subject: 'Moodwonder invitation',
                                html: body
                            });
                            feedback.push('Invitation sent successfully');
                        }else{
                            feedback.push('Error with :'+current_member_email);
                        }
                        // Exiting from the Callback function
                        checkExitCondition(key);
                    });
                }
            });
        });
    }else if( type == 'Signup' ) {

        email = req.body.email;
        var inviteString = email + Date.now();
        inviteString = crypto.createHash('md5').update(inviteString).digest("hex");

        // reference is used to check this invitation is already sent or not
        var reference = { "invitedby": req.user.email, "email": req.body.email };
        
        var invite =  new Invite({
        email: email,
        type: type,
        link: inviteString,
        reference: reference
        });

        var where = { email: email };
        User.findOne(where, function(err, existingUser) {
            if(existingUser) {
                response.status = false;
                response.message = 'The email address you have entered is already registered';
                res.send(response);
                res.end();
                return;
            }else{
                where = { email: email, type : type, reference: { $elemMatch: reference } };
                Invite.findOne(where, function(err, existingInvite) {
                    if(existingInvite) {
                        response.status = false;
                        response.message = 'Waiting to accept invitation';
                        res.send(response);
                        res.end();
                    }else{
                        invite.save(function(err) {
                            if(!err){

                                var transporter = nodemailer.createTransport();
                                var body = "Hi,<br><br> Welcome to moodwonder. <br>"+
                                "<b>Click here to join :</b>"+ 'http://'+req.get('host') +'/invitesignup/'+inviteString+
                                "<br><br> Best wishes"+
                                "<br> Moodwonder Team";
                                body = emailTemplate.general(body);
                                transporter.sendMail({
                                    from: 'admin@moodewonder.com',
                                    to: email,
                                    subject: 'Moodwonder invitation',
                                    html: body
                                });
                                response.status = true;
                                response.message = 'Invitation sent successfully';
                                res.send(response);
                                res.end();
                            }else{
                                res.send(response);
                                res.end();
                            }
                        });
                    }
                });
            }
        });

    }else{
        response.status = false;
        response.message = 'Something went wrong';
        res.send(response);
        res.end();
    }

};

/**
 * Remove invitation
 *
 * Accept : -  @member_id
 */
exports.removeInvitation = function(req, res, next) {
    var invitationId = req.body.member_id;
    invitationId = new ObjectId(invitationId);
    Invite.remove({_id: invitationId}, function (err) {
        if(err){
            response.status = false;
            response.message = "Something went wrong";
            res.send(response);
            res.end();
        }else{
            response.status = true;
            response.message = "Invitation removed";
            res.send(response);
            res.end();
        }
    });
};


/**
 * Handle signup page GET request 
 * Pass e-mail id to the react component if there is a valid url of invitation
 * 
 */
exports.handleSignup = function(req, res, next) {

  var hash = req.params.hash;

  var where = { link: hash }
  console.log(where);

  // check the link is exist or not
  Invite.findOne(where, function(err, record) {
    if(record) {
        req.body.inviteEmail = record.email;
        // going to * route handler
        next();
    }else{
        // going to * route handler
        next();
    }
  });

};

/**
 * Handle signup invitation
 * 
 */
exports.inviteSignup = function(req, res, next) {

    var email = req.body.email;
    if(!err){

        var transporter = nodemailer.createTransport();
        var body = "Hi,<br><br> Welcome to moodwonder. <br>"+
        "<b>Click here to join :</b>"+ 'http://'+req.get('host') +'/invitesignup/'+inviteString+
        "<br><br> Best wishes"+
        "<br> Moodwonder Team";

        body = emailTemplate.general(body);

        transporter.sendMail({
            from: 'admin@moodewonder.com',
            to: email,
            subject: 'Moodwonder invitation',
            html: body
        }, function(error, info){
            if(error){
                // Error handling
            }
        });

        response.status = true;
        response.message = 'Invitation sent successfully';
        res.send(response);
        res.end();
    }else{
        res.send(response);
        res.end();
    }
};
