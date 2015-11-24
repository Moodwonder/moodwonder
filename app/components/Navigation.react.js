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
      console.log('logout');
  }

  onSubmitMood = (e) => {
      e.preventDefault();
      let form = document.querySelector('#moodRating');
      let data = getFormData(form, {trim: true});

      let commentForm = document.querySelector('#commentForm');
      let commentData = getFormData(commentForm, {trim: true});

      let moodrate = data['moodrate'];
      let surveyResult = [];

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

      this.setState({ popup : false });
      //console.log('surveyResult');
      //console.log(JSON.stringify(surveyResult));
      SurveyActions.saveEngagementSurvey(surveyResult);
      //SurveyActions.getEngagementSurvey();
      //SurveyActions.getEngagementResults();
      //SurveyActions.getResultsByCompany();
      //SurveyActions.getResultsByIndustry();
      //SurveyActions.getResultsByCountry();
      //SurveyActions.getMostEngagingManagers();
      window.setTimeout(() => {
          window.location.reload();
      });
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
      let lang = this.state.lang;
      let lastMood = (this.state.lastmood) ? this.state.lastmood : null;
      let loginOrOut;
      let ratingSection = '';

      let modal;
      if(this.state.popup){
          modal = (
            <div className="ui dimmer modals page transition visible active">
                <div className="ui active modal">
                    <i className="close icon" onClick={this.onPopupClose} data-dismiss="modal"></i>
                    <div className="header">What has changed?</div>
                    <form id="commentForm">
                        <div className="ui segment">
                            <div className="ui small form">
                                <div className="field">
                                    <select name="comment_title">
                                        <option value="">What happened...?</option>
                                        <optgroup label="Company, Strategy &amp; Values">
                                            <option value="63">Company event organized</option>
                                            <option value="64">New executive level manager started</option>
                                            <option value="65">Top executive left the company</option>
                                            <option value="66">Strategy changed</option>
                                            <option value="67">Strategy is not followed</option>
                                            <option value="68">Strategy is failing</option>
                                            <option value="69">Do not believe in our strategy</option>
                                            <option value="70">Values are not in use</option>
                                        </optgroup>
                                        <optgroup label="Daily work &amp; Tasks">
                                            <option value="38">Got recognition</option>
                                            <option value="39">Got promotion</option>
                                            <option value="40">Got raise</option>
                                            <option value="41">Feedback received</option>
                                            <option value="42">Targets achieved</option>
                                            <option value="43">Project success</option>
                                            <option value="44">Good project progress</option>
                                            <option value="45">Achieved a lot today</option>
                                            <option value="46">New tasks received</option>
                                            <option value="47">New targets agreed</option>
                                            <option value="48">Changes in job description</option>
                                            <option value="49">Changes in job title</option>
                                            <option value="50">Work related trip</option>
                                            <option value="51">Conference trip</option>
                                            <option value="52">Training confirmed</option>
                                            <option value="53">Training attended</option>
                                            <option value="54">Voluntary work done</option>
                                            <option value="55">Made a mistake at work</option>
                                            <option value="56">I am sick</option>
                                            <option value="57">My child is sick</option>
                                        </optgroup>
                                        <optgroup label="My colleagues and team">
                                            <option value="60">New colleague joined team</option>
                                            <option value="61">Team event organized</option>
                                            <option value="62">Colleague is leaving the company</option>
                                        </optgroup>
                                        <optgroup label="My manager">
                                            <option value="58">New boss</option>
                                            <option value="59">Discussion with boss</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="field">
                                    <label> Comment</label>
                                    <textarea rows="5" name="comment" ref="comment"></textarea>
                                </div>
                                <button type="button" onClick={this.onSubmitMood} className="ui submit button cancel" >Submit</button>
                                <button type="button" onClick={this.onPopupClose} className="ui submit button submitt" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         );
      }

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
                      <button className="ui yellow button" id="test" onClick={this.onPopupShow}>Submit</button>
                  </div>
                  <div  className="header-middle-container">
                      <a href="/survey" className="ui positive button answer">Answer all statements</a>
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
