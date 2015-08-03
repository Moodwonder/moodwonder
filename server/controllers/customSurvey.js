var _ = require('lodash');
var mongoose = require('mongoose');
var CustomSurvey = require('../models/customSurvey');


/**
 * POST /customSurvey
 */
exports.createForm = function (req, res) {
    var query = req.body;
    //console.log(query);
    CustomSurvey.create(query, function (err, candies) {
        if (!err) {
            res.json({'status': true, 'message': 'query success'});
        } else {
            res.json({'status': false, 'message': 'query failed'});
        }
    });
};

/**
 * Get all custome survey forms 
 */
exports.getForms = function (req, res) {
    CustomSurvey.find({}).exec(function (err, forms) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.forms = forms;
            //res.json(forms);
            //console.log(forms);
        } else {
            response.status = 'failure';
            response.forms = [];
            console.log('Error in first query');
        }
        res.send(response);
        res.end();
    });
};

/**
 * Get all custome survey forms 
 */
exports.deleteForm = function (req, res) {
    var _id = mongoose.Types.ObjectId(req.body.id);
    CustomSurvey.remove({_id: _id}, function (err) {
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
 * Get custome survey form by _id 
 */
exports.getSurveyForm = function (req, res) {
    var _id = mongoose.Types.ObjectId('55bf3fb8052965b025b67ec8');
    CustomSurvey.findOne({_id: _id}).exec(function (err, form) {
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





