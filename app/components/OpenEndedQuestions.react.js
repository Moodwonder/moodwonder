import React from 'react';
import getFormData from 'get-form-data';
import OpenEndedActions from 'actions/OpenEndedActions';
import OpenEndedStore from 'stores/OpenEndedStore';
import Submenu from 'components/Submenu.react';


export default class OpenEndedQuestions extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        questions: [],
        savesurveyflag: false
      };
  }

  componentDidMount() {
      OpenEndedActions.getQuestions();
      OpenEndedStore.listen(this._onChange);
  }

  componentWillUnmount() {
      OpenEndedStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState({
          questions: OpenEndedStore.getState().questions,
          savesurveyflag: OpenEndedStore.getState().savesurveyflag
      });
  }

  onOpenEndedSurveySubmit = (e) => {
      e.preventDefault();
      let form = document.querySelector('#openEndedForm');
      let data = getFormData(form, {trim: true});
      let openended = openended || {};
      openended.most_improved_aone = data['most_improved_aone'];
      openended.most_improved_atwo = data['most_improved_atwo'];
      openended.most_improved_athree = data['most_improved_athree'];
      openended.least_improved_aone = data['least_improved_aone'];
      openended.least_improved_atwo = data['least_improved_atwo'];
      openended.least_improved_athree = data['least_improved_athree'];

      if (window.confirm('Are sure you want to submit Open ended questions?')) {
          OpenEndedActions.saveAnswers(openended);
          //console.log(JSON.stringify(openended));
      }

  }

  onOpenEndedSurveyCancel = (e) => {
      e.preventDefault();
      document.getElementById("openEndedForm").reset();
  }



  render() {
      let savesurveyflag = this.state.savesurveyflag;

      let statusmessage = '';
      if(savesurveyflag) {
          statusmessage = (<div className="alert alert-success">
                            <strong>Success!</strong> Form submitted.
                           </div>
                          );
      }

      let questions = (this.state.questions).map((question) => {
          return (
                    <div className="form-group">
                        <div className="form-group">
                         THE MOST IMPROVED AREAS
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                              <label>{question.most_improved_qone}</label>
                              <br/>
                              <textarea name="most_improved_aone" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                              <label>{question.most_improved_qtwo}</label>
                              <br/>
                              <textarea name="most_improved_atwo" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                              <label>{question.most_improved_qthree}</label>
                              <br/>
                              <textarea name="most_improved_athree" className="form-control"></textarea>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group">
                           THE MOST DECREASED AREAS
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                              <label>{question.least_improved_qone}</label>
                              <br/>
                              <textarea name="least_improved_aone" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                              <label>{question.least_improved_qtwo}</label>
                              <br/>
                              <textarea name="least_improved_atwo" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                              <label>{question.least_improved_qthree}</label>
                              <br/>
                              <textarea name="least_improved_athree" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                              <label></label>
                              <br/>
                              <button className="btn btn-primary" onClick={this.onOpenEndedSurveyCancel}>Cancel</button>
                              &nbsp;&nbsp;
                              <button className="btn btn-primary" onClick={this.onOpenEndedSurveySubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                 );
      });

      return (
      <div className="container">
        <Submenu />
        {statusmessage}
        <h2>Open ended questions</h2>
        <br/>
        <form id="openEndedForm" className="form-horizontal">
            {questions}
        </form>
      </div>
    );
  }
}

