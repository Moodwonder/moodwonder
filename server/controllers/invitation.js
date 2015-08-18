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

	var type = req.body.invitetype;

	var data = req.body.data;
	var email = data.email;

	if( type == 'Team' ) {
		var inviteString = email + Date.now();
		inviteString = crypto.createHash('md5').update(inviteString).digest("hex");
		var invite =  new Invite({
		email: email,
		type: type,
		link: inviteString,
		data: data
		});

		Invite.findOne({email: email}, function(err, existingInvite) {
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
					"<b>Click here to join :</b>"+ 'http://'+req.get('host') +'/signup/'+inviteString+
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
					response.message = 'Invitation sent';
					res.send(response);
					res.end();
				}else{
					res.send(response);
					res.end();
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
 * Create new team
 *
 * Accept : -  @teamname
 */
exports.createTeam = function(req, res, next) {

  var teamname = req.body.teamname;
  
  var team =  new Team({
      teamname: teamname,
      manager_id: new ObjectId(req.user._id)
  });

  team.save(function(err) {
      if(!err){

          req.body.update  = { 'usertype': 'manager'};
          req.body.resmessage  = 'Team created';
          next();
      }else{

          console.log(err);
          response.status   = false;
          response.message  = 'Something went wrong..';
          res.send(response);
          res.end();
      }
  });
};

/**
 * get my teams
 *
 */
exports.getMyTeams = function(req, res, next) {

  var where = { manager_id: new ObjectId(req.user._id) };

  Team.find(where).exec(function(err, lists) {
    if(!err) {
        //console.log(lists);
        req.body.resdata = lists;
        next();
    } else {
        response.status   = false;
        response.message  = 'Something went wrong..';
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


