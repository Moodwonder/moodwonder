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
  
  _onChange = () => {
    this.setState({
      questions: SurveyStore.getState().questions
    });
  }
  
  _onSurveySubmit = () => {
    const surveyResult = this.state.questions.map((data,key) => {
       return { 'user_id': 1,'engagementarea_id' : data._id, 'ratting':React.findDOMNode(this.refs[data._id]).value.trim() };
    });
    SurveyActions.saveEngagementSurvey(surveyResult);
  }
  
  render() {
    const items = this.state.questions.map((data,key) => {
      return (
        <li className="list-group-item"><div className="row"><div className="col-sm-6" >{data.mood} : {data.description}  </div> <div className="col-sm-6" ><input type="text" ref={data._id} /> </div></div></li>
      );
    });
    let submitButton = '';
    if(items){
        submitButton = (
         <li className="list-group-item">
            <div className="row">
               <div className="col-sm-6" ></div>
               <div className="col-sm-6" ><button type="button" className="btn btn-primary" onClick={this._onSurveySubmit}>Submit</button></div>
            </div>
        </li> );
      
    }
    
    return (
      <div className="container Survey-list">
         <ul className="list-group">
         {items}
         {submitButton}
         </ul>
      </div>
    );
  }
  
}
