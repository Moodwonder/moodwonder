import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */

  getAllUsers: () => {
      return $.ajax({
      url: '/getallusers',
      type: 'POST',
      contentType: 'application/json'
    });
  },
  getUser: (data) => {
      return $.ajax({
      url: '/getuser',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },
  updateUser: (data) => {
      return $.ajax({
      url: '/updateuser',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
