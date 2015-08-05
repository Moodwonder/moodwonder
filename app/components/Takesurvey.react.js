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
//import CustomSurveyResultsStore from 'stores/CustomSurveyResultsStore';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Router, Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Takesurvey extends React.Component {

  constructor(props) {
    super(props);
    mixins(Navigation, this);
    this.state = CustomSurveyStore.getState();
  }

  componentDidMount() {
    //CustomSurveyResultsActions.getSurveyForm();
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
    console.log('cancelled.');
  }

  onSubmitSurvey = (e) => {
    e.preventDefault();
    var form = document.querySelector('#surveyForm');
    var data = getFormData(form, {trim: true});
    console.log('submitted');
    console.log(JSON.stringify(data));
  }

  render() {
    let form = this.state.form;
    let questions = [];
    let fields = '';
    console.log(form);
    console.log(_.size(questions));

    for(var i = 0; i < _.size(form.questions); i++ ){
      questions.push(form.questions[i]);
    }

    let qno = 0;
    fields = questions.map((question) => {
       qno++;
       var answers = question.answers;
       var ans = '';
       var answerType = '';
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
                 <input type="hidden" name={'questionid_' + qno} value={question._id} />
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

