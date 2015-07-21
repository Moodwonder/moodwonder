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
      .then((response) => {
        if (response.status === 'success') {
          // Dispatch another event for successful login
          this.actions.loginsuccess(response.user);
        }
      }, () => {
        // Dispatch another event for a bad login
      });
  }

  //user registration function
  usersignup(data) {
    this.dispatch();
    UserWebAPIUtils.usersignup(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          this.actions.signupsuccess(data.email);
        }
      }, () => {
        // Dispatch another event for a bad login
      });
  }

  loginsuccess(email) {
    this.dispatch(email);
  }

  signupsuccess(email) {
    this.dispatch(email);
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
