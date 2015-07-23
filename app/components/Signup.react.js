import React from 'react';
import Notification from 'react-notification';
import SignupActions from 'actions/SignupActions';
import SignupStore from 'stores/SignupStore';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
    this.state.notificationReact = {
      message: 'Invalid E-mail!',
      action: 'X',
      isActive: false,
      dismissAfter: 2000,
      style: {
            bar: {
              backgroundColor: 'rgb(97, 172, 234)',
            },
            action: {
              color: 'rgb(20, 27, 32)'
            }
          }
    }
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

  isValidEmailAddress = (emailAddress) => {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
  }

  _onEmailChange = (e) => {
    const email = React.findDOMNode(this.refs.email).value.trim();
    if (!this.isValidEmailAddress(email)) {
      this.setState({
        notificationReact: {
          ...this.state.notificationReact,
          isActive: true
        }
      });
    }
  }

  handleNotificationClick = (notification) => {
    if (notification === 'email') {
      this.setState({
        notificationReact: {
          ...this.state.notificationReact,
          isActive: false
        }
      });
    }
  }

  render() {

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
                        <input type="email" onBlur={this._onEmailChange} ref="email" className="form-control" id="email" placeholder="Work email"/>
                    </div>
                    <button className="btn btn-default" onClick={this._onSignupStep1Submit}>Sign Up</button>
                </div>
                <Notification
                  {...this.state.notificationReact}
                  onClick={this.handleNotificationClick.bind(null, 'email')}
                  onDismiss={this.handleNotificationClick.bind(null, 'email')}
                />
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
