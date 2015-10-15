var _ = require('underscore');
var mongoose = require('mongoose');
var Team = require('../models/team');
var User = require('../models/user');
var nodemailer = require("nodemailer");
var CustomSurvey = require('../models/customSurvey');
var emailTemplate = require('../email/emailtemplates');
var EngagementResults = require('../models/engagementResults');
var CustomSurveyResults = require('../models/customSurveyResults');


function getCustomSurveys(callback) {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var datestring = year + '-' + month + '-' + day;
    //callback(datestring);

    var condition = {freezedate: datestring};
    CustomSurvey.find(condition).lean().exec(function (err, form) {
        if (form != 'undefined') {
            callback(form);
        }
    });
}

function getManagerDetails(target_teamid, mid, callback) {

    var condition = {_id: mongoose.Types.ObjectId(mid), usertype: 'manager'};
    User.findOne(condition).lean().exec(function (err, user) {
        if (user != 'undefined') {
            callback(user);
        }
    });
}

function getCompanyMembers(form, company, callback) {
    // Get members by matching company
    var condition = {company_info: {$elemMatch: {companyname: company}}};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            callback(users);
        }
    });
}

function checkUserParticipated(form, user, callback) {
    // Get members by matching company
    var condition = {survey_id: mongoose.Types.ObjectId(form._id), user_id: user._id};
    CustomSurveyResults.findOne(condition).lean().exec(function (err, results) {
        if (results != 'undefined') {
            if (results) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}

function getNotParticipatedUsers(form, company, callback) {
    getCompanyMembers(form, company, function (users) {
        var userArr = [];
        function userrepeater(i) {
            if (i < users.length) {
                checkUserParticipated(form, users[i], function (status) {
                    if (!status) {
                        userArr.push(users[i]);
                    }
                    if (i == (users.length - 1)) {
                        callback(userArr);
                    }
                    userrepeater(i + 1);
                });
            }
        }
        userrepeater(0);
    });
}


function getTeamMemberIds(form, managerid, callback) {

    //Get members from team
    var condition = {_id: mongoose.Types.ObjectId(form.target_teamid), manager_id: managerid};
    Team.find(condition).lean().exec(function (err, team) {
        if (team != 'undefined') {
            callback(team);
        }
    });
}

function getTeamMemberDetails(memberIds, callback) {

    // Get members by matching company
    var condition = {_id: {$in: memberIds}};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            callback(users);
        }
    });
}


function getNotParticipatedTeamMembers(form, managerid, callback) {
    getTeamMemberIds(form, managerid, function (teamdata) {
        var team = teamdata[0];
        getTeamMemberDetails(team.member_ids, function (users) {
            var userArr = [];
            function teammemberrepeater(i) {
                if (i < users.length) {
                    checkUserParticipated(form, users[i], function (status) {
                        if (!status) {
                            userArr.push(users[i]);
                        }
                        if (i == (users.length - 1)) {
                            callback(userArr);
                        }
                        teammemberrepeater(i + 1);
                    });
                }
            }
            teammemberrepeater(0);
        });
    });
}

function getEngagementResults(members, callback) {

    // Get members engagement results
    var memberIds = [];
    for (var mKey in members) {
        memberIds.push(members[mKey]._id);
    }

    var condition = {user_id: {$in: memberIds}};
    EngagementResults.find(condition).lean().exec(function (err, results) {
        if (results != 'undefined') {
            callback(results);
        }
    });
}

