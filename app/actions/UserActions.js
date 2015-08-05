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

  // Keep this function name in lower case, otherwise it will not be available in 'Store'
  loginsuccess(response) {
    this.dispatch(response);
  }

  // Save use details
  saveUserInfo(data) {
    this.dispatch();
    UserWebAPIUtils.saveUserDetails(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.saveuserdetailssuccess(response);
        }
      }, () => {
      });
  }

  saveuserdetailssuccess(response) {
    this.dispatch(response);
  }

  // Get user details
  getuserinfo() {
    this.dispatch();
    UserWebAPIUtils.userinfo()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.userinfosuccess(response);
        }
      }, () => {
      });
  }

  userinfosuccess(response) {
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
