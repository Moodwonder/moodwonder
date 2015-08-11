import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

/**
 * TeamActions
 */
class TeamActions {

  // Create Team
  createTeam (data) {
      this.dispatch();
      CommonWebAPIUtils.createMyTeam(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.createteamsuccess(response);
            }
        }, () => {
        });
  }

  // response handler for createTeam()
  createteamsuccess (response) {
      this.dispatch(response);
  }

  // response handler for getTeams()
  getteamsuccess (response) {
      this.dispatch(response);
  }


}

export default alt.createActions(TeamActions);
