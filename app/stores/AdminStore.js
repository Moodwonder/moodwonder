import Immutable from 'immutable';
import AdminActions from 'actions/AdminActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class AdminStore {

  constructor () {

      this.isAuthenticated = false;
      this.adminuser = [];//Immutable.Map({});
      this.isAuth = "false";
      this.aData = [];
      this.on('init', this.bootstrap);
      this.on('bootstrap', this.bootstrap);

      this.bindListeners({
        handleLoginSuccess: AdminActions.LOGINSUCCESS,
        handleLogoutSuccess: AdminActions.LOGOUTSUCCESS
      });
  }

  bootstrap () {
      if (!Immutable.OrderedMap.isOrderedMap(this.adminuser)) {
          this.adminuser = fromJSOrdered(this.adminuser);
      }
  }

  handleLoginSuccess (data) {

      this.isAuthenticated = true;
      this.adminuser = data;
      localStorage.setItem('isAuth', true);
      localStorage.setItem('aData', data);
      this.isAuth = "true";
      this.aData = data;
      this.emitChange();
  }

  handleLogoutSuccess () {
      this.isAuthenticated = false;
      this.adminuser = [];
      localStorage.removeItem('isAuth');
      localStorage.removeItem('aData');
      this.isAuth = "false";
      this.aData = [];
      this.emitChange();
  }

}

/**
 * Export our newly created Store
 */
export default alt.createStore(AdminStore, 'AdminStore');
