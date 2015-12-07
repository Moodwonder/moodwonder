var _ = require('lodash');
var mongoose = require('mongoose');
var Languages = require('../models/languages');
var Homepage = require('../models/homepage');
var Signuppage = require('../models/signuppage');
var Loginpage = require('../models/loginpage');
var Mwusertheme = require('../models/mwusertheme');

/**
 * Add new language
 */
exports.addLanguage = function (req, res) {

    var query = req.body;
    Languages.create(query, function (err, items) {
        if (!err) {
            res.json({'status': true, 'message': 'query success'});
            res.end();
        } else {
            res.json({'status': false, 'message': 'query failed'});
            res.end();
        }
    });

};

/**
 * Edit language
 */
exports.editLanguage = function (req, res) {

    var data = JSON.parse(req.body.data);
    var code = data.code;
    var language = data.language;

    var condition = {_id: mongoose.Types.ObjectId(req.body.id)};
    var update = {code: code, language: language};
    var options = {multi: false};

    Languages.update(condition, update, options, function (err, callback) {
        var response = {};
        if (!err) {
            response.status = 'success';
        } else {
            response.status = 'failure';
        }
        res.json(response);
        res.end();
    });

};

/**
 * Get all languages
 */
exports.getLanguages = function (req, res) { 
    
    //console.log('req');
    //console.log(req);
    Languages.find({}).exec(function (err, languages) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.languages = languages;
        } else {
            response.status = 'failure';
            response.languages = [];
            console.log('Error in first query');
        }
        res.send(response);
        res.end();
    });

};

/**
 * Get all custome survey forms 
 */
exports.deleteLanguage = function (req, res) {
    var _id = mongoose.Types.ObjectId(req.body.id);
    Languages.remove({_id: _id}, function (err) {
        var response = {};
        if (!err) {
            response.status = 'success';
        } else {
            response.status = 'failure';
        }
        res.json(response);
        res.end();
    });
};

/**
 * Get home page keys
 */
exports.getPage = function (req, res) {

    var page = req.query.page;
    var language = req.query.language;
    var modelObj = modelObj || {};//Homepage;

    switch (page) {

        case 'home':
            modelObj = {};
            modelObj = Homepage;
            break;

        case 'signup':
            modelObj = {};
            modelObj = Signuppage;
            break;

        case 'login':
            modelObj = {};
            modelObj = Loginpage;
            break;

        case 'mwusertheme':
            modelObj = {};
            modelObj = Mwusertheme;
            break;

        default:
            //modelObj = Homepage;
            break;

    }

    modelObj.findOne({language: language}).exec(function (err, pagedata) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.pagedata = pagedata;
        } else {
            response.status = 'failure';
            response.pagedata = [];
        }
        //console.log(response);
        res.send(response);
        res.end();
    });



};

/**
 * Update page keys
 */
