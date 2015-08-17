import alt from 'altInstance';
import LanguageWebAPIUtils from 'utils/LanguageWebAPIUtils';

class LanguageActions {

  addLanguage (data) {
      this.dispatch();
      LanguageWebAPIUtils.addLanguage(data)
      .then((response, textStatus) => {
          if (textStatus === 'success') {
              this.actions.addlanguagesuccess(true);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  addlanguagesuccess (data) {
      this.dispatch(data);
  }

  getLanguages () {
      this.dispatch();
      LanguageWebAPIUtils.getLanguages()
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.languages(response.languages);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  languages (data) {
      this.dispatch(data);
  }

  getPage (data) {
      this.dispatch();
      LanguageWebAPIUtils.getPage(data)
      .then((response, textStatus) => {
          if (response.status === 'success') {
              this.actions.pagesuccess(response.pagedata);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  pagesuccess (data) {
      this.dispatch(data);
  }

  updatePageKeys (id, page, data) {
      this.dispatch();
      LanguageWebAPIUtils.updatePageKeys(id, page, data)
      .then((response, textStatus) => {
          if (textStatus === 'success') {
              this.actions.pagekeyssuccess(true);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  pagekeyssuccess (data) {
      this.dispatch(data);
  }


}

export default alt.createActions(LanguageActions);
