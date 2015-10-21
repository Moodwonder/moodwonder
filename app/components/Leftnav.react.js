import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

export default class Leftnav extends React.Component {

  constructor (props) {
      super(props);
      this.state = UserStore.getState();
  }

  componentDidMount () {
      UserActions.getuserinfo();
      UserStore.listen(this._onChange);
  }

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }


  render () {
      let user = this.state.userDetails;

      return (
            <div className="ui left fixed vertical menu ">
                <div className="profile item">
                    <img className="ui mini image" src="/images/profile-pic.jpg" alt=""/>
                    <div className="ui dropdown">
                        <span>{user.fname + " " + user.lname}</span>
                        <i className="angle down icon"></i>
                        <div className="menu">
                            <div className="item">My Profile</div>
                            <div className="item"><a href="/logout">Log Out</a></div>
                        </div>
                    </div>
                </div>
                <a className="active item" href="/mymood">
                    <i className="smile icon"></i>
                    My Mood
                </a>
                <a className="item" href="/myprofile">
                    <i className="setting icon"></i>
                    My Account
                </a>
                <a className="item" href="/mycompany">
                    <i className="building icon"></i>
                    My Company
                </a>
                <div className="invite-people">
                    <h2>Invite people anonymously</h2>
                    <p>Invite everyone anonymously in your network, friends, colleagues, your boss, ex-colleagues ...</p>
                    <div className="ui input">
                        <input placeholder="Enter e-mail " type="text"/>
                    </div>
                    <button className="ui orange button">Invite</button>
                </div>
            </div>
      );
  }

}


