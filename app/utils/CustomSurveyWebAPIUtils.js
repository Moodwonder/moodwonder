import $ from 'jquery';

const utils = {

  createCustomSurveyForm: (data) => {
      return $.ajax({
      url: '/createsurveyform',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  getCustomSurveyForms: () => {
      return $.ajax({
      url: '/getsurveyforms',
      type: 'GET',
      contentType: 'application/json'
    });
  },

  deleteForm: (id) => {
      return $.ajax({
      url: '/deleteform',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id: id})
    });
  },

  getSurveyForm: (id) => {
      return $.ajax({
      url: '/getsurveyform',
      type: 'GET',
      //contentType: 'application/json',
      data: {id: id}
    });
  },

  saveSurveyResults: (data) => {
      return $.ajax({
      url: '/savesurveyresults',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  getOrganization: () => {
      return $.ajax({
      url: '/getorganization',
      type: 'GET',
      contentType: 'application/json'
    });
  }

};

export default utils;
