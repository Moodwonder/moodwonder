var Place = require('../models/place');

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * handlePlaces
 */
exports.handlePlaces = function(req, res, next) {

	Place.find({}, function (err, document) {
		var places = [];
		if(document){
			document.map(function (data, key){
				places[key] = { continent: data.continent, countries: data.countries };
			});
		}
		req.body.places = places;
		// going to * route handler
		next();
	});
};