exports.updatePageKeys = function (req, res) {

    var page = req.body.page;
    var id = mongoose.Types.ObjectId(req.body.id);
    var data = JSON.parse(req.body.data);


    console.log('page');
    console.log(page);


    var condition = {_id: id};
    var update = {};
    var options = {multi: false};

    switch (page) {

        case 'home':
            modelObj = {};
            modelObj = Homepage;
            update = {}
            update = {HOM_TITLE: data.HOM_TITLE};
            break;

        case 'signup':
            modelObj = {};
            modelObj = Signuppage;
            update = {}
            update = {
                SGN_TITLE: data.SGN_TITLE, 
                SGN_WORK_EMAIL: data.SGN_WORK_EMAIL,
                SGN_BTN_SUBMIT: data.SGN_BTN_SUBMIT
            };
            break;

        case 'login':
            modelObj = {};
            modelObj = Loginpage;
            update = {}
            update = {
                LGN_TITLE: data.LGN_TITLE,
                LGN_USERNAME: data.LGN_USERNAME,
                LGN_PASSWORD: data.LGN_PASSWORD,
                LGN_FORGOT_PASSWORD: data.LGN_FORGOT_PASSWORD,
                LGN_BTN_SUBMIT: data.LGN_BTN_SUBMIT
            };
            break;
        
        case 'mwusertheme':
            modelObj = {};
            modelObj = Mwusertheme;
            update = {}
            update = {
                L_MYMOOD_LINK: data.L_MYMOOD_LINK,
                L_MYACCOUNT_LINK: data.L_MYACCOUNT_LINK,
                L_MYCOMPANY_LINK: data.L_MYCOMPANY_LINK,
                L_CAST_VOTE: data.L_CAST_VOTE,
                L_INVITE_PEOPLE_TITLE: data.L_INVITE_PEOPLE_TITLE,
                L_INVITE_PEOPLE_DES: data.L_INVITE_PEOPLE_DES,
                L_INVITE_INPUT_PLCHOLDER: data.L_INVITE_INPUT_PLCHOLDER,
                L_INVITE_BTN: data.L_INVITE_BTN,
                L_MYPROFILE_LINK: data.L_MYPROFILE_LINK,
                L_LOGOUT_LINK: data.L_LOGOUT_LINK,
                TOP_RATE_YOURMOOD: data.TOP_RATE_YOURMOOD,
                TOP_RATE_YOUR_MOODDESC: data.TOP_RATE_YOUR_MOODDESC,
                TOP_RATE_YOUR_MOODBTN: data.TOP_RATE_YOUR_MOODBTN,
                TOP_RATE_YOUR_MOODANSWER_ALL_BTN: data.TOP_RATE_YOUR_MOODANSWER_ALL_BTN,
                TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: data.TOP_RIGHT_SIDE_MY_ACCOUNT_LINK,
                TOP_RIGHT_SIDE_LOGOUT_LINK: data.TOP_RIGHT_SIDE_LOGOUT_LINK,
                RIGHT_SIDEBAR_QUICK_STATISTICS: data.RIGHT_SIDEBAR_QUICK_STATISTICS,
                RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: data.RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES,
                RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: data.RIGHT_SIDEBAR_EMPLOYEES_AT_RISK,
                RIGHT_SIDEBAR_NO_OF_RESPONSES: data.RIGHT_SIDEBAR_NO_OF_RESPONSES,
                RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: data.RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE,
                RIGHT_SIDEBAR_RESPONSE_COMPARISON: data.RIGHT_SIDEBAR_RESPONSE_COMPARISON,
                MW_OPTMOOD: data.MW_OPTMOOD,
                MW_OPTMEANING: data.MW_OPTMEANING,
                MW_OPTEXPECTATIONS: data.MW_OPTEXPECTATIONS,
                MW_OPTSTRENGTHS: data.MW_OPTSTRENGTHS,
                MW_OPTRECOGNITION: data.MW_OPTRECOGNITION,
                MW_OPTDEVELOPMENT: data.MW_OPTDEVELOPMENT,
                MW_OPTINFLUENCE: data.MW_OPTINFLUENCE,
                MW_OPTGOALS: data.MW_OPTGOALS,
                MW_OPTTEAM: data.MW_OPTTEAM,
                MW_OPTFRIENDSHIP: data.MW_OPTFRIENDSHIP,
                MW_OPTFEEDBACK: data.MW_OPTFEEDBACK,
                MW_OPTOPPORTUNITIES: data.MW_OPTOPPORTUNITIES,
                MW_OPTRECOMMENDATION: data.MW_OPTRECOMMENDATION
            };
            break;

        default:
            //modelObj = Homepage;
            break;

    }

    modelObj.update(condition, update, options, function (err) {
        var response = {};
        if (!err) {
            response.status = 'success';
        } else {
            response.status = 'failure';
        }
        console.log(response);
        res.json(response);
        res.end();
    });


};





