import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  manuallogin: (data) => {
    return $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  /*
   * User signup with e-mail id verification
   */
  usersignupstep1: (data) => {
    return $.ajax({
      url: '/usersignupstep1',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  /*
   * Creating password after verification
   */
  usersignupstep2: (data) => {
    return $.ajax({
      url: '/usersignupstep2',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  /*
   * @return {Promise}
   */
  logout: () => {
    return $.ajax({
      url: '/logout',
      type: 'GET'
    });
  },

  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  signup: (data) => {
    return $.ajax({
      url: '/signup',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  /*
   * Get user info if logged in
   * @return {Promise}
   */
  userinfo: () => {
    return $.ajax({
      url: '/userinfo',
      type: 'GET'
    });
  }

};

export default utils;
