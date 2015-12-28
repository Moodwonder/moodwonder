import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import InviteOthers from 'components/InviteOthers.react';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';


export default class Leftnav extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          userData: UserStore.getState().userData,
          mwkeys: MlangStore.getState().mwkeys,
          styleupdate: false
      };
  }

  componentDidMount () {
      document.getElementById("mobilelinks").style.display = 'none';
      let that = this;
      setTimeout(function(){
          document.getElementById("mobilemenu").className = "ui vertical inverted sidebar menu";
      });

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
      setTimeout(function(){
          that.setState({styleupdate: true});
      },50);
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
      document.getElementById("mobilelinks").style.display = 'none';
      $(".toc").on('click', function(){
          $("#mobilemenu").sidebar("toggle");
          document.getElementById("mobilelinks").style.display = 'block';
      });
  }

  componentWillUnmount () {
      document.getElementById("mobilemenu").className = "";
      document.getElementById("mobilelinks").style.display = 'none';
      UserStore.unlisten(this._onChange);
  }

  changeClass = () => {
      //this.setState({styleupdate: true}, function(){
      //      document.getElementById("mobilemenu").className = "ui vertical inverted sidebar menu";
      //}.bind(this));
      //this.setState({styleupdate: true});
  }

  _onChange = () => {
      this.setState({
          userData: UserStore.getState().userData
      });
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
                        <a className="item" href="/customsurvey">
                            <i className="bar chart icon"></i>
                            {GetText('L_CREATE_NEW_SURVEY', mlarray)}
                        </a>,
                        <a className="item" href="/surveyforms">
                            <i className="line chart icon"></i>
                            {GetText('L_MY_SURVEYS', mlarray)}
                        </a>,
                        <a className="item" href="/openendedresponses">
                            <i className="list icon"></i>
                            {GetText('L_OPENENDED_RESPONSES', mlarray)}
                        </a>
          ];
      } else {
          openresponselink = [
                    <a className="item" href="/viewsurvey">
                        <i className="line chart icon"></i>
                        {GetText('L_MY_SURVEYS', mlarray)}
                    </a>
          ];
      }

      let viewvotes;
      if (user.company_admin) {
          viewvotes = [
                    <a className="item" href="/viewvotes">
                        <i className="thumbs trophy icon"></i>
                        {GetText('L_VIEW_VOTE', mlarray)}
                    </a>
          ];
      }

      let imgUrl = "/images/no-profile-img.gif";
      if(user.profile_image !== undefined || user.profile_image !== '' || user.profile_image !== null) {
          imgUrl = user.profile_image;
      }



      return (
            <div className="" id="mobilemenu" style={{"overflowY":"auto"}}>
                <a href="#" className="slide-side"></a>
                <div id="mobilelinks">
                <div>
                    <div className="profile item">
                        <img className="ui mini image" src={imgUrl} alt=""/>
                        <div className="ui dropdown">
                            <span id="userfullname" >{userfullname}</span>
                            <i className="angle down icon"></i>
                            <div className="menu">
                                <div className="item drop-down-item"><a href={"/publicprofile/" + user._id} style={{"color":"#000 !important"}}>{GetText('L_MYPROFILE_LINK', mlarray)}</a></div>
                                <div className="item drop-down-item"><a href="/logout" style={{"color":"#000 !important"}}>{GetText('L_LOGOUT_LINK', mlarray)}</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <a className="item" href="/myprofile">
                        <i className="setting icon"></i>
                        {GetText('L_MYACCOUNT_LINK', mlarray)}
                    </a>
                    <a className="item" href="/mymood">
                        <i className="smile icon"></i>
                        {GetText('L_MYMOOD_LINK', mlarray)}
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
                    {openresponselink}
                </div>
                <div>
                    <InviteOthers />
                </div>
                </div>
            </div>
      );
  }
}
