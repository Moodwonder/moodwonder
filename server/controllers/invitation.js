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
		email: req.body.email,
		type: type,
		link: inviteString,
		data: data
		});

		Invite.findOne({email: email}, function(err, existingInvite) {
		if(existingInvite) {
			response.status = false;
			response.message = 'Invitation already sent';
			res.send(response);
			res.end();
		}else{
			invite.save(function(err) {
				if(!err){

					var transporter = nodemailer.createTransport();
					transporter.sendMail({
						from: 'admin@moodewonder.com',
						to: email,
						subject: 'Moodwonder invitation',
						html: "<b>Click here to join :</b>"+ 'http://'+req.get('host') +'/signup/'+inviteString
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
 * get my teams
 *
 */
exports.addMemberToTeam = function(req, res, next) {

  var membername = req.body.membername;
  // Making e-mail id using membername

  var domainname = req.user.company_info[0].website;
  domainname = domainname.replace("http://www.", '');
  domainname = domainname.replace("http://", '');
  domainname = domainname.replace("https://www.", '');
  domainname = domainname.replace("https://", '');
  domainname = '@'+domainname;
  
  var member_email = membername+domainname;

  if(member_email == req.user.email) {
      response.status = false;
      response.message = 'You are the team leader';
      res.send(response);
      res.end();
  }

  var team_id = req.body.team_id;

  var where = { _id: new ObjectId(team_id) }
  // console.log(member_email);
  // check the team is exist or not
  Team.findOne(where, function(err, existingTeam) {
    if(existingTeam) {

		  // check the user is exist or not
		  User.findOne({email: member_email }, function(err, existingUser) {
			if(existingUser) {
				
				// check the member already exist in the group
				var where_mem_exist = { _id: existingTeam._id, member_ids: { $elemMatch: { _id: existingUser._id } } };
				// console.log(where);

				Team.findOne(where_mem_exist, function(err, existingMember) {
				if(existingMember) {
					
					response.status = true;
					response.message = "This user is already exist in the team";
					res.send(response);
					res.end();
				}else{
					// User not exist in this group, Insert this user into this team
					Team.update({ "_id" : existingTeam._id },{$push: {member_ids: { _id: existingUser._id }}},function(err){
						if(err){
							response.status = false;
							response.message = "Something went wrong";
							res.send(response);
							res.end();
						}else{
							response.status = true;
							response.message = "Member added";
							res.send(response);
							res.end();
						}
					});
				}
				});


			}else{
				response.status = false;
				response.message = 'E-mail id not exist in the system';
				res.send(response);
				res.end();
			}
		  });
    }else{
        response.status = false;
        response.message = 'Team not exist';
        res.send(response);
        res.end();
    }
  });
  
};

