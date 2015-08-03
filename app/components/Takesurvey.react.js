import React from 'react';
import Immutable from 'immutable';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import $ from 'jquery';
import Validation, { Validator } from 'rc-form-validation';
import Question from 'components/Question.react';
import getFormData from 'get-form-data';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyResultsStore from 'stores/CustomSurveyResultsStore';
import { Router, Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Takesurvey extends React.Component {

  constructor(props) {
    super(props);
    this.state = CustomSurveyResultsStore.getState();
  }

  componentDidMount() {
    //CustomSurveyResultsActions.getSurveyForm();
    CustomSurveyActions.getSurveyForm();
  }

  componentWillUnmount() {
  }

  _onChange = () => {
  }

  render() {
    console.log(this.state.form);
    let form = this.state.form;
    return (
      <div className="container">
        <h2>Take a survey - {form.surveytitle}</h2>
        <form id="surveyForm">
          <div className="form-group">
            <input type="text" ref="surveytitle" className="form-control" id="surveytitle" placeholder="Survey title"/>
          </div>
          <div></div>
          <br/>
          <div className="form-group">
            <button className="btn btn-success" onClick="">Add Question</button>&nbsp;&nbsp;
            <button className="btn btn-primary" onClick="">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

