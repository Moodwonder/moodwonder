var _ = require('underscore');
var mongoose = require('mongoose');
var User = require('../models/user');
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var EngagementResults = require('../models/engagementResults');
var SurveyParticipation = require('../models/surveyParticipation');
var Config = require('../config/config');


function getSurveysNotParticipated(callback) {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var datestring = year + '-' + month + '-' + day;
    //callback(datestring);

    var condition = {status: 'notparticipated', freezedate: datestring};
    SurveyParticipation.find(condition).lean().exec(function (err, form) {
        if (form != 'undefined') {
            callback(form);
        }
    });
}

function getUserData(userid, callback) {
    // Get members by matching company
    var condition = {_id: mongoose.Types.ObjectId(userid)};
    User.find(condition).lean().exec(function (err, user) {
        if (user != 'undefined') {
            callback(user);
        }
    });
}



var CronJob = require('cron').CronJob;
var customSurveyAlert = new CronJob({
    cronTime: '00 00 10 * * 1-7',
    //cronTime: '* * * * * *',
    onTick: function () {
        /*
         * Runs every day (Sunday through Saturday)
         * at 10:00:00 AM. 
         * cronTime: '00 00 10 * * 1-7',
         */

        getSurveysNotParticipated(function(surveys) { 
            
            var sLength = surveys.length;
            function repeater(i) {
                
                if (i < sLength) {
                    
                    var userid = surveys[i].user_id;
                    getUserData(userid, function(user) {
                        
                        var user = user[0];
                        var name;
                        if (user.firstname === '' || user.firstname === undefined) {
                            name = user.email;
                        } else {
                            name = user.firstname + ' ' + user.lastname;
                        }
                        
                        var transporter = nodemailer.createTransport();
                        var body = "Hi " + name + ",<br><br> Please complete your survey by click on below link <br>" +
                                "<b>Click here :</b>" + Config.staticUrl + 'takesurvey/' + surveys[i].survey_id +
                                "<br><br> Best wishes" +
                                "<br> Moodwonder Team";
                        body = emailTemplate.general(body);
                        transporter.sendMail({
                            from: Config.fromEmail,
                            to: user.email,
                            //to: 'useremailtestacc@gmail.com',
                            subject: 'Take a survey',
                            html: body
                        });
                        
                    });
                    
                    repeater(i + 1);
                }
            }
            repeater(0);
        });

        
    },
    start: true,
    timeZone: ''
});
customSurveyAlert.start();


