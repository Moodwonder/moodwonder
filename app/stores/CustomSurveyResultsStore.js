import Immutable from 'immutable';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class CustomSurveyResultsStore {

  constructor() {

    this.status = false;//Immutable.Map({});

    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    this.bindListeners({
      handleSurveyResults: CustomSurveyActions.HANDLESURVEYRESULTS
    });
  }

  bootstrap() {
    //if (!Immutable.OrderedMap.isOrderedMap(this.form)) {
    //  this.form = fromJSOrdered(this.form);
    //}
  }

  handleSurveyResults() {
    this.status = true;
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(CustomSurveyResultsStore, 'CustomSurveyResultsStore');
