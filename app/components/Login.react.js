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
      renderedResult = (<span>
              <h3 className="login__header">Welcome {currentUser.name}</h3>
              </span>
              );
    } else {
      if (this.state.user.get('isWaiting')) {
        renderedResult = (<h3 className="login__header">Waiting ...</h3>);
      } else {
        renderedResult = (
          <div className="login__container">
            <fieldset className="login__fieldset">
                <h3>Login here..</h3>
                <span>Email : </span>
                <input type="email" ref="email" placeholder="email" />
                <br/><br/>
                <span>Password : </span>
                <input type="password" ref="password" placeholder="password" />
                <br/><br/>
                <button onClick={this._onLoginSubmit}>Login</button>
            </fieldset>
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
