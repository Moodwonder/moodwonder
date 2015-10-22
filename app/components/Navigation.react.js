import React from 'react';
// import { Link } from 'react-router';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Cookie from 'utils/Cookie';
//import LanguageContants from 'constants/LanguageConstants';
import NavSlider from 'components/NavSlider.react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import getFormData from 'get-form-data';
//import $ from 'jquery';

export default class Navigation extends React.Component {

  constructor (props) {
      super(props);
      this.state = UserStore.getState();
      this.state.lang = '';
      this.state.lastmood = [];
      this.state.popup = false;
      this.state.questions = [];

      this.engagementmoods = [];
  }

  componentDidMount () {
      UserStore.listen(this._onChange);
      SurveyStore.listen(this._onMoodChange);
      let lang = Cookie.getCookie('lang');
      this.setState({lang: lang});

  }

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
      SurveyStore.unlisten(this._onMoodChange);
  }

  onSelectLanguage = (e) => {
      //e.preventDefault();
      Cookie.setCookie('lang', e.target.value, 30);
      this.setState({lang: e.target.value});
      location.reload(true);
  }

  _onMoodChange = () => {
      this.setState({
        lastmood: SurveyStore.getState().lastmood,
        questions : SurveyStore.getState().questions
      });

      this.engagementmoods = this.state.questions.map((data, key) => {
          return data.mood;
      });
  }

  _onChange = () => {
      this.setState({
        user: UserStore.getState().user
      });
  }

  _onLogout = () => {
      UserActions.logout();
      console.log('logout');
  }

  onSubmitMood = (e) => {
      e.preventDefault();
      let form = document.querySelector('#moodRating');
      let data = getFormData(form, {trim: true});

      //let commentForm = document.querySelector('#commentForm');
      //let commentData = getFormData(commentForm, {trim: true});

      let moodrate = data['moodrate'];
      let surveyResult = [];

      surveyResult = this.engagementmoods.map((data, key) => {
          let mood = mood || {};
          mood.rating = moodrate;
          //mood.comment_title = commentData['comment_title'];
          //mood.comment = commentData['comment'];
          mood.comment_title = 'comment_title';
          mood.comment = 'comment';
          mood.mood = data;
          return mood;
      });

      //SurveyActions.saveEngagementSurvey(surveyResult);
      this.setState({ popup : false });
      //SurveyActions.getEngagementResults();
      if (window.confirm('Are you sure you want to save?')) {
          //console.log('surveyResult');
          //console.log(JSON.stringify(surveyResult));
          SurveyActions.saveEngagementSurvey(surveyResult);
          SurveyActions.getEngagementSurvey();
          SurveyActions.getEngagementResults();
          SurveyActions.getResultsByCompany();
          SurveyActions.getResultsByIndustry();
          SurveyActions.getResultsByCountry();
          SurveyActions.getMostEngagingManagers();
      }
  }

  onPopupClose = (e) => {
      e.preventDefault();
      this.setState({ popup : false });
  }

  onPopupShow = (e) => {
      e.preventDefault();
      this.setState({ popup : true });
  }


  render () {
      //let lang = this.state.lang;
      let lastMood = (this.state.lastmood) ? this.state.lastmood : null;
      //let popup = this.state.popup;
      let loginOrOut;
      let ratingSection = '';

      if (this.state.user.get('authenticated')) {
          loginOrOut = [
                <a href="/myprofile" className="item">My Account</a>,
                <a href="/logout" style={{"color":"black"}} onClick={this._onLogout} className="item">Logout</a>
          ];

          ratingSection = [
              <div className="ui segment padding-none width-header ">
                  <div className="header-middle-container ">
                      <h2>RATE YOUR MOOD</h2>
                      <p>How are you feeling at work today?</p>
                  </div>
                  <div className="ui slider range  header-middle-container ">
                        <form id="moodRating">
                            <NavSlider lastrated={lastRated} />
                        </form>
                    </div>
                  <div  className="header-middle-container">
                      <button className="ui yellow button" id="test" onClick={this.onSubmitMood}>Submit</button>
                  </div>
                  <div  className="header-middle-container">
                      <button className="ui positive button answer">Answer all statements</button>
                  </div>
              </div>
        ];

      } else {
          loginOrOut = [
              <a href="/login" className="item">NAV_LOGIN</a>,
              <a href="/signup" className="item">NAV_SIGNUP</a>
          ];
      }

      let lastRated = '';
      if(lastMood !== null) {
          lastRated = lastMood.rating;
      }


      return (
            <div className="ui large top fixed hidden menu">
                <div className="ui large secondary inverted pointing menu">
                    <a className="toc item">
                        <i className="sidebar icon"></i>
                    </a>
                    <div  className="header item">
                        <img className="logo" src="/images/logo.png" alt=""/>
                        <img className="logo-mw slide-logo" src="/images/logo-mw.png" alt=""/>
                    </div>

                    {ratingSection}

                    <div className="right item">
                        <div className="ui dropdown floating icon">
                            <i className="angle down icon" style={{"float":"right","marginRight":"20"}}></i>
                            <span className="text">Language</span>
                            <div className="menu">
                                <div className="item">EN</div>
                                <div className="item">FI</div>
                            </div>
                        </div>
                        <div className="ui compact menu">
                            <div className="ui floating dropdown item">
                                <i className="ellipsis vertical icon"></i>
                                <div className="menu">
                                    { loginOrOut }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      );
  }

}

Navigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
