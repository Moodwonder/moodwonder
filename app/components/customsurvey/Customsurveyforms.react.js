import React from 'react';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyFormsStore from 'stores/CustomSurveyFormsStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';


export default class Customsurveyforms extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = CustomSurveyFormsStore.getState();
      this.state.filtered = [];
  }

  componentDidMount() {
      CustomSurveyActions.getCustomSurveyForms();
      CustomSurveyFormsStore.listen(this._onChange);
      //$('#tableData').paging({limit: 5});
  }

  componentDidUpdate () {
      //$(document).ready(function () {
      //   $('#tableData').paging({limit: 5});
      //});
  }

  componentWillUnmount() {
      CustomSurveyFormsStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState({
      forms: CustomSurveyFormsStore.getState().forms,
      formid: CustomSurveyFormsStore.getState().formid,
      filtered: this.state.forms
    });

      if(this.state.formid){
          this.handleOnDeleteForm(this.state.formid);
      }
  }

  handleOnDeleteForm = (id) => {
      let forms = this.state.forms;
      for (let i = 0; i < forms.length; i++) {
          let form = forms[i];
          if (form._id === id) {
              forms.splice(i, 1);
              this.setState({forms: forms});
          }
      }
  }

  onSearchTitle = (e) => {
      e.preventDefault();
      let text = e.target.value;
      let forms = this.state.forms;
      let filtered = [];
      forms.map((data, key) => {
          if((data.surveytitle.toLowerCase()).indexOf(text.toLowerCase()) === 0){
              //return data;
              filtered.push(data);
          }
      });
      this.setState({filtered: filtered});
  }

  onDeleteForm = (e) => {
      e.preventDefault();
      let id = e.target.id;
      CustomSurveyActions.deleteForm(id);
  }

  onTakeASurvey = (e) => {
      e.preventDefault();
      let id = e.target.id;
      //CustomSurveyActions.deleteForm(id);
      window.location.assign('/takesurvey/' + id);
  }

  onViewResponse = (e) => {
      e.preventDefault();
      let id = e.target.id;
      window.location.assign('/surveyresponses/' + id);
  }

  render() {
      //let forms = this.state.forms;
      let forms = this.state.filtered;
      let items = null;
      let sno = 1;
      items = forms.map((form) => {
          return (
              <tr>
                  <td>{sno++}</td>
                  <td>{form.surveytitle}</td>
                  <td>{form.createddate}</td>
                  <td><a href="#" onClick={this.onTakeASurvey} id={form._id}>Take a survey</a> &nbsp;|&nbsp;
                  <a href="#" onClick={this.onViewResponse} id={form._id}>View responses</a> &nbsp;|&nbsp;
                  <a href="#" onClick={this.onDeleteForm} id={form._id}>Delete</a>
                  </td>
              </tr>
              );
      });


      return (
            <div className="ui segment brdr-none padding-none width-rating  ">
                <div className="clear"></div>
                <div className="ui two column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">Custom Survey Lists</h4>
                    </div>
                    <div className="column">
                        <div className="three  column">
                            <div className="test-gen ui submit button "> <a href="/mymood">Create New Survey</a></div>
                        </div>
                    </div>
                </div>
                <div className="ui four column stackable grid container">
                    <div className="five column">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="prompt" type="text" placeholder="Search..." name="searchtitle" id="searchtitle" onChange={this.onSearchTitle} />
                                <i className="search icon"></i> </div>
                            <div className="results"></div>
                        </div>
                    </div>
                </div>
                <div className="ui container">
                    <table id="tableData" className="ui celled striped table">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
            </div>
      );
  }
}

Customsurveyforms.contextTypes = { router: React.PropTypes.func };


