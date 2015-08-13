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
          if (response.status === true) {
              this.actions.pagesuccess(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }
  
  pagesuccess (data) {
      this.dispatch(data);
  }
  

}

export default alt.createActions(LanguageActions);
