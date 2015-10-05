import React from 'react';
// import Immutable from 'immutable';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyFormsStore from 'stores/CustomSurveyFormsStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';

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
      let items = '';
      let sno = 1;
      items = forms.map((form) => {
          return (<tr>
                <td className="text-center">{sno++}</td>
                <td className="text-center">{form.surveytitle}</td>
                <td className="text-center">{form.createddate}</td>
                <td className="text-center">
                  <a href="#" onClick={this.onTakeASurvey} id={form._id}>take a survey</a>
                </td>
                <td className="text-center">
                  <a href="#" onClick={this.onViewResponse} id={form._id}>view responses</a>
                </td>
                <td className="text-center">
                  <a href="#" onClick={this.onDeleteForm} id={form._id}>delete</a>
                </td>
              </tr>
              );
      });

      return (
      <div className="container">
      <Submenu />
        <div className="form-group">
          <a href="/customsurvey" >Create survey</a>
        </div>
        <h2>Survey Forms.</h2>
            <input name="searchtitle" id="searchtitle" onChange={this.onSearchTitle} />
            <table className="table table-striped table-hover">
              <thead>
                <tr className="info">
                  <th className="text-center">#No</th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Date</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
      </div>
    );
  }
}

Customsurveyforms.contextTypes = { router: React.PropTypes.func };


