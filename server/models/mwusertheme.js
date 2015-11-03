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
    L_LOGOUT_LINK: {type: String, default: ''}
}, {
    collection: 'mwusertheme'
});
module.exports = mongoose.model('mwusertheme', mwuserthemeSchema);
