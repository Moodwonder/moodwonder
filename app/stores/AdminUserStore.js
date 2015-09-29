import AdminUserActions from 'actions/AdminUserActions';
import alt from 'altInstance';

/**
 * UserStore
 */
class AdminUserStore {

  constructor () {

      this.usersTable = false;
      this.userDetails = false;
      this.serverCall = false;
      this.hasError = false;
      this.message = '';

      this.bindListeners({
        handleSetUsers: AdminUserActions.SETALLUSERDETAILS,
        handleSetUser: AdminUserActions.SETUSERDETAILS,
        handleUpdateUser: AdminUserActions.UPDATEUSERDETAILS
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

}

// Export newly created Store
export default alt.createStore(AdminUserStore, 'AdminUserStore');
