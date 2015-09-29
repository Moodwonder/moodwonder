import AdminUserActions from 'actions/AdminUserActions';
import alt from 'altInstance';

/**
 * UserStore
 */
class AdminUserStore {

  constructor () {

      this.usersTable = false;

      this.bindListeners({
        handleSetUsers: AdminUserActions.SETALLUSERDETAILS
      });
  }

  handleSetUsers (res) {
      this.usersTable = res.data;
      this.emitChange();
  }

}

// Export newly created Store
export default alt.createStore(AdminUserStore, 'AdminUserStore');
