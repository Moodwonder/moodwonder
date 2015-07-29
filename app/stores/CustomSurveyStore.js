import Immutable from 'immutable';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class CustomSurveyStore {

  constructor() {

    this.isSurveyCreated = false;

    this.bindListeners({
      handleCustomSurveyForm: CustomSurveyActions.CREATESURVEYFORM
    });
  }

  handleCustomSurveyForm(data) {
    this.isSurveyCreated = true;
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(CustomSurveyStore, 'CustomSurveyStore');
