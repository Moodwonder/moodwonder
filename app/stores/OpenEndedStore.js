import OpenEndedActions from 'actions/OpenEndedActions';
import alt from 'altInstance';


class OpenEndedStore {

  constructor () {
      this.questions = [];
      this.savesurveyflag = false;

      this.bindListeners({
          handleQuestions: OpenEndedActions.GETQUESTIONS,
          handleSaveAnswers: OpenEndedActions.SAVEANSWERS
      });
  }

  handleQuestions (response) {
      this.questions = [];
      this.questions = response;
      this.emitChange();
  }

  handleSaveAnswers (response) {
      this.savesurveyflag = true;
      this.emitChange();
  }




}

// Export our newly created Store
export default alt.createStore(OpenEndedStore, 'OpenEndedStore');
