/**
 * Defining a login page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var loginPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    LOIGN_TITLE: {type: String, default: ''},
    USERNAME: {type: String, default: ''},
    PASSWORD: {type: String, default: ''},
    FORGOT_PASSWORD: {type: String, default: ''}
}, {
    collection: 'loginpage'
});
module.exports = mongoose.model('loginpage', loginPageSchema);
