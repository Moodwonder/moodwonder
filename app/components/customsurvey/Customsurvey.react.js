import React from 'react';
// import Immutable from 'immutable';
// import UserWebAPIUtils from 'utils/UserWebAPIUtils';
// import $ from 'jquery';
// import Validation, { Validator } from 'rc-form-validation';
import Question from 'components/customsurvey/Question.react';
import getFormData from 'get-form-data';
// import _ from 'underscore';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';


export default class Customsurvey extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = CustomSurveyStore.getState();
      this.state = {
        qIndex: 1,
        questions: ['q1'],
        radio: [],
        rIndex: 1,
        checkbox: [],
        cIndex: 1,
        textbox: [],
        tIndex: 1,
        textarea: [],
        txIndex: 1
    };
  }

  componentDidMount() {
      //console.log(this.state.questions);
      //console.log(this.state.qIndex);
      CustomSurveyStore.listen(this._onChange);
  }

  componentWillUnmount() {
      this.setState({qIndex: this.state.qIndex + 1});
      CustomSurveyStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          isSurveySaved: CustomSurveyStore.getState().isSurveySaved
      });
  }

  onFormListsClick = (e) => {
      e.preventDefault();
      this.context.router.transitionTo('/surveyforms');
  }

  onSurveyClick = (e) => {
      e.preventDefault();
      this.context.router.transitionTo('/takesurvey');
  }

  onSurveySubmit = (e) => {
      e.preventDefault();
      let form = document.querySelector('#surveyForm');
      let data = getFormData(form, {trim: true});
      let question = this.state.questions;
      let survey = survey || {};
      console.log(JSON.stringify(data));

      survey.id = 'S1';
      survey.surveytitle = data.surveytitle;
      survey.user_id = 1;
      survey.createddate = '29-july-2015';
      survey.target_teamid = 2;
      survey.questions = [];
      let keys = Object.keys(data);

      for(let qid of question){
          let id = qid.replace('q', '');
          let qTemp = {};

          qTemp.question = data['question_' + qid];
          qTemp.question_id = id;
          qTemp.answertype = data['answertype_' + qid];
          qTemp.answers = [];

          let rString = qid + 'r';
          let cString = qid + 'c';
          let tString = qid + 'te';
          let txString = qid + 'tx';

          for (let key of keys) {
              let aTemp = {};
              if((key.search(rString) !== -1) || (key.search(cString) !== -1))
              {
                  aTemp.option = data[key][0];
                  qTemp.answers.push(aTemp);
              }
              if((key.search(tString) !== -1) || (key.search(txString) !== -1))
              {
                  aTemp.option = '';
                  qTemp.answers.push(aTemp);
              }
          }

          survey.questions.push(qTemp);
      }

      console.log(JSON.stringify(survey));
      if (window.confirm('Please review the survey, once posted it cannot be edited.')) {
          console.log('yes');
          CustomSurveyActions.createCustomSurveyForm(survey);
      }
  }

  onAddQuestion = (e) => {
      e.preventDefault();
      let qIndex = parseInt(this.state.qIndex);
      let questions = this.state.questions;
      qIndex++;
      questions.push('q' + qIndex);
      this.setState({qIndex: qIndex});
      this.setState({questions: questions});
  }

  onRemoveQuestion = (child) => {
      console.log(child.refs);
      console.log(child.props);
      let qid = child.props.qid;
      let questions = this.state.questions;
      let key = questions.indexOf(qid);
      if(key !== -1) {
          questions.splice(key, 1);
      }
      this.setState({questions: questions});
  }

  onAddRadioOption = (e, child) => {
      let rIndex = parseInt(this.state.rIndex);
      let qid = child.props.qid;
      let radio = this.state.radio;
      rIndex++;
      radio.push(qid + 'r' + rIndex);
      this.setState({rIndex: rIndex});
      this.setState({radio: radio});
  }

  onRemoveRadioOption = (e, child) => {
      let rid = child.props.rid;
      let radio = this.state.radio;
      let key = radio.indexOf(rid);
      if(key !== -1) {
          radio.splice(key, 1);
      }
      this.setState({radio: radio});
  }

  onAddCheckboxOption = (e, child) => {
      //console.log(child.refs);
      //console.log(child.props);
      let cIndex = parseInt(this.state.cIndex);
      let qid = child.props.qid;
      let checkbox = this.state.checkbox;
      cIndex++;
      checkbox.push(qid + 'c' + cIndex);
      this.setState({cIndex: cIndex});
      this.setState({checkbox: checkbox});
  }

  onRemoveCheckboxOption = (e, child) => {
      let cid = child.props.cid;
      let checkbox = this.state.checkbox;
      let key = checkbox.indexOf(cid);
      if(key !== -1) {
          checkbox.splice(key, 1);
      }
      this.setState({checkbox: checkbox});
  }

  changeHandler = (key, attr, event) => {
      let state = {};
      state[key] = this.state[key] || {};
      state[key][attr] = event.currentTarget.value;
      this.setState(state);
      // console.log(this.state);
  };

  onSelectAnswerType = (e, child) => {
      let qid = child.props.qid;
      let answerType = e.target.value;

      let radio = this.state.radio;
      let checkbox = this.state.checkbox;
      let textbox = this.state.textbox;
      let textarea = this.state.textarea;

      // Radio - Clear all the previous states against qustion id.
      let rClear = [];
      for(let item of radio){
          if(item.search(qid) !== -1) {
              rClear.push(item);
          }
      }
      for(let item of rClear){
          radio.splice(radio.indexOf(item), 1);
      }
      this.setState({radio: radio});

      // Checkbox - Clear all the previous states against qustion id.
      let cClear = [];
      for(let item of checkbox){
          if(item.search(qid) !== -1) {
              cClear.push(item);
          }
      }
      for(let item of cClear){
          checkbox.splice(checkbox.indexOf(item), 1);
      }
      this.setState({checkbox: checkbox});

      // Textbox - Clear all the previous states against qustion id.
      let tClear = [];
      for(let item of textbox){
          if(item.search(qid) !== -1) {
              tClear.push(item);
          }
      }
      for(let item of tClear){
          textbox.splice(textbox.indexOf(item), 1);
      }
      this.setState({textbox: textbox});

      // Textarea - Clear all the previous states against qustion id.
      let txClear = [];
      for(let item of textarea){
          if(item.search(qid) !== -1) {
              txClear.push(item);
          }
      }
      for(let item of txClear){
          textarea.splice(textarea.indexOf(item), 1);
      }
      this.setState({textarea: textarea});

      let aid = '';

      switch(answerType){
          case 'radio':
            aid = qid + 'r1';
            let nRadio = this.state.radio;
            nRadio.push(aid);
            this.setState({radio: nRadio});
            break;
          case 'checkbox':
            aid = qid + 'c1';
            let nCheckbox = this.state.checkbox;
            nCheckbox.push(aid);
            this.setState({checkbox: nCheckbox});
            break;
          case 'textbox':
            aid = qid + 'te1';
            let nTextbox = this.state.textbox;
            nTextbox.push(aid);
            this.setState({textbox: nTextbox});
            break;
          case 'textarea':
            aid = qid + 'tx1';
            let nTextarea = this.state.textarea;
            nTextarea.push(aid);
            this.setState({textarea: nTextarea});
            break;
          default: break;
      }
  }

  render() {
      // let qIndex = this.state.qIndex;
      let questions = this.state.questions;
      let radio = this.state.radio;
      let checkbox = this.state.checkbox;
      let textbox = this.state.textbox;
      let textarea = this.state.textarea;
      console.log(this.state.isSurveyCreated);

      let sno = 1;
      let contents = questions.map((qid) => {
          let rString = qid + 'r';
          let rArr = [];
          for (let item of radio) {
              if(item.search(rString) !== -1)
              {
                  rArr.push(item);
              }
          }

          let cString = qid + 'c';
          let cArr = [];
          for (let item of checkbox) {
              if(item.search(cString) !== -1)
              {
                  cArr.push(item);
              }
          }

          let tString = qid + 'te';
          let tArr = [];
          for (let item of textbox) {
              if(item.search(tString) !== -1)
              {
                  tArr.push(item);
              }
          }

          let txString = qid + 'tx';
          let txArr = [];
          for (let item of textarea) {
              if(item.search(txString) !== -1)
              {
                  txArr.push(item);
              }
          }

          return (
            <Question
                qid={qid}
                sno={sno++}
                onClick={this.onRemoveQuestion}
                onChange={this.onSelectAnswerType}
                changeQuestion={this.changeHandler}
                formdata={this.state.formdata}
                radio={rArr}
                removeRadio={this.onRemoveRadioOption}
                addRadio={this.onAddRadioOption}
                changeRadio={this.changeHandler}
                checkbox={cArr}
                removeCheckbox={this.onRemoveCheckboxOption}
                addCheckbox={this.onAddCheckboxOption}
                changeCheckbox={this.changeHandler}
                textbox={tArr}
                textarea={txArr}
            /> );
      }.bind(this));

      return (
      <div className="container">
        <div className="form-group">
          <a href="#" onClick={this.onFormListsClick}>List forms</a>&nbsp;&nbsp;
          <a href="#" onClick={this.onSurveyClick}>Take a survey</a>
        </div>
        <h2>Custom Survey Generation.</h2>
        <form id="surveyForm">
          <div className="form-group">
            <input type="text" ref="surveytitle" onChange={this.changeHandler.bind(this, 'formdata', 'surveytitle')} className="form-control" id="surveytitle" placeholder="Name of the survey"/>
          </div>
          <div className="form-group">
            <label>Freeze date:</label>
            <input type="text" ref="freezedate" name="freezedate" id="freezedate" placeholder="Pick a date"/>
          </div>
          <div className="form-group">
            <label>Target group</label>
            <br/>
            <input type="radio" name="targetgroup" defaultChecked/>&nbsp; Org &nbsp;
            <select className="navigation__item">
              <option value="0">Whole company or team</option>
              <option value="company">Company</option>
              <option value="team">Team</option>
            </select>
            <br/>
            <input type="radio" name="targetgroup"/>&nbsp; Survey &nbsp;
            <input type="text" value="10%"/>&nbsp;
            <select className="navigation__item">
              <option value="0">Expectations</option>
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>
          <h4>Enter questions here..</h4>
          <div>
            {contents}
          </div>
          <br/>
          <div className="form-group">
            <button className="btn btn-success" onClick={this.onAddQuestion}>Add Question</button>&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSurveySubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

Customsurvey.contextTypes = { router: React.PropTypes.func };

