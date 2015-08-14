import React from 'react';

export default class Checkbox extends React.Component {

  constructor (props) {
      super(props);
  }

  onRemoveCheckboxOption = (e) => {
      e.preventDefault();
      this.props.removeCheckbox(e, this);
  }

  changeHandler = (key, formdata, field) => {
      this.props.changeCheckbox(key, formdata, field);
  }

  render () {
      // var qid = this.props.qid;
      let cid = this.props.cid;
      let formdata = this.props.formdata;
      let index = cid;

      let cValue = '';
      if (typeof formdata === 'undefined') {
          cValue = '';
      } else {
          cValue = formdata[index];
      }
      return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Checkbox option - {index}</span>
        <div className="form-group">
          <input type="checkbox" ref={index} name={index}/>
          <input
                type="text"
                ref={index}
                value={cValue}
                onChange={this.changeHandler.bind(this, 'formdata', index)}
                name={index} id={index}
                placeholder="enter option here.."/>
          <a href="#"
             className="btn-link"
             id={index}
             onClick={this.onRemoveCheckboxOption}>Remove</a>
        </div>
      </div>
    );
  }
}
