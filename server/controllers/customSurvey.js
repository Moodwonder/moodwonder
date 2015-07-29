var _ = require('lodash');
var CustomSurvey = require('../models/customSurvey');


/**
 * POST /customSurvey
 */
exports.createCustomSurveyForm = function (req, res) {
    var query = req.body;
    console.log(query);
    CustomSurvey.create(query, function (err, candies) {
        if (!err) {
            res.json({'status': true, 'message': 'query success'});
        } else {
            res.json({'status': false, 'message': 'query failed'});
        }
    });
};





