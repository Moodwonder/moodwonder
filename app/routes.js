import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';


import App from 'components/App.react';
import Index from 'components/Index.react';
import Login from 'components/Login.react';
import Logout from 'components/Logout.react';
import Signup from 'components/Signup.react';
import ForgotPassword from 'components/ForgotPassword.react';
import CreatePassword from 'components/CreatePassword.react';
import Customsurvey from 'components/customsurvey/Customsurvey.react';
import Survey from 'components/Survey.react';
import MyProfile from 'components/MyProfile.react';
import MyCompanyInfo from 'components/MyCompanyInfo.react';
import MyManagerInfo from 'components/MyManager.react';
import MyTeam from 'components/MyTeam.react';
import Tabs from 'components/Tabs.react';
import Surveyforms from 'components/customsurvey/Customsurveyforms.react';
import Takesurvey from 'components/customsurvey/Takesurvey.react';
import NotFound from 'components/404.react';
import Languages from 'components/language/Languages.react';
import Pages from 'components/pages/Pages.react';
import Admin from 'components/Admin.react';
import Adminlogin from 'components/login/adminlogin.react';
import Adminlogout from 'components/login/Logout.react';
import Dashboard from 'components/dashboard/dashboard.react';
import Users from 'components/users/Users.react';
import UserDetails from 'components/users/UserDetails.react';
import MyMood from 'components/MyMood.react';
import Test1 from 'components/test1';
import EmployeeOfTheMonth from 'components/EmployeeOfTheMonth.react';
import Employees from 'components/Employees.react';
import Engagementarea from 'components/engagementarea/Engagementarea.react';
import Appuser from 'components/Appuser.react';
import OpenEndedQuestions from 'components/OpenEndedQuestions.react';

//const routes = (
//  <Route>
//    <Route name="appadmin" path="/admin" handler={Admin} >
//        <Route name="admin" handler={Adminlogin} />
//        <Route name="/admin/login" handler={Adminlogin} />
//        <Route name="/admin/logout" handler={Adminlogout} />
//        <Route name="/admin/languages" handler={Languages} />
//        <Route name="/admin/pages" handler={Pages} />
//        <Route name="/admin/dashboard" handler={Dashboard} />
//        <Route name="/admin/engagementarea" handler={Engagementarea} />
//        <DefaultRoute handler={Adminlogin} />
//        <NotFoundRoute name="404page" handler={NotFound} />
//    </Route>
//    <Route name="app" path="/" handler={App} >
//      <Route name="login" handler={Login} />
//      <Route name="logout" handler={Logout} />
//      <Route name="index" handler={Index} />
//      <Route name="signup" handler={Signup} />
//      <Route name="signup/:hash" handler={Signup} />
//      <Route name="forgotpassword" handler={ForgotPassword} />
//      <Route name="createpassword/:hash" handler={CreatePassword} />
//      <Route name="customsurvey" handler={Customsurvey} />
//      <Route name="surveyforms" handler={Surveyforms} />
//      <Route name="takesurvey/:key" handler={Takesurvey} />
//      <Route name="survey" handler={Survey} />
//      <Route name="myprofile" handler={MyProfile} />
//      <Route name="myteam" handler={MyTeam} />
//      <Route name="tabs" handler={Tabs} />
//      <Route name="mycompany" handler={MyCompanyInfo} />
//      <Route name="mymanager" handler={MyManagerInfo} />
//      <Route name="mymood" handler={MyMood} />
//      <Route name="employeeofthemonth" handler={EmployeeOfTheMonth} />
//      <Route name="test1" handler={Test1} />
//      <DefaultRoute handler={Index} />
//      <NotFoundRoute name="404" handler={NotFound} />
//    </Route>
//  </Route>
//);

const routes = (
  <Route>
    <Route name="appadmin" path="/admin" handler={Admin} >
        <Route name="admin" handler={Adminlogin} />
        <Route name="/admin/login" handler={Adminlogin} />
        <Route name="/admin/logout" handler={Adminlogout} />
        <Route name="/admin/languages" handler={Languages} />
        <Route name="/admin/pages" handler={Pages} />
        <Route name="/admin/dashboard" handler={Dashboard} />
        <Route name="/admin/engagementarea" handler={Engagementarea} />
        <Route name="/admin/users" handler={Users} />
        <Route name="/admin/userdetails/:uid" handler={UserDetails} />
        <DefaultRoute handler={Adminlogin} />
        <NotFoundRoute name="404page" handler={NotFound} />
    </Route>
    <Route name="survey" path="/survey" handler={Appuser} >
      <Route name="" handler={Survey} />
    </Route>
    <Route name="openendedsurvey" path="/openendedsurvey" handler={Appuser} >
      <Route name="" handler={OpenEndedQuestions} />
    </Route>
    <Route name="myprofile" path="/myprofile" handler={Appuser} >
      <Route name="" handler={MyProfile} />
    </Route>
    <Route name="mycompany" path="/mycompany" handler={Appuser} >
      <Route name="" handler={MyCompanyInfo} />
    </Route>
    <Route name="mymanager" path="/mymanager" handler={Appuser} >
      <Route name="" handler={MyManagerInfo} />
    </Route>
    <Route name="myteam" path="/myteam" handler={Appuser} >
      <Route name="" handler={MyTeam} />
    </Route>
    <Route name="surveyforms" path="/surveyforms" handler={Appuser} >
      <Route name="" handler={Surveyforms} />
    </Route>
    <Route name="takesurvey/:key" path="/takesurvey/:key" handler={Appuser} >
      <Route name="" handler={Takesurvey} />
    </Route>
    <Route name="customsurvey" path="/customsurvey" handler={Appuser} >
      <Route name="" handler={Customsurvey} />
    </Route>
    <Route name="mymood" path="/mymood" handler={Appuser} >
      <Route name="" handler={MyMood} />
    </Route>
    <Route name="employeeofthemonth" path="/employeeofthemonth" handler={Appuser} >
      <Route name="" handler={EmployeeOfTheMonth} />
    </Route>
    <Route name="allemployees" path="/allemployees" handler={Appuser} >
      <Route name="" handler={Employees} />
    </Route>
    <Route name="app" path="/" handler={App} >
      <Route name="login" handler={Login} />
      <Route name="logout" handler={Logout} />
      <Route name="index" handler={Index} />
      <Route name="signup" handler={Signup} />
      <Route name="signup/:hash" handler={Signup} />
      <Route name="forgotpassword" handler={ForgotPassword} />
      <Route name="createpassword/:hash" handler={CreatePassword} />
      <Route name="tabs" handler={Tabs} />
      <Route name="test1" handler={Test1} />
      <DefaultRoute handler={Index} />
      <NotFoundRoute name="404" handler={NotFound} />
    </Route>
  </Route>
);

export default routes;
