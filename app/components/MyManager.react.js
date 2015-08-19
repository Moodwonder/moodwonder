import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { MyOwnInput } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';

export default class MyManager extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = UserStore.getState();
      this.state.canSubmit = false;
      this.validationErrors = {};
  }

  componentDidMount () {
      UserActions.getuserinfo();
      UserStore.listen(this._onChange);
  }

  componentWillUnmount () {
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
      console.log(model);
      UserActions.saveManagerInfo(model);
  }

  render() {

      let renderedResult;

      let message;

      let userInfo = this.state.userDetails;

      if (this.state.message !== '' ) {
          message = (
              <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                {this.state.message}
              </div>
          );
      }

      renderedResult = (
        <div className="container">
          <Submenu />
          <h2>My Manager</h2>
          {message}
          <Formsy.Form onValidSubmit={this._onSaveSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton} >

            <MyOwnInput
            name="email"
            autocomplete="off"
            className="form-control"
            value={userInfo.mymanager}
            disabled={( userInfo.mymanager === '' || userInfo.mymanager === undefined ) ? false:true}
            placeholder="Work Email"
            validations="isEmail"
            validationError="This is not a valid email"
            required/>

            <MyOwnInput
            name="type"
            type="hidden"
            value="savemanager"
            required/>

            <button type="submit" className="btn btn-default"
            disabled={!this.state.canSubmit}>Submit</button>
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
MyManager.contextTypes = { router: React.PropTypes.func };
