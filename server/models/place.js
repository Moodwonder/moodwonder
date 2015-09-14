/**
 * Defining a Place Model in mongoose
 *
 * For Saving Continent, Country, State, City
 */

var mongoose = require('mongoose');

/**
 * Place Schema
 */
var PlaceSchema = new mongoose.Schema({
  continent: { type: String },
  countries: [
	{
		country: {type: String},
		states: [
			{
				state: {type: String},
				city: []
			}
		]
	}
  ]
});

module.exports = mongoose.model('Place', PlaceSchema);
