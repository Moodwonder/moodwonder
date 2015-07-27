import React from 'react';
import Radio from 'components/Radio.react';
import Checkbox from 'components/Checkbox.react';
import Textbox from 'components/Textbox.react';
import Textarea from 'components/Textarea.react';

export default class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onRemoveQuestion = (e) => {
    e.preventDefault();
    this.props.onClick(this);
  }

  onSelectAnswerType = (e) => {
    this.props.onChange(e, this);
  }

  onRemoveRadioOption = (e, child) => {
    this.props.onClick1(e, child);
  }

  onAddRadioOption = (e) => {
    e.preventDefault();
    this.props.addRadio(e, this);
  }

  onRemoveCheckboxOption = (e, child) => {
    this.props.removeCheckbox(e, child);
  }

  onAddCheckboxOption = (e) => {
    e.preventDefault();
    this.props.addCheckbox(e, this);
  }

  render() {
    let qid = this.props.qid;
    let sno = this.props.sno;

    let radio = this.props.radio;
    let radioComponent = '';
    let radioAddBtn = '';

    let checkbox = this.props.checkbox;
    let checkboxComponent = '';
    let checkboxAddBtn = '';

    let textbox = this.props.textbox;
    let textboxComponent = '';

    let textarea = this.props.textarea;
    let textareaComponent = '';

    radioComponent = radio.map((rid) => {
      return (<Radio qid={qid} rid={rid} onClick1={this.onRemoveRadioOption} />);
    }.bind(this));

    if(radio.length > 0){
       radioAddBtn = (<a href="#" className="btn-link" id={qid} onClick={this.onAddRadioOption}>Add Option</a>);
    }

    checkboxComponent = checkbox.map((cid) => {
      return (<Checkbox qid={qid} cid={cid} removeCheckbox={this.onRemoveCheckboxOption} />);
    }.bind(this));

    if(checkbox.length > 0){
       checkboxAddBtn = (<a href="#" className="btn-link" id={qid} onClick={this.onAddCheckboxOption}>Add Option</a>);
    }

    textboxComponent = textbox.map((tid) => {
      return (<Textbox qid={qid} tid={tid} />);
    }.bind(this));

    textareaComponent = textarea.map((txid) => {
      return (<Textarea qid={qid} txid={txid} />);
    }.bind(this));

    return (
      <div id={qid} key={qid} className="container-fluid">
        <br/>
        <span>Question - {sno}</span>
        <div className="form-group">
          <input type="text" ref={'question_' + qid} name={'question_' + qid} className="form-control" id={'question_' + qid} placeholder="Question"/>
        </div>
        <div className="form-group">
          <label>Select answer type:</label>
          <select className="navigation__item" ref={'answertype_' + qid} id={qid} name={'answertype_' + qid} onChange={this.onSelectAnswerType}>
            <option value="0">Choose one</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="textbox">Textbox</option>
            <option value="textarea">Textarea</option>
          </select>
          {radioComponent}
          {radioAddBtn}
          {checkboxComponent}
          {checkboxAddBtn}
          {textboxComponent}
          {textareaComponent}
        </div>
        <button className="btn btn-danger" id={qid} onClick={this.onRemoveQuestion}>Remove</button>
      </div>
    );
  }
}
