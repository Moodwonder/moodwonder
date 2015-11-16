import React from 'react';
import { RouteHandler } from 'react-router';
import AppStore from 'stores/AppStore';
import Navigation from 'components/Navigation.react';
import Leftnav from 'components/Leftnav.react';
import Rightnav from 'components/Rightnav.react';
import SidebarMenu from 'components/SidebarMenu.react';

export default class App extends React.Component {

  constructor (props) {
      super(props);
      this.state = AppStore.getState();
  }

  componentDidMount () {
      AppStore.listen(this._onChange);
//      let rootNode = React.findDOMNode(this);
//
//      // Initialize the sidebar
//      $(rootNode).find('.ui.sidebar').sidebar({
//          context: $(rootNode)
//      });

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
      let pageconter   = 'ui segment  width padding-top-110 ';
      let noPermission = (
        <div>
         <p> You do not have sufficient permissions to access this page. </p>
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

      //pages = ["/myprofile","/mycompany"];
      pages = ["/myprofile"];
      if( pages.indexOf(path) >= 0 ){
          rightnav     = '';
          pageconter   = 'ui segment  width-act padding-top-110 ';
      }
      let sitecontent = [
                    <Navigation />,
                    <SidebarMenu />,
                    <div className="pusher">
                        <div className="ui inverted vertical masthead center aligned "></div>
                        {leftnav}
                        <div className={pageconter}>
                            <div className="ui main">
                                {handler}
                            </div>
                            {rightnav}
                        </div>
                    </div>
              ];

      return (
              <span>{sitecontent}</span>
      );
  }
}
// https://github.com/rackt/react-router/issues/975#issuecomment-84598815
// No need of mixins in es6
App.contextTypes = { router: React.PropTypes.func };
