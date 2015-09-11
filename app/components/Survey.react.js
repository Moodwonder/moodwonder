import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import Submenu from 'components/Submenu.react';
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
          window.location.assign('/mymood');
      }
  }

  _onSurveySubmit = () => {
      let form = document.querySelector('#engagementForm');
      let formData = getFormData(form, {trim: true});
      const surveyResult = this.state.questions.map((data, key) => {
          //return { 'mood': data.mood, 'ratting': React.findDOMNode(this.refs[data._id]).value.trim() };
          let rating = formData[data.mood];
          return { 'mood': data.mood, 'rating': rating };
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
                      console.log(lastrated);
                  }
              }

              return (
                  <li className="list-group-item">
                    <Sliderrow slno={slno++} mood={data.mood} description={data.description} lastrated={lastrated} />
                  </li>
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
             <li className="list-group-item">
               <div className="row">
                 <div className="col-sm-6" ></div>
                 <div className="col-sm-6" ><button type="button" className="btn btn-primary" onClick={this._onSurveySubmit}>Submit</button></div>
               </div>
             </li>
          );
      }

      return (
        <div className="container Survey-list">
        <Submenu />
          {message}
          <form id="engagementForm">
            <ul className="list-group">
              {items}
              {submitButton}
            </ul>
          </form>
        </div>
      );
  }

}
