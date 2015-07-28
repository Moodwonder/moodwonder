import React from 'react';

export default class Radio extends React.Component {

  constructor(props) {
    super(props);
  }

  onRemoveRadioOption = (e) => {
    e.preventDefault();
    this.props.onClick1(e, this);
  }

  render() {
    var qid = this.props.qid;
    var rid = this.props.rid;
    var index = rid;
    return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Radio option - {index}</span>
        <div className="form-group">
          <input type="radio" ref={index} name={index}/>
          <input type="text" ref={index} name={index} id={index} placeholder="enter option here.."/>
          <a href="#" className="btn-link" id={index} onClick={this.onRemoveRadioOption}>Remove</a>
        </div>
      </div>
    );
  }
}
