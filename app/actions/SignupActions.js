import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

/**
 * SignupActions
 */
class SignupActions {
  
  /**
   *function to collect details from users
   */  
  usersignupstep1(data) {
    this.dispatch();
    UserWebAPIUtils.usersignupstep1(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          console.log(response);
          this.actions.signupsuccess(data);
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
