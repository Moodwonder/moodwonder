var _ = require('lodash');
var mongoose = require('mongoose');
var Languages = require('../models/languages');
var Homepage = require('../models/homepage');
var Signuppage = require('../models/signuppage');

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
 * Get all languages
 */
exports.getLanguages = function (req, res) {

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

        default:
            //modelObj = Homepage;
            break;

    }

    modelObj.findOne({language: language}).exec(function (err, result) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.pagedata = result;
        } else {
            response.status = 'failure';
            response.pagedata = [];
        }
        res.send(response);
        res.end();
    });



};





