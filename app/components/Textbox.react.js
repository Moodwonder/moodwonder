import React from 'react';

export default class Textbox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var qid = this.props.qid;
    var tid = this.props.tid;
    var index = tid;
    return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Textbox - {index}</span>
      </div>
    );
  }
}
