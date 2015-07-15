import React from 'react';
import Immutable from 'immutable';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import $ from 'jquery';
//import SurveyActions from 'actions/SurveyActions';
//import SurveyStore from 'stores/SurveyStore';


export default class List extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }
  
  componentDidMount() {
    $("#addRadioOptionBtn").hide();
    $("#addCheckboxOptionBtn").hide();
  }

  _removeQuestion(rIndex){
      //var rIndex = this.attr('data-index');
      console.log(rIndex);
      //$("qRow_"+rIndex).remove();
  }  

  _addQuestion() {
      var index = parseInt($(".qRow").last().attr('data-index'));
      index++;
      var question = '';
      question  += '<div id="qRow_'+index+'" className="qRow" data-index="'+index+'">';
      question  += '<span>Question </span>';
      question  += '<input type="text" ref="question_'+index+'"/>';
      question  += '<br/><br/>';
      question  += '<span>Answer type </span>';
      question  += '<select ref="answertype_'+index+'">';
      question  += '<option value="radio">Radio</option>';
      question  += '<option value="Checkbox">Checkbox</option>';
      question  += '<option value="Textbox">Textbox</option>';
      question  += '<option value="Textarea">Textarea</option>';
      question  += '</select>';
      question  += '<br/><br/>';
      question  += '<button id="removeBtn_'+index+'" className="removeBtn" data-index="'+index+'" onClick={this._removeQuestion('+index+')}>Remove</button>';
      question  += '<span>--------------------------------------------------------------------</span>';
      question  += '</div>';
      
      $("#qContainer").append(question);
            
  }
  
  _selectAnswerType() {
      var answerType = $("#answertype_0").val();
      var answerBox = '';
      switch(answerType){
          case 'radio': 
              $("#addCheckboxOptionBtn").hide();
              $("#addRadioOptionBtn").show();
              $("#optContainer_0").html('');
              answerBox = '<input type="radio"><input type="text" placeHolder="Enter option name here">';
              break;
          case 'checkbox': 
              $("#addRadioOptionBtn").hide();
              $("#addCheckboxOptionBtn").show();
              $("#optContainer_0").html('');
              answerBox = '<input type="checkbox"><input type="text" placeHolder="Enter option name here">';
              break;    
          case 'textbox': 
              $("#addRadioOptionBtn").hide();
              $("#addCheckboxOptionBtn").hide();
              $("#optContainer_0").html('');
              answerBox = 'Textbox';
              break;
          case 'textarea': 
              $("#addRadioOptionBtn").hide();
              $("#addCheckboxOptionBtn").hide();
              $("#optContainer_0").html('');
              answerBox = 'Textarea';
              break;
          default: break;    
      }
      $("#optContainer_0").append(answerBox);
      
  }
  
  _addRadioOption() {
      var answerBox = '<br/><input type="radio"><input type="text" placeHolder="Enter option name here"><a href="javascript:void(0)">Remove</a>';
      $("#optContainer_0").append(answerBox);
  }
  
  _addCheckboxOption() {
      var answerBox = '<br/><input type="checkbox"><input type="text" placeHolder="Enter option name here"><a href="javascript:void(0)">Remove</a>';
      $("#optContainer_0").append(answerBox);
  }
  
  render() {  
    let index = this.state.index;
    return (
      <div className="login__container">
        <fieldset className="login__fieldset">
            <span id="surveyTitle">Survey page.</span>
            <br/>
            <span>Survey title : </span>
            <input type="text" ref="surveytitle" />
            <h4>Enter Questions here..</h4>
                <div id="qContainer">
                    <div id="qRow_0" className="qRow" data-index="0">
                        <span>Question </span>
                        <input type="text" ref="question_0"/>
                        <br/><br/>
                        <span>Answer type </span>
                        <select ref="answertype_0" id="answertype_0" onChange={this._selectAnswerType}>
                            <option value="0" selected>Select type</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="textbox">Textbox</option>
                            <option value="textarea">Textarea</option>
                        </select>
                        <div id="optContainer_0"></div>
                        <button id="addRadioOptionBtn" onClick={this._addRadioOption}>Add</button>
                        <button id="addCheckboxOptionBtn" onClick={this._addCheckboxOption}>Add</button>
                        <br/><br/>
                        <span>--------------------------------------------------------------------</span>
                    </div>
                    <br/><br/>
                </div>
                <button onClick={this._addQuestion}>Add Question</button>
                <br/>
            <button>Submit</button>
        </fieldset>
      </div>
    );
    
  }
}

