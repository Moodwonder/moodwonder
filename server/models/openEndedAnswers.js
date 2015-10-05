/**
 * Defining a openEndedAnswers Model in mongoose
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * openEndedAnswers Schema
 */
var openEndedAnswersSchema = new mongoose.Schema({
    user_id: {type: String, default: ''},
    most_improved_aone : {type: String, default: ''},
    most_improved_atwo : {type: String, default: ''},
    most_improved_athree : {type: String, default: ''},
    least_improved_aone : {type: String, default: ''},
    least_improved_atwo : {type: String, default: ''},
    least_improved_athree : {type: String, default: ''},
    posted: {
        d: {type: String},
        t: {type: String}
    }    
}, {
    collection: 'openEndedAnswers'
});
module.exports = mongoose.model('openEndedAnswers', openEndedAnswersSchema);
