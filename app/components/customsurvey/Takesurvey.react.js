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

export default class Takesurvey extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = CustomSurveyStore.getState();
  }

  componentDidMount() {
      CustomSurveyActions.getSurveyForm();
      CustomSurveyStore.listen(this._onChange);
  }

  componentWillUnmount() {
      CustomSurveyStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
       form: CustomSurveyStore.getState().form
    });
  }

  onCancelSurvey = (e) => {
      e.preventDefault();
  }

  onSubmitSurvey = (e) => {
      e.preventDefault();
      let formData = document.querySelector('#surveyForm');
      let data = getFormData(formData, {trim: true});
      let surveyResults = [];
      let form = this.state.form;
      let qcount = _.size(form.questions);

      for(let i = 1; i <= qcount; i++){
          let survey = survey || {};
          survey.user_id = 1; // Need to change in future.
          survey.survey_id = data.surveyid;
          survey.question_id = data['questionid_' + i];
          survey.question = data['question_' + i];
          survey.answertype = data['answer_type_' + i];
          survey.answers = [];
          let options = {};
          if(data['answer_type_' + i] === 'checkbox') {
              for(let answer of data['answer_' + i + '_[]']){
                  options = {};
                  options.option = answer;
                  survey.answers.push(options);
              }
          } else {
              options.option = data['answer_' + i];
              survey.answers.push(options);
          }
          surveyResults.push(JSON.stringify(survey));
          // console.log(JSON.stringify(survey));
      }

      if (window.confirm('Are you sure you want to submit survey details ?')) {
          let results = {};
          results.surveyresults = surveyResults;
          CustomSurveyResultsActions.saveSurveyResults(results);
      }
  }

  render() {
      let form = this.state.form;
      console.log(form);
      let questions = [];
      let fields = '';
      let qcount = _.size(form.questions);

      for(let i = 0; i < qcount; i++ ){
          questions.push(form.questions[i]);
      }

      let qno = 0;
      fields = questions.map((question) => {
          qno++;
          let answers = question.answers;
          let ans = '';

          switch(question.answertype){
              case 'radio':
               ans = answers.map((answer) => {
                   return (
                        <span>
                          <input type="radio" name={'answer_' + qno} value={answer.option} /> {answer.option}&nbsp;&nbsp;
                        </span>
                       );
               });
               break;

              case 'checkbox':
               ans = answers.map((answer) => {
                   return (
                        <span>
                          <input type="checkbox" value={answer.option} name={'answer_' + qno + '_[]'}/> {answer.option}&nbsp;&nbsp;
                        </span>
                       );
               });
               break;

              case 'textbox':
               ans = (
                      <span>
                        <input type="textbox" name={'answer_' + qno}/>
                      </span>
                     );
               break;

              case 'textarea':
               ans = (
                      <span>
                       <textarea name={'answer_' + qno}></textarea>
                      </span>
                     );
               break;

              default: break;
          }

          return (
               <div className="form-group" id={qno}>
                 <label>{qno}&nbsp;:&nbsp;</label>
                 <label>{question.question}</label>
                 <input type="hidden" name={'questionid_' + qno} value={question.question_id} />
                 <input type="hidden" name={'question_' + qno} value={question.question}/>
                 <input type="hidden" name={'answer_type_' + qno} value={question.answertype} />
                 <br/>{ans}
               </div>
              );
      });

      let content = (
        <div className="form-group">
          {fields}
        </div>
      );

      return (
      <div className="container">
        <h2>{form.surveytitle} - {form._id}</h2>
        <form id="surveyForm">
          <input type="hidden" name="surveyid" value={form._id} />
          <input type="hidden" name="surveytitle" value={form.surveytitle} />
          {content}
          <br/>
          <div className="form-group">
            <button className="btn btn-danger" onClick={this.onCancelSurvey}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSubmitSurvey}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

Takesurvey.contextTypes = { router: React.PropTypes.func };

