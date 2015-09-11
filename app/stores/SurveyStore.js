import SurveyActions from 'actions/SurveyActions';
import alt from 'altInstance';
import SurveyWebAPIUtils from 'utils/SurveyWebAPIUtils';

class SurveyStore {

  constructor () {

      this.questions = {};
      this.hasQuestions = false;
      this.hasError = false;
      this.message = '';
      this.savedstatus = false;
      this.lastsurvey = [];

      this.bindListeners({
      handleSurveys: SurveyActions.GETQUESTIONS,
      handleSaveSurveys: SurveyActions.SAVESURVEYSUCCESS,
      handleLastSurvey: SurveyActions.LASTSURVEYSUCCESS
    });
  }

  handleSurveys (data) {
      this.questions = data;
      this.hasQuestions = true;
      this.emitChange();
  }

  handleSaveSurveys (response) {
      // this.message = response.message;
      // this.hasError = !response.status;
      this.savedstatus = true;
      if(response.status) {
          SurveyWebAPIUtils.getLastSurvey()
          .then((response, textStatus) => {
              if (textStatus === 'success') {
                  this.lastsurvey = [];
                  this.lastsurvey = response.data;
                  this.emitChange();
              }
          }, () => {
          // Dispatch another event for a bad request
          });
      }
  }

  handleLastSurvey (response) {
      this.lastsurvey = [];
      this.lastsurvey = response.data;
      this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(SurveyStore, 'SurveyStore');
