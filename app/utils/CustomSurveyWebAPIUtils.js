import $ from 'jquery';

const utils = {

  createCustomSurveyForm: (data) => {
    return $.ajax({
      url: '/createsurveyform',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
