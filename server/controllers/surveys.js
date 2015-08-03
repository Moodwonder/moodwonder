var _ = require('lodash');
var EngagementArea = require('../models/engagementArea');
var EngagementResults = require('../models/engagementResults');

/**
 * GET /getEngagementSurvey
 */
exports.getEngagementSurvey = function(req, res) {
  console.log(sess);
  EngagementArea.find({}).exec(function(err, lists) {
    if(!err) {
      res.json(lists);
    } else {
      console.log('Error in first query');
    }
  });
};

/**
 * POST /saveEngagementSurveyResult
 */
exports.saveEngagementSurveyResult = function(req, res) {
  var qry = req.body;
  qry.user_id = sess._id;
  EngagementResults.create(qry, function (err, candies) {
    if (!err){
        res.json({'status':true,'message':'query success'});
    }else{
        res.json({'status':false,'message':'query failed'});
    }
  });
};





