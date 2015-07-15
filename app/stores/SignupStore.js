import Immutable from 'immutable';
import SignupActions from 'actions/SignupActions';
import alt from 'altInstance';

/**
 * SignupStore
 */
class SignupStore {
  
  constructor() {
    
    this.user = Immutable.Map({});

    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    this.bindListeners({
      handleSignupSuccess: SignupActions.SIGNUPSUCCESS,
      handleSignupAttempt: SignupActions.USERSIGNUP
    });
  }

  bootstrap() {
    if (!Immutable.Map.isMap(this.user)) {
      this.user = Immutable.fromJS(this.user);
    }
  }

  handleSignupAttempt() {
    this.user = this.user.set('isSignupWaiting', true);
    this.emitChange();
  }

  handleSignupSuccess() {
    this.user = this.user.merge({ isSignupWaiting: false, isRegistered: true });
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(SignupStore, 'SignupStore');
