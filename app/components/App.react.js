import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from 'components/Navigation.react';
import AppStore from 'stores/AppStore';

export default class App extends React.Component {

  constructor (props) {
      super(props);
      this.state = AppStore.getState();
  }

  componentDidMount () {
      AppStore.listen(this._onChange);
  }

  componentWillUnmount () {
      AppStore.unlisten(this._onChange);
  }

  _onChange = () => {
  }

  render() {

      let handler      = (<RouteHandler />);
      let noPermission = (
        <div>
         <span> You do not have sufficient permissions to access this page </span>
        </div>
      );
      let path = this.context.router.getCurrentPathname();

      // user only pages
      let pages = ["/","/survey","/login","/forgotpassword","/signup","/createpassword","/admin"];
      if( pages.indexOf(path) === -1 ){
          if(!(this.state.isAuthenticated)){
              handler = noPermission;
          }
      }
      // admin and manager only pages
      pages = ["/surveyforms","/myteam","/customsurvey"];
      if( pages.indexOf(path) >= 0){
          if( (!this.state.isAuthenticated) || this.state.userType !== 'manager' ){
              handler = noPermission;
          }
      }
      // admin only pages
      pages = ["/surveyforms"];
      if( pages.indexOf(path) >= 0){
          if( (!this.state.isAuthenticated) || this.state.userType !== 'admin' ){
              handler = noPermission;
          }
      }

      return (
        <div>
          <Navigation />
          {handler}
        </div>
      );
  }
}
// https://github.com/rackt/react-router/issues/975#issuecomment-84598815
// No need of mixins in es6
App.contextTypes = { router: React.PropTypes.func };
