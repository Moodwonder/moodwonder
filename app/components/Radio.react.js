import React from 'react';

export default class Question1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radio: []
    };
  }

  componentDidMount() {
    this.setState({radio: 0});
  }

  componentWillUnmount() {
    this.setState({radio: []});
  }

  onRemoveRadioOption = (e) => {
    e.preventDefault();
    let id = parseInt(e.target.id);
    var index = this.state.radio;
    var key = index.indexOf(id);
    if(key != -1) {
      index.splice(key, 1);
    }
    this.setState({radio: index});
  }

  render() {
    //let radio = this.state.radio;
    let radio = this.props.radio;
    let qId = this.props.qindex;

    return (
     <span>
      {radio.map((index) => {
        return (
            <div id={index} key={index} className="container">
              <br/>
              <span>option - {index}</span>
              <div className="form-group">
                <input type="radio" ref={'radio_' + index} name={'radio_' + index}/>
                <input type="text" ref={'q_' + qId + '_option_' + index} name={'q_' + qId + '_option_' + index} id={'q_' + qId + '_option_' + index} placeholder="enter option here.."/>
                <a href="#" className="btn-link" id={'q_' + qId + '_option_' + index} onClick={this.onRemoveRadioOption}>Remove</a>
              </div>
            </div>
        );
      }.bind(this))}
     </span>
    );
  }
}
