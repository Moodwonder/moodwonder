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
import About from 'components/pages/About.react';
import Anonymity from 'components/pages/Anonymity.react';
import Terms from 'components/pages/Terms.react';
import Policy from 'components/pages/Policy.react';
import Logout from 'components/pages/Logout.react';
import OpenendedRes from 'components/pages/OpenendedRes.react';
import SurveyForms from 'components/pages/SurveyForms.react';
import Survey from 'components/pages/Survey.react';
import Mycompany from 'components/pages/Mycompany.react';
import OpenendedSurvey from 'components/pages/OpenendedSurvey.react';


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

  onSubmitAbout = (e) => {
      let formData = document.querySelector('#aboutForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let about = about || {};

      about.language = data['language'];
      about.ABT_BNNR_TITLE = data['ABT_BNNR_TITLE'];
      about.ABT_BNNR_STARTED = data['ABT_BNNR_STARTED'];
      about.ABT_ABOUTUS = data['ABT_ABOUTUS'];
      about.ABT_ABTUS_PARA1 = data['ABT_ABTUS_PARA1'];
      about.ABT_ABTUS_PARA2 = data['ABT_ABTUS_PARA2'];
      about.ABT_ABTUS_PARA3 = data['ABT_ABTUS_PARA3'];
      about.ABT_ABTUS_PARA4 = data['ABT_ABTUS_PARA4'];
      about.ABT_ABTUS_PARA5 = data['ABT_ABTUS_PARA5'];
      about.ABT_PEOPLE_BEHIND = data['ABT_PEOPLE_BEHIND'];
      about.ABT_PPL_BHD_DES = data['ABT_PPL_BHD_DES'];
      about.ABT_LINK_ABOUT = data['ABT_LINK_ABOUT'];
      about.ABT_LINK_ANONYMITY = data['ABT_LINK_ANONYMITY'];
      about.ABT_LINK_TERMS = data['ABT_LINK_TERMS'];
      about.ABT_LINK_POLICY = data['ABT_LINK_POLICY'];
      about.ABT_LINK_CONTACT = data['ABT_LINK_CONTACT'];
      about.ABT_NAV_SIGNIN = data['ABT_NAV_SIGNIN'];
      about.ABT_NAV_REGISTER = data['ABT_NAV_REGISTER'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'about', about);
          this.setState({formstatus: true});
      }
  }

  onSubmitAnonymity = (e) => {
      let formData = document.querySelector('#anonymityForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let anonymity = anonymity || {};

      anonymity.language = data['language'];
      anonymity.AMTY_BNNR_TITLE = data['AMTY_BNNR_TITLE'];
      anonymity.AMTY_TITLE = data['AMTY_TITLE'];
      anonymity.AMTY_PARA1 = data['AMTY_PARA1'];
      anonymity.AMTY_PARA2 = data['AMTY_PARA2'];
      anonymity.AMTY_PARA_LI1 = data['AMTY_PARA_LI1'];
      anonymity.AMTY_PARA_LI2 = data['AMTY_PARA_LI2'];
      anonymity.AMTY_PARA_LI3 = data['AMTY_PARA_LI3'];
      anonymity.AMTY_PARA3 = data['AMTY_PARA3'];
      anonymity.AMTY_PARA4 = data['AMTY_PARA4'];
      anonymity.ABT_LINK_ABOUT = data['ABT_LINK_ABOUT'];
      anonymity.ABT_LINK_ANONYMITY = data['ABT_LINK_ANONYMITY'];
      anonymity.ABT_LINK_TERMS = data['ABT_LINK_TERMS'];
      anonymity.ABT_LINK_POLICY = data['ABT_LINK_POLICY'];
      anonymity.ABT_LINK_CONTACT = data['ABT_LINK_CONTACT'];
      anonymity.ABT_NAV_SIGNIN = data['ABT_NAV_SIGNIN'];
      anonymity.ABT_NAV_REGISTER = data['ABT_NAV_REGISTER'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'anonymity', anonymity);
          //console.log(JSON.stringify(anonymity));
          this.setState({formstatus: true});
      }
  }


  onSubmitTerms = (e) => {
      let formData = document.querySelector('#termsForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let terms = terms || {};

      terms.language = data['language'];
      terms.TRMS_TITLE = data['TRMS_TITLE'];
      terms.TRMS_DES = data['TRMS_DES'];
      terms.TRMS_SEC1_T1 = data['TRMS_SEC1_T1'];
      terms.TRMS_SEC1_P1 = data['TRMS_SEC1_P1'];
      terms.TRMS_SEC1_P2 = data['TRMS_SEC1_P2'];
      terms.TRMS_SEC2_T1 = data['TRMS_SEC2_T1'];
      terms.TRMS_SEC2_P1 = data['TRMS_SEC2_P1'];
      terms.TRMS_SEC3_T1 = data['TRMS_SEC3_T1'];
      terms.TRMS_SEC3_P1 = data['TRMS_SEC3_P1'];
      terms.TRMS_SEC4_T1 = data['TRMS_SEC4_T1'];
      terms.TRMS_SEC4_P1 = data['TRMS_SEC4_P1'];
      terms.TRMS_SEC5_T1 = data['TRMS_SEC5_T1'];
      terms.TRMS_SEC5_P1 = data['TRMS_SEC5_P1'];
      terms.TRMS_SEC6_T1 = data['TRMS_SEC6_T1'];
      terms.TRMS_SEC6_P1 = data['TRMS_SEC6_P1'];
      terms.TRMS_SEC7_T1 = data['TRMS_SEC7_T1'];
      terms.TRMS_SEC7_P1 = data['TRMS_SEC7_P1'];
      terms.TRMS_SEC8_T1 = data['TRMS_SEC8_T1'];
      terms.TRMS_SEC8_P1 = data['TRMS_SEC8_P1'];
      terms.ABT_LINK_ABOUT = data['ABT_LINK_ABOUT'];
      terms.ABT_LINK_ANONYMITY = data['ABT_LINK_ANONYMITY'];
      terms.ABT_LINK_TERMS = data['ABT_LINK_TERMS'];
      terms.ABT_LINK_POLICY = data['ABT_LINK_POLICY'];
      terms.ABT_LINK_CONTACT = data['ABT_LINK_CONTACT'];
      terms.ABT_NAV_SIGNIN = data['ABT_NAV_SIGNIN'];
      terms.ABT_NAV_REGISTER = data['ABT_NAV_REGISTER'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'terms', terms);
          //console.log(JSON.stringify(terms));
          this.setState({formstatus: true});
      }
  }

  onSubmitPolicy = (e) => {
      let formData = document.querySelector('#policyForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let policy = policy || {};

      policy.language = data['language'];
      policy.PLCY_TITLE = data['PLCY_TITLE'];
      policy.PLCY_PARA1 = data['PLCY_PARA1'];
      policy.PLCY_PARA2 = data['PLCY_PARA2'];
      policy.PLCY_PARA3 = data['PLCY_PARA3'];
      policy.PLCY_PARA4 = data['PLCY_PARA4'];
      policy.PLCY_PARA5 = data['PLCY_PARA5'];
      policy.PLCY_PARA6 = data['PLCY_PARA6'];
      policy.ABT_LINK_ABOUT = data['ABT_LINK_ABOUT'];
      policy.ABT_LINK_ANONYMITY = data['ABT_LINK_ANONYMITY'];
      policy.ABT_LINK_TERMS = data['ABT_LINK_TERMS'];
      policy.ABT_LINK_POLICY = data['ABT_LINK_POLICY'];
      policy.ABT_LINK_CONTACT = data['ABT_LINK_CONTACT'];
      policy.ABT_NAV_SIGNIN = data['ABT_NAV_SIGNIN'];
      policy.ABT_NAV_REGISTER = data['ABT_NAV_REGISTER'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'policy', policy);
          //console.log(JSON.stringify(policy));
          this.setState({formstatus: true});
      }
  }

  onSubmitLogout = (e) => {
      let formData = document.querySelector('#logoutForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let logout = logout || {};

      logout.language = data['language'];
      logout.LOUT_MESSAGE = data['LOUT_MESSAGE'];
      logout.LOUT_TEXTBEFORE_LOGIN = data['LOUT_TEXTBEFORE_LOGIN'];
      logout.LOUT_LOGIN = data['LOUT_LOGIN'];
      logout.LOUT_TEXTAFTER_LOGIN = data['LOUT_TEXTAFTER_LOGIN'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'logout', logout);
          //console.log(JSON.stringify(logout));
          this.setState({formstatus: true});
      }
  }

  onSubmitOpenendedRes = (e) => {
      let formData = document.querySelector('#openendedresForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let openendedres = openendedres || {};

      openendedres.language = data['language'];
      openendedres.OPER_TITLE = data['OPER_TITLE'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'openendedres', openendedres);
          //console.log(JSON.stringify(openendedres));
          this.setState({formstatus: true});
      }
  }

  onSubmitSurveyForms = (e) => {
      let formData = document.querySelector('#surveyformsForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let surveyforms = surveyforms || {};

      surveyforms.language = data['language'];
      surveyforms.SVFM_TITLE = data['SVFM_TITLE'];
      surveyforms.SVFM_CREATE_BTN = data['SVFM_CREATE_BTN'];
      surveyforms.SVFM_SEARCH_BOX = data['SVFM_SEARCH_BOX'];
      surveyforms.SVFM_TBLNUMBER = data['SVFM_TBLNUMBER'];
      surveyforms.SVFM_TBLTITLE = data['SVFM_TBLTITLE'];
      surveyforms.SVFM_TBLDATE = data['SVFM_TBLDATE'];
      surveyforms.SVFM_VIEWSURVEY_LINK = data['SVFM_VIEWSURVEY_LINK'];
      surveyforms.SVFM_VIEWRESPONSES_LINK = data['SVFM_VIEWRESPONSES_LINK'];
      surveyforms.SVFM_DELETE_LINK = data['SVFM_DELETE_LINK'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'surveyforms', surveyforms);
          //console.log(JSON.stringify(surveyforms));
          this.setState({formstatus: true});
      }
  }


  onSubmitSurvey = (e) => {
      let formData = document.querySelector('#surveyForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let survey = survey || {};

      survey.language = data['language'];
      survey.SRVY_TITLE = data['SRVY_TITLE'];
      survey.SRVY_MOOD_KEY = data['SRVY_MOOD_KEY'];
      survey.SRVY_MEANING_KEY = data['SRVY_MEANING_KEY'];
      survey.SRVY_EXPECTATIONS_KEY = data['SRVY_EXPECTATIONS_KEY'];
      survey.SRVY_STRENGTHS_KEY = data['SRVY_STRENGTHS_KEY'];
      survey.SRVY_RECOGNITION_KEY = data['SRVY_RECOGNITION_KEY'];
      survey.SRVY_DEVELOPMENT_KEY = data['SRVY_DEVELOPMENT_KEY'];
      survey.SRVY_INFLUENCE_KEY = data['SRVY_INFLUENCE_KEY'];
      survey.SRVY_GOALS_KEY = data['SRVY_GOALS_KEY'];
      survey.SRVY_TEAM_KEY = data['SRVY_TEAM_KEY'];
      survey.SRVY_FRIENDSHIP_KEY = data['SRVY_FRIENDSHIP_KEY'];
      survey.SRVY_FEEDBACK_KEY = data['SRVY_FEEDBACK_KEY'];
      survey.SRVY_OPPORTUNITIES_KEY = data['SRVY_OPPORTUNITIES_KEY'];
      survey.SRVY_RECOMMENDATION_KEY = data['SRVY_RECOMMENDATION_KEY'];
      survey.SRVY_MOOD_DES = data['SRVY_MOOD_DES'];
      survey.SRVY_MEANING_DES = data['SRVY_MEANING_DES'];
      survey.SRVY_EXPECTATIONS_DES = data['SRVY_EXPECTATIONS_DES'];
      survey.SRVY_STRENGTHS_DES = data['SRVY_STRENGTHS_DES'];
      survey.SRVY_RECOGNITION_DES = data['SRVY_RECOGNITION_DES'];
      survey.SRVY_DEVELOPMENT_DES = data['SRVY_DEVELOPMENT_DES'];
      survey.SRVY_INFLUENCE_DES = data['SRVY_INFLUENCE_DES'];
      survey.SRVY_GOALS_DES = data['SRVY_GOALS_DES'];
      survey.SRVY_TEAM_DES = data['SRVY_TEAM_DES'];
      survey.SRVY_FRIENDSHIP_DES = data['SRVY_FRIENDSHIP_DES'];
      survey.SRVY_FEEDBACK_DES = data['SRVY_FEEDBACK_DES'];
      survey.SRVY_OPPORTUNITIES_DES = data['SRVY_OPPORTUNITIES_DES'];
      survey.SRVY_RECOMMENDATION_DES = data['SRVY_RECOMMENDATION_DES'];
      survey.SRVY_SUBMIT_BTN = data['SRVY_SUBMIT_BTN'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'survey', survey);
          //console.log(JSON.stringify(survey));
          this.setState({formstatus: true});
      }
  }


  onSubmitMycompany = (e) => {
      let formData = document.querySelector('#mycompanyForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let mycompany = mycompany || {};

      mycompany.language = data['language'];
      mycompany.MYCO_EGRAPH = data['MYCO_EGRAPH'];
      mycompany.MYCO_CRATING = data['MYCO_CRATING'];
      mycompany.MYCO_COMPANYINFO = data['MYCO_COMPANYINFO'];
      mycompany.MYCO_TITLE = data['MYCO_TITLE'];
      mycompany.MYCO_OPTMWINDEX = data['MYCO_OPTMWINDEX'];
      mycompany.MYCO_OPTMOOD = data['MYCO_OPTMOOD'];
      mycompany.MYCO_OPTMEANING = data['MYCO_OPTMEANING'];
      mycompany.MYCO_OPTEXPECTATIONS = data['MYCO_OPTEXPECTATIONS'];
      mycompany.MYCO_OPTSTRENGTHS = data['MYCO_OPTSTRENGTHS'];
      mycompany.MYCO_OPTRECOGNITION = data['MYCO_OPTRECOGNITION'];
      mycompany.MYCO_OPTDEVELOPMENT = data['MYCO_OPTDEVELOPMENT'];
      mycompany.MYCO_OPTINFLUENCE = data['MYCO_OPTINFLUENCE'];
      mycompany.MYCO_OPTGOALS = data['MYCO_OPTGOALS'];
      mycompany.MYCO_OPTTEAM = data['MYCO_OPTTEAM'];
      mycompany.MYCO_OPTFRIENDSHIP = data['MYCO_OPTFRIENDSHIP'];
      mycompany.MYCO_OPTFEEDBACK = data['MYCO_OPTFEEDBACK'];
      mycompany.MYCO_OPTOPPORTUNITIES = data['MYCO_OPTOPPORTUNITIES'];
      mycompany.MYCO_OPTRECOMMENDATION = data['MYCO_OPTRECOMMENDATION'];
      mycompany.MYCO_MYSELF = data['MYCO_MYSELF'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'mycompany', mycompany);
          //console.log(JSON.stringify(mycompany));
          this.setState({formstatus: true});
      }
  }


  onSubmitOpenendedSurvey = (e) => {
      let formData = document.querySelector('#openendedsurveyForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let openendedSurvey = openendedSurvey || {};

      openendedSurvey.language = data['language'];
      openendedSurvey.OPES_TOP_TITLE = data['OPES_TOP_TITLE'];
      openendedSurvey.OPES_OPTION = data['OPES_OPTION'];
      openendedSurvey.OPES_TOP_QNSONE = data['OPES_TOP_QNSONE'];
      openendedSurvey.OPES_TOP_QNSTWO = data['OPES_TOP_QNSTWO'];
      openendedSurvey.OPES_TOP_QNSTHREE = data['OPES_TOP_QNSTHREE'];
      openendedSurvey.OPES_WORST_TITLE = data['OPES_WORST_TITLE'];
      openendedSurvey.OPES_WORST_QNSONE = data['OPES_WORST_QNSONE'];
      openendedSurvey.OPES_WORST_QNSTWO = data['OPES_WORST_QNSTWO'];
      openendedSurvey.OPES_WORST_QNSTHREE = data['OPES_WORST_QNSTHREE'];
      openendedSurvey.OPES_MOOD = data['OPES_MOOD'];
      openendedSurvey.OPES_EXPECTATIONS = data['OPES_EXPECTATIONS'];
      openendedSurvey.OPES_STRENGTHS = data['OPES_STRENGTHS'];
      openendedSurvey.OPES_RECOGNITION = data['OPES_RECOGNITION'];
      openendedSurvey.OPES_DEVELOPMENT = data['OPES_DEVELOPMENT'];
      openendedSurvey.OPES_INFLUENCE = data['OPES_INFLUENCE'];
      openendedSurvey.OPES_TEAM = data['OPES_TEAM'];
      openendedSurvey.OPES_FRIENDSHIP = data['OPES_FRIENDSHIP'];
      openendedSurvey.OPES_FEEDBACK = data['OPES_FEEDBACK'];
      openendedSurvey.OPES_OPPORTUNITIES = data['OPES_OPPORTUNITIES'];
      openendedSurvey.OPES_RECOMMENDATION = data['OPES_RECOMMENDATION'];
      openendedSurvey.OPES_CANCEL_BTN = data['OPES_CANCEL_BTN'];
      openendedSurvey.OPES_SUBMIT_BTN = data['OPES_SUBMIT_BTN'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'openendedsurvey', openendedSurvey);
          //console.log(JSON.stringify(openendedSurvey));
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

          case 'about':
              contents = (<About language={this.state.language} onClick={this.onSubmitAbout}/>);
              break;

          case 'anonymity':
              contents = (<Anonymity language={this.state.language} onClick={this.onSubmitAnonymity}/>);
              break;

          case 'terms':
              contents = (<Terms language={this.state.language} onClick={this.onSubmitTerms}/>);
              break;

          case 'policy':
              contents = (<Policy language={this.state.language} onClick={this.onSubmitPolicy}/>);
              break;

          case 'logout':
              contents = (<Logout language={this.state.language} onClick={this.onSubmitLogout}/>);
              break;

          case 'openendedres':
              contents = (<OpenendedRes language={this.state.language} onClick={this.onSubmitOpenendedRes}/>);
              break;

          case 'surveyforms':
              contents = (<SurveyForms language={this.state.language} onClick={this.onSubmitSurveyForms}/>);
              break;

          case 'survey':
              contents = (<Survey language={this.state.language} onClick={this.onSubmitSurvey}/>);
              break;

          case 'mycompany':
              contents = (<Mycompany language={this.state.language} onClick={this.onSubmitMycompany}/>);
              break;

          case 'openendedsurvey':
              contents = (<OpenendedSurvey language={this.state.language} onClick={this.onSubmitOpenendedSurvey}/>);
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
                        <option value="about">About</option>
                        <option value="anonymity">Anonymity</option>
                        <option value="terms">Terms</option>
                        <option value="policy">Policy</option>
                        <option value="logout">Logout</option>
                        <option value="openendedres">Openended Responses</option>
                        <option value="surveyforms">Survey Forms</option>
                        <option value="survey">Engagement Survey</option>
                        <option value="mycompany">Mycompany</option>
                        <option value="openendedsurvey">Openended Survey</option>
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



