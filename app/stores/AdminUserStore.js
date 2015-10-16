import AdminUserActions from 'actions/AdminUserActions';
import alt from 'altInstance';

/**
 * UserStore
 */
class AdminUserStore {

  constructor () {

      this.usersTable  =  false;
      this.userDetails =  false;
      this.userTeams   =  false;
      this.serverCall  =  false;
      this.hasError    =  false;
      this.openEnded   =  false;
      this.message     =  '';

      this.bindListeners({
        handleSetUsers: AdminUserActions.SETALLUSERDETAILS,
        handleSetUser: AdminUserActions.SETUSERDETAILS,
        handleSetUserTeams: AdminUserActions.SETUSERTEAMS,
        handleUpdateUser: AdminUserActions.UPDATEUSERDETAILS,
        handleOpenEnded: AdminUserActions.SETOPENENDED,
        handleSurveyDetails: AdminUserActions.SETSURVEYDETAILS
      });
  }

  handleSetUsers (res) {
      this.usersTable = res.data;
      this.emitChange();
  }

  handleSetUser (res) {
      this.userDetails = res.data;
      this.emitChange();
  }

  handleUpdateUser (res) {
      this.serverCall = true;
      this.hasError = res.status;
      this.message = res.message;
      this.emitChange();
  }

  handleSetUserTeams (res) {
      this.userTeams = res.data;
      this.emitChange();
  }

  handleOpenEnded (res) {
      this.openEnded = res.data;
      this.hasError = !res.status;
      this.message = res.message;
      this.emitChange();
  }

  handleSurveyDetails (res) {
      this.userSurveyStatistics = res.data;
      this.hasError = !res.status;
      this.message = res.message;
      this.emitChange();
  }

}

// Export newly created Store
export default alt.createStore(AdminUserStore, 'AdminUserStore');
