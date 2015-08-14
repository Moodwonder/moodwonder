import React from 'react';
// import Immutable from 'immutable';
// import UserWebAPIUtils from 'utils/UserWebAPIUtils';
// import $ from 'jquery';
// import Validation, { Validator } from 'rc-form-validation';
import getFormData from 'get-form-data';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyActions from 'actions/CustomSurveyActions';
//import CustomSurveyResultsStore from 'stores/CustomSurveyResultsStore';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Homepage extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      //this.state = CustomSurveyStore.getState();
  }

  onCancelHome = (e) => {
      e.preventDefault();
  }

  onSubmitHome = (e) => {
      e.preventDefault();
      let formData = document.querySelector('#homepageForm');
      let data = getFormData(formData, {trim: true});
      let surveyResults = [];
      //let form = this.state.form;
      //let qcount = _.size(form.questions);
      console.log(JSON.stringify(data));
      
      let home = home || {};
      home.language = data['language'];



      if (window.confirm('Are you sure you want to submit the changes ?')) {
          let results = {};
          results.surveyresults = surveyResults;
          //CustomSurveyResultsActions.saveSurveyResults(results);
      }
  }

  render() {

      let pagedata = this.props.pagedata;
      let fields = '';
      console.log('id');
      console.log(pagedata._id);
      
      let qcount = _.size(pagedata.items);
      let items = [];
      for(let i = 0; i < qcount; i++ ){
          items.push(pagedata.items[i]);
      }
      
      console.log(items);

      let index = 0;
      fields = items.map((item) => {
          index++; 
          return (
               <div className="form-group" id={index}>
                 <label>{index}&nbsp;:&nbsp;</label>&nbsp;&nbsp;
                 <label>{item.item_key}</label>&nbsp;&nbsp;
                 <textarea name={item.item_key}>{item.item_value}</textarea>&nbsp;&nbsp;
                 <label>{item.description}</label>
                 <br/>
               </div>
              );
      });

    return (
      <div className="container">
        <h2>Home page details - {pagedata._id}</h2>
        <form id="homepageForm">
           <input type="hidden" name="_id" value={pagedata._id} />
           <input type="hidden" name="language" value={pagedata.language} />
          <br/>
          {fields}
          <div className="form-group">
            <br/><br/>
            <button className="btn btn-danger" onClick={this.onCancelHome}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSubmitHome}>Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

Homepage.contextTypes = { router: React.PropTypes.func };





