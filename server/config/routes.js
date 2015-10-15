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
var voting = require('../controllers/voting');
var surveys = require('../controllers/surveys');
var customSurvey = require('../controllers/customSurvey');
var customSurveyResults = require('../controllers/customSurveyResults');
var language = require('../controllers/language');
var admin = require('../controllers/admin');

var common = require('../controllers/common');
var mood = require('../controllers/mood');
var EngagementArea = require('../controllers/engagementArea');
var notificationRules = require('../controllers/notificationRules');

var Navigation = require('../languagesettings/nav');
var openEndedSurvey = require('../controllers/openEndedSurvey');

// Cron jobs
var customsurveyalert = require('../cronjobs/customsurveyalert');
var managernotifications_mwindex = require('../cronjobs/managernotifications_mwindex');
var managernotifications_individual = require('../cronjobs/managernotifications_individual');
var managernotifications_team = require('../cronjobs/managernotifications_team');


module.exports = function (app, passport) {
    // user routes
    app.post('/login', users.postLogin);
    app.post('/usersignupstep1', users.postSignupStep1, users.postForgotPassword);
    app.post('/usersignupstep2', users.encryptPassword, users.postSignupStep2, users.postLogin);
    app.post('/signup', users.postSignUp);
    app.post('/usersignup', users.postUserSignUp);
    app.post('/saveuserdetails', users.checkLogin, users.encryptPassword, users.postSaveUserInfo, users.postSaveManagerInfo);
    app.post('/updateuserphoto', users.checkLogin, users.UpdateUserPhoto);
    app.post('/savemanagerdetails', users.checkLogin, users.findUserByEmailId, users.postSaveManagerInfo);
    app.post('/savecompanydetails', users.checkLogin, users.postSaveCompanyInfo);
    app.post('/createteam', users.checkLogin, teams.checkTeam, teams.createTeam, users.updateUser);
    app.post('/updateteam', users.checkLogin, teams.checkTeam, teams.updateTeam);
    app.post('/getmyteams', users.checkLogin, teams.getMyTeams, users.usersInTeams);
    app.post('/addmembertoteam', users.checkLogin, teams.addMemberToTeam, invitation.sendInvitation);
    app.post('/removememberfromteam', users.checkLogin, teams.removeMemberFromTeam, invitation.removeInvitation);
    app.post('/invitesignup', users.checkLogin, invitation.sendInvitation);
    app.get('/logout', users.getLogout);
    app.get('/test', users.sendEOTMstats);
    app.get('/userinfo', users.checkLogin, users.getUserInfo);
    
    app.post('/saveengagementsurveyresult', users.checkLogin, surveys.saveEngagementSurveyResult);
    app.get('/getengagementsurvey', users.checkLogin, surveys.getEngagementSurvey);
    app.get('/getlastengagementsurvey', users.checkLogin, surveys.getLastSurvey);
    app.get('/getengagementresults', users.checkLogin, surveys.getSurveyResults);
    app.get('/getresultsbycompany', users.checkLogin, surveys.getResultsByComapny);
    app.get('/getresultsbyindustry', users.checkLogin, surveys.getResultsByIndustry);
    app.get('/getresultsbycountry', users.checkLogin, surveys.getResultsByCountry);
    app.get('/getengagingmanagers', users.checkLogin, surveys.getMostEngagingManagers);
    app.get('/getcompanydata', users.checkLogin, surveys.getCompanyStatisticsData);
    
    app.post('/createsurveyform', users.checkLogin, customSurvey.createForm);
    app.post('/deleteform', users.checkLogin, customSurvey.deleteForm);
    app.get('/getsurveyforms', users.checkLogin, customSurvey.getForms);
    app.get('/getsurveyform', users.checkLogin, customSurvey.getSurveyForm);
    app.get('/getorganization', users.checkLogin, customSurvey.getOrganisation);
    app.get('/takesurvey/:hash', users.checkLogin, customSurvey.handleTakeSurvey);
    

    app.post('/savesurveyresults', users.checkLogin, customSurveyResults.saveSurveyResults);
    app.get('/getsurveyresponses', users.checkLogin, customSurveyResults.getSurveyResponses);

    app.post('/addlanguage', language.addLanguage);
    app.post('/editlanguage', language.editLanguage);
    app.post('/updatepagekeys', language.updatePageKeys);
    app.post('/deletelanguage', language.deleteLanguage);
    app.get('/getpage', language.getPage);
    app.get('/getlanguages', language.getLanguages);

    app.post('/adminlogin', admin.login);
    app.get('/adminlogout', admin.logout);
    app.get('/loggedin', admin.getLoggedIn);
    
    app.post('/addmood', users.checkLogin, mood.addMoodRate);
    app.get('/mymoods', users.checkLogin, mood.getMyMoods);
  
    app.post('/addengagement', admin.checkLogin, EngagementArea.addEngagement);
    app.post('/editengagement', admin.checkLogin, EngagementArea.editEngagement);
    app.post('/deleteengagement', admin.checkLogin, EngagementArea.deleteEngagement);
    app.get('/getengagementareas', admin.checkLogin, EngagementArea.engagementAreas);
    
    app.post('/editrule', admin.checkLogin, notificationRules.editRule);
    app.post('/deleterule', admin.checkLogin, notificationRules.deleteRule);
    app.get('/getrules', admin.checkLogin, notificationRules.getRules);

    app.post('/getallemployees', users.checkLogin, users.getAllEmployees);
    app.post('/postvote', users.checkLogin, voting.postVote);
    app.post('/getempmonthview', users.checkLogin, voting.getEmpMonthView);
    // app.post('/chooseemployeeofthemonth', users.checkLogin, users.isAdmin, voting.chooseEmployeeOfTheMonth);
    app.post('/chooseemployeeofthemonth', users.checkLogin, voting.chooseEmployeeOfTheMonth);

    // Admin API calls
    app.post('/getallusers', admin.checkLogin, users.getallusers);
    app.post('/getuser', admin.checkLogin, users.getUserInfoById);
    app.post('/updateuser', admin.checkLogin, users.updateUserByAdmin);
    app.post('/getuserteamsbyid', admin.checkLogin, teams.getTeamsById, users.usersInTeams);
    app.post('/getopenended', admin.checkLogin, openEndedSurvey.getOpenEndedSurveyAnswer);
    app.post('/getallcompanies', admin.checkLogin, users.getAllCompanies);
    app.post('/getallteamsbycompany', admin.checkLogin, users.getAllTeamsFromCompany);
    app.post('/getallteamsmembers', admin.checkLogin, users.getAllTeamsMembers, users.usersInTeams);
    app.post('/searchteam', admin.checkLogin, users.searchTeam);
    app.post('/addindustry', admin.checkLogin, common.addIndustry);
    app.post('/getindustries', admin.checkLogin, common.getIndustry);
    app.post('/getindustries', admin.checkLogin, common.getIndustry);
    app.post('/updateindustry', admin.checkLogin, common.updateIndustry);
    app.post('/deleteindustry', admin.checkLogin, common.deleteIndustry);
    app.post('/addplaces', admin.checkLogin, common.addPlaces);
    app.post('/getplaces', admin.checkLogin, common.getPlaces);
    app.post('/updateplaces', admin.checkLogin, common.updatePlaces);
    app.post('/deleteplaces', admin.checkLogin, common.deletePlaces);
    
    // Set variables from server side
    app.get('/mycompany', common.handlePlaces);
    app.get('/signup/:hash', invitation.handleSignup);
    
    app.get('/openendedquestions', users.checkLogin, openEndedSurvey.getQuestions);
    app.post('/saveopenendedsurvey', users.checkLogin, openEndedSurvey.saveOpenEndedSurvey);
    
    app.use(function noCachePlease(req, res, next) {
        if(req.user && req.user.role !== 'ADMIN') {
          console.log('req.user');
          res.header("Cache-Control", "no-cache, no-store, must-revalidate");
          res.header("Pragma", "no-cache");
          res.header("Expires", 0);
        }
        next();
    });

    app.get('*', function (req, res, next) {

        if (/(\.png$|\.map$|\.jpg$)/.test(req.url))
            return;
        var user = req.user ? {authenticated: true, isWaiting: false } : {authenticated: false, isWaiting: false};
        var inviteEmail = req.body.inviteEmail ? req.body.inviteEmail : '';

        var AppStore = { isAuthenticated: false, userType: false };
        if(typeof req.user !== 'undefined' && req.user !== null ){
            // console.log('req.user');
            // console.log((req.user === null) );
            AppStore = {isAuthenticated: true, userType: req.user.usertype };
        }

        // To set state of a component from server
        // Must follow this format below
        // yourStore{ your: params }
        // You will get the params using the following code in your components
        // this.state.yourState

        res.locals.data = {
            UserStore: { user: user, places: req.body.places },
            CreatePswdStore: {user: {uid: req.user ? req.user._id : null}},
            SignupStore: {inviteEmail: inviteEmail},
            AppStore: AppStore
        };
        next();
    });

    function getPageKeys(page, lang, html, callback) {
        // console.log('page');
        // console.log(page);

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
 
