/**
 * Defining a Team Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 *Team Schema
 */
var TeamSchema = new mongoose.Schema({
  teamname: {type: String, default: ''},
  manager_id: Schema.Types.ObjectId,
  admin_id: Schema.Types.ObjectId,
  member_ids: [{ user_id : Schema.Types.ObjectId }]
});

TeamSchema.pre('save', function (next) {
next();
});

/**
 * Statics
 */
TeamSchema.statics = {}

module.exports = mongoose.model('Teams', TeamSchema);
