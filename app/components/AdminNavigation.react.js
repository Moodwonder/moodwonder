import React from 'react';
import Immutable from 'immutable';
import AdminActions from 'actions/AdminActions';
import AdminStore from 'stores/AdminStore';

export default class AdminNavigation extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          isAuth: false,
          isAuthenticated: false
      };
  }

  componentDidMount () {
      AdminStore.listen(this._onChange);
      let isAuth = localStorage.getItem('isAuth');
      this.setState({isAuth: isAuth});
      //console.log('did');
      //console.log(this.state.isAuth);
  }

  componentWillUnmount () {
      AdminStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
        isAuth: AdminStore.getState().isAuth,
        isAuthenticated: AdminStore.getState().isAuthenticated
      });
      if(this.state.isAuthenticated === false) {
          window.location.href = "/admin/logout";
      }
  }

  _onLogout = () => {
      AdminActions.logout();
      if(this.state.isAuthenticated === false) {
          window.location.href = "/admin/logout";
      }
  }

  render () {

      let loginOrOut;

      if (this.state.isAuth === "true") {

          loginOrOut = [
                <div className="ui large top fixed hidden menu">
                    <div className="ui container">
                        <a href="/admin/dashboard" className="active item">Moodwonder</a>
                        <a href="/admin/users" className="item">Users</a>
                        <a href="/admin/companyadmins" className="item">Company Admins</a>
                        <a href="/admin/teams" className="item">Teams</a>
                        <a href="/admin/engagementarea" className="item">Engagementarea</a>
                        <a href="/admin/industry" className="item">Industry</a>
                        <a href="/admin/continents" className="item">Continents</a>
                        <a href="/admin/languages" className="item">Languages</a>
                        <a href="/admin/pages" className="item">Pages</a>
                        <a href="/admin/rules" className="item">Notificationrules</a>
                        <div className="right menu">
                            <div className="item">
                                <a onClick={this._onLogout} className="ui button" href="#">Log out</a>
                            </div>
                        </div>
                    </div>
                </div>,

                <div className="ui vertical inverted sidebar menu">
                    <a href="/admin/dashboard" className="active item">Moodwonder</a>
                    <a href="/admin/users" className="item">Users</a>
                    <a href="/admin/companyadmins" className="item">Company Admins</a>
                    <a href="/admin/teams" className="item">Teams</a>
                    <a href="/admin/engagementarea" className="item">Engagementarea</a>
                    <a href="/admin/industry" className="item">Industry</a>
                    <a href="/admin/continents" className="item">Continents</a>
                    <a href="/admin/languages" className="item">Languages</a>
                    <a href="/admin/pages" className="item">Pages</a>
                    <a href="/admin/rules" className="item">Notificationrules</a>
                </div>,

                <div className="pusher">
                    <div className="ui inverted vertical masthead center aligned segment">
                        <div className="ui container">
                            <div className="ui large secondary inverted pointing menu">
                                <a className="toc item">
                                    <i className="sidebar icon"></i>
                                </a>
                                <a href="/admin/dashboard" className="active item">Moodwonder</a>
                                <a href="/admin/users" className="item">Users</a>
                                <a href="/admin/companyadmins" className="item">Company Admins</a>
                                <a href="/admin/teams" className="item">Teams</a>
                                <a href="/admin/engagementarea" className="item">Engagementarea</a>
                                <a href="/admin/industry" className="item">Industry</a>
                                <a href="/admin/continents" className="item">Continents</a>
                                <a href="/admin/languages" className="item">Languages</a>
                                <a href="/admin/pages" className="item">Pages</a>
                                <a href="/admin/rules" className="item">Notificationrules</a>
                                <div className="right item">
                                    <a onClick={this._onLogout} className="ui inverted button" href="#">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          ];

      } else {

          loginOrOut = [
                <div className="ui large top fixed hidden menu">
                    <div className="ui container">
                        <a href="/admin" className="active item">Moodwonder</a>
                        <div className="right menu">
                            <div className="item">
                                <a href="/admin" className="ui button">Login</a>
                            </div>
                        </div>
                    </div>
                </div>,

                <div className="ui vertical inverted sidebar menu">
                    <a href="/admin" className="active item">Moodwonder</a>
                </div>,

                <div className="pusher">
                    <div className="ui inverted vertical masthead center aligned segment">
                        <div className="ui container">
                            <div className="ui large secondary inverted pointing menu">
                                <a className="toc item">
                                    <i className="sidebar icon"></i>
                                </a>
                                <a href="/admin" className="active item">Moodwonder</a>
                                <div className="right item">
                                    <a href="/admin" className="ui inverted button">Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          ];
      }


      return (
        <div>
            {loginOrOut}
        </div>
      );
  }

}

AdminNavigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
