var _ = require('lodash');
var mongoose = require('mongoose');
var EngagementArea = require('../models/engagementArea');
var EngagementResults = require('../models/engagementResults');

/**
 * GET /getEngagementSurvey
 */
exports.getEngagementSurvey = function (req, res) {

    EngagementArea.find({status: 'active'}).exec(function (err, lists) {
        if (!err) {
            res.json(lists);
        } else {
            console.log('Error in first query');
        }
    });
};

/**
 * POST /saveEngagementSurveyResult
 */
exports.saveEngagementSurveyResult_bk = function (req, res) {

    var qry = req.body;
    qry.user_id = req.user._id;
    if (req.user._id != '') {
        EngagementResults.create(qry, function (err, candies) {
            if (!err) {
                res.json({'status': true, 'message': 'Your mood is updated'});
            } else {
                res.json({'status': false, 'message': 'Error: something went wrong..'});
            }
        });
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
    }

};


/**
 * save survey results
 */
exports.saveEngagementSurveyResult = function (req, res) {

    var surveyresults = req.body;

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hour = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var datestring = year + '-' + month + '-' + day;
    var timestring = hour + ':' + minutes + ':' + seconds;


    var created = created || {};
    created.d = datestring;
    created.t = timestring;

    var length = surveyresults.length;
    var response = {};

    for (var i = 0; i < length; i++) {

        var row = {};
        row.user_id = mongoose.Types.ObjectId(req.user._id);
        row.mood = surveyresults[i]['mood'];
        row.rating = surveyresults[i]['rating'];
        row.created = created;

        EngagementResults.create(row, function (err, item) {
            if (!err) {
                response.status = true;
            } else {
                response.status = false;
            }
        });

    }
    res.json(response);
    res.end();
};


exports.getLastSurvey = function (req, res) {

    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {_id: -1}; // -1: DESC; 1: ASC
    var limit = 13;

    EngagementResults.find(condition).sort(orderby).limit(limit).exec(function (err, rows) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.data = rows;
            //console.log(rows);
        } else {
            response.status = 'failure';
            response.data = [];
            console.log('Error in getLastSurvey');
        }
        res.send(response);
        res.end();
    });
};







