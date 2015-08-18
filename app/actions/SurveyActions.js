import alt from 'altInstance';
import SurveyWebAPIUtils from 'utils/SurveyWebAPIUtils';

class SurveyActions {

  getallquestions() {
      this.dispatch();
      SurveyWebAPIUtils.getEngagementSurvey()
      .then((response, textStatus) => {
          console.log(textStatus);
          if (textStatus === 'success') {
              console.log(response);
              this.actions.getquestions(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  getquestions(data)
  {
      console.log('getquestions(data)');
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

}

export default alt.createActions(SurveyActions);
