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
      this.surveyresults = [];
      this.lastmood = [];
      this.companysurvey = [];
      this.industrysurvey = [];
      this.countrysurvey = [];
      this.engagedmanagers = [];
      this.currentuserid = '';
      this.totalcompanyusers = '';


      this.bindListeners({
      handleSurveys: SurveyActions.GETQUESTIONS,
      handleSaveSurveys: SurveyActions.SAVESURVEYSUCCESS,
      handleLastSurvey: SurveyActions.LASTSURVEYSUCCESS,
      handleEngagementResults: SurveyActions.ENGAGEMENTRESULTSSUCCESS,
      handleResultsByCompany: SurveyActions.RESULTSBYCOMPANY,
      handleResultsByIndustry: SurveyActions.RESULTSBYINDUSTRY,
      handleResultsByCountry: SurveyActions.RESULTSBYCOUNTRY,
      handleEngagingManagers: SurveyActions.MOSTENGAGINGMANAGERS
    });
  }

  handleSurveys (data) {
      this.questions = data;
      this.hasQuestions = true;
      this.emitChange();
  }

  handleSaveSurveys (res) {

      this.savedstatus = true;
      if(res.status) {
          SurveyWebAPIUtils.getLastSurvey()
          .then((response, textStatus) => {
              if (response.status) {
                  this.lastsurvey = [];
                  this.lastsurvey = response.data;
                  this.lastmood = [];
                  this.lastmood = response.lastmood;
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
      this.lastmood = [];
      this.lastmood = response.lastmood;
      this.emitChange();
  }

  handleEngagementResults (response) {
      this.surveyresults = [];
      this.surveyresults = response.data;
      this.lastmood = [];
      this.lastmood = response.lastmood;
      this.emitChange();
  }

  handleResultsByCompany (response) {
      this.companysurvey = [];
      this.companysurvey = response.data;
      this.currentuserid = response.currentuser;
      this.totalcompanyusers = response.totalcompanyusers;
      this.emitChange();
  }

  handleResultsByIndustry (response) {
      this.industrysurvey = [];
      this.industrysurvey = response.data;
      this.currentuserid = response.currentuser;
      this.emitChange();
  }

  handleResultsByCountry (response) {
      this.countrysurvey = [];
      this.countrysurvey = response.data;
      this.currentuserid = response.currentuser;
      this.emitChange();
  }

  handleEngagingManagers (response) {
      this.engagedmanagers = [];
      this.engagedmanagers = response.data;
      this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(SurveyStore, 'SurveyStore');
