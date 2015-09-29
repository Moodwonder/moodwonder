var _ = require('underscore');
var mongoose = require('mongoose');
var OpenEndedQuestions = require('../models/openEndedQuestions');
var OpenEndedAnswers = require('../models/openEndedAnswers');

/**
 * home page
 */
exports.getQuestions = function (req, res) {

    OpenEndedQuestions.find().lean().exec(function (err, data) {
        var response = {};
        if (!err) {
            response.status = true;
            response.message = 'success';
            response.questions = data;
        } else {
            response.status = false;
            response.message = 'failure';
            response.questions = [];
        }
        res.json(response);
        res.end();
    });

};

exports.saveOpenEndedSurvey = function (req, res) {

    var query = req.body;
    query.user_id = req.user._id;
    
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice( - 2);
    var day = ('0' + today.getDate()).slice( - 2);
    var hour = ('0' + today.getHours()).slice( - 2);
    var minutes = ('0' + today.getMinutes()).slice( - 2);
    var seconds = ('0' + today.getSeconds()).slice( - 2);
    var datestring = year + '-' + month + '-' + (day);
    var timestring = hour + ':' + minutes + ':' + seconds;
    
    var posted = posted || {};
    posted.d = datestring;
    posted.t = timestring;
    
    query.posted = posted;
    
    if (req.user._id != '') {
        
        OpenEndedAnswers.create(query, function (err, data) {
            if (!err) {
                res.json({'status': true, 'message': 'Open ended answers saved'});
            } else {
                res.json({'status': false, 'message': 'Error: Open ended answers - something went wrong..'});
            }
        });
        
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
    }

};







