import React from 'react';
import getFormData from 'get-form-data';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';

export default class Takesurvey extends React.Component {

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
             <div className="form-group">
                 {statusmessage}
                 <h2>{form.surveytitle}</h2>
                 <form id="surveyForm">
                   <input type="hidden" name="surveyid" value={form._id} />
                   <input type="hidden" name="surveytitle" value={form.surveytitle} />
                   <div className="form-group">
                     {fields}
                   </div>
                   <br/>
                   <div className="form-group">
                     <button className="btn btn-danger" onClick={this.onCancelSurvey}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
                     <button className="btn btn-primary" onClick={this.onSubmitSurvey}>Submit</button>
                   </div>
                 </form>
             </div>
          );
      }

      return (
      <div className="container">
      <Submenu />
      {content}
      </div>
    );
  }
}

Takesurvey.contextTypes = { router: React.PropTypes.func };

