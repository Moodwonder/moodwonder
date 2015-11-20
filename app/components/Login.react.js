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
      let renderedResult;
      let message;

      if (this.state.message !== '') {
          message = (
                <div className="login__container">
                      <fieldset className="login__fieldset">
                         <div className="alert alert-info">
                              {this.state.message}
                         </div>
                      </fieldset>
                </div>
            );
      }

      if (this.state.isLoggedIn) {
          let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
          renderedResult = (
            <div className="container">
              <h2 className="login__header">Welcome {currentUser.name}</h2>
            </div>
          );

      }else {
          if (this.state.isLogginWaiting) {
              message = (<h3 className="login__header">Processing...</h3>);
          }
      }

      return (
		<div className="ui middle aligned center aligned grid">
		  <div className="column">
			<h2 className="ui  image header"> <img src="assets/images/logo.png" className="image"/> </h2>
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
			<div className="ui message "> <a href="#" className="frgt">Forget Password?</a> <a href="main-home.html">Sign Up</a> </div>
		  </div>
		</div>
      );
  }
}

Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
Login.contextTypes = { router: React.PropTypes.func };
