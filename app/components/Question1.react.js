import React from 'react';
import Radio from 'components/Radio.react';

export default class Question1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      indexes: [],
      counter: 0,
      formData: {
      },
      radio: []
    };
  }

  componentDidMount() {
    this.setState({indexes: this.props.indexes});
    this.setState({counter: 0});
    this.setState({radio: []});
  }

  componentWillUnmount() {
    this.setState({indexes: []});
  }

  onSelectAnswerType = (e) => {
    var formData = this.state.formData;
    var radio = this.state.radio;
    let answerType = e.target.value;
    let id = e.target.id;
    console.log(id);
    switch(answerType){
        case 'radio':
            radio.push(0);
            this.setState({radio: radio});
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

  onAddRadioOption = (e) => {
    e.preventDefault();
    let counter = this.state.counter;
    let radio = this.state.radio;
    counter++;
    radio.push(counter);
    this.setState({counter: counter});
    this.setState({radio: radio});
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
    let radio = this.state.radio;

    return (
     <span>
      {indexes.map((index) => {
        return (
            <div id={index} key={index} className="container-fluid">
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
                <div>
                  <Radio radio={this.state.radio} qindex={index} />
                </div>
                <button className="btn btn-link" id={index} onClick={this.onAddRadioOption}>Add Option</button>
              </div>
              <button className="btn btn-danger" id={index} onClick={this.onRemoveQuestion}>Remove</button>
            </div>
        );
      }.bind(this))}
     </span>
    );
  }
}
