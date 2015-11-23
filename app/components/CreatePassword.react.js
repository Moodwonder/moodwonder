import React from 'react';
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

          this.setState({
              message: 'Password field cannot be empty',
              hasErrorMessage: true
          });
          this.showNotification('Password field cannot be empty');
      }else if(password.length <= 6){

          this.setState({
              message: 'Password length should be at least 7 characters',
              hasErrorMessage: true
          });
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
      // console.log(this.state);
      let message;
      let multimessages;
      let hash; // for invitation

      try{
          hash = this.props.params.hash;
      }catch(e){}

      if (this.state.messages) {
          multimessages = this.state.messages.map((mes, key) => {
              return [<div className="ui blue message">{mes}</div>];
          });
      }

      if (this.state.hasErrorMessage && this.state.message) {
          message = [<div className="ui red message">{this.state.message}</div>];
      }

      if (this.state.isRegistered) {
          message = [<div className="ui green message">{this.state.message}</div>];
      }else {

          if (this.state.isSignupWaiting) {
              message = [<div className="ui yellow message">Processing...</div>];
          }
      }

      return (
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui header">Create your password here..</h2>
            <h2 className="ui image header"> <img src="../assets/images/logo.png" className="image"/> </h2>
              {message}
              {multimessages}
            <div className="ui large form">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <input type="password" ref="password" id="password" placeholder="Enter your password" />
                    <input type="hidden" ref="hash" value={hash} />
                  </div>
                </div>
                <button className="ui yellow button" onClick={this._onSignupStep2Submit}>Create</button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
