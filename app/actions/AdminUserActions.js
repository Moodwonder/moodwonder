import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
 * AdminUserActions
 */
class AdminUserActions {

  // Get all users in the database
  getAllUsers () {
      this.dispatch();
      AdminWebAPIUtils.getAllUsers()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setalluserdetails(response);
            }
        }, () => {
        });
  }

  setalluserdetails (response) {
      this.dispatch(response);
  }

  // Get details of a user
  getUsersDetails (uid) {
      this.dispatch();
      AdminWebAPIUtils.getUser(uid)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setuserdetails(response);
            }
        }, () => {
        });
  }

  setuserdetails (response) {
      this.dispatch(response);
  }

  // Get details of a user
  updateUserDetails (data) {
      this.dispatch();
      AdminWebAPIUtils.updateUser(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.updateuserdetails(response);
            }
        }, () => {
        });
  }

  updateuserdetails (response) {
      this.dispatch(response);
  }

}

export default alt.createActions(AdminUserActions);
