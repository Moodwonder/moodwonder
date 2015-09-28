import React from 'react';
import UserStore from 'stores/UserStore';


export default class Logout extends React.Component {

  constructor(props) {
      super(props);
      this.state = UserStore.getState();
  }

  componentDidMount () {
      UserStore.listen(this._onChange);
  }

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
      if(!this.state.isLoggedIn){
          window.location.assign('/');
      }
  }

  render() {
      return (
      <div className="container">
        <h3>You have been logged out.</h3>
      </div>
    );
  }
}
