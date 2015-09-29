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

}

export default alt.createActions(AdminUserActions);
