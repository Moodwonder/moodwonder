import React from 'react';
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

  _onChange = (state) => {
    this.setState(state);
  }

  formSubmit = (e) => { e.preventDefault(); }

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

    console.log(this.state.isRegistered);
    let renderedResult;
    let message;

    if (this.state.message != "") {
        message = (
            <div className="alert alert-info">
                {this.state.message}
            </div>
        );
    }

    if (this.state.isRegistered) {
        renderedResult = (
            <div className="login__container">
                <fieldset className="login__fieldset">
                   {message}
                </fieldset>
            </div>
        );

    }else {

        if (this.state.isSignupWaiting) {
            renderedResult = (<h3 className="login__header">Processing...</h3>);
        } else {

        renderedResult = (
            <div className="container">
                <h2>Signup here..</h2>
                <h3>for free</h3>
                {message}
                <div role="form">
                    <div className="form-group">
                        <input type="email" ref="email" className="form-control" id="email" placeholder="Work email"/>
                    </div>
                    <button className="btn btn-default" onClick={this._onSignupStep1Submit}>Sign Up</button>
                </div>
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

Signup.propTypes = { user: {} };
