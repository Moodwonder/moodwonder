import React from 'react';
// import Validation, { Validator } from 'rc-form-validation';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Homepage extends React.Component {

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

  onCancelHome = (e) => {
      e.preventDefault();
  }

  onSubmitHome = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }


  render() {

      let pagedata = this.props.pagedata;
      console.log(pagedata);

      return (
      <div className="container">
        <h2>Home page details</h2>
        <form id="homeForm">
          <input type="hidden" name="_id" value={pagedata._id} />
          <input type="hidden" name="language" value={pagedata.language} />
          <br/>
          <div className="form-group">
            <label>HOME_TITLE</label>&nbsp;&nbsp;
            <input type="text" value={pagedata.HOME_TITLE} />&nbsp;&nbsp;
            <textarea name="HOME_TITLE">{pagedata.HOME_TITLE}</textarea>
          </div>
          <div className="form-group">
            <br/><br/>
            <button className="btn btn-danger" onClick={this.onCancelHome}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSubmitHome}>Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

Homepage.contextTypes = { router: React.PropTypes.func };

