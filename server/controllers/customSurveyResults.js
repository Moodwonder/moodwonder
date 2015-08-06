var _ = require('lodash');
var mongoose = require('mongoose');
var CustomSurveyResults = require('../models/customSurveyResults');

/**
 * save survey results
 */
exports.saveSurveyResults = function (req, res) {
    
    var surveyresults = req.body.surveyresults;
    var length = surveyresults.length;
    var response = {};
    
    for (var i = 0; i < length; i++) {
        var row = {};
        row = surveyresults[i];
        row.survey_id = mongoose.Types.ObjectId(surveyresults[i].survey_id);
        CustomSurveyResults.create(JSON.parse(row), function (err, data) {
            if (!err) {
                response.status = 'success';
            } else {
                response.status = 'failure';
            }
        });
    }
    res.json({'status': true});
    res.end();
};







