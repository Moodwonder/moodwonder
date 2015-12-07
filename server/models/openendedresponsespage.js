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
var openendedresponsespageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    OPER_TITLE: {type: String, default: ''}
}, {
    collection: 'openendedresponsespage'
});
module.exports = mongoose.model('openendedresponsespage', openendedresponsespageSchema);


