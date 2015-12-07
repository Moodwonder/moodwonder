import React from 'react';
// import Immutable from 'immutable';
import getFormData from 'get-form-data';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';
import Languageoptions from 'components/pages/Languageoptions.react';
import Homepage from 'components/pages/Homepage.react';
import Signuppage from 'components/pages/Signuppage.react';
import Loginpage from 'components/pages/Loginpage.react';
import Mwusertheme from 'components/pages/Mwusertheme.react';
import RequireAuth from 'utils/requireAuth';


export default RequireAuth(class Pages extends React.Component {
  constructor(props) {
      super(props);
      this.state = PageStore.getState();
      this.state = {
         page: 'home',
         language: 'EN',
         formstatus: false,
         pagedata: []
     };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getLanguages();
      PageActions.getPage({page: this.state.page, language: this.state.language});
      this.setState({formstatus: false});
  }

  componentWillUnmount() {
      PageStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          languages: PageStore.getState().languages,
          pagedata: PageStore.getState().pagedata
      });
  }



  onSelectLanguage = (e, child) => {
      //let qid = child.props.qid;
      let language = e.target.value;
      PageActions.getPage({page: this.state.page, language: language});
      this.setState({language: language});
      this.setState({formstatus: false});
  }

  onSelectPage = (e, child) => {
      //let qid = child.props.qid;
      let page = e.target.value;
      PageActions.getPage({page: page, language: this.state.language});
      this.setState({page: page});
  }

  /**
   * Signup page submit
   */
  onSubmitSignup = (e) => {
      let formData = document.querySelector('#signupForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let signup = signup || {};

      signup.language = data['language'];
      signup.SGN_TITLE = data['SGN_TITLE'];
      signup.SGN_WORK_EMAIL = data['SGN_WORK_EMAIL'];
      signup.SGN_BTN_SUBMIT = data['SGN_BTN_SUBMIT'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'signup', signup);
          this.setState({formstatus: true});
      }
  }

  /**
   * Home page submit
   */
  onSubmitHome = (e) => {
      let formData = document.querySelector('#homeForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let home = home || {};

      home.language = data['language'];
      home.HOM_TITLE = data['HOM_TITLE'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'home', home);
          this.setState({formstatus: true});
      }
  }

  /**
   * Login page submit
   */
  onSubmitLogin = (e) => {
      let formData = document.querySelector('#signupForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let login = login || {};

      login.language = data['language'];
      login.LGN_TITLE = data['LGN_TITLE'];
      login.LGN_USERNAME = data['LGN_USERNAME'];
      login.LGN_PASSWORD = data['LGN_PASSWORD'];
      login.LGN_FORGOT_PASSWORD = data['LGN_FORGOT_PASSWORD'];
      login.LGN_BTN_SUBMIT = data['LGN_BTN_SUBMIT'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'login', login);
          this.setState({formstatus: true});
      }
  }


    /**
   * Login page submit
   */
  onSubmitMwusertheme = (e) => {
      let formData = document.querySelector('#mwuserthemeForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let usertheme = usertheme || {};

      usertheme.language = data['language'];
      usertheme.L_MYMOOD_LINK = data['L_MYMOOD_LINK'];
      usertheme.L_MYACCOUNT_LINK = data['L_MYACCOUNT_LINK'];
      usertheme.L_MYCOMPANY_LINK = data['L_MYCOMPANY_LINK'];
      usertheme.L_CAST_VOTE =  data['L_CAST_VOTE'];
      usertheme.L_INVITE_PEOPLE_TITLE = data['L_INVITE_PEOPLE_TITLE'];
      usertheme.L_INVITE_PEOPLE_DES = data['L_INVITE_PEOPLE_DES'];
      usertheme.L_INVITE_INPUT_PLCHOLDER = data['L_INVITE_INPUT_PLCHOLDER'];
      usertheme.L_INVITE_BTN = data['L_INVITE_BTN'];
      usertheme.L_MYPROFILE_LINK = data['L_MYPROFILE_LINK'];
      usertheme.L_LOGOUT_LINK = data['L_LOGOUT_LINK'];
      usertheme.L_INVITE_PEOPLE_TITLE = data['L_INVITE_PEOPLE_TITLE'];
      usertheme.L_INVITE_PEOPLE_DES = data['L_INVITE_PEOPLE_DES'];
      usertheme.L_INVITE_INPUT_PLCHOLDER = data['L_INVITE_INPUT_PLCHOLDER'];
      usertheme.L_INVITE_BTN = data['L_INVITE_BTN'];
      usertheme.L_MYPROFILE_LINK = data['L_MYPROFILE_LINK'];
      usertheme.L_LOGOUT_LINK = data['L_LOGOUT_LINK'];
      usertheme.TOP_RATE_YOURMOOD = data['TOP_RATE_YOURMOOD'];
      usertheme.TOP_RATE_YOUR_MOODDESC = data['TOP_RATE_YOUR_MOODDESC'];
      usertheme.TOP_RATE_YOUR_MOODBTN = data['TOP_RATE_YOUR_MOODBTN'];
      usertheme.TOP_RATE_YOUR_MOODANSWER_ALL_BTN = data['TOP_RATE_YOUR_MOODANSWER_ALL_BTN'];
      usertheme.TOP_RIGHT_SIDE_MY_ACCOUNT_LINK = data['TOP_RIGHT_SIDE_MY_ACCOUNT_LINK'];
      usertheme.TOP_RIGHT_SIDE_LOGOUT_LINK = data['TOP_RIGHT_SIDE_LOGOUT_LINK'];
      usertheme.RIGHT_SIDEBAR_QUICK_STATISTICS = data['RIGHT_SIDEBAR_QUICK_STATISTICS'];
      usertheme.RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES = data['RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES'];
      usertheme.RIGHT_SIDEBAR_EMPLOYEES_AT_RISK = data['RIGHT_SIDEBAR_EMPLOYEES_AT_RISK'];
      usertheme.RIGHT_SIDEBAR_NO_OF_RESPONSES = data['RIGHT_SIDEBAR_NO_OF_RESPONSES'];
      usertheme.RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE = data['RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE'];
      usertheme.RIGHT_SIDEBAR_RESPONSE_COMPARISON = data['RIGHT_SIDEBAR_RESPONSE_COMPARISON'];
      usertheme.MW_OPTMOOD = data['MW_OPTMOOD'];
      usertheme.MW_OPTMEANING = data['MW_OPTMEANING'];
      usertheme.MW_OPTEXPECTATIONS = data['MW_OPTEXPECTATIONS'];
      usertheme.MW_OPTSTRENGTHS = data['MW_OPTSTRENGTHS'];
      usertheme.MW_OPTRECOGNITION = data['MW_OPTRECOGNITION'];
      usertheme.MW_OPTDEVELOPMENT = data['MW_OPTDEVELOPMENT'];
      usertheme.MW_OPTINFLUENCE = data['MW_OPTINFLUENCE'];
      usertheme.MW_OPTGOALS = data['MW_OPTGOALS'];
      usertheme.MW_OPTTEAM = data['MW_OPTTEAM'];
      usertheme.MW_OPTFRIENDSHIP = data['MW_OPTFRIENDSHIP'];
      usertheme.MW_OPTFEEDBACK = data['MW_OPTFEEDBACK'];
      usertheme.MW_OPTOPPORTUNITIES =  data['MW_OPTOPPORTUNITIES'];
      usertheme.MW_OPTRECOMMENDATION = data['MW_OPTRECOMMENDATION'];


      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'mwusertheme', usertheme);
          this.setState({formstatus: true});
      }
  }


  render() {
      let languages = this.state.languages;
      let page = this.state.page;
      let formstatus = this.state.formstatus;
      let contents = '';
      //let pagedata = this.state.pagedata;
      //let pagekeys = pagekeys || {};
      //pagekeys.pagekey = pagedata;
      let statusmessage = '';

      if(formstatus) {
          statusmessage = (<div className="alert alert-success">
                            <strong>Success!</strong> Form submitted.
                           </div>
                          );
      }

      switch(page){
          case 'home':
              contents = (<Homepage language={this.state.language} onClick={this.onSubmitHome}/>);
              break;

          case 'signup':
              contents = (<Signuppage language={this.state.language} onClick={this.onSubmitSignup}/>);
              break;

          case 'login':
              contents = (<Loginpage language={this.state.language} onClick={this.onSubmitLogin}/>);
              break;

          case 'mwusertheme':
              contents = (<Mwusertheme language={this.state.language} onClick={this.onSubmitMwusertheme}/>);
              break;

          default: break;
      }


      return (
      <div className="ui container">
        <h2>Language - Pages</h2>
        <div className="ui two column stackable grid container ">
            <div className="column">
                <form id="pageForm" className="ui form">
                  <div className="field">
                    <label htmlFor="inputPage">Select Page : </label>
                    <select className="form-control" id="inputPage" name="page" onChange={this.onSelectPage}>
                        <option value="home">Home</option>
                        <option value="signup">Signup</option>
                        <option value="login">Login</option>
                        <option value="mwusertheme">Mwusertheme</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="inputPage" className="col-sm-2 control-label">Select language : </label>
                    <Languageoptions languages={languages} onChange={this.onSelectLanguage}/>
                  </div>
                </form>
            </div>
            <div className="column"></div>
        </div>
        <div className="field">
         {statusmessage}
        </div>
        <div className="field">
         <br/><br/>
         {contents}
        </div>
      </div>
    );
  }
});



