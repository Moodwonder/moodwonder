import React from 'react';

export default class Textarea extends React.Component {

  constructor (props) {
      super(props);
  }

  render () {
      // let qid = this.props.qid;
      let index = this.props.txid;

      return (
        <div id={index} key={index} className="inline fields">
            <div className="field four wide column">
                <div className="ui radio checkbox">
                    <label>Textarea</label>
                </div>
            </div>
        </div>
    );
  }
}
