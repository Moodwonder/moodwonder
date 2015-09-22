var _ = require('underscore');
var mongoose = require('mongoose');
var EngagementArea = require('../models/engagementArea');
var EngagementResults = require('../models/engagementResults');
var EngagementResults = require('../models/engagementResults');
var User = require('../models/user');

/**
 * GET /getEngagementSurvey
 */
exports.getEngagementSurvey = function (req, res) {

    EngagementArea.find({status: 'active'}).exec(function (err, lists) {
        if (!err) {
            res.json(lists);
        } else {
            console.log('Error in first query');
        }
    });
};


/**
 * POST /saveEngagementSurveyResult
 */
exports.saveEngagementSurveyResult_bk = function (req, res) {

    var qry = req.body;
    qry.user_id = req.user._id;
    if (req.user._id != '') {
        EngagementResults.create(qry, function (err, candies) {
            if (!err) {
            res.json({'status': true, 'message': 'Your mood is updated'});
            } else {
            res.json({'status': false, 'message': 'Error: something went wrong..'});
            }
        });
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
    }

};


function getEngagementResultsByDate(user_id, createddate, callback) {

    var condition = {'user_id': mongoose.Types.ObjectId(user_id), 'created.d': {$eq: createddate}};
    EngagementResults.find(condition).sort({_id: - 1}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}



/**
 * save survey results
 */
exports.saveEngagementSurveyResult = function (req, res) {

var surveyresults = req.body;
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice( - 2);
        var day = ('0' + today.getDate()).slice( - 2);
        var hour = ('0' + today.getHours()).slice( - 2);
        var minutes = ('0' + today.getMinutes()).slice( - 2);
        var seconds = ('0' + today.getSeconds()).slice( - 2);
        var datestring = year + '-' + month + '-' + (day);
        var timestring = hour + ':' + minutes + ':' + seconds;
        var user_id = mongoose.Types.ObjectId(req.user._id);
        var created = created || {};
        created.d = datestring;
        created.t = timestring;
        var length = surveyresults.length;
        var response = {};
        getEngagementResultsByDate(user_id, datestring, function (data) {

        if (data.length > 0) {
        var condition = {'user_id': mongoose.Types.ObjectId(user_id), 'created.d': {$eq: datestring}};
                EngagementResults.remove(condition).exec(function (err) {
        if (!err) {

        }
        });
        }

        for (var i = 0; i < length; i++) {
        var row = {};
                row.user_id = mongoose.Types.ObjectId(req.user._id);
                row.mood = surveyresults[i]['mood'];
                row.rating = surveyresults[i]['rating'];
                row.comment_title = surveyresults[i]['comment_title'];
                row.comment = surveyresults[i]['comment'];
                row.created = created;
                EngagementResults.create(row, function (err, item) {
                if (!err) {
                response.status = true;
                } else {
                response.status = false;
                }
                });
        }
        res.send({status: true});
                res.end();
        });
};
        function getLasteRatedMood(user_id, callback) {
        // Last rated mood 
        EngagementResults.findOne({user_id: user_id, mood: 'Mood'}).sort({_id: - 1}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
        callback(docs);
        }
        });
        }


exports.getLastSurvey = function (req, res) {

var user_id = mongoose.Types.ObjectId(req.user._id);
        var condition = {user_id: user_id};
        var orderby = {_id: - 1}; // -1: DESC; 1: ASC
        var limit = 13;
        getLasteRatedMood(user_id, function (lastmood) {

        EngagementResults.find(condition).sort(orderby).limit(limit).exec(function (err, rows) {
        var response = {};
                if (!err) {
        response.status = 'success';
                response.data = rows;
                response.lastmood = lastmood;
        } else {
        response.status = 'failure';
                response.data = [];
                response.lastmood = [];
                console.log('Error in getLastSurvey');
        }
        res.send(response);
                res.end();
        });
        });
};


