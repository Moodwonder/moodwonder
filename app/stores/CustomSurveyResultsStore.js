import Immutable from 'immutable';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class CustomSurveyResultsStore {

  constructor() {

    this.form = [];//Immutable.Map({});

    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    this.bindListeners({
      handleSurveyForm: CustomSurveyActions.HANDLESURVEYFORM
    });
  }

  bootstrap() {
    if (!Immutable.OrderedMap.isOrderedMap(this.form)) {
      this.form = fromJSOrdered(this.form);
    }
  }

  handleSurveyForm(data) {
    this.form = data;
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(CustomSurveyResultsStore, 'CustomSurveyResultsStore');
