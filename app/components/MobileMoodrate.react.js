import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import NavSlider from 'components/NavSlider.react';
import SurveyStore from 'stores/SurveyStore';
import getFormData from 'get-form-data';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';
import ModalSelect from 'components/ModalSelect.react';

export default class MobileMoodrate extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          mpopup: false,
          questions: [],
          lastmood: [],
          multilang: MlangStore.getState().multilang,
          mwkeys: MlangStore.getState().mwkeys
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

      if (commentData['comment_title'] != '') {
          moodrow.surveyresult = surveyResult;
          this.setState({ mpopup : false });
          SurveyActions.saveEngagementSurvey(moodrow);
          //console.log(JSON.stringify(surveyResult));
      }
  }


  render () {
      let lastMood = (this.state.lastmood) ? this.state.lastmood : null;
      let mlarray = this.state.multilang;
      let mwkeys = this.state.mwkeys;
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
                    <div className="header">{GetText('MDL_TITLE', mwkeys)}</div>
                    <form id="commentForm">
                        <div className="ui segment">
                            <div className="ui small form">
                                <div className="field">
                                    <ModalSelect />
                                </div>
                                <div className="field">
                                    <label>{GetText('MDL_COMMENT_HEADER', mwkeys)}</label>
                                    <textarea rows="5" name="comment" ref="comment"></textarea>
                                </div>
                                <button type="button" onClick={this.onPopupClose} className="ui submit button cancel" data-dismiss="modal">{GetText('MDL_CLOSE_BTN', mwkeys)}</button>
                                <button type="button" onClick={this.onMoodSubmit} className="ui submit button submitt" >{GetText('MDL_SUBMIT_BTN', mwkeys)}</button>
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
                    <h2>{GetText('MDR_RATEMOOD', mlarray)}</h2>
                    <p>{GetText('MDR_MOODDESC', mlarray)}</p>
                </div>
                <div className="ui slider range">
                    <form id="moodRating">
                        <NavSlider lastrated={lastRated} />
                    </form>
                </div>
                <div  className="">
                    <button className="ui yellow button" style={{"margin": "0 auto !important"}} onClick={this._onSubmitClick}>{GetText('MDR_MOODBTN', mlarray)}</button>
                </div>
                <div  className="">
                    <button onClick={this._onBtnClick} className="ui yellow button answer positive" style={{"margin": "0 auto !important", "marginTop" : "12px !important"}}>{GetText('MDR_MOODANSWER_ALL_BTN', mlarray)}</button>
                </div>
                {modal}
            </div>
      );
  }

}


