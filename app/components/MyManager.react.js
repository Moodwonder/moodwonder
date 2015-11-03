import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';


export default class MyManager extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = UserStore.getState();
      this.state.canSubmit = false;
      this.state.mymanager = '';
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
      state.mymanager = this.state.userDetails.mymanager;
      this.setState(state);
  }

  _onSaveSubmit = (model) => {

      let email = React.findDOMNode(this.refs.email).value.trim();
      let data  = { type: 'savemanager', email: email };
      UserActions.saveManagerInfo(data);
  }

  changeValue = (event) => {
      let mymanager = { mymanager: event.target.value };
      this.setState(mymanager);
  }

  render() {

      let renderedResult;

      let message;

      let userInfo = this.state.userDetails;

      if (this.state.message !== '' ) {
          message = (
              <div className="ui error message" style={{ display: 'block' }} >
                {this.state.message}
              </div>
          );
      }

      renderedResult = (
        <div className="ten wide column">
          <div className="ui segment">
           <h4 className="ui header ryt">PRFL_MNGR_MYMANAGER</h4>
                {message}
               <div className="ui small form">
                <h3 className="ui dividing header">PRFL_MNGR_TOP_MSG</h3>

                    <div className=" field">
                        <div className="field ui two column stackable grid container">
                            <label className="column"><i className="privacy icon large"></i>PRFL_MNGR_ROL</label>
                            <label className="column"> Manager </label>
                        </div>
                        <div className="field ui two column stackable grid container">
                            <label className="column"><i className="mail icon large"></i>PRFL_MNGR_EMAIL</label>
                            <label className="column"> {userInfo.mymanager} </label>
                        </div>
                        <div className="field ui two column stackable grid container">
                            <label className="column"><i className="user icon large"></i>PRFL_MNGR_CHNG_MNGR</label>
                            <label className="column"> <input placeholder="Work Email" ref="email" type="email" onChange={this.changeValue} value={this.state.mymanager} /></label>
                        </div>
                        <div className="ui submit  button cancel">PRFL_MNGR_CANCEL</div><div onClick={this._onSaveSubmit} className="ui submit button submitt">PRFL_MNGR_SUBMIT</div>
                    </div>
               </div>
          </div>
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
