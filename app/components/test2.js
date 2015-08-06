import React from 'react';
import Immutable from 'immutable';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import $ from 'jquery';
import Validation, { Validator } from 'rc-form-validation';
import Question2 from 'components/Question2.react';
import getFormData from 'get-form-data';
import _ from 'underscore';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Router, Navigation } from 'react-router';
import mixins from 'es6-mixins';


export default class Test2 extends React.Component {

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
    var form = document.querySelector('#surveyForm');
    var data = getFormData(form, {trim: true});
    var question = this.state.questions;
    var survey = survey || {};
    console.log(JSON.stringify(data));

    survey.id = 'S1';
    survey.surveytitle = data.surveytitle;
    survey.user_id = 1;
    survey.createddate = '29-july-2015';
    survey.target_teamid = 2;
    survey.questions = [];
    var keys = Object.keys(data);

    for(let qid of question){
      var id = qid.replace('q', '');
      var qTemp = {};

      qTemp.question = data['question_' + qid];
      qTemp.question_id = id;
      qTemp.answertype = data['answertype_' + qid];
      qTemp.answers = [];

      var rString = qid + 'r';
      var cString = qid + 'c';
      var tString = qid + 'te';
      var txString = qid + 'tx';

      for (let key of keys) {
        var aTemp = {};
        if((key.search(rString) != -1) || (key.search(cString) != -1))
        {
          aTemp.option = data[key][0];
          qTemp.answers.push(aTemp);
        }
        if((key.search(tString) != -1) || (key.search(txString) != -1))
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
    var questions = this.state.questions;
    var key = questions.indexOf(qid);
    if(key != -1) {
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
    var radio = this.state.radio;
    var key = radio.indexOf(rid);
    if(key != -1) {
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
    var checkbox = this.state.checkbox;
    var key = checkbox.indexOf(cid);
    if(key != -1) {
      checkbox.splice(key, 1);
    }
    this.setState({checkbox: checkbox});
  }

  changeHandler = (key, attr, event) => {
    var state = {};
    state[key] = this.state[key] || {};
    state[key][attr] = event.currentTarget.value;
    this.setState(state);
    //console.log(this.state);
  };

  onSelectAnswerType = (e, child) => {
    var qid = child.props.qid;
    var answerType = e.target.value;

    var radio = this.state.radio;
    var checkbox = this.state.checkbox;
    var textbox = this.state.textbox;
    var textarea = this.state.textarea;

    // Radio - Clear all the previous states against qustion id.
    var rClear = [];
    for(let item of radio){
      if(item.search(qid) != -1) {
        rClear.push(item);
      }
    }
    for(let item of rClear){
      radio.splice(radio.indexOf(item), 1);
    }
    this.setState({radio: radio});

    // Checkbox - Clear all the previous states against qustion id.
    var cClear = [];
    for(let item of checkbox){
      if(item.search(qid) != -1) {
        cClear.push(item);
      }
    }
    for(let item of cClear){
      checkbox.splice(checkbox.indexOf(item), 1);
    }
    this.setState({checkbox: checkbox});

    // Textbox - Clear all the previous states against qustion id.
    var tClear = [];
    for(let item of textbox){
      if(item.search(qid) != -1) {
        tClear.push(item);
      }
    }
    for(let item of tClear){
      textbox.splice(textbox.indexOf(item), 1);
    }
    this.setState({textbox: textbox});

    // Textarea - Clear all the previous states against qustion id.
    var txClear = [];
    for(let item of textarea){
      if(item.search(qid) != -1) {
        txClear.push(item);
      }
    }
    for(let item of txClear){
      textarea.splice(textarea.indexOf(item), 1);
    }
    this.setState({textarea: textarea});

    var aid = '';

    switch(answerType){
        case 'radio':
            aid = qid + 'r1';
            var nRadio = this.state.radio;
            nRadio.push(aid);
            this.setState({radio: nRadio});
            break;
        case 'checkbox':
            aid = qid + 'c1';
            var nCheckbox = this.state.checkbox;
            nCheckbox.push(aid);
            this.setState({checkbox: nCheckbox});
            break;
        case 'textbox':
            aid = qid + 'te1';
            var nTextbox = this.state.textbox;
            nTextbox.push(aid);
            this.setState({textbox: nTextbox});
            break;
        case 'textarea':
            aid = qid + 'tx1';
            var nTextarea = this.state.textarea;
            nTextarea.push(aid);
            this.setState({textarea: nTextarea});
            break;
        default: break;
    }
  }

  render() {
    var qIndex = this.state.qIndex;
    var questions = this.state.questions;
    var radio = this.state.radio;
    var checkbox = this.state.checkbox;
    var textbox = this.state.textbox;
    var textarea = this.state.textarea;
    console.log(this.state.isSurveyCreated);

    let sno = 1;
    let contents = questions.map((qid) => {
      var rString = qid + 'r';
      var rArr = [];
      for (let item of radio) {
        if(item.search(rString) != -1)
        {
          rArr.push(item);
        }
      }

      var cString = qid + 'c';
      var cArr = [];
      for (let item of checkbox) {
        if(item.search(cString) != -1)
        {
          cArr.push(item);
        }
      }

      var tString = qid + 'te';
      var tArr = [];
      for (let item of textbox) {
        if(item.search(tString) != -1)
        {
          tArr.push(item);
        }
      }

      var txString = qid + 'tx';
      var txArr = [];
      for (let item of textarea) {
        if(item.search(txString) != -1)
        {
          txArr.push(item);
        }
      }

      return (
            <Question2
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

Test2.contextTypes = { router: React.PropTypes.func };

