import React from 'react';
// import { Link } from 'react-router';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Cookie from 'utils/Cookie';
import LanguageContants from 'constants/LanguageConstants';
import NavSlider from 'components/NavSlider.react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import getFormData from 'get-form-data';
//import $ from 'jquery';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';
import ModalSelect from 'components/ModalSelect.react';

export default class Navigation extends React.Component {

  constructor (props) {
      super(props);
      this.state = UserStore.getState();
      this.state.lang = '';
      this.state.lastmood = [];
      this.state.popup = false;
      this.state.questions = [];
      this.state.mwkeys = MlangStore.getState().mwkeys;
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

  onClickLanguage = (lang) => {
      Cookie.setCookie('lang', lang, 30);
      this.setState({lang: lang});
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
  }

  onSubmitMood = (e) => {
      e.preventDefault();
      let form = document.querySelector('#moodRating');
      let data = getFormData(form, {trim: true});

      let commentForm = document.querySelector('#commentForm');
      let commentData = getFormData(commentForm, {trim: true});

      let moodrate = data['moodrate'];
      let surveyResult = [];

      let moodrow = moodrow || {};
      moodrow.type = 'moodrate';
      surveyResult = this.engagementmoods.map((data, key) => {
          let mood = mood || {};
          mood.rating = moodrate;
          mood.comment_title = commentData['comment_title'];
          mood.comment = commentData['comment'];
          //mood.comment_title = 'comment_title';
          //mood.comment = 'comment';
          mood.mood = data;
          return mood;
      });
      if (commentData['comment_title'] != '') {
          moodrow.surveyresult = surveyResult;
          SurveyActions.saveEngagementSurvey(moodrow);
          this.setState({ popup : false });
          //console.log(JSON.stringify(moodrow));
          window.setTimeout(() => {
              window.location.reload();
          });
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

  redirectToHome = () => {
      if (this.state.user.get('authenticated')) {
          window.location.assign('/mymood');
      } else {
          window.location.assign('/');
      }
  }


  render () {
      let lang = this.state.lang;
      let lastMood = (this.state.lastmood) ? this.state.lastmood : null;
      let loginOrOut;
      let ratingSection = '';
      let mlarray = this.state.mwkeys;

      let modal;
      if(this.state.popup){
          modal = (
            <div className="ui dimmer modals page transition visible active">
                <div className="ui active modal">
                    <i className="close icon" onClick={this.onPopupClose} data-dismiss="modal"></i>
                    <div className="header">{GetText('MDL_TITLE', mlarray)}</div>
                    <form id="commentForm">
                        <div className="ui segment">
                            <div className="ui small form">
                                <div className="field">
                                    <ModalSelect />
                                </div>
                                <div className="field">
                                    <label>{GetText('MDL_COMMENT_HEADER', mlarray)}</label>
                                    <textarea rows="5" name="comment" ref="comment"></textarea>
                                </div>
                                <button type="button" onClick={this.onPopupClose} className="ui submit button cancel" data-dismiss="modal">{GetText('MDL_CLOSE_BTN', mlarray)}</button>
                                <button type="button" onClick={this.onSubmitMood} className="ui submit button submitt" >{GetText('MDL_SUBMIT_BTN', mlarray)}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         );
      }

      let lastRated = '';
      if(lastMood !== null) {
          lastRated = lastMood.rating;
      }

      if (this.state.user.get('authenticated')) {
          loginOrOut = [
                <a href="/myprofile" className="item">{GetText('TOP_RIGHT_SIDE_MY_ACCOUNT_LINK', mlarray)}</a>,
                <a href="/logout" style={{"color":"black"}} onClick={this._onLogout} className="item">{GetText('TOP_RIGHT_SIDE_LOGOUT_LINK', mlarray)}</a>
          ];

          ratingSection = [
              <div className="ui segment padding-none width-header ">
                  <div className="header-middle-container ">
                      <h2>{GetText('TOP_RATE_YOURMOOD', mlarray)}</h2>
                      <p>{GetText('TOP_RATE_YOUR_MOODDESC', mlarray)}</p>
                  </div>
                  <div className="ui slider range  header-middle-container header-slider">
                      <form id="moodRating" className="nav-mood-rating">
                          <NavSlider lastrated={lastRated} />
                      </form>
                  </div>
                  <div  className="header-middle-container">
                      <button className="ui yellow button" id="test" onClick={this.onPopupShow}>{GetText('TOP_RATE_YOUR_MOODBTN', mlarray)}</button>
                  </div>
                  <div  className="header-middle-container">
                      <a href="/survey" className="ui positive button answer">{GetText('TOP_RATE_YOUR_MOODANSWER_ALL_BTN', mlarray)}</a>
                  </div>
              </div>
        ];

      } else {
          loginOrOut = [
              <a href="/login" className="item">NAV_LOGIN</a>,
              <a href="/signup" className="item">NAV_SIGNUP</a>
          ];
      }


      return (
            <div className="ui large top fixed hidden menu">
                <div className="ui large secondary inverted pointing menu">
                    <a className="toc item">
                        <i className="sidebar icon"></i>
                    </a>
                    <div  className="header item">
                        <img onClick={this.redirectToHome} style={{"cursor":"pointer"}} className="logo" src="/images/logo.png" alt=""/>
                        <img onClick={this.redirectToHome} style={{"cursor":"pointer"}} className="logo-mw slide-logo" src="/images/logo-mw.png" alt=""/>
                    </div>
                    {ratingSection}
                    {modal}
                    <div className="right item">
                        <div className="ui dropdown floating icon">
                            <i className="angle down icon" style={{"float":"right","marginRight":"20"}}></i>
                            <span className="text">{lang}</span>
                            <div className="menu">
                                <div onClick={this.onClickLanguage.bind(null, LanguageContants.EN)} className="item">EN</div>
                                <div onClick={this.onClickLanguage.bind(null, LanguageContants.FI)} className="item">FI</div>
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
