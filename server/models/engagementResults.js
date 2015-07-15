/**
 * Defining a engagementArea Model in mongoose
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');

// Other oauthtypes to be added

/**
 *engagementArea Schema
 */
var engagementResultsSchema = new mongoose.Schema({
    user_id: {type: String, default: ''},
    engagementarea_id: {type: String, default: ''},
    ratting: {type: Number, default: 0},
    date: { type: Date, default: Date.now }
},{
    collection: 'engagementResults'
});
module.exports = mongoose.model('engagementResults', engagementResultsSchema);
