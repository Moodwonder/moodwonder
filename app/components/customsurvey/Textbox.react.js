import React from 'react';

export default class Textbox extends React.Component {

  constructor (props) {
      super(props);
  }

  render () {
      //let qid = this.props.qid;
      let tid = this.props.tid;
      let index = tid;
      return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Textbox - {index}</span>
      </div>
    );
  }
}
