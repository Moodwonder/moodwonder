import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import Sliderrow from 'components/SliderRow.react';
import getFormData from 'get-form-data';

export default class Survey extends React.Component {

  constructor(props) {
      super(props);
      this.state = SurveyStore.getState();
  }

  componentDidMount() {
      SurveyActions.getEngagementSurvey();
      SurveyStore.listen(this._onChange);
      SurveyActions.getLastSurvey();
  }

  componentWillUnmount() {
      SurveyStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
      if(this.state.savedstatus) {
          //window.location.assign('/mymood');
          window.location.assign('/openendedsurvey');
      }
  }

  _onSurveySubmit = () => {
      let form = document.querySelector('#engagementForm');
      let formData = getFormData(form, {trim: true});
      const surveyResult = this.state.questions.map((data, key) => {
          //return { 'mood': data.mood, 'ratting': React.findDOMNode(this.refs[data._id]).value.trim() };
          let rating = formData[data.mood];
          return { 'mood': data.mood, 'rating': rating, 'comment_title': '', 'comment': '' };
      });
      //console.log(JSON.stringify(surveyResult));
      SurveyActions.saveEngagementSurvey(surveyResult);
  }

  render() {

      let items = '';
      let message = '';
      let slno = 1;
      let lastsurvey = this.state.lastsurvey;
      let lastrated = '';

      if(this.state.hasQuestions){
          items = this.state.questions.map((data, key) => {
              for (let i = 0; i < lastsurvey.length; i++) {
                  let surveydetail = lastsurvey[i];
                  if (surveydetail.mood === data.mood) {
                      lastrated = surveydetail.rating;
                  }
              }

              return (
                        <Sliderrow slno={slno++} mood={data.mood} description={data.description} lastrated={lastrated} />
              );
          });
      }

      if (this.state.hasError) {
          message = (
            <div className="alert alert-warning">
              {this.state.message}
            </div>
          );
      }
      else if (this.state.message !== '') {
          message = (
            <div className="alert alert-info">
              {this.state.message}
            </div>
          );
      }

      let submitButton = '';
      if(items){
          submitButton = (
             <button type="button" className="ui submit button submitt" onClick={this._onSurveySubmit}>Submit</button>
          );
      }

      return (
        <div className="ui segment brdr-none padding-none width-rating  ">
            <div className="clear"></div>
            <div className="ui two column stackable grid container ">
                <div className="column">
                    <h3 className="ui header ryt com">Survey</h3>
                </div>
                <div className="column"></div>
            </div>
            {message}
            <form id="engagementForm">
                <div className="ui column stackable  container survey-test survey-mw">
                    {items}
                    {submitButton}
                </div>
            </form>
        </div>
      );
  }

}
