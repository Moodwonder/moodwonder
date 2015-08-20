import $ from 'jquery';

const utils = {

  login: (data) => {
      return $.ajax({
      url: '/adminlogin',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
