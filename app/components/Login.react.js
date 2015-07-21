import React from 'react';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

export default class Login extends React.Component {

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
      user: UserStore.getState().user,
      validate: UserStore.getState().validate
    });
  }

  _onLoginSubmit = () => {
    const email = React.findDOMNode(this.refs.email).value.trim();
    const password = React.findDOMNode(this.refs.password).value.trim();

    if (!email || !password) {
      return;
    }

    UserActions.manuallogin({
      email: email,
      password: password
    });
  }

  render() {

    let renderedResult;
    if (this.state.user.get('authenticated')) {
      let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      renderedResult = (<div className="container">
              <h2 className="login__header">Welcome {currentUser.name}</h2>
              </div>
              );
    } else {
      if (this.state.user.get('isWaiting')) {
        renderedResult = (<h3 className="login__header">Waiting ...</h3>);
      } else {
        renderedResult = (
          <div className="container">
            <h2>Login here..</h2>
            <div className="form-group">
              <input type="email" ref="email" placeholder="Email" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="Password" className="form-control"/>
            </div>
            <button className="btn btn-default" onClick={this._onLoginSubmit}>Login</button>
          </div>
        );
      }
    }
    return (
        <div className="login">
          {renderedResult}
        </div>
    );
  }
}

Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
