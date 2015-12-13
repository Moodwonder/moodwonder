import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Signuppage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          pagedata: [],
          language: props.language,
          L_MYMOOD_LINK: '',
          L_MYACCOUNT_LINK: '',
          L_MYCOMPANY_LINK: '',
          L_CAST_VOTE: '',
          L_MOODRATE: '',
          L_INVITEPEOPLE: '',
          L_INVITE_PEOPLE_TITLE: '',
          L_INVITE_PEOPLE_DES: '',
          L_INVITE_INPUT_PLCHOLDER: '',
          L_INVITE_BTN: '',
          L_MYPROFILE_LINK: '',
          L_LOGOUT_LINK: '',
          TOP_RATE_YOURMOOD: '',
          TOP_RATE_YOUR_MOODDESC: '',
          TOP_RATE_YOUR_MOODBTN: '',
          TOP_RATE_YOUR_MOODANSWER_ALL_BTN: '',
          TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: '',
          TOP_RIGHT_SIDE_LOGOUT_LINK: '',
          RIGHT_SIDEBAR_QUICK_STATISTICS: '',
          RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: '',
          RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: '',
          RIGHT_SIDEBAR_NO_OF_RESPONSES: '',
          RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: '',
          RIGHT_SIDEBAR_RESPONSE_COMPARISON: '',
          MW_OPTMOOD: '',
          MW_OPTMEANING: '',
          MW_OPTEXPECTATIONS: '',
          MW_OPTSTRENGTHS: '',
          MW_OPTRECOGNITION: '',
          MW_OPTDEVELOPMENT: '',
          MW_OPTINFLUENCE: '',
          MW_OPTGOALS: '',
          MW_OPTTEAM: '',
          MW_OPTFRIENDSHIP: '',
          MW_OPTFEEDBACK: '',
          MW_OPTOPPORTUNITIES: '',
          MW_OPTRECOMMENDATION: '',
          MDL_TITLE: '',
          MDL_COMMENT_HEADER: '',
          MDL_SUBMIT_BTN: '',
          MDL_CLOSE_BTN: '',
          MDL_OPT_DEFAULT: '',
          MDL_OPTGRP_ONE: '',
          MDL_GRPONE_OPT_ONE: '',
          MDL_GRPONE_OPT_TWO: '',
          MDL_GRPONE_OPT_THREE: '',
          MDL_GRPONE_OPT_FOUR: '',
          MDL_GRPONE_OPT_FIVE: '',
          MDL_GRPONE_OPT_SIX: '',
          MDL_GRPONE_OPT_SEVEN: '',
          MDL_GRPONE_OPT_EIGHT: '',
          MDL_OPTGRP_TWO: '',
          MDL_GRPTWO_OPT_ONE: '',
          MDL_GRPTWO_OPT_TWO: '',
          MDL_GRPTWO_OPT_THREE: '',
          MDL_GRPTWO_OPT_FOUR: '',
          MDL_GRPTWO_OPT_FIVE: '',
          MDL_GRPTWO_OPT_SIX: '',
          MDL_GRPTWO_OPT_SEVEN: '',
          MDL_GRPTWO_OPT_EIGHT: '',
          MDL_GRPTWO_OPT_NINE: '',
          MDL_GRPTWO_OPT_TEN: '',
          MDL_GRPTWO_OPT_ELEVEN: '',
          MDL_GRPTWO_OPT_TWELVE: '',
          MDL_GRPTWO_OPT_THIRTEEN: '',
          MDL_GRPTWO_OPT_4TEEN: '',
          MDL_GRPTWO_OPT_FIFTEEN: '',
          MDL_GRPTWO_OPT_6TEEN: '',
          MDL_GRPTWO_OPT_7TEEN: '',
          MDL_GRPTWO_OPT_8TEEN: '',
          MDL_GRPTWO_OPT_NINTEEN: '',
          MDL_GRPTWO_OPT_TWENTY: '',
          MDL_OPTGRP_THREE: '',
          MDL_GRPTHREE_OPT_ONE: '',
          MDL_GRPTHREE_OPT_TWO: '',
          MDL_GRPTHREE_OPT_THREE: '',
          MDL_OPTGRP_FOUR: '',
          MDL_GRPFOUR_OPT_ONE: '',
          MDL_GRPFOUR_OPT_TWO: ''
      };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getPage({page: 'mwusertheme', language: this.state.language});
  }

  componentWillUnmount() {
      PageStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          pagedata: PageStore.getState().pagedata
      });

      let pagedata = this.state.pagedata;
      this.setState({
          L_MYMOOD_LINK: pagedata.L_MYMOOD_LINK,
          L_MYACCOUNT_LINK: pagedata.L_MYACCOUNT_LINK,
          L_MYCOMPANY_LINK: pagedata.L_MYCOMPANY_LINK,
          L_CAST_VOTE: pagedata.L_CAST_VOTE,
          L_MOODRATE: pagedata.L_MOODRATE,
          L_INVITEPEOPLE: pagedata.L_INVITEPEOPLE,
          L_INVITE_PEOPLE_TITLE: pagedata.L_INVITE_PEOPLE_TITLE,
          L_INVITE_PEOPLE_DES: pagedata.L_INVITE_PEOPLE_DES,
          L_INVITE_INPUT_PLCHOLDER: pagedata.L_INVITE_INPUT_PLCHOLDER,
          L_INVITE_BTN: pagedata.L_INVITE_BTN,
          L_MYPROFILE_LINK: pagedata.L_MYPROFILE_LINK,
          L_LOGOUT_LINK: pagedata.L_LOGOUT_LINK,
          TOP_RATE_YOURMOOD: pagedata.TOP_RATE_YOURMOOD,
          TOP_RATE_YOUR_MOODDESC: pagedata.TOP_RATE_YOUR_MOODDESC,
          TOP_RATE_YOUR_MOODBTN: pagedata.TOP_RATE_YOUR_MOODBTN,
          TOP_RATE_YOUR_MOODANSWER_ALL_BTN: pagedata.TOP_RATE_YOUR_MOODANSWER_ALL_BTN,
          TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: pagedata.TOP_RIGHT_SIDE_MY_ACCOUNT_LINK,
          TOP_RIGHT_SIDE_LOGOUT_LINK: pagedata.TOP_RIGHT_SIDE_LOGOUT_LINK,
          RIGHT_SIDEBAR_QUICK_STATISTICS: pagedata.RIGHT_SIDEBAR_QUICK_STATISTICS,
          RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: pagedata.RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES,
          RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: pagedata.RIGHT_SIDEBAR_EMPLOYEES_AT_RISK,
          RIGHT_SIDEBAR_NO_OF_RESPONSES: pagedata.RIGHT_SIDEBAR_NO_OF_RESPONSES,
          RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: pagedata.RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE,
          RIGHT_SIDEBAR_RESPONSE_COMPARISON: pagedata.RIGHT_SIDEBAR_RESPONSE_COMPARISON,
          MW_OPTMOOD: pagedata.MW_OPTMOOD,
          MW_OPTMEANING: pagedata.MW_OPTMEANING,
          MW_OPTEXPECTATIONS: pagedata.MW_OPTEXPECTATIONS,
          MW_OPTSTRENGTHS: pagedata.MW_OPTSTRENGTHS,
          MW_OPTRECOGNITION: pagedata.MW_OPTRECOGNITION,
          MW_OPTDEVELOPMENT: pagedata.MW_OPTDEVELOPMENT,
          MW_OPTINFLUENCE: pagedata.MW_OPTINFLUENCE,
          MW_OPTGOALS: pagedata.MW_OPTGOALS,
          MW_OPTTEAM: pagedata.MW_OPTTEAM,
          MW_OPTFRIENDSHIP: pagedata.MW_OPTFRIENDSHIP,
          MW_OPTFEEDBACK: pagedata.MW_OPTFEEDBACK,
          MW_OPTOPPORTUNITIES: pagedata.MW_OPTOPPORTUNITIES,
          MW_OPTRECOMMENDATION: pagedata.MW_OPTRECOMMENDATION,

          MDL_TITLE: pagedata.MDL_TITLE,
          MDL_COMMENT_HEADER: pagedata.MDL_COMMENT_HEADER,
          MDL_SUBMIT_BTN: pagedata.MDL_SUBMIT_BTN,
          MDL_CLOSE_BTN: pagedata.MDL_CLOSE_BTN,
          MDL_OPT_DEFAULT: pagedata.MDL_OPT_DEFAULT,

          MDL_OPTGRP_ONE: pagedata.MDL_OPTGRP_ONE,
          MDL_GRPONE_OPT_ONE: pagedata.MDL_GRPONE_OPT_ONE,
          MDL_GRPONE_OPT_TWO: pagedata.MDL_GRPONE_OPT_TWO,
          MDL_GRPONE_OPT_THREE: pagedata.MDL_GRPONE_OPT_THREE,
          MDL_GRPONE_OPT_FOUR: pagedata.MDL_GRPONE_OPT_FOUR,
          MDL_GRPONE_OPT_FIVE: pagedata.MDL_GRPONE_OPT_FIVE,
          MDL_GRPONE_OPT_SIX: pagedata.MDL_GRPONE_OPT_SIX,
          MDL_GRPONE_OPT_SEVEN: pagedata.MDL_GRPONE_OPT_SEVEN,
          MDL_GRPONE_OPT_EIGHT: pagedata.MDL_GRPONE_OPT_EIGHT,

          MDL_OPTGRP_TWO: pagedata.MDL_OPTGRP_TWO,
          MDL_GRPTWO_OPT_ONE: pagedata.MDL_GRPTWO_OPT_ONE,
          MDL_GRPTWO_OPT_TWO: pagedata.MDL_GRPTWO_OPT_TWO,
          MDL_GRPTWO_OPT_THREE: pagedata.MDL_GRPTWO_OPT_THREE,
          MDL_GRPTWO_OPT_FOUR: pagedata.MDL_GRPTWO_OPT_FOUR,
          MDL_GRPTWO_OPT_FIVE: pagedata.MDL_GRPTWO_OPT_FIVE,
          MDL_GRPTWO_OPT_SIX: pagedata.MDL_GRPTWO_OPT_SIX,
          MDL_GRPTWO_OPT_SEVEN: pagedata.MDL_GRPTWO_OPT_SEVEN,
          MDL_GRPTWO_OPT_EIGHT: pagedata.MDL_GRPTWO_OPT_EIGHT,
          MDL_GRPTWO_OPT_NINE: pagedata.MDL_GRPTWO_OPT_NINE,
          MDL_GRPTWO_OPT_TEN: pagedata.MDL_GRPTWO_OPT_TEN,

          MDL_GRPTWO_OPT_ELEVEN: pagedata.MDL_GRPTWO_OPT_ELEVEN,
          MDL_GRPTWO_OPT_TWELVE: pagedata.MDL_GRPTWO_OPT_TWELVE,
          MDL_GRPTWO_OPT_THIRTEEN: pagedata.MDL_GRPTWO_OPT_THIRTEEN,
          MDL_GRPTWO_OPT_4TEEN: pagedata.MDL_GRPTWO_OPT_4TEEN,
          MDL_GRPTWO_OPT_FIFTEEN: pagedata.MDL_GRPTWO_OPT_FIFTEEN,
          MDL_GRPTWO_OPT_6TEEN: pagedata.MDL_GRPTWO_OPT_6TEEN,
          MDL_GRPTWO_OPT_7TEEN: pagedata.MDL_GRPTWO_OPT_7TEEN,
          MDL_GRPTWO_OPT_8TEEN: pagedata.MDL_GRPTWO_OPT_8TEEN,
          MDL_GRPTWO_OPT_NINTEEN: pagedata.MDL_GRPTWO_OPT_NINTEEN,
          MDL_GRPTWO_OPT_TWENTY: pagedata.MDL_GRPTWO_OPT_TWENTY,

          MDL_OPTGRP_THREE: pagedata.MDL_OPTGRP_THREE,
          MDL_GRPTHREE_OPT_ONE: pagedata.MDL_GRPTHREE_OPT_ONE,
          MDL_GRPTHREE_OPT_TWO: pagedata.MDL_GRPTHREE_OPT_TWO,
          MDL_GRPTHREE_OPT_THREE: pagedata.MDL_GRPTHREE_OPT_THREE,

          MDL_OPTGRP_FOUR: pagedata.MDL_OPTGRP_FOUR,
          MDL_GRPFOUR_OPT_ONE: pagedata.MDL_GRPFOUR_OPT_ONE,
          MDL_GRPFOUR_OPT_TWO: pagedata.MDL_GRPFOUR_OPT_TWO
      });
  }

  onSubmitSignup = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

  onChangeKeys = (e, key) => {
      e.preventDefault();
      this.setState({ [key]: e.target.value });
  }

  onChangeMymoodLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYMOOD_LINK: e.target.value });
  }

  onChangeMyaccountLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYACCOUNT_LINK: e.target.value });
  }

  onChangeMycompanyLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYCOMPANY_LINK: e.target.value });
  }

  onChangeCastVote = (e) => {
      e.preventDefault();
      this.setState({ L_CAST_VOTE: e.target.value });
  }

  onChangeInviteTitle = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_PEOPLE_TITLE: e.target.value });
  }

  onChangeInviteDes = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_PEOPLE_DES: e.target.value });
  }

  onChangeInputPlcholder = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_INPUT_PLCHOLDER: e.target.value });
  }

  onChangeInviteBtn = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_BTN: e.target.value });
  }

  onChangeMyprofileLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYPROFILE_LINK: e.target.value });
  }

  onChangeLogoutLink = (e) => {
      e.preventDefault();
      this.setState({ L_LOGOUT_LINK: e.target.value });
  }

  onChangeTopRateYourmood = (e) => {
      e.preventDefault();
      this.setState({ TOP_RATE_YOURMOOD: e.target.value });
  }

  onChangeTopRateYourmoodDesc = (e) => {
      e.preventDefault();
      this.setState({ TOP_RATE_YOUR_MOODDESC: e.target.value });
  }

  onChangeTopRateYourmoodBtn = (e) => {
      e.preventDefault();
      this.setState({ TOP_RATE_YOUR_MOODBTN: e.target.value });
  }

  onChangeTopRateYourmoodAnswerAllBtn = (e) => {
      e.preventDefault();
      this.setState({ TOP_RATE_YOUR_MOODANSWER_ALL_BTN: e.target.value });
  }

  topRightSideMyAccountLink = (e) => {
      e.preventDefault();
      this.setState({ TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: e.target.value });
  }

  topRightSideLogoutLink = (e) => {
      e.preventDefault();
      this.setState({ TOP_RIGHT_SIDE_LOGOUT_LINK: e.target.value });
  }

  rightSidebarQuickStatistics = (e) => {
      e.preventDefault();
      this.setState({ RIGHT_SIDEBAR_QUICK_STATISTICS: e.target.value });
  }

  rightSidebarNumberOfEmployees = (e) => {
      e.preventDefault();
      this.setState({ RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: e.target.value });
  }

  rightSidebarEmployeesAtRisk = (e) => {
      e.preventDefault();
      this.setState({ RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: e.target.value });
  }

  rightSidebarNoOfResponses = (e) => {
      e.preventDefault();
      this.setState({ RIGHT_SIDEBAR_NO_OF_RESPONSES: e.target.value });
  }

  rightSidebarTimeSinceLastResponse = (e) => {
      e.preventDefault();
      this.setState({ RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: e.target.value });
  }

  rightSidebarResponseComparison = (e) => {
      e.preventDefault();
      this.setState({ RIGHT_SIDEBAR_RESPONSE_COMPARISON: e.target.value });
  }

  mwOptMood = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTMOOD: e.target.value });
  }

  mwOptMeaning = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTMEANING: e.target.value });
  }

  mwOptExpectations = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTEXPECTATIONS: e.target.value });
  }

  mwOptStrengths = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTSTRENGTHS: e.target.value });
  }

  mwOptRecognition = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTRECOGNITION: e.target.value });
  }

  mwOptDevelopment = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTDEVELOPMENT: e.target.value });
  }

  mwOptInfluence = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTINFLUENCE: e.target.value });
  }

  mwOptGoals = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTGOALS: e.target.value });
  }

  mwOptTeam = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTTEAM: e.target.value });
  }

  mwOptFriendship = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTFRIENDSHIP: e.target.value });
  }

  mwOptFeedback = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTFEEDBACK: e.target.value });
  }

  mwOptOpportunities = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTOPPORTUNITIES: e.target.value });
  }

  mwOptRecommendation = (e) => {
      e.preventDefault();
      this.setState({ MW_OPTRECOMMENDATION: e.target.value });
  }
  moodRateLink = (e) => {
      e.preventDefault();
      this.setState({ L_MOODRATE: e.target.value });
  }
  invitePeopleLink = (e) => {
      e.preventDefault();
      this.setState({ L_INVITEPEOPLE: e.target.value });
  }
  mdlTitle = (e) => {
      e.preventDefault();
      this.setState({ MDL_TITLE: e.target.value });
  }
  mdlCommentHeader = (e) => {
      e.preventDefault();
      this.setState({ MDL_COMMENT_HEADER: e.target.value });
  }
  mdlSubmitBtn = (e) => {
      e.preventDefault();
      this.setState({ MDL_SUBMIT_BTN: e.target.value });
  }
  mdlCloseBtn = (e) => {
      e.preventDefault();
      this.setState({ MDL_CLOSE_BTN: e.target.value });
  }
  mdlOptDefault = (e) => {
      e.preventDefault();
      this.setState({ MDL_OPT_DEFAULT: e.target.value });
  }
  mdlOptGrpOne = (e) => {
      e.preventDefault();
      this.setState({ MDL_OPTGRP_ONE: e.target.value });
  }
  mdlGrpOneOptOne = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_ONE: e.target.value });
  }
  mdlGrpOneOptTwo = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_TWO: e.target.value });
  }
  mdlGrpOneOptThree = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_THREE: e.target.value });
  }
  mdlGrpOneOptFour = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_FOUR: e.target.value });
  }
  mdlGrpOneOptFive = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_FIVE: e.target.value });
  }
  mdlGrpOneOptSix = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_SIX: e.target.value });
  }
  mdlGrpOneOptSeven = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_SEVEN: e.target.value });
  }
  mdlGrpOneOptEight = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPONE_OPT_EIGHT: e.target.value });
  }
  mdlOptGrpTwo = (e) => {
      e.preventDefault();
      this.setState({ MDL_OPTGRP_TWO: e.target.value });
  }
  mdlGrpTwoOptOne = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_ONE: e.target.value });
  }
  mdlGrpTwoOptTwo = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_TWO: e.target.value });
  }
  mdlGrpTwoOptThree = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_THREE: e.target.value });
  }
  mdlGrpTwoOptFour = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_FOUR: e.target.value });
  }
  mdlGrpTwoOptFive = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_FIVE: e.target.value });
  }
  mdlGrpTwoOptSix = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_SIX: e.target.value });
  }
  mdlGrpTwoOptSeven = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_SEVEN: e.target.value });
  }
  mdlGrpTwoOptEight = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_EIGHT: e.target.value });
  }
  mdlGrpTwoOptNine = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_NINE: e.target.value });
  }
  mdlGrpTwoOptTen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_TEN: e.target.value });
  }
  mdlGrpTwoOptEleven = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_ELEVEN: e.target.value });
  }
  mdlGrpTwoOptTwelve = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_TWELVE: e.target.value });
  }
  mdlGrpTwoOptThirteen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_THIRTEEN: e.target.value });
  }
  mdlGrpTwoOpt4teen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_4TEEN: e.target.value });
  }
  mdlGrpTwoOptFifteen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_FIFTEEN: e.target.value });
  }
  mdlGrpTwoOpt6teen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_6TEEN: e.target.value });
  }
  mdlGrpTwoOpt7teen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_7TEEN: e.target.value });
  }
  mdlGrpTwoOpt8teen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_8TEEN: e.target.value });
  }
  mdlGrpTwoOptNineteen = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_NINTEEN: e.target.value });
  }
  mdlGrpTwoOptTwenty = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTWO_OPT_TWENTY: e.target.value });
  }
  mdlOptGrpThree = (e) => {
      e.preventDefault();
      this.setState({ MDL_OPTGRP_THREE: e.target.value });
  }
  mdlGrpThreeOptOne = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTHREE_OPT_ONE: e.target.value });
  }
  mdlGrpThreeOptTwo = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTHREE_OPT_TWO: e.target.value });
  }
  mdlGrpThreeOptThree = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPTHREE_OPT_THREE: e.target.value });
  }
  mdlOptGrpFour = (e) => {
      e.preventDefault();
      this.setState({ MDL_OPTGRP_FOUR: e.target.value });
  }
  mdlGrpFourOptOne = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPFOUR_OPT_ONE: e.target.value });
  }
  mdlGrpFourOptTwo = (e) => {
      e.preventDefault();
      this.setState({ MDL_GRPFOUR_OPT_TWO: e.target.value });
  }



  render() {

      let pagedata = this.state.pagedata;
      let L_MYMOOD_LINK = this.state.L_MYMOOD_LINK;
      let L_MYACCOUNT_LINK = this.state.L_MYACCOUNT_LINK;
      let L_MYCOMPANY_LINK = this.state.L_MYCOMPANY_LINK;
      let L_CAST_VOTE = this.state.L_CAST_VOTE;
      let L_MOODRATE = this.state.L_MOODRATE;
      let L_INVITEPEOPLE = this.state.L_INVITEPEOPLE;
      let L_INVITE_PEOPLE_TITLE = this.state.L_INVITE_PEOPLE_TITLE;
      let L_INVITE_PEOPLE_DES = this.state.L_INVITE_PEOPLE_DES;
      let L_INVITE_INPUT_PLCHOLDER = this.state.L_INVITE_INPUT_PLCHOLDER;
      let L_INVITE_BTN = this.state.L_INVITE_BTN;
      let L_MYPROFILE_LINK = this.state.L_MYPROFILE_LINK;
      let L_LOGOUT_LINK = this.state.L_LOGOUT_LINK;
      let TOP_RATE_YOURMOOD = this.state.TOP_RATE_YOURMOOD;
      let TOP_RATE_YOUR_MOODDESC = this.state.TOP_RATE_YOUR_MOODDESC;
      let TOP_RATE_YOUR_MOODBTN = this.state.TOP_RATE_YOUR_MOODBTN;
      let TOP_RATE_YOUR_MOODANSWER_ALL_BTN = this.state.TOP_RATE_YOUR_MOODANSWER_ALL_BTN;
      let TOP_RIGHT_SIDE_MY_ACCOUNT_LINK = this.state.TOP_RIGHT_SIDE_MY_ACCOUNT_LINK;
      let TOP_RIGHT_SIDE_LOGOUT_LINK = this.state.TOP_RIGHT_SIDE_LOGOUT_LINK;
      let RIGHT_SIDEBAR_QUICK_STATISTICS = this.state.RIGHT_SIDEBAR_QUICK_STATISTICS;
      let RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES = this.state.RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES;
      let RIGHT_SIDEBAR_EMPLOYEES_AT_RISK = this.state.RIGHT_SIDEBAR_EMPLOYEES_AT_RISK;
      let RIGHT_SIDEBAR_NO_OF_RESPONSES = this.state.RIGHT_SIDEBAR_NO_OF_RESPONSES;
      let RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE = this.state.RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE;
      let RIGHT_SIDEBAR_RESPONSE_COMPARISON = this.state.RIGHT_SIDEBAR_RESPONSE_COMPARISON;
      let MW_OPTMOOD = this.state.MW_OPTMOOD;
      let MW_OPTMEANING = this.state.MW_OPTMEANING;
      let MW_OPTEXPECTATIONS = this.state.MW_OPTEXPECTATIONS;
      let MW_OPTSTRENGTHS = this.state.MW_OPTSTRENGTHS;
      let MW_OPTRECOGNITION = this.state.MW_OPTRECOGNITION;
      let MW_OPTDEVELOPMENT = this.state.MW_OPTDEVELOPMENT;
      let MW_OPTINFLUENCE = this.state.MW_OPTINFLUENCE;
      let MW_OPTGOALS = this.state.MW_OPTGOALS;
      let MW_OPTTEAM = this.state.MW_OPTTEAM;
      let MW_OPTFRIENDSHIP = this.state.MW_OPTFRIENDSHIP;
      let MW_OPTFEEDBACK = this.state.MW_OPTFEEDBACK;
      let MW_OPTOPPORTUNITIES = this.state.MW_OPTOPPORTUNITIES;
      let MW_OPTRECOMMENDATION = this.state.MW_OPTRECOMMENDATION;
      let MDL_TITLE = this.state.MDL_TITLE;
      let MDL_COMMENT_HEADER = this.state.MDL_COMMENT_HEADER;
      let MDL_SUBMIT_BTN = this.state.MDL_SUBMIT_BTN;
      let MDL_CLOSE_BTN = this.state.MDL_CLOSE_BTN;
      let MDL_OPT_DEFAULT = this.state.MDL_OPT_DEFAULT;
      let MDL_OPTGRP_ONE = this.state.MDL_OPTGRP_ONE;
      let MDL_GRPONE_OPT_ONE = this.state.MDL_GRPONE_OPT_ONE;
      let MDL_GRPONE_OPT_TWO = this.state.MDL_GRPONE_OPT_TWO;
      let MDL_GRPONE_OPT_THREE = this.state.MDL_GRPONE_OPT_THREE;
      let MDL_GRPONE_OPT_FOUR = this.state.MDL_GRPONE_OPT_FOUR;
      let MDL_GRPONE_OPT_FIVE = this.state.MDL_GRPONE_OPT_FIVE;
      let MDL_GRPONE_OPT_SIX = this.state.MDL_GRPONE_OPT_SIX;
      let MDL_GRPONE_OPT_SEVEN = this.state.MDL_GRPONE_OPT_SEVEN;
      let MDL_GRPONE_OPT_EIGHT = this.state.MDL_GRPONE_OPT_EIGHT;
      let MDL_OPTGRP_TWO = this.state.MDL_OPTGRP_TWO;
      let MDL_GRPTWO_OPT_ONE = this.state.MDL_GRPTWO_OPT_ONE;
      let MDL_GRPTWO_OPT_TWO = this.state.MDL_GRPTWO_OPT_TWO;
      let MDL_GRPTWO_OPT_THREE = this.state.MDL_GRPTWO_OPT_THREE;
      let MDL_GRPTWO_OPT_FOUR = this.state.MDL_GRPTWO_OPT_FOUR;
      let MDL_GRPTWO_OPT_FIVE = this.state.MDL_GRPTWO_OPT_FIVE;
      let MDL_GRPTWO_OPT_SIX = this.state.MDL_GRPTWO_OPT_SIX;
      let MDL_GRPTWO_OPT_SEVEN = this.state.MDL_GRPTWO_OPT_SEVEN;
      let MDL_GRPTWO_OPT_EIGHT = this.state.MDL_GRPTWO_OPT_EIGHT;
      let MDL_GRPTWO_OPT_NINE = this.state.MDL_GRPTWO_OPT_NINE;
      let MDL_GRPTWO_OPT_TEN = this.state.MDL_GRPTWO_OPT_TEN;
      let MDL_GRPTWO_OPT_ELEVEN = this.state.MDL_GRPTWO_OPT_ELEVEN;
      let MDL_GRPTWO_OPT_TWELVE = this.state.MDL_GRPTWO_OPT_TWELVE;
      let MDL_GRPTWO_OPT_THIRTEEN = this.state.MDL_GRPTWO_OPT_THIRTEEN;
      let MDL_GRPTWO_OPT_4TEEN = this.state.MDL_GRPTWO_OPT_4TEEN;
      let MDL_GRPTWO_OPT_FIFTEEN = this.state.MDL_GRPTWO_OPT_FIFTEEN;
      let MDL_GRPTWO_OPT_6TEEN = this.state.MDL_GRPTWO_OPT_6TEEN;
      let MDL_GRPTWO_OPT_7TEEN = this.state.MDL_GRPTWO_OPT_7TEEN;
      let MDL_GRPTWO_OPT_8TEEN = this.state.MDL_GRPTWO_OPT_8TEEN;
      let MDL_GRPTWO_OPT_NINTEEN = this.state.MDL_GRPTWO_OPT_NINTEEN;
      let MDL_GRPTWO_OPT_TWENTY = this.state.MDL_GRPTWO_OPT_TWENTY;
      let MDL_OPTGRP_THREE = this.state.MDL_OPTGRP_THREE;
      let MDL_GRPTHREE_OPT_ONE = this.state.MDL_GRPTHREE_OPT_ONE;
      let MDL_GRPTHREE_OPT_TWO = this.state.MDL_GRPTHREE_OPT_TWO;
      let MDL_GRPTHREE_OPT_THREE = this.state.MDL_GRPTHREE_OPT_THREE;
      let MDL_OPTGRP_FOUR = this.state.MDL_OPTGRP_FOUR;
      let MDL_GRPFOUR_OPT_ONE = this.state.MDL_GRPFOUR_OPT_ONE;
      let MDL_GRPFOUR_OPT_TWO = this.state.MDL_GRPFOUR_OPT_TWO;


      return (
      <div className="ui container">
        <h4>Edit - Signup page keys</h4>
        <div className="ui three column stackable grid container ">
            <div className="column">
                <form id="mwuserthemeForm" className="ui form">
                  <input type="hidden" name="_id" value={pagedata._id} />
                  <input type="hidden" name="language" value={pagedata.language} />

                  <div className="field">
                    <label>L_MYMOOD_LINK</label>
                    <input className="form-control"
                             name="L_MYMOOD_LINK"
                             type="text"
                             value={L_MYMOOD_LINK}
                             onChange={this.onChangeMymoodLink} />
                  </div>

                  <div className="field">
                    <label>L_MYACCOUNT_LINK</label>
                    <input className="form-control"
                             name="L_MYACCOUNT_LINK"
                             type="text"
                             value={L_MYACCOUNT_LINK}
                             onChange={this.onChangeMyaccountLink} />
                  </div>

                  <div className="field">
                    <label>L_MYCOMPANY_LINK</label>
                    <input className="form-control"
                             name="L_MYCOMPANY_LINK"
                             type="text"
                             value={L_MYCOMPANY_LINK}
                             onChange={this.onChangeMycompanyLink} />
                  </div>

                  <div className="field">
                    <label>L_CAST_VOTE</label>
                    <input className="form-control"
                             name="L_CAST_VOTE"
                             type="text"
                             value={L_CAST_VOTE}
                             onChange={this.onChangeCastVote} />
                  </div>

                  <div className="field">
                    <label>L_MOODRATE</label>
                    <input className="form-control"
                             name="L_MOODRATE"
                             type="text"
                             value={L_MOODRATE}
                             onChange={this.moodRateLink} />
                  </div>

                  <div className="field">
                    <label>L_INVITEPEOPLE</label>
                    <input className="form-control"
                             name="L_INVITEPEOPLE"
                             type="text"
                             value={L_INVITEPEOPLE}
                             onChange={this.invitePeopleLink} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_PEOPLE_TITLE</label>
                    <input className="form-control"
                             name="L_INVITE_PEOPLE_TITLE"
                             type="text"
                             value={L_INVITE_PEOPLE_TITLE}
                             onChange={this.onChangeInviteTitle} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_PEOPLE_DES</label>
                    <input className="form-control"
                             name="L_INVITE_PEOPLE_DES"
                             type="text"
                             value={L_INVITE_PEOPLE_DES}
                             onChange={this.onChangeInviteDes} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_INPUT_PLCHOLDER</label>
                    <input className="form-control"
                             name="L_INVITE_INPUT_PLCHOLDER"
                             type="text"
                             value={L_INVITE_INPUT_PLCHOLDER}
                             onChange={this.onChangeInputPlcholder} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_BTN</label>
                    <input className="form-control"
                             name="L_INVITE_BTN"
                             type="text"
                             value={L_INVITE_BTN}
                             onChange={this.onChangeInviteBtn} />
                  </div>

                  <div className="field">
                    <label>L_MYPROFILE_LINK</label>
                    <input className="form-control"
                             name="L_MYPROFILE_LINK"
                             type="text"
                             value={L_MYPROFILE_LINK}
                             onChange={this.onChangeMyprofileLink} />
                  </div>

                  <div className="field">
                    <label>L_LOGOUT_LINK</label>
                    <input className="form-control"
                             name="L_LOGOUT_LINK"
                             type="text"
                             value={L_LOGOUT_LINK}
                             onChange={this.onChangeLogoutLink} />
                  </div>

                  <div className="field">
                    <label>TOP_RATE_YOURMOOD</label>
                    <input className="form-control"
                             name="TOP_RATE_YOURMOOD"
                             type="text"
                             value={TOP_RATE_YOURMOOD}
                             onChange={this.onChangeTopRateYourmood} />
                  </div>

                  <div className="field">
                    <label>TOP_RATE_YOUR_MOODDESC</label>
                    <input className="form-control"
                             name="TOP_RATE_YOUR_MOODDESC"
                             type="text"
                             value={TOP_RATE_YOUR_MOODDESC}
                             onChange={this.onChangeTopRateYourmoodDesc} />
                  </div>

                  <div className="field">
                    <label>TOP_RATE_YOUR_MOODBTN</label>
                    <input className="form-control"
                             name="TOP_RATE_YOUR_MOODBTN"
                             type="text"
                             value={TOP_RATE_YOUR_MOODBTN}
                             onChange={this.onChangeTopRateYourmoodBtn} />
                  </div>

                  <div className="field">
                    <label>TOP_RATE_YOUR_MOODANSWER_ALL_BTN</label>
                    <input className="form-control"
                             name="TOP_RATE_YOUR_MOODANSWER_ALL_BTN"
                             type="text"
                             value={TOP_RATE_YOUR_MOODANSWER_ALL_BTN}
                             onChange={this.onChangeTopRateYourmoodAnswerAllBtn} />
                  </div>

                  <div className="field">
                    <label>TOP_RIGHT_SIDE_MY_ACCOUNT_LINK</label>
                    <input className="form-control"
                             name="TOP_RIGHT_SIDE_MY_ACCOUNT_LINK"
                             type="text"
                             value={TOP_RIGHT_SIDE_MY_ACCOUNT_LINK}
                             onChange={this.topRightSideMyAccountLink} />
                  </div>

                  <div className="field">
                    <label>TOP_RIGHT_SIDE_LOGOUT_LINK</label>
                    <input className="form-control"
                             name="TOP_RIGHT_SIDE_LOGOUT_LINK"
                             type="text"
                             value={TOP_RIGHT_SIDE_LOGOUT_LINK}
                             onChange={this.topRightSideLogoutLink} />
                  </div>

                  <div className="field">
                    <label>RIGHT_SIDEBAR_QUICK_STATISTICS</label>
                    <input className="form-control"
                             name="RIGHT_SIDEBAR_QUICK_STATISTICS"
                             type="text"
                             value={RIGHT_SIDEBAR_QUICK_STATISTICS}
                             onChange={this.rightSidebarQuickStatistics} />
                  </div>

                  <div className="field">
                    <label>RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES</label>
                    <input className="form-control"
                             name="RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES"
                             type="text"
                             value={RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES}
                             onChange={this.rightSidebarNumberOfEmployees} />
                  </div>

                  <div className="field">
                    <label>RIGHT_SIDEBAR_EMPLOYEES_AT_RISK</label>
                    <input className="form-control"
                             name="RIGHT_SIDEBAR_EMPLOYEES_AT_RISK"
                             type="text"
                             value={RIGHT_SIDEBAR_EMPLOYEES_AT_RISK}
                             onChange={this.rightSidebarEmployeesAtRisk} />
                  </div>

                  <div className="field">
                    <label>RIGHT_SIDEBAR_NO_OF_RESPONSES</label>
                    <input className="form-control"
                             name="RIGHT_SIDEBAR_NO_OF_RESPONSES"
                             type="text"
                             value={RIGHT_SIDEBAR_NO_OF_RESPONSES}
                             onChange={this.rightSidebarNoOfResponses} />
                  </div>

                  <div className="field">
                    <label>RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE</label>
                    <input className="form-control"
                             name="RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE"
                             type="text"
                             value={RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE}
                             onChange={this.rightSidebarTimeSinceLastResponse} />
                  </div>

                  <div className="field">
                    <label>RIGHT_SIDEBAR_RESPONSE_COMPARISON</label>
                    <input className="form-control"
                             name="RIGHT_SIDEBAR_RESPONSE_COMPARISON"
                             type="text"
                             value={RIGHT_SIDEBAR_RESPONSE_COMPARISON}
                             onChange={this.rightSidebarResponseComparison} />
                  </div>

                  <div className="field">
                    <label>MW_OPTMOOD</label>
                    <input className="form-control"
                             name="MW_OPTMOOD"
                             type="text"
                             value={MW_OPTMOOD}
                             onChange={this.mwOptMood} />
                  </div>

                  <div className="field">
                    <label>MW_OPTMEANING</label>
                    <input className="form-control"
                             name="MW_OPTMEANING"
                             type="text"
                             value={MW_OPTMEANING}
                             onChange={this.mwOptMeaning} />
                  </div>

                  <div className="field">
                    <label>MW_OPTEXPECTATIONS</label>
                    <input className="form-control"
                             name="MW_OPTEXPECTATIONS"
                             type="text"
                             value={MW_OPTEXPECTATIONS}
                             onChange={this.mwOptExpectations} />
                  </div>

                  <div className="field">
                    <label>MW_OPTSTRENGTHS</label>
                    <input className="form-control"
                             name="MW_OPTSTRENGTHS"
                             type="text"
                             value={MW_OPTSTRENGTHS}
                             onChange={this.mwOptStrengths} />
                  </div>

                  <div className="field">
                    <label>MW_OPTRECOGNITION</label>
                    <input className="form-control"
                             name="MW_OPTRECOGNITION"
                             type="text"
                             value={MW_OPTRECOGNITION}
                             onChange={this.mwOptRecognition} />
                  </div>

                  <div className="field">
                    <label>MW_OPTDEVELOPMENT</label>
                    <input className="form-control"
                             name="MW_OPTDEVELOPMENT"
                             type="text"
                             value={MW_OPTDEVELOPMENT}
                             onChange={this.mwOptDevelopment} />
                  </div>

                  <div className="field">
                    <label>MW_OPTINFLUENCE</label>
                    <input className="form-control"
                             name="MW_OPTINFLUENCE"
                             type="text"
                             value={MW_OPTINFLUENCE}
                             onChange={this.mwOptInfluence} />
                  </div>

                  <div className="field">
                    <label>MW_OPTGOALS</label>
                    <input className="form-control"
                             name="MW_OPTGOALS"
                             type="text"
                             value={MW_OPTGOALS}
                             onChange={this.mwOptGoals} />
                  </div>

                  <div className="field">
                    <label>MW_OPTTEAM</label>
                    <input className="form-control"
                             name="MW_OPTTEAM"
                             type="text"
                             value={MW_OPTTEAM}
                             onChange={this.mwOptTeam} />
                  </div>

                  <div className="field">
                    <label>MW_OPTFRIENDSHIP</label>
                    <input className="form-control"
                             name="MW_OPTFRIENDSHIP"
                             type="text"
                             value={MW_OPTFRIENDSHIP}
                             onChange={this.mwOptFriendship} />
                  </div>

                  <div className="field">
                    <label>MW_OPTFEEDBACK</label>
                    <input className="form-control"
                             name="MW_OPTFEEDBACK"
                             type="text"
                             value={MW_OPTFEEDBACK}
                             onChange={this.mwOptFeedback} />
                  </div>

                  <div className="field">
                    <label>MW_OPTOPPORTUNITIES</label>
                    <input className="form-control"
                             name="MW_OPTOPPORTUNITIES"
                             type="text"
                             value={MW_OPTOPPORTUNITIES}
                             onChange={this.mwOptOpportunities} />
                  </div>

                  <div className="field">
                    <label>MW_OPTRECOMMENDATION</label>
                    <input className="form-control"
                             name="MW_OPTRECOMMENDATION"
                             type="text"
                             value={MW_OPTRECOMMENDATION}
                             onChange={this.mwOptRecommendation} />
                  </div>
                  <div className="field">
                    <label>MDL_TITLE</label>
                    <input className="form-control"
                             name="MDL_TITLE"
                             type="text"
                             value={MDL_TITLE}
                             onChange={this.mdlTitle} />
                  </div>
                  <div className="field">
                    <label>MDL_COMMENT_HEADER</label>
                    <input className="form-control"
                             name="MDL_COMMENT_HEADER"
                             type="text"
                             value={MDL_COMMENT_HEADER}
                             onChange={this.mdlCommentHeader} />
                  </div>
                  <div className="field">
                    <label>MDL_SUBMIT_BTN</label>
                    <input className="form-control"
                             name="MDL_SUBMIT_BTN"
                             type="text"
                             value={MDL_SUBMIT_BTN}
                             onChange={this.mdlSubmitBtn} />
                  </div>
                  <div className="field">
                    <label>MDL_CLOSE_BTN</label>
                    <input className="form-control"
                             name="MDL_CLOSE_BTN"
                             type="text"
                             value={MDL_CLOSE_BTN}
                             onChange={this.mdlCloseBtn} />
                  </div>
                  <div className="field">
                    <label>MDL_OPT_DEFAULT</label>
                    <input className="form-control"
                             name="MDL_OPT_DEFAULT"
                             type="text"
                             value={MDL_OPT_DEFAULT}
                             onChange={this.mdlOptDefault} />
                  </div>
                  <div className="field">
                    <label>MDL_OPTGRP_ONE</label>
                    <input className="form-control"
                             name="MDL_OPTGRP_ONE"
                             type="text"
                             value={MDL_OPTGRP_ONE}
                             onChange={this.mdlOptGrpOne} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_ONE</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_ONE"
                             type="text"
                             value={MDL_GRPONE_OPT_ONE}
                             onChange={this.mdlGrpOneOptOne} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_TWO</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_TWO"
                             type="text"
                             value={MDL_GRPONE_OPT_TWO}
                             onChange={this.mdlGrpOneOptTwo} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_THREE</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_THREE"
                             type="text"
                             value={MDL_GRPONE_OPT_THREE}
                             onChange={this.mdlGrpOneOptThree} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_FOUR</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_FOUR"
                             type="text"
                             value={MDL_GRPONE_OPT_FOUR}
                             onChange={this.mdlGrpOneOptFour} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_FIVE</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_FIVE"
                             type="text"
                             value={MDL_GRPONE_OPT_FIVE}
                             onChange={this.mdlGrpOneOptFive} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_SIX</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_SIX"
                             type="text"
                             value={MDL_GRPONE_OPT_SIX}
                             onChange={this.mdlGrpOneOptSix} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_SEVEN</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_SEVEN"
                             type="text"
                             value={MDL_GRPONE_OPT_SEVEN}
                             onChange={this.mdlGrpOneOptSeven} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPONE_OPT_EIGHT</label>
                    <input className="form-control"
                             name="MDL_GRPONE_OPT_EIGHT"
                             type="text"
                             value={MDL_GRPONE_OPT_EIGHT}
                             onChange={this.mdlGrpOneOptEight} />
                  </div>
                  <div className="field">
                    <label>MDL_OPTGRP_TWO</label>
                    <input className="form-control"
                             name="MDL_OPTGRP_TWO"
                             type="text"
                             value={MDL_OPTGRP_TWO}
                             onChange={this.mdlOptGrpTwo} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_ONE</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_ONE"
                             type="text"
                             value={MDL_GRPTWO_OPT_ONE}
                             onChange={this.mdlGrpTwoOptOne} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_TWO</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_TWO"
                             type="text"
                             value={MDL_GRPTWO_OPT_TWO}
                             onChange={this.mdlGrpTwoOptTwo} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_THREE</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_THREE"
                             type="text"
                             value={MDL_GRPTWO_OPT_THREE}
                             onChange={this.mdlGrpTwoOptThree} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_FOUR</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_FOUR"
                             type="text"
                             value={MDL_GRPTWO_OPT_FOUR}
                             onChange={this.mdlGrpTwoOptFour} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_FIVE</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_FIVE"
                             type="text"
                             value={MDL_GRPTWO_OPT_FIVE}
                             onChange={this.mdlGrpTwoOptFive} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_SIX</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_SIX"
                             type="text"
                             value={MDL_GRPTWO_OPT_SIX}
                             onChange={this.mdlGrpTwoOptSix} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_SEVEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_SEVEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_SEVEN}
                             onChange={this.mdlGrpTwoOptSeven} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_EIGHT</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_EIGHT"
                             type="text"
                             value={MDL_GRPTWO_OPT_EIGHT}
                             onChange={this.mdlGrpTwoOptEight} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_NINE</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_NINE"
                             type="text"
                             value={MDL_GRPTWO_OPT_NINE}
                             onChange={this.mdlGrpTwoOptNine} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_TEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_TEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_TEN}
                             onChange={this.mdlGrpTwoOptTen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_ELEVEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_ELEVEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_ELEVEN}
                             onChange={this.mdlGrpTwoOptEleven} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_TWELVE</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_TWELVE"
                             type="text"
                             value={MDL_GRPTWO_OPT_TWELVE}
                             onChange={this.mdlGrpTwoOptTwelve} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_THIRTEEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_THIRTEEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_THIRTEEN}
                             onChange={this.mdlGrpTwoOptThirteen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_4TEEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_4TEEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_4TEEN}
                             onChange={this.mdlGrpTwoOpt4teen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_FIFTEEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_FIFTEEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_FIFTEEN}
                             onChange={this.mdlGrpTwoOptFifteen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_6TEEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_6TEEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_6TEEN}
                             onChange={this.mdlGrpTwoOpt6teen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_7TEEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_7TEEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_7TEEN}
                             onChange={this.mdlGrpTwoOpt7teen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_8TEEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_8TEEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_8TEEN}
                             onChange={this.mdlGrpTwoOpt8teen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_NINTEEN</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_NINTEEN"
                             type="text"
                             value={MDL_GRPTWO_OPT_NINTEEN}
                             onChange={this.mdlGrpTwoOptNineteen} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTWO_OPT_TWENTY</label>
                    <input className="form-control"
                             name="MDL_GRPTWO_OPT_TWENTY"
                             type="text"
                             value={MDL_GRPTWO_OPT_TWENTY}
                             onChange={this.mdlGrpTwoOptTwenty} />
                  </div>
                  <div className="field">
                    <label>MDL_OPTGRP_THREE</label>
                    <input className="form-control"
                             name="MDL_OPTGRP_THREE"
                             type="text"
                             value={MDL_OPTGRP_THREE}
                             onChange={this.mdlOptGrpThree} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTHREE_OPT_ONE</label>
                    <input className="form-control"
                             name="MDL_GRPTHREE_OPT_ONE"
                             type="text"
                             value={MDL_GRPTHREE_OPT_ONE}
                             onChange={this.mdlGrpThreeOptOne} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTHREE_OPT_TWO</label>
                    <input className="form-control"
                             name="MDL_GRPTHREE_OPT_TWO"
                             type="text"
                             value={MDL_GRPTHREE_OPT_TWO}
                             onChange={this.mdlGrpThreeOptTwo} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPTHREE_OPT_THREE</label>
                    <input className="form-control"
                             name="MDL_GRPTHREE_OPT_THREE"
                             type="text"
                             value={MDL_GRPTHREE_OPT_THREE}
                             onChange={this.mdlGrpThreeOptThree} />
                  </div>
                  <div className="field">
                    <label>MDL_OPTGRP_FOUR</label>
                    <input className="form-control"
                             name="MDL_OPTGRP_FOUR"
                             type="text"
                             value={MDL_OPTGRP_FOUR}
                             onChange={this.mdlOptGrpFour} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPFOUR_OPT_ONE</label>
                    <input className="form-control"
                             name="MDL_GRPFOUR_OPT_ONE"
                             type="text"
                             value={MDL_GRPFOUR_OPT_ONE}
                             onChange={this.mdlGrpFourOptOne} />
                  </div>
                  <div className="field">
                    <label>MDL_GRPFOUR_OPT_TWO</label>
                    <input className="form-control"
                             name="MDL_GRPFOUR_OPT_TWO"
                             type="text"
                             value={MDL_GRPFOUR_OPT_TWO}
                             onChange={this.mdlGrpFourOptTwo} />
                  </div>

                  <div className="field">
                      <button className="ui blue button" onClick={this.onSubmitSignup}>Submit</button>
                  </div>
                </form>
            </div>
            <div className="column"></div>
            <div className="column"></div>
        </div>
      </div>
    );
  }

}


