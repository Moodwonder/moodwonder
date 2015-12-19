import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import InviteOthers from 'components/InviteOthers.react';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';


export default class SidebarMenu extends React.Component {

  constructor (props) {
      super(props);
      this.state = UserStore.getState();
      this.state.mwkeys = MlangStore.getState().mwkeys;
  }

  componentDidMount () {
      UserActions.getUserData();
      UserStore.listen(this._onChange);
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

      let viewvotes = null;
      if (user.company_admin) {
          viewvotes = (
                <a className="item" href="/viewvotes">
                    <i className="thumbs trophy icon"></i>
                    {GetText('L_VIEW_VOTE', mlarray)}
                </a>
          );
      }


      return (
            <div className="ui vertical inverted sidebar menu" style={{"overflowY":"auto"}}>
                    <a href="#" className="slide-side"></a>
                    <div className="profile item">
                        <img className="ui mini image" src={user.profile_image} alt=""/>
                        <div className="ui dropdown">
                            <span id="userfullname" >{userfullname}</span>
                            <i className="angle down icon"></i>
                            <div className="menu"  style={{"zIndex":"1 !important"}}>
                                <div className="item drop-down-item"><a href={ `/publicprofile/${user._id}` } style={{"color":"#000 !important"}}>{GetText('L_MYPROFILE_LINK', mlarray)}</a></div>
                                <div className="item drop-down-item"><a href="/logout" style={{"color":"#000 !important"}}>{GetText('L_LOGOUT_LINK', mlarray)}</a></div>
                            </div>
                        </div>
                    </div>
                    <a className="item" href="/myprofile"  style={{"zIndex":"-1 !important"}}>
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
                    <InviteOthers />
            </div>
      );
  }

}


