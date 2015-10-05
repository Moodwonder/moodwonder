import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from 'components/Navigation.react';
import Leftnav from 'components/Leftnav.react';
import Rightnav from 'components/Rightnav.react';
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
      let leftnav;
      let rightnav;
      let noPermission = (
        <div>
         <p> You do not have sufficient permissions to access this page. </p>
         <p> Please login to continue <a href="/login">Login</a> </p>
        </div>
      );
      let path = this.context.router.getCurrentPathname();

      // user only pages
      let pages = ["/","/login","/forgotpassword","/signup","/createpassword","/admin","/test1","/myteam"];
      if( pages.indexOf(path) === -1 ){
          if(!(this.state.isAuthenticated)){
              handler = noPermission;
          }
      }
      // admin and manager only pages
      pages = ["/surveyforms","/customsurvey"];
      if( pages.indexOf(path) >= 0){
          if( (!this.state.isAuthenticated) || this.state.userType !== 'manager' ){
              handler = noPermission;
          }
      }

      if (this.state.isAuthenticated) {
          leftnav = (<Leftnav />);
          rightnav = (<Rightnav />);
      }

      return (
          <div>
          <Navigation />
          <div className="ui vertical inverted sidebar menu "> <a href="#" className="slide-side"></a> <a className="active item"><i className="smile icon"></i>My Mood </a> <a className="item"><i className="setting icon"></i> My Account </a> <a className="item"><i className="building icon"></i>My Company</a> </div>

          <div className="wrapper">
            <div className="pusher">
				<div className="ui inverted vertical masthead center aligned "> </div>
                {leftnav}
				<div className="ui segment  width padding-top-110 ">
					<div className="ui main ">
						{handler}
						{rightnav}
					</div>
				</div>
            </div>
          </div>
          </div>
      );
  }
}
// https://github.com/rackt/react-router/issues/975#issuecomment-84598815
// No need of mixins in es6
App.contextTypes = { router: React.PropTypes.func };
