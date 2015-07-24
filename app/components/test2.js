import React from 'react';
import Immutable from 'immutable';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import $ from 'jquery';
import Validation, { Validator } from 'rc-form-validation';
import mixins from 'es6-mixins';
import Question2 from 'components/Question2.react';
import getFormData from 'get-form-data';
import _ from 'underscore';


export default class Test2 extends React.Component {

  constructor(props) {
    super(props);
    mixins(Validation.FieldMixin, this);
    this.state = {
        qIndex: 1,
        questions: ['q1'],
        option: [],
        radio: [],
        rIndex: 1,
        checkbox: [],
        textbox: [],
        textarea: []
    };
  }

  componentDidMount() {
    //console.log(this.state.questions);
    //console.log(this.state.qIndex);
  }

  componentWillUnmount() {
    this.setState({qIndex: this.state.qIndex + 1});
  }

  onSurveySubmit = (e) => {
    e.preventDefault();
    var form = document.querySelector('#surveyForm');
    var data = getFormData(form, {trim: true});
    console.log(JSON.stringify(data));
  }

  onAddQuestion = (e) => {
    e.preventDefault();
    let qIndex = parseInt(this.state.qIndex);
    let questions = this.state.questions;
    qIndex++;
    questions.push('q' + qIndex);
    this.setState({qIndex: qIndex});
    this.setState({questions: questions});
    //console.log(this.state.questions);
    //console.log(this.state.qIndex);
  }

  onAddRadioOption = (e, child) => {
    console.log(child.refs);
    console.log(child.props);
    let rIndex = parseInt(this.state.rIndex);
    let qid = child.props.qid;
    let radio = this.state.radio;
    rIndex++;
    radio.push(qid + 'r' + rIndex);
    this.setState({rIndex: rIndex});
    this.setState({radio: radio});
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
    console.log(this.state.questions);
  }

  onRemoveRadioOption = (e, child) => {
    //console.log(child.refs);
    //console.log(child.props);
    //let qid = child.props.qid;
    let rid = child.props.rid;
    var radio = this.state.radio;
    var key = radio.indexOf(rid);
    if(key != -1) {
      radio.splice(key, 1);
    }
    this.setState({radio: radio});
  }

  onSelectAnswerType = (e, child) => {
    var qid = child.props.qid;
    var answerType = e.target.value;
    var option = this.state.option;
    var radio = this.state.radio;
    var checkbox = this.state.checkbox;
    var textbox = this.state.textbox;
    var textarea = this.state.textarea;
    //console.log(e.target.value);
    //_.without(option, _.findWhere(option, "q1_"));
    //option.splice(_.indexOf(option, _.findWhere(option, "q1__radio_0")), 1);
    //this.setState({option: option});
    var aid = '';
    switch(answerType){
        case 'radio': console.log('radio');
            aid = qid + 'r1';
            radio.push(aid);
            this.setState({radio: radio});
            break;
        case 'checkbox': console.log('checkbox');
            aid = qid + 'c1';
            checkbox.push(aid);
            this.setState({checkbox: checkbox});
            break;
        case 'textbox': console.log('textbox');
            aid = qid + 't1';
            textbox.push(aid);
            this.setState({textbox: textbox});
            break;
        case 'textarea': console.log('textarea');
            aid = qid + 'ta1';
            textarea.push(aid);
            this.setState({textarea: textarea});
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
    //console.log(questions);
    //console.log(qIndex);
    //console.log(radio);
    let sno = 0;
    let contents = questions.map((qid) => {
      return (
            <Question2
                qid={qid}
                sno={sno++}
                onClick={this.onRemoveQuestion}
                onChange={this.onSelectAnswerType}
                radio={radio}
                onClick1={this.onRemoveRadioOption}
                addRadio={this.onAddRadioOption}
            /> );
    }.bind(this));

    return (
      <div className="container">
        <h2>Custom Survey Generation.</h2>
        <form id="surveyForm">
          <div className="form-group">
            <input type="text" ref="surveytitle" className="form-control" id="surveytitle" placeholder="Survey title"/>
          </div>
          <h4>Enter question here..</h4>
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

