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

  getEngagementResults() {
      this.dispatch();
      SurveyWebAPIUtils.getEngagementResults()
      .then((response, textStatus) => {
          if (textStatus === 'success') {
              this.actions.engagementresultssuccess(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  engagementresultssuccess(data)
  {
      this.dispatch(data);
  }

  getResultsByCompany() {
      this.dispatch();
      SurveyWebAPIUtils.getResultsByCompany()
      .then((response, textStatus) => {
          if (textStatus === 'success') {
              this.actions.resultsbycompany(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  resultsbycompany(data)
  {
      this.dispatch(data);
  }

  getResultsByIndustry() {
      this.dispatch();
      SurveyWebAPIUtils.getResultsByIndustry()
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.resultsbyindustry(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  resultsbyindustry(data)
  {
      this.dispatch(data);
  }

  getResultsByCountry() {
      this.dispatch();
      SurveyWebAPIUtils.getResultsByCountry()
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.resultsbycountry(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  resultsbycountry(data)
  {
      this.dispatch(data);
  }

}

export default alt.createActions(SurveyActions);
