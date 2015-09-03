import React from 'react';
import { Link } from 'react-router';
import Immutable from 'immutable';
import AdminActions from 'actions/AdminActions';
import AdminStore from 'stores/AdminStore';

export default class AdminNavigation extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          isAuth: AdminStore.getState().isAuth
      };
  }

  componentDidMount () {
      AdminStore.listen(this._onChange);
      let isAuth = localStorage.getItem('isAuth');
      this.setState({isAuth: isAuth});
  }

  componentWillUnmount () {
      AdminStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
        isAuth: AdminStore.getState().isAuth
      });
  }

  _onLogout = () => {
      AdminActions.logout();
  }

  render () {

      let loginOrOut;

      if (this.state.isAuth === "true") {
          loginOrOut = [
            <li><Link to="/admin/languages" className="navigation__item">Languages</Link></li>,
            <li><Link to="/admin/pages" className="navigation__item">Pages</Link></li>,
            <li><Link onClick={this._onLogout} className="navigation__item" to="/admin">Logout</Link></li>
          ];
      } else {
          loginOrOut = [
              <li><Link className="navigation__item" to="/admin">Log in</Link></li>
          ];
      }


      return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
                  <div className="navbar-header">
                        <ul className="nav navbar-nav  navbar-left">
                            <li><a href="/" className="navbar-brand navigation__item">Moodwonder</a></li>
                        </ul>
                  </div>
                  <div>
                        <ul className="nav navbar-nav  navbar-right">
                         {loginOrOut}
                        </ul>
                  </div>
            </div>
        </nav>
      );
  }

}

AdminNavigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
