import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import InviteOthers from 'components/InviteOthers.react';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';


export default class Leftnav extends React.Component {

  constructor (props) {
      super(props);
      this.state = UserStore.getState();
      this.state.mwkeys = MlangStore.getState().mwkeys;
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

      $( ".left .item" ).each(function( index ) {
          if(this.attributes.href !== undefined){
              if(location.pathname.substring(1) === this.attributes.href.value.substring(1)){
                  $( this ).addClass('active');
              }
          }
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
      let mlarray = this.state.mwkeys;
      let userfullname = '';
      if( user.fname !== undefined && user.fname !== 'undefined' ){
          userfullname = user.fname;
      }
      if( user.lname !== undefined && user.lname !== 'undefined' ){
          userfullname += ' '+user.lname;
      }

      let openresponselink;
      if (user.usertype === 'manager') {
          openresponselink = [
                <a className="item" href="/openendedresponses">
                    <i className="thumbs up icon"></i>
                    Survey Responses
                </a>,
                <a className="item" href="/customsurvey">
                    <i className="thumbs up icon"></i>
                    Create New Survey
                </a>,
                <a className="item" href="/surveyforms">
                    <i className="thumbs up icon"></i>
                    My Surveys
                </a>
          ];
      } else {
          openresponselink = [
                <a className="item" href="/viewsurvey">
                    <i className="thumbs up icon"></i>
                    My Surveys
                </a>
          ];
      }

      let viewvotes;
      if (user.usertype === 'manager') {
          viewvotes = (
                <a className="item" href="/viewvotes">
                    <i className="thumbs trophy icon"></i>
                    {GetText('L_VIEW_VOTE', mlarray)}
                </a>
          );
      }

      return (
            <div className="ui left fixed vertical menu ">
                <div className="profile item">
                    <img className="ui mini image" src={user.profile_image} alt=""/>
                    <div className="ui dropdown">
                        <span id="userfullname" >{userfullname}</span>
                        <i className="angle down icon"></i>
                        <div className="menu">
                            <div className="item drop-down-item"><a href={ `/publicprofile/${user._id}` } style={{"color":"#000 !important"}}>{GetText('L_MYPROFILE_LINK', mlarray)}</a></div>
                            <div className="item drop-down-item"><a href="/logout" style={{"color":"#000 !important"}}>{GetText('L_LOGOUT_LINK', mlarray)}</a></div>
                        </div>
                    </div>
                </div>
                <a className="item" href="/mymood">
                    <i className="smile icon"></i>
                    {GetText('L_MYMOOD_LINK', mlarray)}
                </a>
                <a className="item" href="/myprofile">
                    <i className="setting icon"></i>
                    {GetText('L_MYACCOUNT_LINK', mlarray)}
                </a>
                <a className="item" href="/mycompany">
                    <i className="building icon"></i>
                    {GetText('L_MYCOMPANY_LINK', mlarray)}
                </a>
                <a className="item" href="/employeeofthemonth">
                    <i className="thumbs up icon"></i>
                    {GetText('L_CAST_VOTE', mlarray)}
                </a>
                {viewvotes}
                <a className="item" href="/viewsurvey">
                    <i className="thumbs up icon"></i>
                    My Surveys
                </a>
                {openresponselink}
                <InviteOthers />
            </div>
      );
  }

}


