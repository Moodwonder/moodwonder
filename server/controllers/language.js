var _ = require('lodash');
var mongoose = require('mongoose');
var Languages = require('../models/languages');
var Homepage = require('../models/homepage');
var Signuppage = require('../models/signuppage');
var Loginpage = require('../models/loginpage');

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
//            Homepage.findOne({language: language}).exec(function (err, result) {
//                var response = {};
//                if (!err) {
//                    response.status = 'success';
//                    response.pagedata = result;
//                } else {
//                    response.status = 'failure';
//                    response.pagedata = [];
//                }
//                console.log(response);
//                res.send(response);
//                res.end();
//            });
            break;

        case 'signup':
            modelObj = {};
            modelObj = Signuppage;
//            Signuppage.findOne({language: language}).exec(function (err, result) {
//                var response = {};
//                if (!err) {
//                    response.status = 'success';
//                    response.pagedata = result;
//                } else {
//                    response.status = 'failure';
//                    response.pagedata = [];
//                }
//                res.send(response);
//                res.end();
//            });
            break;

        case 'login':
            modelObj = {};
            modelObj = Loginpage;
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





