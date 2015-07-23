import React from 'react';

export default class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      indexes: [],
      formData: {
        'radio': [],
        'checkbox': [],
        'textbox': [],
        'textarea': []
      }
    };
  }

  componentDidMount() {
    this.setState({indexes: this.props.indexes});
  }

  componentWillUnmount() {
    this.setState({indexes: []});
  }

  onSelectAnswerType = (e) => {
    var formData = this.state.formData;
    var radio = formData.radio;
    var checkbox = formData.checkbox;
    var textbox = formData.textbox;
    var textarea = formData.textarea;
    let answerType = e.target.value;
    let id = e.target.id;
    console.log(id);
    switch(answerType){
        case 'radio': console.log('radio');
            break;
        case 'checkbox': console.log('checkbox');
                  this.setState({radio: []});
            break;
        case 'textbox': console.log('textbox');
            break;
        case 'textarea': console.log('textarea');
            break;
        default: break;
    }
  }

  onRemoveQuestion = (e) => {
    e.preventDefault();
    let id = parseInt(e.target.id);
    var index = this.state.indexes;
    var key = index.indexOf(id);
    if(key != -1) {
      index.splice(key, 1);
    }
    this.setState({indexes: index});
  }

  render() {
    let indexes = this.state.indexes;
    let formData = this.state.formData;

    return (
     <span>
      {indexes.map((index) => {
        return (
            <div id={index} key={index}>
              <br/>
              <span>Question - {index}</span>
              <div className="form-group">
                <input type="text" ref={'question_' + index} name={'question_' + index} className="form-control" id={'question_' + index} placeholder="Question"/>
              </div>
              <div className="form-group">
                <label>Select answer type:</label>
                <select className="navigation__item" id={index} name={'answertype_' + index} onChange={this.onSelectAnswerType}>
                  <option value="0">Choose one</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="textbox">Textbox</option>
                  <option value="textarea">Textarea</option>
                </select>
              </div>
              <button className="btn btn-danger" id={index} onClick={this.onRemoveQuestion}>Remove</button>
            </div>
        );
      }.bind(this))}
     </span>
    );
  }
}
