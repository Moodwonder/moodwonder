import React from 'react';
// import Validation, { Validator } from 'rc-form-validation';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

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
      this.props.onClick(this);
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
            <input type="text" value={pagedata.SIGNUP_TITLE} />&nbsp;&nbsp;
            <textarea name="SIGNUP_TITLE">{pagedata.SIGNUP_TITLE}</textarea>
          </div>
          <div className="form-group">
            <label>SUB_TITLE</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.SUB_TITLE} />&nbsp;&nbsp;
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

