import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */

  createMyTeam: (data) => {
      return $.ajax({
      url: '/createteam',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  getMyTeams: (data) => {
      return $.ajax({
      url: '/getmyteams',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({})
    });
  },

  addMemberToMyTeam: (data) => {
      return $.ajax({
      url: '/addmembertoteam',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  removeMemberFromMyTeam: (data) => {
      return $.ajax({
      url: '/removememberfromteam',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }


};

export default utils;
