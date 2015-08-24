import React from 'react';
import RequireAuth from 'utils/requireAuth';

export default RequireAuth(class Dashboard extends React.Component {
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
});
