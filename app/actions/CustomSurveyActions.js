import alt from 'altInstance';
import CustomSurveyWebAPIUtils from 'utils/CustomSurveyWebAPIUtils';

class CustomSurveyActions {

  createCustomSurveyForm (data) {
      this.dispatch();
      CustomSurveyWebAPIUtils.createCustomSurveyForm(data)
      .then((response, textStatus) => {
          if (textStatus === 'success') {
              this.actions.createsurveyform(true);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  createsurveyform (data) {
      this.dispatch(data);
  }

  getCustomSurveyForms () {
      this.dispatch();
      CustomSurveyWebAPIUtils.getCustomSurveyForms()
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.surveyforms(response.forms);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  surveyforms (data) {
      this.dispatch(data);
  }

  getSurveyForm (id) {
      this.dispatch();
      CustomSurveyWebAPIUtils.getSurveyForm(id)
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.handlesurveyform(response.form);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  handlesurveyform (data) {
      this.dispatch(data);
  }

  deleteForm (id) {
      this.dispatch();
      CustomSurveyWebAPIUtils.deleteForm(id)
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.deleteaform(id);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  deleteaform (id) {
      this.dispatch(id);
  }

  getOrganization () {
      this.dispatch();
      CustomSurveyWebAPIUtils.getOrganization()
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.handleorganization(response.data);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  handleorganization (data) {
      this.dispatch(data);
  }

}

export default alt.createActions(CustomSurveyActions);
