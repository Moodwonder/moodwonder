import React from 'react';

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);
  }

  onRemoveCheckboxOption = (e) => {
    e.preventDefault();
    this.props.removeCheckbox(e, this);
  }

  render() {
    var qid = this.props.qid;
    var cid = this.props.cid;
    var index = cid;
    return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Checkbox option - {index}</span>
        <div className="form-group">
          <input type="checkbox" ref={index} name={index}/>
          <input type="text" ref={index} name={index} id={index} placeholder="enter option here.."/>
          <a href="#" className="btn-link" id={index} onClick={this.onRemoveCheckboxOption}>Remove</a>
        </div>
      </div>
    );
  }
}
