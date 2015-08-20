import React from 'react';
import { Link } from 'react-router';
import Immutable from 'immutable';
// import UserActions from 'actions/UserActions';
// import UserStore from 'stores/UserStore';

export default class AdminNavigation extends React.Component {

  constructor (props) {
      super(props);
      // this.state = UserStore.getState();
  }

  componentDidMount () {
      // UserStore.listen(this._onChange);
  }

  componentWillUnmount () {
      // UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
        // user: UserStore.getState().user
      });
  }

  _onLogout = () => {
      // UserActions.logout();
  }

  render () {

      return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
                  <div className="navbar-header">
                        <Link to="/" className="navbar-brand navigation__item" activeClassName="navigation__item--active">Moodwonder</Link>
                  </div>
                  <div>
                        <ul className="nav navbar-nav  navbar-right">
                          <li>
                            <Link to="/admin" className="navigation__item">Admin</Link>
                          </li>
                          <li>
                            <Link to="/admin/languages" className="navigation__item">Languages</Link>
                          </li>
                          <li>
                            <Link to="/admin/pages" className="navigation__item">Pages</Link>
                          </li>
                        </ul>
                  </div>
            </div>
        </nav>
      );
  }

}

AdminNavigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
