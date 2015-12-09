var _ = require('lodash');
var mongoose = require('mongoose');
var Languages = require('../models/languages');
var Homepage = require('../models/homepage');
var Signuppage = require('../models/signuppage');
var Loginpage = require('../models/loginpage');
var Mwusertheme = require('../models/mwusertheme');
var AboutPage = require('../models/aboutpage');
var AnonymityPage = require('../models/anonymitypage');
var TermsPage = require('../models/termspage');
var PolicyPage = require('../models/policypage');
var LogoutPage = require('../models/logoutpage');
var OpenendedresponsesPage = require('../models/openendedresponsespage');
var SurveyFormsPage = require('../models/surveyformspage');
var SurveyPage = require('../models/surveypage');
var MycompanyPage = require('../models/mycompanypage');
var OpenendedsurveyPage = require('../models/openendedsurveypage');
var MymoodPage = require('../models/mymoodpage');


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
            
        case 'about':
            modelObj = {};
            modelObj = AboutPage;
            break;
            
        case 'anonymity':
            modelObj = {};
            modelObj = AnonymityPage;
            break;
            
        case 'terms':
            modelObj = {};
            modelObj = TermsPage;
            break;
            
        case 'policy':
            modelObj = {};
            modelObj = PolicyPage;
            break;
            
        case 'logout':
            modelObj = {};
            modelObj = LogoutPage;
            break;
            
        case 'openendedres':
            modelObj = {};
            modelObj = OpenendedresponsesPage;
            break;
            
        case 'surveyforms':
            modelObj = {};
            modelObj = SurveyFormsPage;
            break;

        case 'survey':
            modelObj = {};
            modelObj = SurveyPage;
            break;
            
        case 'mycompany':
            modelObj = {};
            modelObj = MycompanyPage;
            break;
            
        case 'openendedsurvey':
            modelObj = {};
            modelObj = OpenendedsurveyPage;
            break;

        case 'mymood':
            modelObj = {};
            modelObj = MymoodPage;
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
            update = {
                HOM_SIGN_IN: data.HOM_SIGN_IN,
                HOM_REGISTER: data.HOM_REGISTER,
                HOM_SGN_WORK_EMAIL: data.HOM_SGN_WORK_EMAIL,
                HOM_GET_STARTED: data.HOM_GET_STARTED,
                HOM_2_TITLE_1: data.HOM_2_TITLE_1,
                HOM_2_TITLE_2: data.HOM_2_TITLE_2,
                HOM_2_ITEM_1: data.HOM_2_ITEM_1,
                HOM_2_ITEM_2: data.HOM_2_ITEM_2,
                HOM_2_ITEM_3: data.HOM_2_ITEM_3,
                HOM_3_TITLE_1: data.HOM_3_TITLE_1,
                HOM_3_BOX_1_TITLE_1: data.HOM_3_BOX_1_TITLE_1,
                HOM_3_BOX_1_CONTENT: data.HOM_3_BOX_1_CONTENT,
                HOM_3_BOX_2_TITLE_1: data.HOM_3_BOX_2_TITLE_1,
                HOM_3_BOX_2_CONTENT: data.HOM_3_BOX_2_CONTENT,
                HOM_3_BOX_3_TITLE_1: data.HOM_3_BOX_3_TITLE_1,
                HOM_3_BOX_3_CONTENT: data.HOM_3_BOX_3_CONTENT,
                HOM_3_BOX_4_TITLE_1: data.HOM_3_BOX_4_TITLE_1,
                HOM_3_BOX_4_CONTENT: data.HOM_3_BOX_4_CONTENT,
                HOM_4_TITLE_1: data.HOM_4_TITLE_1,
                HOM_4_BOX_1_TITLE_1: data.HOM_4_BOX_1_TITLE_1,
                HOM_4_BOX_1_CONTENT: data.HOM_4_BOX_1_CONTENT,
                HOM_4_BOX_2_TITLE_1: data.HOM_4_BOX_2_TITLE_1,
                HOM_4_BOX_2_CONTENT: data.HOM_4_BOX_2_CONTENT,
                HOM_4_BOX_3_TITLE_1: data.HOM_4_BOX_3_TITLE_1,
                HOM_4_BOX_3_CONTENT: data.HOM_4_BOX_3_CONTENT,
                HOM_4_BOX_4_TITLE_1: data.HOM_4_BOX_4_TITLE_1,
                HOM_4_BOX_4_CONTENT: data.HOM_4_BOX_4_CONTENT,
                HOM_5_TITLE_1: data.HOM_5_TITLE_1,
                HOM_5_BOX_1_TITLE_1: data.HOM_5_BOX_1_TITLE_1,
                HOM_5_BOX_1_CONTENT: data.HOM_5_BOX_1_CONTENT,
                HOM_5_BOX_2_TITLE_1: data.HOM_5_BOX_2_TITLE_1,
                HOM_5_BOX_2_CONTENT: data.HOM_5_BOX_2_CONTENT,
                HOM_5_BOX_3_TITLE_1: data.HOM_5_BOX_3_TITLE_1,
                HOM_5_BOX_3_CONTENT: data.HOM_5_BOX_3_CONTENT,
                HOM_5_BOX_4_TITLE_1: data.HOM_5_BOX_4_TITLE_1,
                HOM_5_BOX_4_CONTENT: data.HOM_5_BOX_4_CONTENT,
                HOM_6_TITLE_1: data.HOM_6_TITLE_1,
                HOM_7_TITLE: data.HOM_7_TITLE,
                HOM_7_NAME: data.HOM_7_NAME,
                HOM_7_EMAIL: data.HOM_7_EMAIL,
                HOM_7_MOBILE: data.HOM_7_MOBILE,
                HOM_7_LOOKING_FOR: data.HOM_7_LOOKING_FOR,
                HOM_7_SUBMIT: data.HOM_7_SUBMIT,
                HOM_FOOTER_ABOUT: data.HOM_FOOTER_ABOUT,
                HOM_FOOTER_ANONYMITY: data.HOM_FOOTER_ANONYMITY,
                HOM_FOOTER_TERMS: data.HOM_FOOTER_TERMS,
                HOM_FOOTER_POLICY: data.HOM_FOOTER_POLICY,
                HOM_FOOTER_CONTACT: data.HOM_FOOTER_CONTACT
            };
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
            
        case 'about':
            modelObj = {};
            modelObj = AboutPage;
            update = {}
            update = {
                ABT_BNNR_TITLE: data.ABT_BNNR_TITLE,
                ABT_BNNR_STARTED: data.ABT_BNNR_STARTED,
                ABT_ABOUTUS: data.ABT_ABOUTUS,
                ABT_ABTUS_PARA1: data.ABT_ABTUS_PARA1,
                ABT_ABTUS_PARA2: data.ABT_ABTUS_PARA2,
                ABT_ABTUS_PARA3: data.ABT_ABTUS_PARA3,
                ABT_ABTUS_PARA4: data.ABT_ABTUS_PARA4,
                ABT_ABTUS_PARA5: data.ABT_ABTUS_PARA5,
                ABT_PEOPLE_BEHIND: data.ABT_PEOPLE_BEHIND,
                ABT_PPL_BHD_DES: data.ABT_PPL_BHD_DES,
                ABT_LINK_ABOUT: data.ABT_LINK_ABOUT,
                ABT_LINK_ANONYMITY: data.ABT_LINK_ANONYMITY,
                ABT_LINK_TERMS: data.ABT_LINK_TERMS,
                ABT_LINK_POLICY: data.ABT_LINK_POLICY,
                ABT_LINK_CONTACT: data.ABT_LINK_CONTACT,
                ABT_NAV_SIGNIN: data.ABT_NAV_SIGNIN,
                ABT_NAV_REGISTER: data.ABT_NAV_REGISTER
            };
            break;
            
        case 'anonymity':
            modelObj = {};
            modelObj = AnonymityPage;
            update = {}
            update = {
                AMTY_BNNR_TITLE: data.AMTY_BNNR_TITLE,
                AMTY_TITLE: data.AMTY_TITLE,
                AMTY_PARA1: data.AMTY_PARA1,
                AMTY_PARA2: data.AMTY_PARA2,
                AMTY_PARA_LI1: data.AMTY_PARA_LI1,
                AMTY_PARA_LI2: data.AMTY_PARA_LI2,
                AMTY_PARA_LI3: data.AMTY_PARA_LI3,
                AMTY_PARA3: data.AMTY_PARA3,
                AMTY_PARA4: data.AMTY_PARA4,
                ABT_LINK_ABOUT: data.ABT_LINK_ABOUT,
                ABT_LINK_ANONYMITY: data.ABT_LINK_ANONYMITY,
                ABT_LINK_TERMS: data.ABT_LINK_TERMS,
                ABT_LINK_POLICY: data.ABT_LINK_POLICY,
                ABT_LINK_CONTACT: data.ABT_LINK_CONTACT,
                ABT_NAV_SIGNIN: data.ABT_NAV_SIGNIN,
                ABT_NAV_REGISTER: data.ABT_NAV_REGISTER
            };
            break;
            
        case 'terms':
            modelObj = {};
            modelObj = TermsPage;
            update = {}
            update = {
                TRMS_TITLE: data.TRMS_TITLE,
                TRMS_DES: data.TRMS_DES,
                TRMS_SEC1_T1: data.TRMS_SEC1_T1,
                TRMS_SEC1_P1: data.TRMS_SEC1_P1,
                TRMS_SEC1_P2: data.TRMS_SEC1_P2,
                TRMS_SEC2_T1: data.TRMS_SEC2_T1,
                TRMS_SEC2_P1: data.TRMS_SEC2_P1,
                TRMS_SEC3_T1: data.TRMS_SEC3_T1,
                TRMS_SEC3_P1: data.TRMS_SEC3_P1,
                TRMS_SEC4_T1: data.TRMS_SEC4_T1,
                TRMS_SEC4_P1: data.TRMS_SEC4_P1,
                TRMS_SEC5_T1: data.TRMS_SEC5_T1,
                TRMS_SEC5_P1: data.TRMS_SEC5_P1,
                TRMS_SEC6_T1: data.TRMS_SEC6_T1,
                TRMS_SEC6_P1: data.TRMS_SEC6_P1,
                TRMS_SEC7_T1: data.TRMS_SEC7_T1,
                TRMS_SEC7_P1: data.TRMS_SEC7_P1,
                TRMS_SEC8_T1: data.TRMS_SEC8_T1,
                TRMS_SEC8_P1: data.TRMS_SEC8_P1,
                ABT_LINK_ABOUT: data.ABT_LINK_ABOUT,
                ABT_LINK_ANONYMITY: data.ABT_LINK_ANONYMITY,
                ABT_LINK_TERMS: data.ABT_LINK_TERMS,
                ABT_LINK_POLICY: data.ABT_LINK_POLICY,
                ABT_LINK_CONTACT: data.ABT_LINK_CONTACT,
                ABT_NAV_SIGNIN: data.ABT_NAV_SIGNIN,
                ABT_NAV_REGISTER: data.ABT_NAV_REGISTER
            };
            break;
            
        case 'policy':
            modelObj = {};
            modelObj = PolicyPage;
            update = {}
            update = {
                PLCY_TITLE: data.PLCY_TITLE,
                PLCY_PARA1: data.PLCY_PARA1,
                PLCY_PARA2: data.PLCY_PARA2,
                PLCY_PARA3: data.PLCY_PARA3,
                PLCY_PARA4: data.PLCY_PARA4,
                PLCY_PARA5: data.PLCY_PARA5,
                PLCY_PARA6: data.PLCY_PARA6,
                ABT_LINK_ABOUT: data.ABT_LINK_ABOUT,
                ABT_LINK_ANONYMITY: data.ABT_LINK_ANONYMITY,
                ABT_LINK_TERMS: data.ABT_LINK_TERMS,
                ABT_LINK_POLICY: data.ABT_LINK_POLICY,
                ABT_LINK_CONTACT: data.ABT_LINK_CONTACT,
                ABT_NAV_SIGNIN: data.ABT_NAV_SIGNIN,
                ABT_NAV_REGISTER: data.ABT_NAV_REGISTER
            };
            break;
            
        case 'logout':
            modelObj = {};
            modelObj = LogoutPage;
            update = {}
            update = {
                LOUT_MESSAGE: data.LOUT_MESSAGE,
                LOUT_TEXTBEFORE_LOGIN: data.LOUT_TEXTBEFORE_LOGIN,
                LOUT_LOGIN: data.LOUT_LOGIN,
                LOUT_TEXTAFTER_LOGIN: data.LOUT_TEXTAFTER_LOGIN
            };
            break;

        case 'openendedres':
            modelObj = {};
            modelObj = OpenendedresponsesPage;
            update = {}
            update = {
                OPER_TITLE: data.OPER_TITLE
            };
            break;

        case 'surveyforms':
            modelObj = {};
            modelObj = SurveyFormsPage;
            update = {}
            update = {
                SVFM_TITLE: data.SVFM_TITLE,
                SVFM_CREATE_BTN: data.SVFM_CREATE_BTN,
                SVFM_SEARCH_BOX: data.SVFM_SEARCH_BOX,
                SVFM_TBLNUMBER: data.SVFM_TBLNUMBER,
                SVFM_TBLTITLE: data.SVFM_TBLTITLE,
                SVFM_TBLDATE: data.SVFM_TBLDATE,
                SVFM_VIEWSURVEY_LINK: data.SVFM_VIEWSURVEY_LINK,
                SVFM_VIEWRESPONSES_LINK: data.SVFM_VIEWRESPONSES_LINK,
                SVFM_DELETE_LINK: data.SVFM_DELETE_LINK
            };
            break;

        case 'survey':
            modelObj = {};
            modelObj = SurveyPage;
            update = {}
            update = {
                SRVY_TITLE: data.SRVY_TITLE,
                SRVY_MOOD_KEY: data.SRVY_MOOD_KEY,
                SRVY_MEANING_KEY: data.SRVY_MEANING_KEY,
                SRVY_EXPECTATIONS_KEY: data.SRVY_EXPECTATIONS_KEY,
                SRVY_STRENGTHS_KEY: data.SRVY_STRENGTHS_KEY,
                SRVY_RECOGNITION_KEY: data.SRVY_RECOGNITION_KEY,
                SRVY_DEVELOPMENT_KEY: data.SRVY_DEVELOPMENT_KEY,
                SRVY_INFLUENCE_KEY: data.SRVY_INFLUENCE_KEY,
                SRVY_GOALS_KEY: data.SRVY_GOALS_KEY,
                SRVY_TEAM_KEY: data.SRVY_TEAM_KEY,
                SRVY_FRIENDSHIP_KEY: data.SRVY_FRIENDSHIP_KEY,
                SRVY_FEEDBACK_KEY: data.SRVY_FEEDBACK_KEY,
                SRVY_OPPORTUNITIES_KEY: data.SRVY_OPPORTUNITIES_KEY,
                SRVY_RECOMMENDATION_KEY: data.SRVY_RECOMMENDATION_KEY,
                SRVY_MOOD_DES: data.SRVY_MOOD_DES,
                SRVY_MEANING_DES: data.SRVY_MEANING_DES,
                SRVY_EXPECTATIONS_DES: data.SRVY_EXPECTATIONS_DES,
                SRVY_STRENGTHS_DES: data.SRVY_STRENGTHS_DES,
                SRVY_RECOGNITION_DES: data.SRVY_RECOGNITION_DES,
                SRVY_DEVELOPMENT_DES: data.SRVY_DEVELOPMENT_DES,
                SRVY_INFLUENCE_DES: data.SRVY_INFLUENCE_DES,
                SRVY_GOALS_DES: data.SRVY_GOALS_DES,
                SRVY_TEAM_DES: data.SRVY_TEAM_DES,
                SRVY_FRIENDSHIP_DES: data.SRVY_FRIENDSHIP_DES,
                SRVY_FEEDBACK_DES: data.SRVY_FEEDBACK_DES,
                SRVY_OPPORTUNITIES_DES: data.SRVY_OPPORTUNITIES_DES,
                SRVY_RECOMMENDATION_DES: data.SRVY_RECOMMENDATION_DES,
                SRVY_SUBMIT_BTN: data.SRVY_SUBMIT_BTN
            };
            break;
            
        case 'mycompany':
            modelObj = {};
            modelObj = MycompanyPage;
            update = {}
            update = {
                MYCO_EGRAPH: data.MYCO_EGRAPH,
                MYCO_CRATING: data.MYCO_CRATING,
                MYCO_COMPANYINFO: data.MYCO_COMPANYINFO,
                MYCO_TITLE: data.MYCO_TITLE,
                MYCO_OPTMWINDEX: data.MYCO_OPTMWINDEX,
                MYCO_OPTMOOD: data.MYCO_OPTMOOD,
                MYCO_OPTMEANING: data.MYCO_OPTMEANING,
                MYCO_OPTEXPECTATIONS: data.MYCO_OPTEXPECTATIONS,
                MYCO_OPTSTRENGTHS: data.MYCO_OPTSTRENGTHS,
                MYCO_OPTRECOGNITION: data.MYCO_OPTRECOGNITION,
                MYCO_OPTDEVELOPMENT: data.MYCO_OPTDEVELOPMENT,
                MYCO_OPTINFLUENCE: data.MYCO_OPTINFLUENCE,
                MYCO_OPTGOALS: data.MYCO_OPTGOALS,
                MYCO_OPTTEAM: data.MYCO_OPTTEAM,
                MYCO_OPTFRIENDSHIP: data.MYCO_OPTFRIENDSHIP,
                MYCO_OPTFEEDBACK: data.MYCO_OPTFEEDBACK,
                MYCO_OPTOPPORTUNITIES: data.MYCO_OPTOPPORTUNITIES,
                MYCO_OPTRECOMMENDATION: data.MYCO_OPTRECOMMENDATION,
                MYCO_MYSELF: data.MYCO_MYSELF
            };
            break;

        case 'openendedsurvey':
            modelObj = {};
            modelObj = OpenendedsurveyPage;
            update = {}
            update = {
                OPES_TOP_TITLE: data.OPES_TOP_TITLE,
                OPES_OPTION: data.OPES_OPTION,
                OPES_TOP_QNSONE: data.OPES_TOP_QNSONE,
                OPES_TOP_QNSTWO: data.OPES_TOP_QNSTWO,
                OPES_TOP_QNSTHREE: data.OPES_TOP_QNSTHREE,
                OPES_WORST_TITLE: data.OPES_WORST_TITLE,
                OPES_WORST_QNSONE: data.OPES_WORST_QNSONE,
                OPES_WORST_QNSTWO: data.OPES_WORST_QNSTWO,
                OPES_WORST_QNSTHREE: data.OPES_WORST_QNSTHREE,
                OPES_MOOD: data.OPES_MOOD,
                OPES_EXPECTATIONS: data.OPES_EXPECTATIONS,
                OPES_STRENGTHS: data.OPES_STRENGTHS,
                OPES_RECOGNITION: data.OPES_RECOGNITION,
                OPES_DEVELOPMENT: data.OPES_DEVELOPMENT,
                OPES_INFLUENCE: data.OPES_INFLUENCE,
                OPES_TEAM: data.OPES_TEAM,
                OPES_FRIENDSHIP: data.OPES_FRIENDSHIP,
                OPES_FEEDBACK: data.OPES_FEEDBACK,
                OPES_OPPORTUNITIES: data.OPES_OPPORTUNITIES,
                OPES_RECOMMENDATION: data.OPES_RECOMMENDATION,
                OPES_CANCEL_BTN: data.OPES_CANCEL_BTN,
                OPES_SUBMIT_BTN: data.OPES_SUBMIT_BTN
            };
            break;


        case 'mymood':
            modelObj = {};
            modelObj = MymoodPage;
            update = {}
            update = {
                MYMD_EGRAPH: data.MYMD_EGRAPH,
                MYMD_MRATING: data.MYMD_MRATING,
                MYMD_CSURVEY: data.MYMD_CSURVEY,
                MYMD_OPTMWINDEX: data.MYMD_OPTMWINDEX,
                MYMD_OPTMOOD: data.MYMD_OPTMOOD,
                MYMD_OPTMEANING: data.MYMD_OPTMEANING,
                MYMD_OPTEXPECTATIONS: data.MYMD_OPTEXPECTATIONS,
                MYMD_OPTSTRENGTHS: data.MYMD_OPTSTRENGTHS,
                MYMD_OPTRECOGNITION: data.MYMD_OPTRECOGNITION,
                MYMD_OPTDEVELOPMENT: data.MYMD_OPTDEVELOPMENT,
                MYMD_OPTINFLUENCE: data.MYMD_OPTINFLUENCE,
                MYMD_OPTGOALS: data.MYMD_OPTGOALS,
                MYMD_OPTTEAM: data.MYMD_OPTTEAM,
                MYMD_OPTFRIENDSHIP: data.MYMD_OPTFRIENDSHIP,
                MYMD_OPTFEEDBACK: data.MYMD_OPTFEEDBACK,
                MYMD_OPTOPPORTUNITIES: data.MYMD_OPTOPPORTUNITIES,
                MYMD_OPTRECOMMENDATION: data.MYMD_OPTRECOMMENDATION,
                MYMD_OPTALLTIME: data.MYMD_OPTALLTIME,
                MYMD_OPTTWELVE: data.MYMD_OPTTWELVE,
                MYMD_OPTSIX: data.MYMD_OPTSIX,
                MYMD_OPTTHREE: data.MYMD_OPTTHREE,
                MYMD_OPTLASTMONTH: data.MYMD_OPTLASTMONTH,
                MYMD_ATSTART: data.MYMD_ATSTART,
                MYMD_HIGHEST: data.MYMD_HIGHEST,
                MYMD_LOWEST: data.MYMD_LOWEST,
                MYMD_CURRENT: data.MYMD_CURRENT,
                MYMD_DAYS_CHANGE: data.MYMD_DAYS_CHANGE,
                MYMD_WEEK_CHANGE: data.MYMD_WEEK_CHANGE,
                MYMD_E_ENGAGEMENT: data.MYMD_E_ENGAGEMENT,
                MYMD_MOST_ENGAGING: data.MYMD_MOST_ENGAGING,
                MYMD_TOPTHREEAREAS_HEADING: data.MYMD_TOPTHREEAREAS_HEADING,
                MYMD_WORSTTHREEAREAS_HEADING: data.MYMD_WORSTTHREEAREAS_HEADING,
                MYMD_MOSTIMPROVEDAREAS_HEADING: data.MYMD_MOSTIMPROVEDAREAS_HEADING,
                MYMD_LEASTIMPROVEDAREAS_HEADING: data.MYMD_LEASTIMPROVEDAREAS_HEADING,
                MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING: data.MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING,
                MYMD_LOWERTHANCOMPANYAVERAGE_HEADING: data.MYMD_LOWERTHANCOMPANYAVERAGE_HEADING,
                MYMD_HIGHERCAVERAGE_EMPTYMSG: data.MYMD_HIGHERCAVERAGE_EMPTYMSG,
                MYMD_LOWERCAVERAGE_EMPTYMSG: data.MYMD_LOWERCAVERAGE_EMPTYMSG,
                MYMD_SGENERATION_TITLE: data.MYMD_SGENERATION_TITLE,
                MYMD_SLISTSBTN: data.MYMD_SLISTSBTN,
                MYMD_STITLE: data.MYMD_STITLE,
                MYMD_TITLE_PLCHOLDER: data.MYMD_TITLE_PLCHOLDER,
                MYMD_SFREEZE_DATE: data.MYMD_SFREEZE_DATE,
                MYMD_TARGET_GROUP: data.MYMD_TARGET_GROUP,
                MYMD_TARGETORG: data.MYMD_TARGETORG,
                MYMD_TORG_DEFAULT_OPTION: data.MYMD_TORG_DEFAULT_OPTION,
                MYMD_TARGETSURVEY: data.MYMD_TARGETSURVEY,
                MYMD_TSURVEY_DEFAULT_OPTION1: data.MYMD_TSURVEY_DEFAULT_OPTION1,
                MYMD_TSURVEY_DEFAULT_OPTION2: data.MYMD_TSURVEY_DEFAULT_OPTION2,
                MYMD_QNS_TITLE: data.MYMD_QNS_TITLE,
                MYMD_ADD_QNS: data.MYMD_ADD_QNS,
                MYMD_SUBMIT_SURVEY: data.MYMD_SUBMIT_SURVEY,
                MYMD_QNSTITLE: data.MYMD_QNSTITLE,
                MYMD_QNSPLCHLOLDER: data.MYMD_QNSPLCHLOLDER,
                MYMD_ANSTYPE_LBL: data.MYMD_ANSTYPE_LBL,
                MYMD_ANSTYPE_DEFAULT: data.MYMD_ANSTYPE_DEFAULT,
                MYMD_CHILD_ADDBTN: data.MYMD_CHILD_ADDBTN,
                MYMD_CHILD_CANCELBTN: data.MYMD_CHILD_CANCELBTN
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





