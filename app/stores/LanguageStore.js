// import Immutable from 'immutable';
import LanguageActions from 'actions/LanguageActions';
// import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class LanguageStore {

  constructor () {

      this.languages = [];//Immutable.Map({});
      this.home = [];
      this.pagedata = [];
      this.on('init', this.bootstrap);
      this.on('bootstrap', this.bootstrap);

      this.bindListeners({
      handleAddLanguage: LanguageActions.ADDLANGUAGESUCCESS,
      handleLanguages: LanguageActions.LANGUAGES,
      handlePage: LanguageActions.PAGESUCCESS
    });
  }

  bootstrap () {
      // if (!Immutable.OrderedMap.isOrderedMap(this.languages)) {
      //     this.languages = fromJSOrdered(this.languages);
      // }
  }

  handleAddLanguage () {
      this.emitChange();
  }

  handleLanguages (data) {
      console.log('data');
      console.log(data);
      this.languages = data;
      this.emitChange();
  }
  
  handlePage (result) {
      if (result.page === 'home') {
          this.home = result.data;
          this.pagedata = result.data;
      }
      this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(LanguageStore, 'LanguageStore');
