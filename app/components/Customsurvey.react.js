import React from 'react';
import Immutable from 'immutable';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import $ from 'jquery';
//import SurveyActions from 'actions/SurveyActions';
//import SurveyStore from 'stores/SurveyStore';


export default class Customsurvey extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="login__container">
        <fieldset className="login__fieldset">
            <h3 id="surveyTitle">Custom survey page.</h3>
            <br/>
        </fieldset>
      </div>
    );

  }
}

