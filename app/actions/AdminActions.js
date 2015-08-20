import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/AdminWebAPIUtils';

class AdminActions {

  /**
   * Login function
   */
  login (data) {
      this.dispatch();
      AdminWebAPIUtils.login(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                // Dispatch another event for successful login
                this.actions.loginsuccess(response);
            }
        }, () => {
            // Dispatch another event for a bad login
        });
  }

  // Keep this function name in lower case, otherwise it will not be available in 'Store'
  loginsuccess (response) {
      this.dispatch(response);
  }

}

export default alt.createActions(AdminActions);
