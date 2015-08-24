import React from 'react';
import Immutable from 'immutable';
import AdminActions from 'actions/AdminActions';
import AdminStore from 'stores/AdminStore';
import { MyOwnInput } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Adminlogin extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = AdminStore.getState();
      this.state = {
        canSubmit: false,
        isAuth: AdminStore.getState().isAuth
      };
      this.validationErrors = {};
  }

  componentDidMount() {
      AdminStore.listen(this._onChange);
  }

  componentWillUnmount() {
      AdminStore.unlisten(this._onChange);
  }

  enableButton = () => {
      this.setState({canSubmit: true});
  }

  disableButton = () => {
      this.setState({canSubmit: false});
  }

  _onChange = () => {
      this.setState({
          isAuth: AdminStore.getState().isAuth
      });

      if(this.state.isAuth === "true"){
          window.location.assign('/admin/dashboard');
          //this.context.router.transitionTo('/survey');
      } else {
          window.location.assign('/admin');
      }
  }

  _onLoginSubmit = (model) => {
      let username = model.username.trim();
      let password = model.password.trim();
      console.log({ username: username, password: password });
      AdminActions.login({ username: username, password: password });
  }

  render() {
      let renderedResult = '';

      if (this.state.isLoggedIn) {
          let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
          renderedResult = (
            <div className="container">
              <h2 className="login__header">Welcome {currentUser.name}</h2>
            </div>
          );

      }else {

          renderedResult = (
          <div className="container">
            <h2>Admin login..</h2>
                <Formsy.Form onValidSubmit={this._onLoginSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                   <MyOwnInput
                   name="username"
                   className="form-control"
                   placeholder="Username"
                   validationError="Username required."
                   required/>
                   <MyOwnInput
                   type="password"
                   name="password"
                   className="form-control"
                   placeholder="Password"
                   validationError="Password required."
                   required/>
                   <button type="submit" className="btn btn-default" disabled={!this.state.canSubmit}>Submit</button>
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

Adminlogin.propTypes = { adminuser: React.PropTypes.instanceOf(Immutable.Map) };
Adminlogin.contextTypes = { router: React.PropTypes.func };
