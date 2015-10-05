import React from 'react';


export default class Leftnav extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }


  render () {

      return (
        <div className="leftbar">
            <div className="ui left fixed vertical menu ">
        <div className="profile item"> <img className="ui mini image" src="images/profile-pic.jpg" alt=""/>
        <div className="ui dropdown"> <span>ALEXANDREA Michelle</span><i className="angle down icon"></i>
            <div className="menu">
            <div className="item">My Profile</div>
            <div className="item">Log Out</div>
          </div>
          </div>
</div>
        <a className="active item"><i className="smile icon"></i>My Mood </a> <a className="item"><i className="setting icon"></i> My Account </a> <a className="item"><i className="building icon"></i>My Company</a>
        <div className="invite-people">
        <h2>Invite people anonymously</h2>
        <p>Invite everyone anonymously in your network, friends, colleagues, your boss, ex-colleagues ...</p>
        <div className="ui input">
            <input placeholder="Enter e-mail " type="text"/>
</div>
        <button className="ui orange button">Invite</button>
      </div>
      </div>
	</div>
      );
  }

}


