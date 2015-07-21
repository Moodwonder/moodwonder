import Immutable from 'immutable';
import SurveyActions from 'actions/SurveyActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class SurveyStore {

  constructor() {

    this.questions = Immutable.Map({});

    this.on('init', this.bootstrap);

    this.on('bootstrap', this.bootstrap);

    this.bindListeners({
      handleSurveys: SurveyActions.GETQUESTIONS
    });
  }

  bootstrap() {
    if (!Immutable.OrderedMap.isOrderedMap(this.questions)) {
      this.questions = fromJSOrdered(this.questions);
    }
  }

  handleSurveys(data) {
    this.questions = data;
    this.emitChange();
  }

  handleEngageSuccess() {
    this.questions = this.questions.merge({ EngageSuccess: true });
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(SurveyStore, 'SurveyStore');
