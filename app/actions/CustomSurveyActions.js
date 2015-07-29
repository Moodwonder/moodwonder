import alt from 'altInstance';
import CustomSurveyWebAPIUtils from 'utils/CustomSurveyWebAPIUtils';

class CustomSurveyActions {

  createCustomSurveyForm(data) {
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

  createsurveyform(data)
  {
    this.dispatch(data);
  }

}

export default alt.createActions(CustomSurveyActions);
