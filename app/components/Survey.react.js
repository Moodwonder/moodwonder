import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';

export default class Survey extends React.Component {

  constructor(props) {
      super(props);
      this.state = SurveyStore.getState();
  }

  componentDidMount() {
      SurveyActions.getallquestions();
      SurveyStore.listen(this._onChange);
  }

  componentWillUnmount() {
      SurveyStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
      console.log(state);
  }

  _onSurveySubmit = () => {
      const surveyResult = this.state.questions.map((data, key) => {
          return { 'engagementarea_id': data._id, 'ratting': React.findDOMNode(this.refs[data._id]).value.trim() };
      });
      SurveyActions.saveEngagementSurvey(surveyResult);
  }

  render() {

      let items = '';
      let message = '';
      if(this.state.hasQuestions){
          items = this.state.questions.map((data, key) => {
              return (
                  <li className="list-group-item"><div className="row"><div className="col-sm-6" >{data.mood} : {data.description}</div> <div className="col-sm-6" ><input type="text" ref={data._id} /> </div></div></li>
              );
          });
      }

      if(this.state.message !== ''){
          message = (
              <div className="alert alert-warning">
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
          <ul className="pagination">
            <li><a href="/survey">Survey</a></li>
            <li><a href="/myprofile">My Profile</a></li>
            <li><a href="/mycompany">My Company</a></li>
            <li><a href="/mymanager">My Manager</a></li>
            <li><a href="/myteam">My Teams</a></li>
          </ul>

          {message}
          <ul className="list-group">
            {items}
            {submitButton}
          </ul>
        </div>
      );
  }

}
