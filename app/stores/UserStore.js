import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import alt from 'altInstance';

/**
 * UserStore
 */
class UserStore {

  constructor() {

    this.user = Immutable.Map({});

    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    this.bindListeners({
      handleLoginAttempt: UserActions.MANUALLOGIN,
      handleLoginSuccess: UserActions.LOGINSUCCESS,
      handleLogoutAttempt: UserActions.LOGOUT,
      handleLogoutSuccess: UserActions.LOGOUTSUCCESS,
      handleSignupSuccess: UserActions.SIGNUPSUCCESS,
      handleSignupAttempt: UserActions.USERSIGNUP
    });
  }

  bootstrap() {
    if (!Immutable.Map.isMap(this.user)) {
      this.user = Immutable.fromJS(this.user);
    }
  }

  handleLoginAttempt() {
    this.user = this.user.set('isWaiting', true);
    this.emitChange();
  }

  handleSignupAttempt() {
    this.user = this.user.set('isSignupWaiting', true);
    this.emitChange();
  }

  handleSignupSuccess() {
    this.user = this.user.merge({ isSignupWaiting: false, registration: true });
    this.emitChange();
  }

  handleLoginSuccess(data) {
    this.user = this.user.merge({ isWaiting: false, authenticated: true });
    sessionStorage.setItem('isAuthenticated', true);
    //sessionStorage.setItem('currentUser', JSON.stringify({'email':'test@email.com','name':'test'}));
    sessionStorage.setItem('currentUser', JSON.stringify(data));
    this.emitChange();
  }

  handleLogoutAttempt() {
    this.user = this.user.set('isWaiting', true);
    this.emitChange();
  }

  handleLogoutSuccess() {
    this.user = this.user.merge({ isWaiting: false, authenticated: false });
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('currentUser');
    this.emitChange();
  }

}

// Export newly created Store
export default alt.createStore(UserStore, 'UserStore');
