import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import alt from 'altInstance';

/**
 * UserStore
 */
class UserStore {

  constructor () {

      this.user = Immutable.Map({});
      this.isLogginWaiting = false;
      this.isServerCallWaiting = true;
      this.hasError = false;
      this.userDetails = {
       'fname': '', 'lname': '', 'email': '', 'language': '',
       'reportfrequency': '', 'password': '', 'companyname': '', 'industry': '',
       'continent': '', 'country': '', 'state': '',
       'city': '', 'address': '', 'website': '', 'companysize': ''
       };
      this.message = '';
      this.isLoggedIn = false;
      this.canSubmit = false;
      this.on('init', this.bootstrap);
      this.on('bootstrap', this.bootstrap);

      this.bindListeners({
        handleLoginAttempt: UserActions.MANUALLOGIN,
        handleLoginSuccess: UserActions.LOGINSUCCESS,
        handleLogoutAttempt: UserActions.LOGOUT,
        handleUserInfoSuccess: UserActions.USERINFOSUCCESS,
        handleCompanyInfoSuccess: UserActions.COMPANYINFOSUCCESS,
        handleSaveUserDetailsSuccess: UserActions.SAVEUSERDETAILSSUCCESS,
        handleSaveCompanySuccess: UserActions.SAVECOMPANYSUCCESS,
        handleLogoutSuccess: UserActions.LOGOUTSUCCESS
      });
  }

  bootstrap () {
      if (!Immutable.Map.isMap(this.user)) {
          this.user = Immutable.fromJS(this.user);
      }
  }

  handleLoginAttempt () {
      this.isLogginWaiting = true;
      this.emitChange();
  }

  handleLoginSuccess (response) {
      this.isLogginWaiting = false;
      this.message = response.message;
      this.isLoggedIn = response.status;
      sessionStorage.setItem('isAuthenticated', true);
      sessionStorage.setItem('currentUser', JSON.stringify(response));
      this.emitChange();
  }

  handleSaveUserDetailsSuccess (response) {
      this.isServerCallWaiting = false;
      this.hasError = !response.status;
      this.message = response.message;
      this.emitChange();
  }

  handleSaveCompanySuccess (response) {
      this.isServerCallWaiting = false;
      this.hasError = !response.status;
      this.message = response.message;
      this.emitChange();
  }

  handleUserInfoSuccess (response) {
      this.isServerCallWaiting = false;
      this.hasError = !response.status;
      this.message = response.message;
      if (!this.hasError) {
          this.userDetails = response.data;
          // To ignore initial message
          this.message = '';
      }
      this.emitChange();
  }

  handleCompanyInfoSuccess (response) {
      this.isServerCallWaiting = false;
      this.hasError = !response.status;
      this.message = response.message;
      if (!this.hasError) {
          this.userDetails = response.data;
          // To ignore initial message
          this.message = '';
      }
      this.emitChange();
  }

  handleLogoutAttempt () {
      this.isLogginWaiting = true;
      this.emitChange();
  }

  handleLogoutSuccess () {
      this.isLogginWaiting = false;
      this.isLoggedIn = false;
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('currentUser');
      this.emitChange();
  }

}

// Export newly created Store
export default alt.createStore(UserStore, 'UserStore');
