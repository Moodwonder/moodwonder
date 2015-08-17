import React from 'react';
import getFormData from 'get-form-data';
import _ from 'underscore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import LanguageActions from 'actions/LanguageActions';


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
      //console.log(JSON.stringify(data));
      //let g = { "_id" : ObjectId("55cdddddba6a1767742a4a1d"), "language" : "english", "items" : [ { "item_key" : "TITLE", "item_value" : "Moodwonder", "description" : "Main title" } ] };

      let home = home || {};
      let items = [];
      let temp = temp || {};
      home.language = data['language'];
      temp.item_key = 'TITLE';
      temp.item_value = data['TITLE'];
      temp.description = data['description'];
      items.push(temp);
      home.items = items;
      let pageid = data['_id'];
      //console.log(pageid);
      //console.log(JSON.stringify(home));
      if (window.confirm('Are you sure you want to submit the changes ?')) {
          let results = {};
          results.surveyresults = surveyResults;
          // LanguageActions.updatePageKeys(pageid, JSON.stringify(home));
          LanguageActions.updatePageKeys(pageid, 'home', home);
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
                 <input value={item.item_value} />&nbsp;&nbsp;
                 <textarea name={item.item_key}></textarea>&nbsp;&nbsp;
                 <label>{item.description}</label>
                 <input type="hidden" name="description" value={item.description} />
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





