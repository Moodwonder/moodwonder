import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'components/App.react';
import Index from 'components/Index.react';
import Login from 'components/Login.react';
import Logout from 'components/Logout.react';
import Signup from 'components/Signup.react';
import Customsurvey from 'components/Customsurvey.react';
import Survey from 'components/Survey.react';
import NotFound from 'components/404.react';
import Test from 'components/test';

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="index" handler={Index} />
    <Route name="signup" handler={Signup} />
    <Route name="customsurvey" handler={Customsurvey} />
    <Route name="survey" handler={Survey} />
    <Route name="test" handler={Test} />
    <DefaultRoute handler={Index} />
    <NotFoundRoute name="404" handler={NotFound} />
  </Route>
);

export default routes;
