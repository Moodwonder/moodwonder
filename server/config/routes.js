/**
 * Routes for express app
 */
var express = require('express');
var users = require('../controllers/users');
var teams = require('../controllers/teams');
 var invitation = require('../controllers/invitation');
var mongoose = require('mongoose');
var _ = require('lodash');
var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');
var surveys = require('../controllers/surveys');
var customSurvey = require('../controllers/customSurvey');
var customSurveyResults = require('../controllers/customSurveyResults');
var language = require('../controllers/language');

module.exports = function(app, passport) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/usersignupstep1', users.postSignupStep1, users.postForgotPassword);
  app.post('/usersignupstep2', users.encryptPassword, users.postSignupStep2, users.postLogin);
  app.post('/signup', users.postSignUp);
  app.get('/logout', users.getLogout);
  app.get('/test', users.test);
  app.post('/usersignup', users.postUserSignUp);
  app.get('/getusers', users.getUsers);
  app.get('/userinfo', users.checkLogin, users.getUserInfo);
  app.post('/saveuserdetails', users.checkLogin, users.encryptPassword, users.postSaveUserInfo, users.postSaveManagerInfo);
  app.post('/savemanagerdetails', users.checkLogin, users.findUserByEmailId, users.postSaveManagerInfo);
  app.post('/savecompanydetails', users.checkLogin, users.postSaveCompanyInfo);
  app.post('/createteam', users.checkLogin, teams.checkTeam, teams.createTeam, users.updateUser);
  app.post('/getmyteams', users.checkLogin, teams.getMyTeams, users.usersInTeams);
  app.post('/addmembertoteam', users.checkLogin, teams.addMemberToTeam, invitation.sendInvitation );
  app.post('/removememberfromteam', users.checkLogin, teams.removeMemberFromTeam );
  app.get('/getengagementsurvey', users.checkLogin, surveys.getEngagementSurvey);
  app.post('/saveengagementsurveyresult', users.checkLogin, surveys.saveEngagementSurveyResult);
  app.post('/createsurveyform', customSurvey.createForm);
  app.get('/getsurveyforms', customSurvey.getForms);
  app.get('/getsurveyform', customSurvey.getSurveyForm);
  app.post('/deleteform', customSurvey.deleteForm);
  app.post('/savesurveyresults', customSurveyResults.saveSurveyResults);
  app.post('/addlanguage', language.addLanguage);
  app.get('/getlanguages', language.getLanguages);
  app.get('/getpage', language.getPage);
  app.post('/updatepagekeys', language.updatePageKeys);

  app.get('*', function (req, res, next) {

      if (/(\.png$|\.map$|\.jpg$)/.test(req.url)) return;

          var user = req.user ? {authenticated: true, isWaiting: false} : {authenticated: false, isWaiting: false};

          res.locals.data = {
              UserStore: {user: user},
              CreatePswdStore: { user: {uid : req.user ? req.user._id : null } }
          };
          next();
  });

  app.get('*', function (req, res, next) {
      // console.log('res.locals.data');
      // console.log(res.locals.data);
      // console.log('req.user');
      // console.log(req.user);
      // console.log('req.session');
      // console.log(req.session);
	
      var html = App(JSON.stringify(res.locals.data || {}), req.url);
          html = html.replace("TITLE", Header.title)
                .replace("META", Header.meta)
                .replace("LINK", Header.link);

      res.contentType = "text/html; charset=utf8";
      res.end(html);
  });
  

};
