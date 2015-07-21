import SignupActions from 'actions/SignupActions';
import alt from 'altInstance';

/**
 * SignupStore
 */
class SignupStore {

  constructor() {
    this.user = {};
    this.isSignupWaiting = false;
    this.message = "";
    this.isRegistered = false;
    this.bindListeners({
      handleSignupFeedback: SignupActions.SIGNUPFEEDBACK,
      handleSignupAttempt: SignupActions.USERSIGNUPSTEP1
    });
  }

  handleSignupAttempt() {
    this.isSignupWaiting = true;
    this.emitChange();
  }

  handleSignupFeedback(response) {
	console.log(response);
    this.isSignupWaiting = false;
    this.message = response.message;
    this.isRegistered = response.status;
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(SignupStore, 'SignupStore');
