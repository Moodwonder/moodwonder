import React from 'react';
import { Link } from 'react-router';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }

  _onLogout = () => {
    UserActions.logout();
  }

  render() {
      let loginOrOut;
      if(this.state.user.get('authenticated')){
        loginOrOut = (
            <li><Link onClick={this._onLogout} className="navigation__item" to="logout">Logout</Link></li>
        );
      } else {
        loginOrOut = [
            <li><Link className="navigation__item" to="login">Log in</Link></li>,
            <li><Link to="signup" className="navigation__item" activeClassName="navigation__item--active">Signup</Link></li>,
            <li><Link to="customsurvey" className="navigation__item">Customsurvey</Link></li>
        ];
      }
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link to="/" className="navbar-brand navigation__item" activeClassName="navigation__item--active">Moodwonder</Link>
            </div>
            <div>
                <ul className="nav navbar-nav  navbar-right">
                  { loginOrOut }
                  <li>
                    <a className="navigation__item">
                    <select className="navigation__item">
                        <option>EN</option>
                        <option>FL</option>
                    </select>
                    </a>
                  </li>
                </ul>
            </div>
        </div>
      </nav>
    );
  }

}

Navigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
