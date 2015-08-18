var _ = require('lodash');
var EngagementArea = require('../models/engagementArea');
var EngagementResults = require('../models/engagementResults');

/**
 * GET /getEngagementSurvey
 */
exports.getEngagementSurvey = function(req, res) {

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
  qry.user_id = req.user._id;
  if(req.user._id != '') {
    EngagementResults.create(qry, function (err, candies) {
      if (!err){
          res.json({'status':true,'message':'Your mood is updated'});
      }else{
          res.json({'status':false,'message':'Error: something went wrong..'});
      }
    });
  }else{
    res.json({'status':false,'message':'Session expired.!'});
  }

};





