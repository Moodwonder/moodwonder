import React from 'react';
// import Validation, { Validator } from 'rc-form-validation';
// import getFormData from 'get-form-data';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
// import LanguageActions from 'actions/LanguageActions';

export default class Signuppage extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  _onChange = () => {
      // this.setState({});
  }

  onCancelLogin = (e) => {
      e.preventDefault();
  }

  onSubmitLogin = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

//  onSubmitLogin = (e) => {
//      e.preventDefault();
//      let formData = document.querySelector('#signupForm');
//      let data = getFormData(formData, {trim: true});
//      let login = login || {};
//
//      login.language = data['language'];
//      login.LOIGN_TITLE = data['LOIGN_TITLE'];
//      login.USERNAME = data['USERNAME'];
//      login.PASSWORD = data['PASSWORD'];
//      login.FORGOT_PASSWORD = data['FORGOT_PASSWORD'];
//
//      let pageid = data['_id'];
//
//      if (window.confirm('Are you sure you want to submit the changes ?')) {
//          LanguageActions.updatePageKeys(pageid, 'login', login);
//          console.log(JSON.stringify(login));
//      }
//  }

  render() {

      let pagedata = this.props.pagedata;
      console.log(pagedata);


      return (
      <div className="container">
        <h2>Login page details - {pagedata._id}</h2>
        <form id="signupForm">
          <input type="hidden" name="_id" value={pagedata._id} />
          <input type="hidden" name="language" value={pagedata.language} />
          <br/>
          <div className="form-group">
            <label>LOIGN_TITLE</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.LOIGN_TITLE} />&nbsp;&nbsp;
            <textarea name="LOIGN_TITLE">{pagedata.LOIGN_TITLE}</textarea>
          </div>
          <div className="form-group">
            <label>USERNAME</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.USERNAME} />&nbsp;&nbsp;
            <textarea name="USERNAME">{pagedata.USERNAME}</textarea>
          </div>
          <div className="form-group">
            <label>PASSWORD</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.PASSWORD} />&nbsp;&nbsp;
            <textarea name="PASSWORD">{pagedata.PASSWORD}</textarea>
          </div>
          <div className="form-group">
            <label>FORGOT_PASSWORD</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.FORGOT_PASSWORD} />&nbsp;&nbsp;
            <textarea name="FORGOT_PASSWORD">{pagedata.FORGOT_PASSWORD}</textarea>
          </div>
          <div className="form-group">
            <br/><br/>
            <button className="btn btn-danger" onClick={this.onCancelLogin}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSubmitLogin}>Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

Signuppage.contextTypes = { router: React.PropTypes.func };

