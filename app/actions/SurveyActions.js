import alt from 'altInstance';
import SurveyWebAPIUtils from 'utils/SurveyWebAPIUtils';

class SurveyActions {

  getallquestions() {
    this.dispatch();
    SurveyWebAPIUtils.getEngagementSurvey()
      .then((response) => {
        if (response) {
          this.actions.getquestions(response);
        }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  getquestions(data)
  {
     this.dispatch(data);
  }

  saveEngagementSurvey(surveyResult) {
    this.dispatch();
    SurveyWebAPIUtils.saveEngagementSurveyResult(surveyResult)
      .then((response) => {
        if (response) {
          this.actions.saveEngagementSuccess();
        }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  saveEngagementSuccess()
  {
    this.dispatch({ 'success': '5' });
  }

}

export default alt.createActions(SurveyActions);
