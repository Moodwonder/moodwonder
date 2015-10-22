import React from 'react';
import getFormData from 'get-form-data';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Takesurveybk extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = CustomSurveyStore.getState();
      this.state.formstatus = false;
  }

  componentDidMount() {
      let id = this.props.params.key;
      CustomSurveyActions.getSurveyForm(id);
      CustomSurveyStore.listen(this._onChange);
      this.setState({formstatus: false});
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
          //survey.user_id = 1; // Need to change in future.
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
          console.log(results);
          CustomSurveyResultsActions.saveSurveyResults(results);
          this.setState({formstatus: true});
      }
  }

  getTodaysDate = () => {
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);
      return (year + '-' + month + '-' + day);
  }

  render() {
      let form = this.state.form;
      let formstatus = this.state.formstatus;
      let statusmessage = '';
      let questions = [];
      let fields = '';
      let qcount = _.size(form.questions);

      let today = this.getTodaysDate();

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
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name={'answer_' + qno} value={answer.option} tabIndex="0" className="hidden" />
                                <label>{answer.option}</label>
                            </div>
                        </div>
                       );
               });
               break;

              case 'checkbox':
               ans = answers.map((answer) => {
                   return (
                            <div className="field">
                                <div className="ui  checkbox">
                                    <input type="checkbox" value={answer.option} name={'answer_' + qno + '_[]'} tabIndex="0" />
                                    <label>{answer.option}</label>
                                </div>
                            </div>
                       );
               });
               break;

              case 'textbox':
               ans = (
                    <div className="field">
                        <input type="textbox" name={'answer_' + qno} />
                    </div>
                    );
               break;

              case 'textarea':
               ans = (
                    <div className="field">
                        <textarea name={'answer_' + qno} rows="2"></textarea>
                    </div>
                    );
               break;

              default: break;
          }

          return (
                <div className="column" id={qno}>
                    <div className="ui grey circular label">Q.{qno}</div>
                    <div className="ui left pointing label"> {question.question} </div>
                    <div className="ui form options">
                        <input type="hidden" name={'questionid_' + qno} value={question.question_id} />
                        <input type="hidden" name={'question_' + qno} value={question.question}/>
                        <input type="hidden" name={'answer_type_' + qno} value={question.answertype} />
                        <div className="inline fields">
                            {ans}
                        </div>
                    </div>
                </div>
              );
      });

      if(formstatus) {
          statusmessage = (<div className="alert alert-success">
                            <strong>Success!</strong> Form submitted.
                           </div>
                          );
      }

      let content = '';
      if (today > form.freezedate) {
          content = (
                  <div className="form-group">
                    <label>Survey expired.</label>
                  </div>
                  );

      } else {
          content = (
            <div className="ui two column stackable grid container">
                <div className="column">
                    <h4 className="ui header ryt com">{form.surveytitle}</h4>
                </div>
                <div className="column"></div>
                {statusmessage}
                <form id="surveyForm">
                    <input type="hidden" name="surveyid" value={form._id} />
                    <input type="hidden" name="surveytitle" value={form.surveytitle} />
                    <div className="column survey">
                        {fields}
                        <div className="column">
                            <div className="ui form options">
                                <div className="field">
                                    <button className="ui submit  button cancel" onClick={this.onCancelSurvey}>Cancel</button>
                                    <button className="ui submit button submitt" onClick={this.onSubmitSurvey}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
          );
      }

      return (
      <div className="ui bottom attached segment brdr-none menu minus-margin-top">
            <div className="ui segment brdr-none padding-none width-rating">
                <div className="clear"></div>
                {content}
            </div>
        </div>
    );
  }
}

Takesurveybk.contextTypes = { router: React.PropTypes.func };

