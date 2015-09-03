/**
 * Defining a home page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var homePageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    HOM_TITLE: {type: String, default: ''}
}, {
    collection: 'homepage'
});
module.exports = mongoose.model('homepage', homePageSchema);
