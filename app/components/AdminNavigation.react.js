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
            <a href="/admin/dashboard" className="item">Moodwonder</a>,
            <a href="/admin/users" className="item">Users</a>,
            <a href="/admin/companyadmins" className="item">Company Admins</a>,
            <a href="/admin/teams" className="item">Teams</a>,
            <a href="/admin/engagementarea" className="item">Engagementarea</a>,
            <a href="/admin/industry" className="item">Industry</a>,
            <a href="/admin/continents" className="item">Continents</a>,
            <a href="/admin/languages" className="item">Languages</a>,
            <a href="/admin/pages" className="item">Pages</a>,
            <a href="/admin/rules" className="item">Notificationrules</a>,
            <a onClick={this._onLogout} className="item" href="#">Logout</a>
          ];
      } else {
          loginOrOut = [
              <a href="/admin" className="active item">Moodwonder</a>,
              <a className="item" href="/admin">Log in</a>
          ];
      }


      return (
        <div className="ui inverted menu">
            {loginOrOut}
        </div>
      );
  }

}

AdminNavigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
