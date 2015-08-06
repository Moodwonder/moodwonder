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

  getSurveyForm: () => {
    return $.ajax({
      url: '/getsurveyform',
      type: 'GET',
      contentType: 'application/json'
    });
  },

  saveSurveyResults: (data) => {
    return $.ajax({
      url: '/savesurveyresults',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
