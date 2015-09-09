var _ = require('lodash');
var User = require('../models/user');
var Vote = require('../models/vote');
var ObjectId = require('mongoose').Types.ObjectId;



/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * post vote and comment for Employee of the month
 *
 * Accept : -  @votefor_userid,comment
 */
exports.postVote = function(req, res, next) {

  var votefor_userid  = req.body.emp_id;
  var comment  = req.body.comment;
  votefor_userid  = new ObjectId(votefor_userid);
	var mycompany = '';
	try {
		mycompany = req.user.company_info[0].companyname;
	} catch (ex) {
		mycompany = false;
	}
	var date = new Date();
	// date with YYYY-MM-DD format
	var cdate = JSON.stringify(date).substring(1, 11);
	
	var yearmonth = "/^"+cdate.substring(0, 6)+"/"
	, conditions = { "company": mycompany, "user_id": new ObjectId(req.user._id), postdate : { $regex : /^2015-09/ } };

	// checking all ready done 5 votes for this month
	
	Vote.find(conditions, function (err, document) {
		var alreadyvoted = false;
		var mytotalvotes = 0;
		document.map(function (data, key){
			mytotalvotes++;
			// check already voted or not
			if(data.votefor_userid === votefor_userid){
				alreadyvoted = true;
			}
		});

		// check already voted or not
		if(alreadyvoted){

			response.status = false;
			response.message = 'Already voted for this user';
			res.send(response);
			res.end();
		}
		else if(mytotalvotes < 5){

			// add a record with new vote
			conditions.votefor_userid = votefor_userid;
			conditions.postdate = cdate;
			conditions.comment = comment;
			var vote = new Vote(conditions);
			vote.save(function (err) {
				if (!err) {
					response.status = true;
					response.message = 'success';
				} else {
					response.status = false;
					response.message = 'something went wrong';
				}
				res.send(response);
				res.end();
			});
		} else {

			response.status = false;
			response.message = 'You cannot vote for more than 5 people';
			res.send(response);
			res.end();
		}
	});
};

