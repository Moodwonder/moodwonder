/**
 * Defining a schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var mymoodpageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    MYMD_EGRAPH: {type: String, default: ''},
    MYMD_MRATING: {type: String, default: ''},
    MYMD_CSURVEY: {type: String, default: ''},
    MYMD_OPTMWINDEX: {type: String, default: ''},
    MYMD_OPTMOOD: {type: String, default: ''},
    MYMD_OPTMEANING: {type: String, default: ''},
    MYMD_OPTEXPECTATIONS: {type: String, default: ''},
    MYMD_OPTSTRENGTHS: {type: String, default: ''},
    MYMD_OPTRECOGNITION: {type: String, default: ''},
    MYMD_OPTDEVELOPMENT: {type: String, default: ''},
    MYMD_OPTINFLUENCE: {type: String, default: ''},
    MYMD_OPTGOALS: {type: String, default: ''},
    MYMD_OPTTEAM: {type: String, default: ''},
    MYMD_OPTFRIENDSHIP: {type: String, default: ''},
    MYMD_OPTFEEDBACK: {type: String, default: ''},
    MYMD_OPTOPPORTUNITIES: {type: String, default: ''},
    MYMD_OPTRECOMMENDATION: {type: String, default: ''},
    MYMD_OPTALLTIME: {type: String, default: ''},
    MYMD_OPTTWELVE: {type: String, default: ''},
    MYMD_OPTSIX: {type: String, default: ''},
    MYMD_OPTTHREE: {type: String, default: ''},
    MYMD_OPTLASTMONTH: {type: String, default: ''},
    MYMD_ATSTART: {type: String, default: ''},
    MYMD_HIGHEST: {type: String, default: ''},
    MYMD_LOWEST: {type: String, default: ''},
    MYMD_CURRENT: {type: String, default: ''},
    MYMD_DAYS_CHANGE: {type: String, default: ''},
    MYMD_WEEK_CHANGE: {type: String, default: ''},
    MYMD_E_ENGAGEMENT: {type: String, default: ''},
    MYMD_MOST_ENGAGING: {type: String, default: ''},
    MYMD_TOPTHREEAREAS_HEADING: {type: String, default: ''},
    MYMD_WORSTTHREEAREAS_HEADING: {type: String, default: ''},
    MYMD_MOSTIMPROVEDAREAS_HEADING: {type: String, default: ''},
    MYMD_LEASTIMPROVEDAREAS_HEADING: {type: String, default: ''},
    MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING: {type: String, default: ''},
    MYMD_LOWERTHANCOMPANYAVERAGE_HEADING: {type: String, default: ''},
    MYMD_HIGHERCAVERAGE_EMPTYMSG: {type: String, default: ''},
    MYMD_LOWERCAVERAGE_EMPTYMSG: {type: String, default: ''}
        
}, {
    collection: 'mymoodpage'
});
module.exports = mongoose.model('mymoodpage', mymoodpageSchema);


