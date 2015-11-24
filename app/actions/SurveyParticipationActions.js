import alt from 'altInstance';
import CustomSurveyWebAPIUtils from 'utils/CustomSurveyWebAPIUtils';

class SurveyParticipationActions {

  getMySurveyParticipation () {
      this.dispatch();
      CustomSurveyWebAPIUtils.getMySurveyParticipation()
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.mysurveyparticipation(response.data);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  mysurveyparticipation (data) {
      if (alt.dispatcher.$Dispatcher_isDispatching) {
          window.setTimeout(() => {
              this.dispatch(data);
          });
      } else {
          this.dispatch(data);
      }
      //this.dispatch(data);
  }

}

export default alt.createActions(SurveyParticipationActions);
