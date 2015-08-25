import React from 'react';
import Notification from 'react-notification';

import CreatePswdActions from 'actions/CreatePswdActions';
import CreatePswdStore from 'stores/CreatePswdStore';


export default class CreatePassword extends React.Component {

  constructor(props) {
      super(props);
      this.state = CreatePswdStore.getState();
      this.state.notificationReact = {
        message: 'Invalid password!',
        action: 'X',
        isActive: false,
        dismissAfter: 5000,
        position: 'tr',
        style: {
              bar: {
                bottom: '82%',
                backgroundColor: 'rgb(97, 172, 234)'
              },
              action: {
                color: 'rgb(20, 27, 32)'
              }
            }
      };
  }

  componentDidMount() {
      CreatePswdStore.listen(this._onChange);
  }

  componentWillUnmount() {
      CreatePswdStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
      if(this.state.hasError){
          this.showNotification(this.state.message);
      }
      if(this.state.responseStatus){
          window.location.assign('/survey');
          //this.context.router.transitionTo('/survey');
      }
  }

  formSubmit = (e) => { e.preventDefault(); }

  showNotification = (message) => {
      this.setState({
          notificationReact: {
              ...this.state.notificationReact,
              isActive: true,
              message: message
          }
      });
  }

  _onSignupStep2Submit = () => {

      let password = React.findDOMNode(this.refs.password).value.trim();
      let hash = React.findDOMNode(this.refs.hash).value.trim();
      if (password === '') {

          this.showNotification('Password field cannot be empty');
      }else if(password.length <= 6){

          this.showNotification('Password length should be at least 7 characters');
      }else{

          CreatePswdActions.usersignupstep2({
            password: password,
            hash: hash
        });
      }

  }

  handleNotificationClick = (notification) => {
      if (notification === 'password') {
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

      if (this.state.hasError) {
          message = (
            <div className="alert alert-warning">
              {this.state.message}
            </div>
          );
      }
      else if (this.state.message !== '') {
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
                    {message}
                    <h2>Create your password here..</h2>
                    <div role="form">
                        <div className="form-group">
                            <input type="password" ref="password" className="form-control" id="password" placeholder="Enter your password" />
                            <input type="hidden" ref="hash" value={this.props.params.hash} />
                        </div>
                        <button className="btn btn-default" onClick={this._onSignupStep2Submit}>Create</button>
                    </div>
                    <Notification
                      {...this.state.notificationReact}
                      onClick={this.handleNotificationClick.bind(null, 'password')}
                      onDismiss={this.handleNotificationClick.bind(null, 'password')}
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
