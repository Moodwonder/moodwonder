import Immutable from 'immutable';
import AdminActions from 'actions/AdminActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class AdminStore {

  constructor () {

      this.isAuthenticated = false;
      this.adminuser = Immutable.Map({});

      this.bindListeners({
        handleLoginSuccess: AdminActions.LOGINSUCCESS
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
      this.emitChange();
  }

}

/**
 * Export our newly created Store
 */
export default alt.createStore(AdminStore, 'AdminStore');