var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '00 00 10 * * 1-7',
    //cronTime: '* * * * * *',
    onTick: function () {
        /*
         * Runs every day (Sunday through Saturday)
         * at 10:00:00 AM. 
         * cronTime: '00 00 10 * * 1-7',
         */

        getCustomSurveys(function (forms) {

            var fLength = forms.length;

            function repeater(i) {

                if (i < fLength) {

                    var form = forms[i];
                    var surveyurl = 'http://localhost:3000/takesurvey/' + form._id;
                    var targetgroup = form.targetgroup;
                    var target_teamid = form.target_teamid;
                    var targetvalue = form.targetvalue;
                    var targetlevel = form.targetlevel;
                    var managerid = form.user_id;

                    if (targetgroup === 'organization') {

                        getManagerDetails(target_teamid, managerid, function (manager) {
                            if (manager) {

                                var mgrcompany = manager.company_info[0].companyname;
                                if (target_teamid === mgrcompany) {

                                    getNotParticipatedUsers(form, mgrcompany, function (cMembers) {
                                        for (var mkey in cMembers) {
                                            var member = cMembers[mkey];
                                            var transporter = nodemailer.createTransport();
                                            var body = "Hi " + member.firstname + ",<br><br> Please complete your survey by click on below link <br>" +
                                                    "<b>Click here :</b>" + 'http://' + surveyurl +
                                                    "<br><br> Best wishes" +
                                                    "<br> Moodwonder Team";
                                            body = emailTemplate.general(body);
                                            transporter.sendMail({
                                                from: 'admin@moodewonder.com',
                                                to: member.email,
                                                //to: 'useremailtestacc@gmail.com',
                                                subject: 'Take a survey',
                                                html: body
                                            });
                                        }
                                        repeater(i + 1);
                                    });

                                } else {

                                    getNotParticipatedTeamMembers(form, managerid, function (cMembers) {

                                        for (var mkey in cMembers) {
                                            var member = cMembers[mkey];
                                            var transporter = nodemailer.createTransport();
                                            var body = "Hi " + member.firstname + ",<br><br> Please complete your team survey by click on below link <br>" +
                                                    "<b>Click here :</b>" + 'http://' + surveyurl +
                                                    "<br><br> Best wishes" +
                                                    "<br> Moodwonder Team";
                                            body = emailTemplate.general(body);
                                            transporter.sendMail({
                                                from: 'admin@moodewonder.com',
                                                to: member.email,
                                                //to: 'useremailtestacc@gmail.com',
                                                subject: 'Take a survey',
                                                html: body
                                            });
                                        }
                                        repeater(i + 1);
                                    });
                                }

                            }

                        });


                    } else if (targetgroup === 'survey') {
                        getManagerDetails(target_teamid, managerid, function (manager) {
                            if (manager) {
                                var mgrcompany = manager.company_info[0].companyname;

                                getNotParticipatedUsers(form, mgrcompany, function (sMembers) {

                                    getEngagementResults(sMembers, function (posts) {

                                        var _USERCOUNT = sMembers.length;

                                        var survey = [];
                                        for (var mKey in sMembers) {

                                            var temp = {};
                                            var user = sMembers[mKey];
                                            temp.user_id = user._id;
                                            temp.email = user.email;
                                            temp.firstname = user.firstname;

                                            var userposts = _.filter(posts, function (v) {
                                                return v.user_id == user._id;
                                            });
                                            var recentposts = _.first(_.sortBy(userposts, function (o) {
                                                return o._id;
                                            }).reverse(), 13);
                                            var sum = _(userposts).reduce(function (m, x) {
                                                return m + x.rating;
                                            }, 0);
                                            var avg = (sum / 13).toFixed(1);

                                            temp.sum = sum;
                                            temp.avg = avg;
                                            //temp.recentposts = recentposts;		
                                            survey.push(temp);
                                        }

                                        survey = _.sortBy(survey, function (o) {
                                            return o.avg;
                                        }).reverse();

                                        var sValue = targetvalue;
                                        var sLevel = targetlevel;
                                        sValue = Math.ceil((_USERCOUNT * sValue) / 100);

                                        if (sLevel == 'above') {
                                            survey = _.first(survey, sValue);
                                        } else {
                                            survey = _.last(survey, sValue);
                                        }
                                        
                                        for (var skey in survey) {
                                            var data = survey[skey];
                                            var transporter = nodemailer.createTransport();
                                            var body = "Hi " + data.firstname + ",<br><br> Please complete the survey by clicking on below link <br>" +
                                                    "<b>Click here :</b>" + 'http://' + surveyurl +
                                                    "<br><br> Best wishes" +
                                                    "<br> Moodwonder Team";
                                            body = emailTemplate.general(body);
                                            transporter.sendMail({
                                                from: 'admin@moodewonder.com',
                                                //to: data.email,
                                                to: 'useremailtestacc@gmail.com',
                                                subject: 'Take a survey',
                                                html: body
                                            });
                                        }
                                        
                                        repeater(i + 1);
                                    });
                                });

                            }
                        });
                    }
                }
            }

            repeater(0);

        });
    },
    start: true,
    timeZone: ''
});
job.start();


