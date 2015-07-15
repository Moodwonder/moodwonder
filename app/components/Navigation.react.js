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
          <span>
            <Link onClick={this._onLogout} className="navigation__item" to="logout">Logout</Link> 
          </span>
        );
      } else {
        loginOrOut = (
          <span>      
            <Link className="navigation__item" to="login">Log in</Link>
            <Link to="signup" className="navigation__item" activeClassName="navigation__item--active">Signup</Link>
          </span>
        );  
      }
    return (
      <nav className="navigation" role="navigation">
          <Link to="/" className="navigation__item" activeClassName="navigation__item--active">Moodwonder</Link>
          { loginOrOut }
          <Link to="survey" className="navigation__item" activeClassName="navigation__item--active">Engagement Survey</Link>
          <Link to="customsurvey" className="navigation__item" activeClassName="navigation__item--active">Create Custom Survey</Link>
      </nav>
    );
  }

}

Navigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
