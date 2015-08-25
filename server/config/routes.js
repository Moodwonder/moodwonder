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
var admin = require('../controllers/admin');

module.exports = function (app, passport) {
    // user routes
    app.post('/login', users.postLogin);
    app.post('/usersignupstep1', users.postSignupStep1, users.postForgotPassword);
    app.post('/usersignupstep2', users.encryptPassword, users.postSignupStep2, users.postLogin);
    app.post('/signup', users.postSignUp);
    app.post('/usersignup', users.postUserSignUp);
    app.post('/saveengagementsurveyresult', users.checkLogin, surveys.saveEngagementSurveyResult);
    app.post('/saveuserdetails', users.checkLogin, users.encryptPassword, users.postSaveUserInfo, users.postSaveManagerInfo);
    app.post('/savemanagerdetails', users.checkLogin, users.findUserByEmailId, users.postSaveManagerInfo);
    app.post('/savecompanydetails', users.checkLogin, users.postSaveCompanyInfo);
    app.post('/createteam', users.checkLogin, teams.checkTeam, teams.createTeam, users.updateUser);
    app.post('/updateteam', users.checkLogin, teams.checkTeam, teams.updateTeam);
    app.post('/getmyteams', users.checkLogin, teams.getMyTeams, users.usersInTeams);
    app.post('/addmembertoteam', users.checkLogin, teams.addMemberToTeam, invitation.sendInvitation);
    app.post('/removememberfromteam', users.checkLogin, teams.removeMemberFromTeam, invitation.removeInvitation);
    app.post('/invitesignup', users.checkLogin, invitation.sendInvitation);
    app.get('/getengagementsurvey', users.checkLogin, surveys.getEngagementSurvey);
    app.get('/logout', users.getLogout);
    app.get('/test', users.test);
    app.get('/getusers', users.getUsers);
    app.get('/userinfo', users.checkLogin, users.getUserInfo);

    app.post('/createsurveyform', customSurvey.createForm);
    app.post('/deleteform', customSurvey.deleteForm);
    app.get('/getsurveyforms', customSurvey.getForms);
    app.get('/getsurveyform', customSurvey.getSurveyForm);

    app.post('/savesurveyresults', customSurveyResults.saveSurveyResults);

    app.post('/addlanguage', language.addLanguage);
    app.post('/editlanguage', language.editLanguage);
    app.post('/updatepagekeys', language.updatePageKeys);
    app.post('/deletelanguage', language.deleteLanguage);
    app.get('/getpage', language.getPage);
    app.get('/getlanguages', language.getLanguages);

    app.post('/adminlogin', admin.login);
    app.get('/adminlogout', admin.logout);
    app.get('/loggedin', admin.getLoggedIn);
    
    // Set variables from server side
    app.get('/signup/:hash', invitation.handleSignup);

    app.get('*', function (req, res, next) {

        if (/(\.png$|\.map$|\.jpg$)/.test(req.url))
            return;

        var user = req.user ? {authenticated: true, isWaiting: false} : {authenticated: false, isWaiting: false};
        var inviteEmail = req.body.inviteEmail ? req.body.inviteEmail : '';

        // To set state of a component from server
        // Must follow this format below
        // yourStore{ your: params }
        // You will get the params using the following code in your components
        // this.state.yourState

        res.locals.data = {
            UserStore: {user: user},
            CreatePswdStore: {user: {uid: req.user ? req.user._id : null}},
            SignupStore: {inviteEmail: inviteEmail}
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
