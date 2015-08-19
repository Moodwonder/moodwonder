import React from 'react';
import Immutable from 'immutable';

export default class Dashboard extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
      <div className="container">
        <h1>Admin dashboard</h1>
      </div>
    );
  }
}

Dashboard.propTypes = {
  topics: React.PropTypes.instanceOf(Immutable.OrderedMap),
  newTopic: React.PropTypes.string
};
