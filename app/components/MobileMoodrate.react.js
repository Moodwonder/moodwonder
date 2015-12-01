import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import NavSlider from 'components/NavSlider.react';
import SurveyStore from 'stores/SurveyStore';
import getFormData from 'get-form-data';

export default class MobileMoodrate extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          mpopup: false,
          questions: [],
          lastmood: []
      };
      this.engagementmoods = [];
  }

  componentDidMount () {
      SurveyActions.getEngagementSurvey();
      SurveyActions.getEngagementResults();
      SurveyStore.listen(this._onMoodrateChange);
  }

  componentWillUnmount () {
      SurveyStore.unlisten(this._onMoodrateChange);
  }

  _onMoodrateChange = () => {
      this.setState({
          lastmood: SurveyStore.getState().lastmood,
          questions : SurveyStore.getState().questions
      });
      this.engagementmoods = this.state.questions.map((data, key) => {
          return data.mood;
      });
  }

  _onBtnClick = () => {
      window.location.assign('/survey');
  }

  onPopupClose = () => {
      this.setState({ mpopup : false });
  }

  _onSubmitClick = () => {
      this.setState({ mpopup : true });
  }

  onMoodSubmit = (e) => {
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
          mood.mood = data;
          return mood;
      });

      moodrow.surveyresult = surveyResult;
      this.setState({ mpopup : false });
      SurveyActions.saveEngagementSurvey(moodrow);
      //console.log('surveyResult');
      //console.log(JSON.stringify(surveyResult));
  }


  render () {
      let lastMood = (this.state.lastmood) ? this.state.lastmood : null;
      let lastRated = '';
      if(lastMood !== null) {
          lastRated = lastMood.rating;
      }
      let modal;
      if(this.state.mpopup){
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
                                <button type="button" onClick={this.onMoodSubmit} className="ui submit button cancel" >Submit</button>
                                <button type="button" onClick={this.onPopupClose} className="ui submit button submitt" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         );
      }

      return (
            <div className="ui segment padding-none width-header rate header-middle-container">
                <div className="">
                    <h2>RATE YOUR MOOD</h2>
                    <p>How are you feeling at work today?</p>
                </div>
                <div className="ui slider range ">
                    <form id="moodRating">
                        <NavSlider lastrated={lastRated} />
                    </form>
                </div>
                <div  className="">
                    <button className="ui yellow button" style={{"margin": "0 auto !important"}} onClick={this._onSubmitClick}>Submit</button>
                </div>
                <div  className="">
                    <button onClick={this._onBtnClick} className="ui yellow button answer positive" style={{"margin": "0 auto !important", "marginTop" : "12px !important"}}>Answer all statements</button>
                </div>
                {modal}
            </div>
      );
  }

}


