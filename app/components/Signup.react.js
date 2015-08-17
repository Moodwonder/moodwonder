import React from 'react';
import Notification from 'react-notification';
import SignupActions from 'actions/SignupActions';
import SignupStore from 'stores/SignupStore';
import { MyOwnInput } from 'components/Formsy-components';

export default class Signup extends React.Component {

  constructor(props) {
      super(props);
      this.state = SignupStore.getState();
      this.state.canSubmit = false;
      this.validationErrors = {};
  }

  componentDidMount() {
      SignupStore.listen(this._onChange);
  }

  componentWillUnmount() {
      SignupStore.unlisten(this._onChange);
  }

  enableButton = () => {
      this.setState({canSubmit: true});
  }

  disableButton = () => {
      this.setState({canSubmit: false});
  }

  _onChange = (state) => {
      this.setState(state);
  }

  formSubmit = (e) => { e.preventDefault(); }

  _onSignupStep1Submit = (model) => {
      SignupActions.usersignupstep1(model);
  }

  showNotification = (message) => {
      this.setState({
          notificationReact: {
            ...this.state.notificationReact,
            isActive: true,
            message: message
          }
      });
  }

  isValidEmailAddress = (emailAddress) => {
      let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
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
      let multimessages;

      if (this.state.messages) {

          multimessages = this.state.messages.map((mes, key) => {
              return (
                  <div className="login__container">
                      <fieldset className="login__fieldset">
                          <div className="alert alert-info">
                              {mes}
                          </div>
                      </fieldset>
                  </div>
              );
          });

      }

      if (this.state.isRegistered) {
          renderedResult = (
                <div className="login__container">
                      <fieldset className="login__fieldset">
                         <div className="alert alert-info">
                              {this.state.message}
                         </div>
                      </fieldset>
                </div>
            );

      }else {

          if (this.state.isSignupWaiting) {
              message = (<h3 className="login__header">Processing...</h3>);
          }

          renderedResult = (
                <div className="container">
                      <h2>Signup here..</h2>
                      <h3>for free</h3>
                      {message}
                      {multimessages}
                      <Formsy.Form onValidSubmit={this._onSignupStep1Submit} onValid={this.enableButton} onInvalid={this.disableButton} >
                         <MyOwnInput
                         name="email"
                         className="form-control"
                         placeholder="Work email"
                         validations="isEmail"
                         validationError="This is not a valid email"
                         value={this.state.inviteEmail}
                         disabled={(this.state.inviteEmail !== '')}
                         required/>

                         <MyOwnInput
                         type="hidden"
                         name="hash"
                         value={this.props.params.hash}
                         />

                         <button type="submit" className="btn btn-default" disabled={!this.state.canSubmit}>Submit</button>
                      </Formsy.Form>
                      <Notification
                        {...this.state.notificationReact}
                        onClick={this.handleNotificationClick.bind(null, 'email')}
                        onDismiss={this.handleNotificationClick.bind(null, 'email')}
                      />
                </div>
            );

      }
      return (
            <div className="login">
               {renderedResult}
            </div>
      );
  }
}

Signup.propTypes = { user: {} };
