/**
 * Defining a signup page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var signupPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    SIGNUP_TITLE: {type: String, default: ''},
    SUB_TITLE: {type: String, default: ''}    
}, {
    collection: 'signuppage'
});
module.exports = mongoose.model('signuppage', signupPageSchema);
