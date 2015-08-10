import SurveyActions from 'actions/SurveyActions';
import alt from 'altInstance';

class SurveyStore {

  constructor () {

      this.questions = {};
      this.hasQuestions = false;
      this.message = '';

      this.bindListeners({
      handleSurveys: SurveyActions.GETQUESTIONS
    });
  }

  handleSurveys (data) {
      console.log('handleSurveys(data)');
      console.log(data);
      this.questions = data;
      this.hasQuestions = true;
      this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(SurveyStore, 'SurveyStore');
