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
