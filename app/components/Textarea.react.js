import React from 'react';

export default class Textarea extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    var qid = this.props.qid;
    var index = this.props.txid;

    return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Textarea - {index}</span>
      </div>
    );
  }
}
