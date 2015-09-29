import $ from 'jquery';

const utils = {

  getQuestions: () => {
      return $.ajax({
      url: '/openendedquestions',
      type: 'GET',
      contentType: 'application/json'
    });
  },

  saveAnswers: (data) => { console.log('data');console.log(data);
      return $.ajax({
      url: '/saveopenendedsurvey',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
