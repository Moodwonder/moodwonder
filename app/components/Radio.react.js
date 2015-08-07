import React from 'react';

export default class Radio extends React.Component {

  constructor (props) {
    super(props);
  }

  onRemoveRadioOption = (e) => {
    e.preventDefault();
    this.props.removeRadio(e, this);
  }

  changeHandler = (key, formdata, field) => {
    this.props.changeRadio(key, formdata, field);
  }

  render () {
    var qid = this.props.qid;
    var rid = this.props.rid;
    var formdata = this.props.formdata;
    var index = rid; // rid like 'q1r1'

    let rValue = '';
    if (typeof formdata === 'undefined') {
      rValue = '';
    } else {
      rValue = formdata[index];
    }

    return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Radio option - {index}</span>
        <div className="form-group">
          <input type="radio" ref={index} name={index}/>
          <input
               type="text"
               ref={index}
               value={rValue}
               onChange={this.changeHandler.bind(this, 'formdata', index)}
               name={index}
               id={index}
               placeholder="enter option here.."/>
          <a href="#" className="btn-link" id={index} onClick={this.onRemoveRadioOption}>Remove</a>
        </div>
      </div>
    );
  }
}
