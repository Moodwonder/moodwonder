/**
 * Routes for express app
 */
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');

var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');

var Homepage = require('../models/homepage');
var Signuppage = require('../models/signuppage');
var Loginpage = require('../models/loginpage');
var Languages = require('../models/languages');

var users = require('../controllers/users');
var teams = require('../controllers/teams');
var invitation = require('../controllers/invitation');
var surveys = require('../controllers/surveys');
var customSurvey = require('../controllers/customSurvey');
var customSurveyResults = require('../controllers/customSurveyResults');
var language = require('../controllers/language');
var admin = require('../controllers/admin');

var Navigation = require('../languagesettings/nav');


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
            SignupStore: {inviteEmail: inviteEmail},
        };
        next();
    });

    function getPageKeys(page, lang, html, callback) {
        console.log('page');
        console.log(page);

        var modelObj = modelObj || {};

        switch (page) {
            case 'login':
                modelObj = {};
                modelObj = Loginpage;
                break;

            case 'signup':
                modelObj = {};
                modelObj = Signuppage;
                break;

            case 'home':
                modelObj = {};
                modelObj = Homepage;
                break;

            default:
                modelObj = {};
                modelObj = Languages;
                break;
        }

        modelObj.findOne({language: lang}).lean().exec(function (err, docs) {
            if (docs != 'undefined') {
                callback(docs);
            }
        });
    }

    app.get('*', function (req, res, next) {

        var lang = req.cookies.lang;
        var pageurl = req.url;

        if (lang == 'undefined' || lang == null) {
            lang = 'EN';
        }

        var html = App(JSON.stringify(res.locals.data || {}), req.url);
        html = html.replace("TITLE", Header.title)
                .replace("META", Header.meta)
                .replace("LINK", Header.link);

        //var page = pageurl.split("/").pop();
        var page = '';
        if (pageurl == '/') {
            page = 'home';
        } else {
            page = pageurl.split("/").pop();
        }

        getPageKeys(page, lang, html, function (response) {

            //console.log('response');
            //console.log(response);

            //console.log('lang');
            //console.log(lang);

            var respons = '';
            var nav = '';

            switch (lang) {
                case 'EN':
                    respons = {HOME_TITLE: "Language En", LBL_USERNAME: "Username en", LBL_PASSWORD: "Password en", PH_USERNAME: "username en", PH_PASSWORD: "password en"};
                    //nav = {NAV_TITLE: "Moodwonder En", NAV_LOGIN: "Login en", NAV_SIGNUP: "Signup en"};
                    nav = Navigation.header.EN;
                    break;

                case 'FI':
                    respons = {HOME_TITLE: "Language Fr", LBL_USERNAME: "Username fr", LBL_PASSWORD: "Password fr", PH_USERNAME: "username fr", PH_PASSWORD: "password fr"};
                    //nav = {NAV_TITLE: "Moodwonder Fr", NAV_LOGIN: "Login fr", NAV_SIGNUP: "Signup fr"};
                    nav = Navigation.header.FI;
                    break;

                default:
                    break;
            }

            for (var val in nav) {
                //html = html.split(val).join(nav[val]);
                var pattern = new RegExp(val, "g");
                html = html.replace(pattern, nav[val]);
            }

            for (var val in response) {
                var pattern = new RegExp(val, "g");
                html = html.replace(pattern, response[val]);
            }

            res.contentType = "text/html; charset=utf8";
            res.end(html);
        });
        // res.contentType = "text/html; charset=utf8";
        // res.end(html);
    });
};
