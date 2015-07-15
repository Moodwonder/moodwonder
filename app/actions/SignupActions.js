import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

/**
 * SignupActions
 */
class SignupActions {
  
  /**
   *function to collect details from users
   */  
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

  signupsuccess(email) {
    this.dispatch(email);
  }

}

export default alt.createActions(SignupActions);
