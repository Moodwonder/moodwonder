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
        <li>{data.mood} : {data.description}  <input type="text" ref={data._id} /></li>
      );
    });
    return (
      <div className="Survey-list">
         <ul>
         {items}
         </ul>
         <button onClick={this._onSurveySubmit}>Submit</button>
      </div>
    );
  }
  
}
