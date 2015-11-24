var Places   = require('../models/place');
var Industry = require('../models/industry');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var secrets = require('../config/secrets');

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

var hasValue = function(val){
    if(val !== undefined && val !== ''){
        return true;
    }else{
        return false;
    }
}

/**
 * handlePlaces
 */
exports.handleGetContinents = function(req, res, next) {

    Places.Continent.find({}, function (err, document) {
        var continents = [];
        if(document){
            document.map(function (data, key){
                continents[key] = { _id: data._id ,text: data.name };
            });
        }

        req.body.continents = continents;
        // going to * route handler
        next();
    });
};

/**
 * addIndustry
 */
exports.addIndustry = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var name = req.body.name;
    
    if(name !== undefined && name !== ''){
        Industry.findOne({ name: name }).exec(function (err, industrydoc) {
            if(!err){

                if(industrydoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{
                    industry = new Industry({ name: name });
                    industry.save(function (err, newdoc) {
                        if(!err){
                            response.status = true;
                            response.message = 'Industry added..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{
                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }

};
/**
 * getIndustry
 */
exports.getIndustry = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

    var data = {};
    data.header = ['Id','Industry name', 'Actions'];
    data.rows   = [];
    data.class = "table";

    Industry.find({}).exec(function (err, list) {
        if(!err){
            response.status  = true;
            response.message = 'success';
            list.map(function(row, key){
                data.rows[key] = [
                    { column: row._id, display : false },
                    { column: row.name, edit: true },
                    { column: '', remove: true }
                 ];
            });
            response.data    = data;
            res.send(response);
            res.end();
        }else{
            res.send(response);
            res.end();
        }
    });

};
/**
 * updateIndustry
 */
exports.updateIndustry = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var name = req.body.teamname; 
    var _id = req.body.teamid;
    var hasName = (name !== undefined && name !== '');
    var hasId = (_id !== undefined && _id !== '');

    if(hasName && hasId){
        Industry.findOne({ name: name }).exec(function (err, industrydoc) {
            if(!err){
                if(industrydoc !==null){

                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: name };
                    Industry.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'Industry updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }

};

/**
 * delete Industry
 */
exports.deleteIndustry = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var _id = req.body._id;
    var hasId = (_id !== undefined && _id !== '');

    if(hasId){
        Industry.remove({ _id: new ObjectId(_id) }).exec(function (err, industrydoc) {

            if(!err){

                response.status = true;
                response.message = 'Industry deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }
};

/**
 * add Places
 */
exports.addPlaces = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

	var place     =   req.body.place;
	var placeType =   req.body.placeType;
	var action    =   req.body.action;
	var _id       =   req.body._id;

    // to add continent
    if( hasValue(place) && hasValue(placeType) && placeType === 'continent' ){

		Places.Continent.findOne({ name: { $regex: new RegExp("^" + place, "i") } }).exec(function (err, continentdoc) {
			if(!err){

				if(continentdoc !==null){
					response.message = 'Already Exist..';
					res.send(response);
					res.end();
				}else{
					continent = new Places.Continent({ name: place });
					continent.save(function (err, newdoc) {
						if(!err){
							response.status = true;
							response.message = 'new record added..';
							res.send(response);
							res.end();
						}else{
							res.send(response);
							res.end();
						}
					});
				}
			}else{
				res.send(response);
				res.end();
			}
		});

    }else if( hasValue(place) && hasValue(placeType) && hasValue(_id) && placeType === 'country' ){

		Places.Country.findOne({ name: { $regex: new RegExp("^" + place, "i") } }).exec(function (err, countrydoc) {
			if(!err){

				if(countrydoc !==null){
					response.message = 'Already Exist..';
					res.send(response);
					res.end();
				}else{
					country = new Places.Country({ continent_id: _id, name: place });
					country.save(function (err, newdoc) {
						if(!err){
							response.status = true;
							response.message = 'new record added..';
							res.send(response);
							res.end();
						}else{
							res.send(response);
							res.end();
						}
					});
				}
			}else{
				res.send(response);
				res.end();
			}
		});
    }else if( hasValue(place) && hasValue(placeType) && hasValue(_id) && placeType === 'state' ){

		Places.State.findOne({ name: { $regex: new RegExp("^" + place, "i") } }).exec(function (err, statedoc) {
			if(!err){

				if(statedoc !==null){
					response.message = 'Already Exist..';
					res.send(response);
					res.end();
				}else{
					state = new Places.State({ country_id: _id, name: place });
					state.save(function (err, newdoc) {
						if(!err){
							response.status = true;
							response.message = 'new record added..';
							res.send(response);
							res.end();
						}else{
							res.send(response);
							res.end();
						}
					});
				}
			}else{
				res.send(response);
				res.end();
			}
		});
    }else if( hasValue(place) && hasValue(placeType) && hasValue(_id) && placeType === 'city' ){

		Places.City.findOne({ name: { $regex: new RegExp("^" + place, "i") } }).exec(function (err, statedoc) {
			if(!err){

				if(statedoc !==null){
					response.message = 'Already Exist..';
					res.send(response);
					res.end();
				}else{
					city = new Places.City({ state_id: _id, name: place });
					city.save(function (err, newdoc) {
						if(!err){
							response.status = true;
							response.message = 'new record added..';
							res.send(response);
							res.end();
						}else{
							res.send(response);
							res.end();
						}
					});
				}
			}else{
				res.send(response);
				res.end();
			}
		});
    }
};

/**
 * get Places
 */
exports.getPlaces = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

	var placeType =   req.body.placeType;
	var _id       =   req.body._id;

    if( hasValue(placeType) && placeType === 'continent' ){

		var data = {};
		data.header = ['Id','Continent name','View countries','Actions'];
		data.rows   = [];
		data.class = "table";

		Places.Continent.find({}).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				list.map(function(row, key){
					data.rows[key] = [
						{ column: row._id, display : false },
						{ column: row.name, edit: true },
						{ column: '', Link: true },
						{ column: '', remove: true }
					];
				});
				response.data    = data;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}else if( hasValue(placeType) && placeType === 'country' && hasValue(_id) ){

		var data = {};
		data.header = ['Id','Country name','View states','Actions'];
		data.rows   = [];
		data.class = "table";

		var condition = { continent_id: _id };

		Places.Country.find(condition).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				list.map(function(row, key){
					data.rows[key] = [
						{ column: row._id, display : false },
						{ column: row.name, edit: true },
						{ column: '', Link: true },
						{ column: '', remove: true }
					];
				});
				response.data    = data;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}else if( hasValue(placeType) && placeType === 'state' && hasValue(_id) ){

		var data = {};
		data.header = ['Id','State name','View cities','Actions'];
		data.rows   = [];
		data.class = "table";

		var condition = { country_id: _id };

		Places.State.find(condition).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				list.map(function(row, key){
					data.rows[key] = [
						{ column: row._id, display : false },
						{ column: row.name, edit: true },
						{ column: '', Link: true },
						{ column: '', remove: true }
					];
				});
				response.data    = data;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}else if( hasValue(placeType) && placeType === 'city' && hasValue(_id) ){

		var data = {};
		data.header = ['Id','City name','Actions'];
		data.rows   = [];
		data.class = "table";

		var condition = { state_id: _id };

		Places.City.find(condition).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				list.map(function(row, key){
					data.rows[key] = [
						{ column: row._id, display : false },
						{ column: row.name, edit: true },
						{ column: '', remove: true }
					];
				});
				response.data    = data;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}

};

/**
 * updatePlaces
 */
exports.updatePlaces = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

	var place     =   req.body.place;
	var placeType =   req.body.placeType;
	var _id       =   req.body._id;

	if( hasValue(place) && hasValue(_id) && hasValue(placeType) && placeType === 'continent' ){

        Places.Continent.findOne({ name: { $regex: new RegExp("//^" + place+ "$/", "i") } }).exec(function (err, continentdoc) {
            if(!err){

                if(continentdoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.Continent.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
	}else if( hasValue(place) && hasValue(_id) && hasValue(placeType) && placeType === 'country' ){

        Places.Country.findOne({ name: { $regex: new RegExp("^" + place, "i") } }).exec(function (err, countrydoc) {
            if(!err){

                if(countrydoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.Country.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
	}else if( hasValue(place) && hasValue(_id) && hasValue(placeType) && placeType === 'state' ){

        Places.State.findOne({ name: { $regex: new RegExp("^" + place, "i") } }).exec(function (err, statedoc) {
            if(!err){

                if(statedoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.State.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
	}else if( hasValue(place) && hasValue(_id) && hasValue(placeType) && placeType === 'city' ){

        Places.City.findOne({ name: { $regex: new RegExp("^" + place, "i") } }).exec(function (err, statedoc) {
            if(!err){

                if(statedoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.City.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
	}else{
        res.send(response);
        res.end();
    }

};
/**
 * delete Places
 */
exports.deletePlaces = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var _id  = req.body._id;
    var placeType = req.body.placeType;

    if(hasValue(_id) && hasValue(placeType) && placeType === 'continent'){

        Places.Continent.remove({ _id: new ObjectId(_id) }).exec(function (err, industrydoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if(hasValue(_id) && hasValue(placeType) && placeType === 'country'){

        var where = { _id: new ObjectId(_id) };

        Places.Country.remove(where).exec(function (err, placeDoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if(hasValue(_id) && hasValue(placeType) && placeType === 'state'){

        var where = { _id: new ObjectId(_id) };

        Places.State.remove(where).exec(function (err, placeDoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if(hasValue(_id) && hasValue(placeType) && placeType === 'city'){

        var where = { _id: new ObjectId(_id) };

        Places.City.remove(where).exec(function (err, placeDoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }
    else{
        res.send(response);
        res.end();
    }
};

/**
 * get Places Data
 */
exports.getPlacesData = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

    var modifyData = function(list){
		var data = [{ _id: 1,  text: 'Other'}];
		list.map(function(row, key){
			data[key] = { _id: row._id,  text: row.name};
		});
		return data;
	}

	var placeType =   req.body.placeType;
	var _id       =   req.body._id;

    if( hasValue(placeType) && placeType === 'continent' ){

		Places.Continent.find({}).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				response.data    = {};
				response.data.places    = modifyData(list);
				response.data.placeType = placeType;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}else if( hasValue(placeType) && placeType === 'country' && hasValue(_id) ){

		var condition = { continent_id: _id };
		Places.Country.find(condition).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				response.data    = {};
				response.data.places    = modifyData(list);
				response.data.placeType = placeType;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}else if( hasValue(placeType) && placeType === 'state' && hasValue(_id) ){

		var condition = { country_id: _id };
		Places.State.find(condition).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				response.data    = {};
				response.data.places    = modifyData(list);
				response.data.placeType = placeType;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}else if( hasValue(placeType) && placeType === 'city' && hasValue(_id) ){

		var condition = { state_id: _id };
		Places.City.find(condition).exec(function (err, list) {
			if(!err){
				response.status  = true;
				response.message = 'success';
				response.data    = {};
				response.data.places    = modifyData(list);
				response.data.placeType = placeType;
				res.send(response);
				res.end();
			}else{
				res.send(response);
				res.end();
			}
		});
	}

};

/**
 * get Places Data
**/
exports.requestDemo = function(req, res) {
    var response     = {};
    response.status  = false;
    response.messages = ['Error'];

	var transporter = nodemailer.createTransport();
	var body = "<br><table> "+
				"<tr> <td>Name</td> <td>: "+req.body.name+"</td> </tr>"+
				"<tr> <td>Email</td> <td>: "+req.body.email+"</td> </tr>"+
				"<tr> <td>Mobile</td> <td>: "+req.body.mobile+"</td> </tr>"+
				"<tr> <td>Message</td> <td>: "+req.body.text+"</td> </tr>"+
				"</table>";
	body = emailTemplate.general(body);

	var mailOptions = {
		from: 'admin@moodewonder.com',
		to: secrets.adminemail,
		subject: 'MoodWonder demo request',
		html: body
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.send(response);
			res.end();
		}else{
			console.log('Message sent: ' + info.response);
			response.status  = true;
			response.messages = ['We will get back to you soon !'];
			res.send(response);
			res.end();
		}
	});
};
