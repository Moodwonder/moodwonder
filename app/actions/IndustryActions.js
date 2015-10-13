import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
 * IndustryActions
 */
class IndustryActions {

  // add new industry
  addIndustry (data) {
      this.dispatch();
      AdminWebAPIUtils.addIndustry(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.addindustry(response);
                this.actions.getIndustries();
            }
        }, () => {
        });
  }

  addindustry (response) {
      this.dispatch(response);
  }

  // Get all industries
  getIndustries () {
      this.dispatch();
      AdminWebAPIUtils.getIndustries()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getindustries(response);
            }
        }, () => {
        });
  }

  getindustries (response) {
      this.dispatch(response);
  }


  // update industry
  updateIndustry (data) {
      this.dispatch();
      AdminWebAPIUtils.updateIndustry(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.updateindustry(response);
                this.actions.getIndustries();
            }
        }, () => {
        });
  }

  updateindustry (response) {
      this.dispatch(response);
  }

  // delete Industry
  deleteIndustry (data) {
      this.dispatch();
      AdminWebAPIUtils.deleteIndustry(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.deleteindustry(response);
                this.actions.getIndustries();
            }
        }, () => {
        });
  }

  deleteindustry (response) {
      this.dispatch(response);
  }

}

export default alt.createActions(IndustryActions);
