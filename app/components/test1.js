import React from 'react';
import Immutable from 'immutable';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import $ from 'jquery';
import Validation, { Validator } from 'rc-form-validation';
import mixins from 'es6-mixins';
import Question1 from 'components/Question1.react';
import getFormData from 'get-form-data';

export default class Test1 extends React.Component {

  constructor(props) {
    super(props);
    mixins(Validation.FieldMixin, this);
    this.state = {
        indexes: [0],
        counter: 0,
        status: {
            surveytitle: {},
            selectValue: ''
        },
        formData: {
            surveytitle: undefined
        }
    };
  }

  componentDidMount() {

  }

  onSurveySubmit = (e) => {
    e.preventDefault();
    var form = document.querySelector('#surveyForm');
    var data = getFormData(form, {trim: true});
    console.log(JSON.stringify(data));
  }

  onAddQuestion = (e) => {
    e.preventDefault();
    let counter = this.state.counter;
    let indexes = this.state.indexes;
    counter++;
    indexes.push(counter);
    this.setState({counter: counter});
    this.setState({indexes: indexes});
  }

  render() {
    var status = this.state.status;
    var formData = this.state.formData;

    return (
      <div className="container">
        <h2>Custom Survey Generation.</h2>
        <form id="surveyForm">
          <div className="form-group">
            <input type="text" ref="surveytitle" className="form-control" id="surveytitle" placeholder="Survey title"/>
          </div>
          <h4>Enter question here..</h4>
          <div>
            <Question1 indexes={this.state.indexes}/>
          </div>
          <br/>
          <div className="form-group">
            <button className="btn btn-success" onClick={this.onAddQuestion}>Add Question</button>&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.onSurveySubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

