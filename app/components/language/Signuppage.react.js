import React from 'react';
// import Immutable from 'immutable';
// import UserWebAPIUtils from 'utils/UserWebAPIUtils';
// import $ from 'jquery';
// import Validation, { Validator } from 'rc-form-validation';
import getFormData from 'get-form-data';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyActions from 'actions/CustomSurveyActions';
//import CustomSurveyResultsStore from 'stores/CustomSurveyResultsStore';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Signuppage extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      //this.state = CustomSurveyStore.getState();
  }

  componentDidMount() {
      //CustomSurveyActions.getSurveyForm();
      //CustomSurveyStore.listen(this._onChange);
  }

  componentWillUnmount() {
      //CustomSurveyStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({});
  }

  onCancelHome = (e) => {
      e.preventDefault();
  }

  onSubmitHome = (e) => {
      e.preventDefault();
      let formData = document.querySelector('#surveyForm');
      let data = getFormData(formData, {trim: true});
      let surveyResults = [];
      //let form = this.state.form;
      //let qcount = _.size(form.questions);



      if (window.confirm('Are you sure you want to submit the changes ?')) {
          let results = {};
          results.surveyresults = surveyResults;
          //CustomSurveyResultsActions.saveSurveyResults(results);
      }
  }

  render() {
      
      return (
      <div className="container">
        <h2>Signup page details</h2>
        <form id="homepageForm">
          <input type="hidden" name="pageid" value="" />
          <input type="hidden" name="language" value="" />
          <br/>
          <div className="form-group">
            <input type="text" name="" />
            <br/><br/>
            <button className="btn btn-danger" onClick={this.onCancelHome}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSubmitHome}>Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

Signuppage.contextTypes = { router: React.PropTypes.func };

