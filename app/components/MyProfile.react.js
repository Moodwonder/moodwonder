import React from 'react';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { MyOwnInput, MyOwnSelect } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    mixins(Navigation, this);
    this.state = UserStore.getState();
    this.state.canSubmit = false;
    this.validationErrors = {};
  }

  componentDidMount() {
    UserActions.getuserinfo();
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
    console.log(this.state.userDetails);
  }

  _onSaveSubmit = (model) => {
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

    var userInfo = this.state.userDetails;

    if(this.state.message != '' ) {
      message = (<h3 className="login__header">Processing...</h3>);
    }

    renderedResult = (
      <div className="container">
        <h2>My Profile</h2>
        {message}
            <Formsy.Form onValidSubmit={this._onSaveSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
               <MyOwnInput
               name="fname"
               className="form-control"
               value={userInfo.fname}
               placeholder="First name"
               validationError="First name is required"
               required/>

               <MyOwnInput
               name="lname"
               className="form-control"
               value={userInfo.lname}
               placeholder="Last name"
               validationError="Last name is required"
               required/>

               <MyOwnInput
               name="email"
               className="form-control"
               value={userInfo.email}
               placeholder="Work Email"
               validations="isEmail"
               validationError="This is not a valid email"
               required/>

               <MyOwnSelect
               name="language"
               className="form-control"
               value={userInfo.language}
               placeholder="Language"
               options={['EN', 'FL']}
               validationError="Language is required"
               required/>

               <MyOwnSelect
               name="reportfrequency"
               className="form-control"
               value={userInfo.reportfrequency}
               placeholder="reportfrequency"
               options={['Weekly', 'Monthly', 'Never']}
               validationError="Report frequency is required"
               required/>

               <MyOwnInput
               type="password"
               name="password"
               className="form-control"
               value={userInfo.password}
               placeholder="Password"
               validationError="This is not a valid email"
               required/>

               <button type="submit" className="btn btn-default" disabled={!this.state.canSubmit}>Submit</button>
            </Formsy.Form>
      </div>
    );


    return (
        <div className="login">
          {renderedResult}
        </div>
    );

  }
}
MyProfile.contextTypes = { router: React.PropTypes.func };
