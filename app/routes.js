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
import Pages from 'components/language/Pages.react';
import Test1 from 'components/test1';
import Admin from 'components/Admin.react';
import Adminlogin from 'components/login/adminlogin.react';
// import Dashboard from 'components/dashboard/dashboard.react';

const routes = (
  <Route>
    <Route name="appadmin" path="/admin" handler={Admin} >
        <Route name="admin" handler={Adminlogin} />
        <Route name="/admin/login" handler={Adminlogin} />
        <Route name="/admin/languages" handler={Languages} />
        <Route name="/admin/pages" handler={Pages} />
        <DefaultRoute handler={Adminlogin} />
        <NotFoundRoute name="404page" handler={NotFound} />
    </Route>
    <Route name="app" path="/" handler={App} >
      <Route name="login" handler={Login} />
      <Route name="logout" handler={Logout} />
      <Route name="index" handler={Index} />
      <Route name="signup" handler={Signup} />
      <Route name="signup/:hash" handler={Signup} />
      <Route name="forgotpassword" handler={ForgotPassword} />
      <Route name="createpassword/:hash" handler={CreatePassword} />
      <Route name="customsurvey" handler={Customsurvey} />
      <Route name="surveyforms" handler={Surveyforms} />
      <Route name="takesurvey/:key" handler={Takesurvey} />
      <Route name="survey" handler={Survey} />
      <Route name="myprofile" handler={MyProfile} />
      <Route name="myteam" handler={MyTeam} />
      <Route name="tabs" handler={Tabs} />
      <Route name="mycompany" handler={MyCompanyInfo} />
      <Route name="mymanager" handler={MyManagerInfo} />
      <Route name="test1" handler={Test1} />
      <DefaultRoute handler={Index} />
      <NotFoundRoute name="404" handler={NotFound} />
    </Route>
  </Route>
);

export default routes;
