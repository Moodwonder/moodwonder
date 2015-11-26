/**
 * Defining a mwtheme page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var mwuserthemeSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    L_MYMOOD_LINK: {type: String, default: ''},
    L_MYACCOUNT_LINK: {type: String, default: ''},
    L_MYCOMPANY_LINK: {type: String, default: ''},
    L_INVITE_PEOPLE_TITLE: {type: String, default: ''},
    L_INVITE_PEOPLE_DES: {type: String, default: ''},
    L_INVITE_INPUT_PLCHOLDER: {type: String, default: ''},
    L_INVITE_BTN: {type: String, default: ''},
    L_MYPROFILE_LINK: {type: String, default: ''},
    L_LOGOUT_LINK: {type: String, default: ''},
    TOP_RATE_YOUR_MOOD: {type: String, default: ''},
    TOP_RATE_YOUR_MOOD_DESC: {type: String, default: ''},
    TOP_RATE_YOUR_MOOD_BTN: {type: String, default: ''},
    TOP_RATE_YOUR_MOOD_ANSWER_ALL_BTN: {type: String, default: ''},
    TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: {type: String, default: ''},
    TOP_RIGHT_SIDE_LOGOUT_LINK: {type: String, default: ''},
    RIGHT_SIDEBAR_QUICK_STATISTICS: {type: String, default: ''},
    RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: {type: String, default: ''},
    RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: {type: String, default: ''},
    RIGHT_SIDEBAR_NO_OF_RESPONSES: {type: String, default: ''},
    RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: {type: String, default: ''},
    RIGHT_SIDEBAR_RESPONSE_COMPARISON: {type: String, default: ''}
}, {
    collection: 'mwusertheme'
});
module.exports = mongoose.model('mwusertheme', mwuserthemeSchema);
