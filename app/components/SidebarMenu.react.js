import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';


export default class SidebarMenu extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        mwkeys: MlangStore.getState().mwkeys,
        userData: UserStore.getState().userData,
        usertype: ''
      };
  }

  componentDidMount () {
      UserActions.getUserData();
      UserStore.listen(this._onChange);
  }
  

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          userData: UserStore.getState().userData
      });

      let user = this.state.userData;
      if (user.usertype == 'manager') {
          this.setState({
              usertype: 'manager'
          });
      } else if (user.usertype == 'user') {
          this.setState({
              usertype: 'user'
          });
      }
  }


  render () {
      let mlarray = this.state.mwkeys;
      let user = this.state.userData;
      let usertype = this.state.usertype;

      let viewvotes;
      if (user.company_admin) {
          viewvotes = [
                        <a className="item" href="/viewvotes">
                            <i className="thumbs trophy icon"></i>
                            {GetText('L_VIEW_VOTE', mlarray)}
                        </a>
          ];
      }

      let mgrlink = "/viewsurvey";
      if (usertype == "manager") {
          mgrlink = "/surveyforms";
      } else if (usertype == 'user') {
          mgrlink = "/viewsurvey";
      }

      let links = [
                            <a className="item" href="/customsurvey">
                                <i className="bar chart icon"></i>
                                {GetText('L_CREATE_NEW_SURVEY', mlarray)}
                            </a>,
                            <a className="item" href={mgrlink}>
                                <i className="line chart icon"></i>
                                {GetText('L_MY_SURVEYS', mlarray)}
                            </a>,
                            <a className="item" href="/openendedresponses">
                                <i className="list icon"></i>
                                {GetText('L_OPENENDED_RESPONSES', mlarray)}
                            </a>
      ];



      return (
                <div>
                    <a className="item" href="/myprofile">
                        <i className="setting icon"></i>
                        {GetText('L_MYACCOUNT_LINK', mlarray)}
                    </a>
                    <a className="active item" href="/mymood">
                        <i className="smile icon"></i>
                        {GetText('L_MYMOOD_LINK', mlarray)}
                    </a>
                    <a className="item" href="/mycompany">
                        <i className="building icon"></i>
                        {GetText('L_MYCOMPANY_LINK', mlarray)}
                    </a>
                    {viewvotes}
                    {links}
            </div>
      );
  }

}
