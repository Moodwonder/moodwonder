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
  userinfo: (type) => {
    
    return $.ajax({
      url: '/userinfo?type='+type,
      type: 'GET'
    });
  },

  /*
   * Ajaxcall for save user details
   */
  saveUserDetails: (data) => {
    return $.ajax({
      url: '/saveuserdetails',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },
  /*
   * Ajaxcall for save company details
   */
  saveCompanyDetails: (data) => {
    return $.ajax({
      url: '/savecompanydetails',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
