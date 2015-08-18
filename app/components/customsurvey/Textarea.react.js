import React from 'react';

export default class Textarea extends React.Component {

  constructor (props) {
      super(props);
  }

  render () {
      // let qid = this.props.qid;
      let index = this.props.txid;

      return (
      <div id={index} key={index} className="container">
        <br/>
        <span>Textarea</span>
      </div>
    );
  }
}
