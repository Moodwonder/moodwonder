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
  }

};

export default utils;