exports.getSurveyResults = function (req, res) {

        var user_id = mongoose.Types.ObjectId(req.user._id);
                var condition = {user_id: user_id};
                var orderby = {_id: 1}; // -1: DESC; 1: ASC

                getLasteRatedMood(user_id, function (lastmood) {

                EngagementResults.find(condition).sort(orderby).exec(function (err, rows) {
                var response = {};
                        if (!err) {
                response.status = 'success';
                        response.data = rows;
                        response.lastmood = lastmood;
                        //console.log('getSurveyResults');
                        // console.log(response);
                } else {
                response.status = 'failure';
                        response.data = [];
                        response.lastmood = [];
                        console.log('Error in getLastSurvey');
                }
                res.send(response);
                        res.end();
                });
                });
};
        
        
        
function getUsersByCompany(company, callback) {
    
    User.find({company_info: {$elemMatch: {companyname: company}}}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}


function getResultsByUserId(uid, callback) {

    var user_id = mongoose.Types.ObjectId(uid);
    var condition = {user_id: user_id};
    EngagementResults.find(condition).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}


exports.getResultsByComapny = function (req, res) {
    //console.log('req.user');
    //console.log(req.user);
    var currentUser = req.user;
    var company = currentUser.company_info[0].companyname;
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {_id: 1}; // -1: DESC; 1: ASC

    getUsersByCompany(company, function (docs) {

        var ids = _(docs).map(function (g, key) {
            return g._id;
        });
        
        //console.log('ids');
        //console.log(ids);
        var result = result || {};
        result.currentuser = req.user._id;
        EngagementResults.find({user_id: { $in: ids }}).sort(orderby).lean().exec(function (err, rows) {
            var response = {};
            if (!err) {
                response.status = 'success';
                response.currentuser = req.user._id;
                response.data = rows;
            } else {
                response.status = 'failure';
                response.data = [];
                response.currentuser = req.user._id;
                console.log('Error in getResultsByComapny');
            }
            res.send(response);
            res.end();
        });
    
    
    });

};



function getUsersByIndustry(industry, company, callback) {
    var condition = {company_info: {$elemMatch: {companyname: company, industry: industry}}};
    
    User.find(condition).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}


exports.getResultsByIndustry = function (req, res) {
    //console.log('req.user');
    //console.log(req.user);
    var currentUser = req.user;
    var company = currentUser.company_info[0].companyname;
    var industry = currentUser.company_info[0].industry;
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {_id: 1}; // -1: DESC; 1: ASC

    getUsersByIndustry(industry, company, function (docs) {

        var ids = _(docs).map(function (g, key) {
            return g._id;
        });
        
        //console.log('ids');
        //console.log(ids);
        var result = result || {};
        result.currentuser = req.user._id;
        EngagementResults.find({user_id: { $in: ids }}).sort(orderby).lean().exec(function (err, rows) {
            var response = {};
            if (!err) {
                response.status = 'success';
                response.currentuser = req.user._id;
                response.data = rows;
            } else {
                response.status = 'failure';
                response.data = [];
                response.currentuser = req.user._id;
                console.log('Error in getResultsByIndustry');
            }
            res.send(response);
            res.end();
        });
    
    
    });

};


function getUsersByCountry(country, company, callback) {
    var condition = {company_info: {$elemMatch: {companyname: company, country: country}}};
    
    User.find(condition).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}


exports.getResultsByCountry = function (req, res) {
    //console.log('req.user');
    //console.log(req.user);
    var currentUser = req.user;
    var company = currentUser.company_info[0].companyname;
    var country = currentUser.company_info[0].country;
    //console.log('country');
    //console.log(country);
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {_id: 1}; // -1: DESC; 1: ASC

    getUsersByCountry(country, company, function (docs) {

        var ids = _(docs).map(function (g, key) {
            return g._id;
        });
        
        //console.log('ids');
        //console.log(ids);
        var result = result || {};
        result.currentuser = req.user._id;
        EngagementResults.find({user_id: { $in: ids }}).sort(orderby).lean().exec(function (err, rows) {
            var response = {};
            if (!err) {
                response.status = 'success';
                response.currentuser = req.user._id;
                response.data = rows;
            } else {
                response.status = 'failure';
                response.data = [];
                response.currentuser = req.user._id;
                console.log('Error in getResultsByCountry');
            }
            res.send(response);
            res.end();
        });
    
    
    });

};







