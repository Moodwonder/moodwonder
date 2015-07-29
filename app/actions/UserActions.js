import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

/**
 * UserActions
 */
class UserActions {

  // login function
  manuallogin(data) {
    this.dispatch();
    UserWebAPIUtils.manuallogin(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          this.actions.loginsuccess(response);
        }
      }, () => {
        // Dispatch another event for a bad login
      });
  }

  loginsuccess(response) {
    this.dispatch(response);
  }

  //logout function
  logout() {
    this.dispatch();
    UserWebAPIUtils.logout()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          this.actions.logoutsuccess();
        }
      }, () => {
        // Dispatch another event for a bad login
      });
  }

  logoutsuccess() {
    this.dispatch();
  }
}

export default alt.createActions(UserActions);
