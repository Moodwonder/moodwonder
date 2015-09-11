import alt from 'altInstance';
import SurveyWebAPIUtils from 'utils/SurveyWebAPIUtils';

class SurveyActions {

  getEngagementSurvey() {
      this.dispatch();
      SurveyWebAPIUtils.getEngagementSurvey()
      .then((response, textStatus) => {
          if (textStatus === 'success') {
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
              this.actions.savesurveysuccess(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  savesurveysuccess(response)
  {
      this.dispatch(response);
  }

  getLastSurvey() {
      this.dispatch();
      SurveyWebAPIUtils.getLastSurvey()
      .then((response, textStatus) => {
          if (textStatus === 'success') {
              this.actions.lastsurveysuccess(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  lastsurveysuccess(response)
  {
      this.dispatch(response);
  }

}

export default alt.createActions(SurveyActions);
