var _ = require('lodash');
var User = require('../models/user');
var Vote = require('../models/vote');
var EOTM = require('../models/employeeOfTheMonth');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');

PRO_PIC_PATH = '/images/profilepics/';


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
  var response = {};
  response.status = false;
  response.message = 'Error';
  response.callback = req.body.callback;
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
    
    var yearmonth = cdate.substring(0, 7)
    , conditions = { "user_id": new ObjectId(req.user._id), postdate : { $regex : new RegExp(yearmonth,'i') } };

    // checking all ready done 5 votes for this month
    // console.log(conditions);
    Vote.find(conditions, function (err, document) {
        var alreadyvoted = false;
        var mytotalvotes = 0;

        document.map(function (data, key){
            mytotalvotes++;
            // check already voted or not
            //if(data.votefor_userid === votefor_userid){
            if((data.votefor_userid.toString().indexOf(votefor_userid.toString())) !== -1 ){
                alreadyvoted = true;
            }
        });

        // check already voted or not
        if(votefor_userid.toString() === req.user._id.toString()){

            response.status = false;
            response.message = 'Self vote not allowed';
            res.send(response);
            res.end();
            return;
        }


        // disable self vote
        if(alreadyvoted){

            response.status = false;
            response.message = 'Already voted to this user';
            res.send(response);
            res.end();
        }

        else if(mytotalvotes < 5){

            // add a record with new vote
            conditions.votefor_userid = votefor_userid;
            conditions.postdate = cdate;
            conditions.comment = comment;
            conditions.name = req.user.firstname + ' ' + req.user.lastname;
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

/**
 * Get all stats data of an emplyee by month
 *
 * Accept : -  @votefor_userid,comment
 */
exports.getEmpMonthView = function(req, res, next) {

  var votefor_userid  =   req.body.emp_id;
  var date            =   req.body.date;
  votefor_userid      =   new ObjectId(votefor_userid);
  var dateObj         =   new Date();
  var mycompany       =   '';
  try {
    mycompany = req.user.company_info[0].companyname;
  } catch (ex) {
    mycompany = false;
  }
  // date with YYYY-MM-DD format
  var cdate           =   JSON.stringify(dateObj).substring(1, 11);
  if(date !== undefined){
      cdate = date;
  }

  var yearmonth = cdate.substring(0, 7)
  , conditions  = { "company": mycompany, "votefor_userid": votefor_userid, postdate : { $regex : new RegExp(yearmonth,'i')  } };

  var elmatch = { companyname: mycompany };

  User.findOne({ _id: votefor_userid, company_info: { $elemMatch: elmatch }}, function(err, user){
    if (!err) {

        Vote.find(conditions, function (err, document) {

            var totalvotes =  0;
            var comments   =  [];
            var employee   =  {};
            document.map(function (document, key){
                totalvotes++;
                var comment = { comment: document.comment, name: document.name };
                comments[key] = comment;
            });
            var profileimage = (user.profile_image !== '') ? PRO_PIC_PATH+user.profile_image : PRO_PIC_PATH+'no-profile-img.gif';
            employee = { _id: user._id, photo: profileimage, name: (user.firstname+' '+user.lastname), votes: totalvotes, comments: comments };
            response.status  = true;
            response.message = 'success';
            response.data = employee;
            res.send(response);
        });
    } else {
        response.status = false;
        response.message = 'something went wrong';
        res.send(response);
        res.end();
    }
  });
};

/**
 * Get all stats data of an emplyee by month
 *
 * Accept : -  @votefor_userid,comment
 */
exports.chooseEmployeeOfTheMonth = function(req, res, next) {

  var votefor_userid  =   req.body.emp_id;
  votefor_userid      =   new ObjectId(votefor_userid);
  var dateObj         =   new Date();
  var mycompany       =   '';
  try {
    mycompany = req.user.company_info[0].companyname;
  } catch (ex) {
    mycompany = false;
  }

  // date with YYYY-MM-DD format
  var cdate           =   JSON.stringify(dateObj).substring(1, 11);
  var yearmonth       =   cdate.substring(0, 7);
  var elmatch         =   { companyname: mycompany };
 
  User.findOne({ _id: votefor_userid, company_info: { $elemMatch: elmatch }}, function(err, user){
    if (!err) {
        var conditions         =     {};
        EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company: mycompany }, function(err, emp){
            if(emp){
                response.status = false;
                response.message = 'Already awarded';
                res.send(response);
                res.end();
            }else{
                // add a record with new vote
                var conditions         =     {};
                conditions.date        =     cdate;
                conditions.company     =     mycompany;
                conditions.emp_id      =     votefor_userid;
                conditions.emp_details =     user;
                var eotm               =     new EOTM(conditions);
                eotm.save(function (err) {
                    if (!err) {

                        var transporter = nodemailer.createTransport();
                        var body = "Hi,<br><br>Congratulations! You have been selected as the 'Employee of the Month' <br>" +
                                "<br><br> Best wishes" +
                                "<br> Moodwonder Team";
                        body = emailTemplate.general(body);
                        transporter.sendMail({
                            from: 'admin@moodewonder.com',
                            to: user.email,
                            subject: 'Employee of the month',
                            html: body
                        });
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
    } else {
        response.status = false;
        response.message = 'something went wrong';
        res.send(response);
        res.end();
    }
  });
};
