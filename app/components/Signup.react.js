import React from 'react';
import Immutable from 'immutable';

import SignupActions from 'actions/SignupActions';
import SignupStore from 'stores/SignupStore';

export default class Signup extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
  }

  componentDidMount() {
    SignupStore.listen(this._onChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      user: SignupStore.getState().user
    });
  }

  _onSignupSubmit = () => {
    const email = React.findDOMNode(this.refs.email).value.trim();
    const password = React.findDOMNode(this.refs.password).value.trim();
    const name = React.findDOMNode(this.refs.name).value.trim();
    if (!email || !password || !name) {
      return;
    }
    SignupActions.usersignup({
      email: email,
      password: password,
      name: name
    });
  }

  render() {
    let renderedResult;
    if (this.state.user.get('isRegistered')) {
      renderedResult = (
              <div className="login__container">
                <fieldset className="login__fieldset">
                    <h3 className="login__header">Registered successfully.</h3>
                    <br/>
                    Please proceed with <a href="login">Login</a>
                </fieldset>    
              </div>
              );
    } else {
      if (this.state.user.get('isSignupWaiting')) {
        renderedResult = (<h3 className="login__header">Processing...</h3>);
      } else {
        renderedResult = (
          <div className="login__container">
            <fieldset className="login__fieldset">
                <h3>Signup here..</h3>
                <span>Name : </span>
                <input type="text" ref="name" placeholder="name" />
                <br/><br/>
                <span>Email : </span>
                <input type="email" ref="email" placeholder="email" />
                <br/><br/>
                <span>Password : </span>
                <input type="password" ref="password" placeholder="password" />
                <br/><br/>
                <span>* All fields are required.</span>
                <br/><br/>
                <button onClick={this._onSignupSubmit}>Register</button>
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

Signup.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
