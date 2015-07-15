import $ from 'jquery';

const utils = {
  /*
   * Get Engagement areas
   */
  getEngagementSurvey: () => {
    return $.ajax({
      url: '/getengagementsurvey',
      type: 'GET',
      contentType: 'application/json'
    });
  },
  saveEngagementSurveyResult: (surveyResult) => {
    return $.ajax({
      url: '/saveengagementsurveyresult',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(surveyResult)
    });
  }
  
};

export default utils;
