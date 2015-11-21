import React from 'react';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { MyOwnInput } from 'components/Formsy-components';
// import mixins from 'es6-mixins';

export default class Login extends React.Component {

  constructor(props) {
      super(props);
      // mixins(Navigation, this);
      // No need of mixins in ES6 pattern
      this.state = UserStore.getState();
      this.state.canSubmit = false;
      this.validationErrors = {};
  }

  componentDidMount() {
      UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
      UserStore.unlisten(this._onChange);
  }

  enableButton = () => {
      this.setState({canSubmit: true});
  }

  disableButton = () => {
      this.setState({canSubmit: false});
  }

  _onChange = (state) => {
      this.setState(state);
      if(this.state.isLoggedIn){
          let hashkey = this.getCookie('takesurvey');
          this.deleteCookie('deleteCookie');
          if(hashkey) {
              window.location.assign('/takesurvey/' + hashkey);
          } else {
              //window.location.assign('/survey');
              window.location.assign('/mymood');
          }
          //this.context.router.transitionTo('/survey');
      }
  }

  deleteCookie = (name) => {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  getCookie = (cname) => {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i=0; i<ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0)===' ') c = c.substring(1);
          if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
      }
      return "";
  }

  _onLoginSubmit = () => {
	  console.log('_onLoginSubmit');
        let email = React.findDOMNode(this.refs.email).value.trim();
        let password = React.findDOMNode(this.refs.password).value.trim();

        UserActions.manuallogin({
            email: email,
            password: password
        });
  }

  render() {
	  console.log(this.state);
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
			<h2 className="ui  image header"> <img src="assets/images/logo.png" className="image"/> </h2>
			  {message}
			  {multimessages}
			<div className="ui large form">
			  <div className="ui stacked segment">
				<div className="field">
				  <div className="ui left icon input">
					<input type="text" ref="email" name="email" placeholder="E-mail address" />
				  </div>
				</div>
				<div className="field">
				  <div className="ui left icon input">
					<input type="password" ref="password" name="password" placeholder="Password" />
				  </div>
				</div>
				<button className="ui yellow button" onClick={this._onLoginSubmit}>Login</button>
			  </div>
			  <div className="ui error message segment"></div>
			</div>
			<div className="ui message "> <a href="/forgotpassword" className="frgt">Forget Password?</a> <a href="/#firstPage">Sign Up</a> </div>
		  </div>
		</div>
      );
  }
}

Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
Login.contextTypes = { router: React.PropTypes.func };
