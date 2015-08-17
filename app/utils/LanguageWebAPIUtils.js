import $ from 'jquery';

const utils = {

  addLanguage: (data) => {
      return $.ajax({
      url: '/addlanguage',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  getLanguages: () => {
      return $.ajax({
      url: '/getlanguages',
      type: 'GET',
      contentType: 'application/json'
    });
  },

  getPage: (data) => {
      return $.ajax({
      url: '/getpage',
      type: 'GET',
      contentType: 'application/json',
      data: data
    });
  },

  updatePageKeys: (id, page, data) => {
      return $.ajax({
      url: '/updatepagekeys',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id: id, page: page, data: JSON.stringify(data)})
    });
  }

};

export default utils;
