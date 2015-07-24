import React from 'react';
import Radio2 from 'components/Radio2.react';

export default class Question2 extends React.Component {

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

  render() {
    let qid = this.props.qid;
    let sno = this.props.sno;
    let radio = this.props.radio;
    let radioComponent = radio.map((rid) => {
      return (<Radio2 qid={qid} rid={rid} onClick1={this.onRemoveRadioOption} />);
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
          <a href="#" className="btn-link" id={qid} onClick={this.onAddRadioOption}>Add Option</a>
        </div>
        <button className="btn btn-danger" id={qid} onClick={this.onRemoveQuestion}>Remove</button>
      </div>
    );
  }
}
