var _ = require('underscore');
var mongoose = require('mongoose');
var Team = require('../models/team');
var User = require('../models/user');
var nodemailer = require("nodemailer");
var CustomSurvey = require('../models/customSurvey');
var emailTemplate = require('../email/emailtemplates');
var EngagementResults = require('../models/engagementResults');
var NotificationRules = require('../models/notificationRules');
var CustomSurveyResults = require('../models/customSurveyResults');

function getAllManagersIndividual(callback) {

    var condition = {usertype: 'manager'};
    User.find(condition).lean().exec(function (err, user) {
        if (user != 'undefined') {
            callback(user);
        }
    });
}

function getTeamsIndividual(manager, callback) {

//Get members from team
    var condition = {manager_id: mongoose.Types.ObjectId(manager._id)};
    Team.find(condition).lean().exec(function (err, teams) {
        if (teams != 'undefined') {
            callback(teams);
        }
    });
}

function getTeamMembersIndividual(memberIds, callback) {

    var id = [];
    for (var j = 0; j < memberIds.length; j++) {
        id.push(memberIds[j]._id);
    }

    var condition = {_id: {$in: id}};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            callback(users);
        }
    });
}

function getEngagementResultsIndividual(memberid, callback) {

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var datestring = year + '-' + month + '-' + day;
    // Get members engagement results
    var condition = {user_id: memberid, 'created.d': {$eq: datestring}};
    EngagementResults.find(condition).lean().exec(function (err, results) {
        if (results != 'undefined') {
            callback(results);
        }
    });
}

function getMWIndexRuleIndividual(key, callback) {

// Get members engagement results
    var condition = {rule_key: key, status: 'active'};
    NotificationRules.findOne(condition).lean().exec(function (err, rule) {
        if (rule != 'undefined') {
            callback(rule);
        }
    });
}

var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '00 10 09 * 1-7',
    //cronTime: '* * * * * *',
    onTick: function () {
        /*
         * Runs every day (Sunday through Saturday)
         * at 10:00:00 AM. 
         * cronTime: '00 00 10 * * 1-7',
         */
        getAllManagersIndividual(function (managers) {

            var mCount = managers.length;
            function muserrepeater(i) {
                if (i < mCount) {

                    var manager = managers[i];
                    getTeamsIndividual(manager, function (teams) {

                        var tCount = teams.length;
                        function teamrepeater(t) {
                            if (t < tCount) {
                                var team = teams[t];
                                getTeamMembersIndividual(team.member_ids, function (tmembers) {

                                    var tmCount = tmembers.length;
                                    function tmemberrepeater(tm) {
                                        if (tm < tmCount) {
                                            var member = tmembers[tm];
                                            getEngagementResultsIndividual(member._id, function (posts) {

                                                getMWIndexRuleIndividual('INDIVIDUAL_LOWER_LIMIT', function (lowerlimit) {

                                                    var lowerstatement = '';
                                                    for (var p = 0; p < posts.length; p++) {
                                                        var post = posts[p];
                                                        if (post.rating <= lowerlimit.rule_value) {
                                                            lowerstatement += 'Mood - ' + post.mood + '(' + post.rating + ')';
                                                        }
                                                    }

                                                    if (lowerstatement) {
                                                        var transporter = nodemailer.createTransport();
                                                        var body = "Hi ,<br><br> The user, " + member.firstname + "(" + member.email + ")" + " individual statement <br>" +
                                                                "Statement: " + lowerstatement +
                                                                "<br><br> Best wishes" +
                                                                "<br> Moodwonder Team";
                                                        body = emailTemplate.general(body);
                                                        transporter.sendMail({
                                                            from: 'admin@moodewonder.com',
                                                            to: manager.email,
                                                            //to: 'useremailtestacc@gmail.com',
                                                            subject: 'Notification - Individual Lower limit',
                                                            html: body
                                                        });
                                                    }

                                                    getMWIndexRuleIndividual('INDIVIDUAL_UPPER_LIMIT', function (upperlimit) {
                                                        var upperstatement = '';

                                                        for (var p = 0; p < posts.length; p++) {
                                                            var post = posts[p];
                                                            if (post.rating >= upperlimit.rule_value) {
                                                                upperstatement += 'Mood - ' + post.mood + '(' + post.rating + ')';
                                                            }
                                                        }


                                                        if (upperstatement) {
                                                            var transporter = nodemailer.createTransport();
                                                            var body = "Hi ,<br><br> The user, " + member.firstname + "(" + member.email + ")" + " individual statement <br>" +
                                                                    "Statement: " + upperstatement +
                                                                    "<br><br> Best wishes" +
                                                                    "<br> Moodwonder Team";
                                                            body = emailTemplate.general(body);
                                                            transporter.sendMail({
                                                                from: 'admin@moodewonder.com',
                                                                to: manager.email,
                                                                //to: 'useremailtestacc@gmail.com',
                                                                subject: 'Notification - Individual Upper limit',
                                                                html: body
                                                            });
                                                        }


                                                    });
                                                });
                                            });
                                            tmemberrepeater(tm + 1);
                                        }

                                    }
                                    tmemberrepeater(0);
                                });
                                teamrepeater(t + 1);
                            }
                        }
                        teamrepeater(0);
                    });
                    muserrepeater(i + 1);
                }
            }
            muserrepeater(0);
        });
    },
    start: true,
    timeZone: ''
});
job.start();


