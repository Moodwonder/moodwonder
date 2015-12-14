var _ = require('lodash');
var Team = require('../models/team');
var User = require('../models/user');
var CompanyInfo = require('../models/companyinfo');
var Company = require('../models/company');
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
 * Chech the team is already exist or not
 *
 * Accept : -  @teamname
 */
exports.checkTeam = function(req, res, next) {

    var response    = {};
    response.status  = false;
    response.message = 'Something went wrong..';
    var teamname = req.body.teamname;

    var checkWithInCompanay = function(company){

        var where = { "manager_id" : new ObjectId(req.user._id), "teamname": teamname, company_id: company._id };
        Team.findOne(where, function(err, existingTeam) {

            if(existingTeam) {
                response.status = false;
                response.message = "Team name already exist";
                response.callback = req.body.callback;
                res.send(response);
                res.end();
            }else{
                // pass company _id to next route
                req.body.company_id = company._id;
                next();
            }
        });
    }

    if(teamname !== undefined && teamname !== ''){
        // find team _id from companies collection
        var company_id  = req.user.company_id;
        if(company_id !== ''){
			var company = { _id: company_id };
			CompanyInfo.findOne(company).exec(function(err,company){
				if(company){
					checkWithInCompanay(company);
				}else{
				  res.send(response);
				  res.end();
				}
			});
		}else{
			response.message = 'Company not found';
			res.send(response);
			res.end();
		}
    }else{
        response.message = 'Team name is missing.';
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
  var company_id = req.body.company_id;
  
  var team =  new Team({
      teamname: teamname,
      manager_id: new ObjectId(req.user._id),
      company_id: company_id
  });

  team.save(function(err) {
      if(!err){

          User.findOne({ _id: new ObjectId(req.user._id) },function(err, user){
              if(user !== null){
                  req.body.update  = { 'usertype': 'manager'};
                  req.body.resmessage  = 'Team created';
                  req.body._id = req.user._id;
                  next();
              }else{
                  console.log(err);
                  response.status   = false;
                  response.message  = 'Something went wrong..';
                  response.callback = req.body.callback;
                  res.send(response);
                  res.end();
              }
          });
      }else{

          console.log(err);
          response.status   = false;
          response.message  = 'Something went wrong..';
          response.callback = req.body.callback;
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
  var callback = req.body.callback;

  var where = { "_id" : new ObjectId(teamid), "manager_id" : new ObjectId(req.user._id) };
  // console.log(where);

  Team.findOne(where, function(err, existingTeam) {
    if(existingTeam) {
        Team.update(where,{ "teamname": teamname },function(err){
            if(err){
                response.status = false;
                response.message = "Something went wrong";
                response.callback = callback;
                res.send(response);
                res.end();
            }else{
                response.status = true;
                response.message = "Successfully updated team name";
                response.callback = callback;
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

  Team.find(where).sort( { _id: -1 } ).exec(function(err, lists) {
    if(!err) {
        // console.log(lists);
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
exports.getOwnTeams = function(req, res, next) {

  var where = { manager_id: new ObjectId(req.user._id) };

  Team.find(where).exec(function(err, lists) {
    if(!err) {
        response.status   = true;
        response.data  = lists;
        response.message  = 'Teams';
        res.send(response);
        res.end();
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

  //function for exiting from the callback function
  var response = {};
  function checkExitCondition(key){
    if(total_member_email == (key+1)){
        // Go to invitation.sendInvitation() route if there is non member emails
        if(invite_member_email.length>0){
            next();
        }
        else{
            response.status = false;
            response.message = '';
            response.messages = feedback;
            response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
            res.send(response);
            res.end();
        }
    }
  }

  var membername = req.body.membername;
  var feedback   = [];
  
  // Extracting domain name for making e-mail id
  var domainname = req.user.email;
  domainname     = domainname.substring(domainname.lastIndexOf("@"));

  var member_email = [];
  var invite_member_email = [];


  membername.map(function(value, key) {
    // Making e-mail id
    if(value !== ''){
        member_email[key] = value+domainname;
        if(member_email[key] == req.user.email) {
          feedback.push(req.user.email+': You are the team leader');
        }
    }else{
        feedback.push('Work email is required');
    }
  });
  
  var total_member_email = member_email.length;
  var team_id = req.body.team_id;

  if(total_member_email < 1){
    response.status = false;
    response.message = '';
    response.messages = feedback;
    response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
    res.send(response);
    res.end();
  }
  member_email.map(function(value, key) {
    var where = { _id: new ObjectId(team_id) }
    
    // check the team is exist or not
    Team.findOne(where, function(err, existingTeam) {
        if(existingTeam) {

            var current_member_email = value;
            User.findOne({ _id: new ObjectId(req.user._id) }, function(err, currentUser) {
                if( !err && currentUser!== null ){

                    var mymanager = '';
                    if(currentUser.mymanager && currentUser.mymanager[0] && currentUser.mymanager[0].email){
                        mymanager = currentUser.mymanager[0].email;
                    }

                    if(mymanager === current_member_email){
                        response.status = false;
                        response.messages = ["You can't add your manager as your subordinate"];
                        response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
                        res.send(response);
                        res.end();
                        return;
                    }else{
                        // check the user is exist or not
                        User.findOne({email: current_member_email }, function(err, existingUser) {
                            if(existingUser) {
                                
                                // check the member already exist in the group
                                var where_mem_exist = { _id: existingTeam._id, member_ids: { $elemMatch: { _id: existingUser._id } } };

                                Team.findOne(where_mem_exist, function(err, existingMember) {
                                    if(existingMember) {
                                        feedback.push(current_member_email+': This user is already exist in the team');
                                        checkExitCondition(key);
                                    }else{
                                        // User not exist in this group, Insert this user into this team
                                        Team.update({ "_id" : existingTeam._id },{$push: {member_ids: { _id: existingUser._id }}},function(err){
                                            if(err){
                                                feedback.push('Unknown error with :'+ current_member_email);
                                            }else{
                                                feedback.push(current_member_email+': Added as a member');
                                            }
                                            checkExitCondition(key);
                                        });
                                    }
                                });
                            }else{
                                // Calling another controller for Invite a user with the given e-mail id
                                // Calling invitation.js/sendInvitation()
                                invite_member_email.push(current_member_email);
                                req.body.invitetype = 'Team';
                                req.body.data = { 'email': invite_member_email, 'team': existingTeam ,feedback: feedback };
                                checkExitCondition(key);
                            }
                        });
                    }
                    
                }else{
                    response.status = false;
                    response.message = 'Unknow error';
                    response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
                    res.send(response);
                    res.end();
                    return;
                }
            });

        }else{
            response.status = false;
            response.message = 'Team not exist';
            response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
            res.send(response);
            res.end();
        }
    });
  });

  
};

/**
 * get my teams
 *
 */
exports.removeMemberFromTeam = function(req, res, next) {

  var team_id = req.body.team_id;
  var member_id = req.body.member_id;
  var account_type = req.body.account_type;

  if( account_type == "invited") {
      // If the user type is 'invites' then remove this from 'invites' collection
      next();
  }
  else {
  
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
  }
};

/**
 * get teams by id
 *
 */
exports.getTeamsById = function(req, res, next) {

    // console.log(req.body._id);
    if(req.body._id !== undefined && req.body._id !== ''){
        var where = { manager_id: new ObjectId(req.body._id) };

        Team.find(where).exec(function(err, lists) {
            if(!err) {
                // console.log(lists);
                req.body.resdata = lists;
                next();
            } else {
                response.status   = false;
                response.message  = 'Something went wrong..';
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
