import React from 'react';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import MyOwnInput from 'components/Formsy-components';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
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
  }

  _onLoginSubmit = (model) => {
    var email = model.email.trim();
    var password = model.password.trim();
    UserActions.manuallogin({
      email: email,
      password: password
    });
  }

  render() {
    let renderedResult;
    let message;

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
            <h2>Login here..</h2>
            {message}
                <Formsy.Form onValidSubmit={this._onLoginSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                   <MyOwnInput
                   name="email"
                   className="form-control"
                   placeholder="Email"
                   validations="isEmail"
                   validationError="This is not a valid email"
                   required/>
                   <MyOwnInput
                   type="password"
                   name="password"
                   className="form-control"
                   placeholder="Password"
                   validationError="This is not a valid email"
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

Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
