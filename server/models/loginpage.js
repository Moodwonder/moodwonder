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
    LGN_TITLE: {type: String, default: ''},
    LGN_USERNAME: {type: String, default: ''},
    LGN_PASSWORD: {type: String, default: ''},
    LGN_FORGOT_PASSWORD: {type: String, default: ''},
    LGN_BTN_SUBMIT: {type: String, default: ''}
}, {
    collection: 'loginpage'
});
module.exports = mongoose.model('loginpage', loginPageSchema);
