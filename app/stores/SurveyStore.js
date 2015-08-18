import SurveyActions from 'actions/SurveyActions';
import alt from 'altInstance';

class SurveyStore {

  constructor () {

      this.questions = {};
      this.hasQuestions = false;
      this.hasError = false;
      this.message = '';

      this.bindListeners({
      handleSurveys: SurveyActions.GETQUESTIONS,
      handleSaveSurveys: SurveyActions.SAVESURVEYSUCCESS
    });
  }

  handleSurveys (data) {
      console.log('handleSurveys(data)');
      console.log(data);
      this.questions = data;
      this.hasQuestions = true;
      this.emitChange();
  }

  handleSaveSurveys (response) {
      this.message = response.message;
      this.hasError = !response.status;
      this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(SurveyStore, 'SurveyStore');
