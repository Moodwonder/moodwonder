import React from 'react';
import Immutable from 'immutable';
import getFormData from 'get-form-data';
import AdminActions from 'actions/AdminActions';
import AdminStore from 'stores/AdminStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Adminlogin extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = AdminStore.getState();
      this.state = {
        canSubmit: false,
        isAuth: AdminStore.getState().isAuth,
        authFailure: AdminStore.getState().authFailure
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
          isAuth: AdminStore.getState().isAuth,
          authFailure: AdminStore.getState().authFailure
      });

      if(this.state.isAuth === "true"){
          //window.location.assign('/admin/dashboard');
          this.context.router.transitionTo('/admin/dashboard');
      } else {
          //window.location.assign('/admin');
          this.context.router.transitionTo('/admin');
      }
  }

  onAdminLogin = (e) => {
      e.preventDefault();
      let form = document.querySelector('#adminLogin');
      let data = getFormData(form, {trim: true});
      let username = data['username'];
      let password = data['password'];
      console.log({ username: username, password: password });
      AdminActions.login({ username: username, password: password });
  }

  render() {
      let renderedResult = '';
      let authFailure = this.state.authFailure;
      let logStatus = '';
      if(authFailure === "true") {
          logStatus = (<div className="alert alert-danger">
                        <strong>Error!</strong> Invalid username or password.
                       </div>);
      }

      renderedResult = (
          <div className="container">
            <h2>Admin login..</h2>
                {logStatus}
                <form id="adminLogin">
                  <div className="form-group">
                    <input type="text" className="form-control" name="username" placeholder="username"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="password"/>
                  </div>
                  <br/>
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={this.onAdminLogin}>Submit</button>
                  </div>
                </form>
          </div>
        );

      return (
          <div className="login">
            {renderedResult}
          </div>
      );

  }
}

Adminlogin.propTypes = { adminuser: React.PropTypes.instanceOf(Immutable.Map) };
Adminlogin.contextTypes = { router: React.PropTypes.func };
