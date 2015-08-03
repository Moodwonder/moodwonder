var _ = require('lodash');
var mongoose = require('mongoose');
var customSurveyResults = require('../models/customSurveyResults');

/**
 * Get custome survey form by _id 
 */
exports.getSurveyForm = function (req, res) {
    var _id = mongoose.Types.ObjectId('55bf3fb8052965b025b67ec8');
    customSurveyResults.findOne({_id: _id}).exec(function (err, form) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.form = form;
            console.log(form);
            //res.json(forms);
            //console.log(forms);
        } else {
            response.status = 'failure';
            response.form = [];
        }
        res.send(response);
        res.end();
    });
};







