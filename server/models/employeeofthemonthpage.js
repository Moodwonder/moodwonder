/**
 * Defining a employee of the month page schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var employeeofthemonthPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    EOM_TITLE_1: {type: String, default: ''},
    EOM_SEARCH_PLACEHOLDER_1: {type: String, default: ''},
    EOM_SEARCH_BTN_1: {type: String, default: ''},
    EOM_TITLE_1: {type: String, default: ''},
    EOM_SHOW_MORE: {type: String, default: ''}
}, {
    collection: 'employeeofthemonthpage'
});
module.exports = mongoose.model('employeeofthemonthpage', employeeofthemonthPageSchema);
