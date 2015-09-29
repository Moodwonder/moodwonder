import alt from 'altInstance';
import OpenEndedWebAPIUtils from 'utils/OpenEndedWebAPIUtils';

class OpenEndedActions {

  getQuestions() {
      this.dispatch();
      OpenEndedWebAPIUtils.getQuestions()
      .then((response, textStatus) => {
          if (response.status === true) {
              this.actions.getquestions(response.questions);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  getquestions(data)
  {
      this.dispatch(data);
  }

  saveAnswers(data) {
      this.dispatch();
      OpenEndedWebAPIUtils.saveAnswers(data)
      .then((response, textStatus) => {
          if (response.status === true) {
              this.actions.saveanswers(true);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  saveanswers(data)
  {
      this.dispatch(data);
  }


}

export default alt.createActions(OpenEndedActions);
