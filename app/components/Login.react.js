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
          window.location.assign('/survey');
          //this.context.router.transitionTo('/survey');
      }
  }

  _onLoginSubmit = (model) => {
      let email = model.email.trim();
      let password = model.password.trim();
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

          renderedResult = (
          <div className="container">
            <h2>LGN_TITLE</h2>
            {message}
                <Formsy.Form onValidSubmit={this._onLoginSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                   <MyOwnInput
                   name="email"
                   className="form-control"
                   placeholder="LGN_USERNAME"
                   validations="isEmail"
                   validationError="This is not a valid email"
                   required/>
                   <MyOwnInput
                   type="password"
                   name="password"
                   className="form-control"
                   placeholder="LGN_PASSWORD"
                   validationError="This is not a valid email"
                   required/>
                   <button type="submit" className="btn btn-default" disabled={!this.state.canSubmit}>LGN_BTN_SUBMIT</button>
                   <div className="form-group" ><a href="/forgotpassword" >LGN_FORGOT_PASSWORD</a></div>
                </Formsy.Form>
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

Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
Login.contextTypes = { router: React.PropTypes.func };
