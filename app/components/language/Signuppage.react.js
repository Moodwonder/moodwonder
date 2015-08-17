import React from 'react';
// import Validation, { Validator } from 'rc-form-validation';
import getFormData from 'get-form-data';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import LanguageActions from 'actions/LanguageActions';

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

  onCancelSignup = (e) => {
      e.preventDefault();
  }

  onSubmitSignup = (e) => {
      e.preventDefault();
      let formData = document.querySelector('#signupForm');
      let data = getFormData(formData, {trim: true});
      let signup = signup || {};

      signup.language = data['language'];
      signup.SIGNUP_TITLE = data['SIGNUP_TITLE'];
      signup.SUB_TITLE = data['SUB_TITLE'];

      let pageid = data['_id'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          LanguageActions.updatePageKeys(pageid, 'signup', signup);
          console.log(JSON.stringify(signup));
      }
  }

  render() {

      let pagedata = this.props.pagedata;
      console.log(pagedata);


      return (
      <div className="container">
        <h2>Signup page details - {pagedata._id}</h2>
        <form id="signupForm">
          <input type="hidden" name="_id" value={pagedata._id} />
          <input type="hidden" name="language" value={pagedata.language} />
          <br/>
          <div className="form-group">
            <label>SIGNUP_TITLE</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.SIGNUP_TITLE} />
            <textarea name="SIGNUP_TITLE">{pagedata.SIGNUP_TITLE}</textarea>
          </div>
          <div className="form-group">
            <label>SUB_TITLE</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.SUB_TITLE} />
            <textarea name="SUB_TITLE">{pagedata.SUB_TITLE}</textarea>
          </div>
          <div className="form-group">
            <br/><br/>
            <button className="btn btn-danger" onClick={this.onCancelSignup}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSubmitSignup}>Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

Signuppage.contextTypes = { router: React.PropTypes.func };

