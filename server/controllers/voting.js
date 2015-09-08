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
	, conditions = { "company": mycompany, "votefor_userid": votefor_userid, "user_id": new ObjectId(req.user._id), postdate : { $regex : /^2015-09/ } };

        // check already voted or not
        Vote.findOne(conditions, function (err, document) {
            if (document) {

				response.status = false;
				response.message = 'Already voted for this user';
				res.send(response);
				res.end();
            } else {

				// add a record with new vote
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
            }
        });
};

