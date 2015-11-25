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
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui  image header"> <a href="/"><img src="assets/images/logo.png" className="image"/></a></h2>
                    <div className="ui large form">
                        <div className="ui error message segment"></div>
                    </div>
                    <div className="ui message ">
                        <h2>You have successfully logged out!</h2> Please <a href="/login">login</a> to continue.
                    </div>
                </div>
            </div>
      );
  }
}
