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

  _onSignupStep1Submit = () => {
    const email = React.findDOMNode(this.refs.email).value.trim();
    if (!email) {
      return;
    }
    SignupActions.usersignupstep1({
      email: email
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
			<div className="container">
			  <h2>Signup here..</h2>
			  <h3>for free</h3>
			  <form role="form">
				<div className="form-group">
				  <input type="email" ref="email" className="form-control" id="email" placeholder="Work email"/>
				</div>
				<button className="btn btn-default" onClick={this._onSignupStep1Submit}>Sign Up</button>
			  </form>
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
