import React from 'react';
import Radio from 'components/customsurvey/Radio.react';
import Checkbox from 'components/customsurvey/Checkbox.react';
import Textbox from 'components/customsurvey/Textbox.react';
import Textarea from 'components/customsurvey/Textarea.react';

export default class Question2 extends React.Component {

  constructor (props) {
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
      this.props.removeRadio(e, child);
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

  changeHandler = (key, formdata, field) => {
      this.props.changeQuestion(key, formdata, field);
  }

  changeRadioHandler = (key, formdata, field) => {
      this.props.changeRadio(key, formdata, field);
  }

  changeCheckboxHandler = (key, formdata, field) => {
      this.props.changeCheckbox(key, formdata, field);
  }

  render () {
      let qid = this.props.qid;
      let sno = this.props.sno;
      let formdata = this.props.formdata;

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
          return (<Radio
                qid={qid}
                rid={rid}
                formdata={formdata}
                removeRadio={this.onRemoveRadioOption}
                changeRadio={this.changeRadioHandler} />
             );
      }.bind(this));

      if (radio.length > 0) {
          radioAddBtn = (<a
                       href="#"
                       className="btn-link"
                       id={qid}
                       onClick={this.onAddRadioOption}>Add Option</a>
                    );
      }

      checkboxComponent = checkbox.map((cid) => {
          return (<Checkbox
                qid={qid}
                cid={cid}
                formdata={formdata}
                removeCheckbox={this.onRemoveCheckboxOption}
                changeCheckbox={this.changeCheckboxHandler} />
             );
      }.bind(this));

      if (checkbox.length > 0) {
          checkboxAddBtn = (<a
                          href="#"
                          className="btn-link"
                          id={qid} onClick={this.onAddCheckboxOption}>Add Option</a>
                       );
      }

      textboxComponent = textbox.map((tid) => {
          return (<Textbox qid={qid} tid={tid} />);
      });

      textareaComponent = textarea.map((txid) => {
          return (<Textarea qid={qid} txid={txid} />);
      });

      let qValue = '';
      if (typeof formdata === 'undefined') {
          qValue = '';
      } else {
          qValue = formdata['question_' + qid];
      }

      return (
      <div id={qid} key={qid} className="container-fluid">
        <br/>
        <span>Question - {sno}</span>
        <div className="form-group">
          <input
              type="text"
              ref={'question_' + qid}
              value={qValue}
              onChange={this.changeHandler.bind(this, 'formdata', 'question_' + qid)}
              name={'question_' + qid}
              className="form-control"
              id={'question_' + qid}
              placeholder="Question"/>
        </div>
        <div className="form-group">
          <label>Select answer type:</label>
          <select
                className="navigation__item"
                ref={'answertype_' + qid}
                id={qid} name={'answertype_' + qid}
                onChange={this.onSelectAnswerType}>
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
