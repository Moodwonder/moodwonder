/**
 * Defining a customSurvey Model in mongoose
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');


/**
 * customSurvey Schema
 */
var customSurveySchema = new mongoose.Schema({
    surveytitle: {type: String, default: ''},
    user_id: {type: String, default: ''},
    createddate: { type: Date, default: Date.now },
    target_teamid: {type: String, default: ''},
    questions : [{
      question : {type: String, default: ''},
      question_id : {type: String, default: ''},
      answertype : {type: String, default: ''},
      answers : [{
        option : {type: String, default: ''}       
      }]
    }]    
},{
    collection: 'customSurvey'
});
module.exports = mongoose.model('customSurvey', customSurveySchema);
