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
      // To set active link
      $( ".left .item" ).each(function( index ) {
          if(this.attributes.href !== undefined){
              if(location.pathname.substring(1) === this.attributes.href.value.substring(1)){
                  $( this ).addClass('active');
              }
          }
      });
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
      // console.log(this.state);
      let user = this.state.userData;
      let userfullname = '';
      if( user.fname !== undefined && user.fname !== 'undefined' ){
          userfullname = user.fname;
      }
      if( user.lname !== undefined && user.lname !== 'undefined' ){
          userfullname += ' '+user.lname;
      }

      return (
            <div className="ui left fixed vertical menu ">
                <div className="profile item">
                    <img className="ui mini image" src={user.profile_image} alt=""/>
                    <div className="ui dropdown">
                        <span>{userfullname}</span>
                        <i className="angle down icon"></i>
                        <div className="menu">
                            <div className="item"><a href="/myprofile" style={{"color":"#000 !important"}}>L_MYPROFILE_LINK</a></div>
                            <div className="item"><a href="/logout" style={{"color":"#000 !important"}}>L_LOGOUT_LINK</a></div>
                        </div>
                    </div>
                </div>
                <a className="item" href="/mymood">
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


