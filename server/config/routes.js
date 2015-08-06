/**
 * Routes for express app
 */
var express = require('express');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var _ = require('lodash');
var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');
var surveys = require('../controllers/surveys');
var customSurvey = require('../controllers/customSurvey');
var customSurveyResults = require('../controllers/customSurveyResults');

module.exports = function(app, passport) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/usersignupstep1', users.postSignupStep1);
  app.post('/usersignupstep2', users.encryptPassword, users.postSignupStep2);
  app.post('/signup', users.postSignUp);
  app.get('/logout', users.getLogout);
  app.get('/test', users.test);
  app.post('/usersignup', users.postUserSignUp);
  app.get('/getusers', users.getUsers);
  app.get('/userinfo', users.checkLogin, users.getUserInfo);
  app.post('/saveuserdetails', users.checkLogin, users.encryptPassword, users.postSaveUserInfo);
  app.get('/getengagementsurvey', surveys.getEngagementSurvey);
  app.post('/saveengagementsurveyresult', surveys.saveEngagementSurveyResult);
  app.post('/createsurveyform', customSurvey.createForm);
  app.get('/getsurveyforms', customSurvey.getForms);
  app.get('/getsurveyform', customSurvey.getSurveyForm);
  app.post('/deleteform', customSurvey.deleteForm);
  app.post('/savesurveyresults', customSurveyResults.saveSurveyResults);

  app.get('*', function (req, res, next) {
	  ' entering into * '
    if (/(\.png$|\.map$|\.jpg$)/.test(req.url)) return;

    var user = req.user ? { authenticated: true, isWaiting: false } : { authenticated: false, isWaiting: false };
    res.locals.data =  {
      UserStore: { user: user },
      CreatePswdStore: { user: {uid : req.session._id } }
    };
    var html = App(JSON.stringify(res.locals.data || {}), req.url);
    html = html.replace("TITLE", Header.title)
               .replace("META", Header.meta)
               .replace("LINK", Header.link);

    res.contentType = "text/html; charset=utf8";
    res.end(html);

  });

};
