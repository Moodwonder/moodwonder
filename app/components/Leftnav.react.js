import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import InviteOthers from 'components/InviteOthers.react';

export default class Leftnav extends React.Component {

  constructor (props) {
      super(props);
      this.state = UserStore.getState();
  }

  componentDidMount () {
      //UserActions.getuserinfo();
      UserActions.getUserData();
      UserStore.listen(this._onChange);
  }

  componentDidUpdate () {
      $('.ui.menu .ui.dropdown').dropdown({
          on: 'click'
      });
  }

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }


  render () {
      let user = this.state.userData;

      return (
            <div className="ui left fixed vertical menu ">
                <div className="profile item">
                    <img className="ui mini image" src="/images/profile-pic.jpg" alt=""/>
                    <div className="ui dropdown">
                        <span>{user.fname + " " + user.lname}</span>
                        <i className="angle down icon"></i>
                        <div className="menu">
                            <div className="item">L_MYPROFILE_LINK</div>
                            <div className="item"><a href="/logout"  style={{"color":"#000 !important"}}>L_LOGOUT_LINK</a></div>
                        </div>
                    </div>
                </div>
                <a className="active item" href="/mymood">
                    <i className="smile icon"></i>
                    L_MYMOOD_LINK
                </a>
                <a className="item" href="/myprofile">
                    <i className="setting icon"></i>
                    L_MYACCOUNT_LINK
                </a>
                <a className="item" href="/mycompany">
                    <i className="building icon"></i>
                    L_MYCOMPANY_LINK
                </a>
                <a className="item" href="/employeeofthemonth">
                    <i className="thumbs up icon"></i>
                    L_CAST_VOTE
                </a>
                <InviteOthers />
            </div>
      );
  }

}


