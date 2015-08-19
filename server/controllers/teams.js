var _ = require('lodash');
var Team = require('../models/team');
var User = require('../models/user');
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
 * Create new team
 *
 * Accept : -  @teamname
 */
exports.checkTeam = function(req, res, next) {

  var company = req.user.company_info[0].companyname;

  var where = { company_info: { $elemMatch: { 'companyname': company }} , 'usertype': 'manager' };
  // console.log(where);

  User.findOne(where, function(err, existingUser) {
    if(existingUser) {
        next();
    }else{
        response.status = false;
        response.message = "You can't complete this action, Your company is not found in our system";
        res.send(response);
        res.end();
    }
  });
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
 * Update team name
 *
 * Accept : -  @teamname,@teamid
 */
exports.updateTeam = function(req, res, next) {

  var teamname = req.body.teamname;
  var teamid   = req.body.teamid;

  var where = { "_id" : new ObjectId(teamid), "manager_id" : new ObjectId(req.user._id) };
  // console.log(where);

  Team.findOne(where, function(err, existingTeam) {
    if(existingTeam) {
		Team.update(where,{ "teamname": teamname },function(err){
			if(err){
				response.status = false;
				response.message = "Something went wrong";
				res.send(response);
				res.end();
			}else{
				response.status = true;
				response.message = "Team name updated";
				res.send(response);
				res.end();
			}
		});
    }else{
        response.status = false;
        response.message = "You don't have permission to change this team name";
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
 * Add a member to team
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
				// Calling another controller for Invite a user with the given e-mail id
				// Calling invitation.js/sendInvitation()
				req.body.invitetype = 'Team';
				req.body.data = { 'email': member_email, 'team': existingTeam };
				next();
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

/**
 * get my teams
 *
 */
exports.removeMemberFromTeam = function(req, res, next) {

  var team_id = req.body.team_id;
  var member_id = req.body.member_id;
  var member_id = req.body.member_id;

  if( team_id != '' && member_id != '') {

  var where = { _id: new ObjectId(team_id) }

  // check the team is exist or not
  Team.findOne(where, function(err, existingTeam) {
    if(existingTeam) {
		
		// User not exist in this group, Insert this user into this team
		member_id = new ObjectId(member_id);
		Team.update({ "_id" : existingTeam._id },{$pull: {member_ids: { _id: member_id }}},function(err){
			if(err){
				response.status = false;
				response.message = "Something went wrong";
				res.send(response);
				res.end();
			}else{
				response.status = true;
				response.message = "Member removed";
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


  }else{
    response.status = false;
    response.message = 'Something went wrong';
    res.send(response);
    res.end();
  }
};
