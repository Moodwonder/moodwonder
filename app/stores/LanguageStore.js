import Immutable from 'immutable';
import LanguageActions from 'actions/LanguageActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class LanguageStore {

  constructor () {

      this.languages = [];//Immutable.Map({});
      this.home = [];
      this.pagedata = Immutable.Map({});

      this.bindListeners({
          handleAddLanguage: LanguageActions.ADDLANGUAGESUCCESS,
          handleLanguages: LanguageActions.LANGUAGES,
          handlePage: LanguageActions.PAGESUCCESS
      });
  }

  bootstrap () {
      if (!Immutable.OrderedMap.isOrderedMap(this.pagedata)) {
          this.pagedata = fromJSOrdered(this.pagedata);
      }
  }

  handleAddLanguage (data) {
      this.emitChange();
  }

  handleLanguages (data) {
      for (let lng of data) {
          this.languages.push(lng.language);
      }
      this.emitChange();
  }

  handlePage (data) {
      // if (result.page === 'home') {
      //     this.home = result.data;
      //     this.pagedata = result.data;
      // }
      //this.pagedata = result.data;
      //this.pagedata = [];
      //this.pagedata.push(result);
      this.pagedata = data;
      this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(LanguageStore, 'LanguageStore');
